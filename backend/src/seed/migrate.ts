/**
 * One-time migration: uploads every file in public/ (logos, certificate images
 * and PDFs) to Cloudinary, then loads all site content into MongoDB with the
 * new Cloudinary URLs.
 *
 *   cd backend
 *   npm run migrate              # refuses to run if the database already has content
 *   npm run migrate -- --reset   # wipes sections/items/settings first
 *   npm run migrate -- --dry-run # uploads nothing, writes nothing; just reports
 *
 * Safe to re-run: files already in Cloudinary are skipped (same public id).
 */
import "dotenv/config";
import { existsSync, readdirSync, statSync, writeFileSync } from "fs";
import { basename, extname, join, relative } from "path";
import mongoose from "mongoose";
import { cloudinaryFolder, mongoUri } from "../config/env";
import { ItemSchema } from "../content/schemas/item.schema";
import { SectionSchema } from "../content/schemas/section.schema";
import { SettingsSchema } from "../content/schemas/settings.schema";
import { MediaSchema } from "../media/media.schema";
import { getCloudinary, uploadFile } from "../media/cloudinary";
import { buildSeed, REPO_ROOT } from "./seed-data";

const args = new Set(process.argv.slice(2));
const DRY = args.has("--dry-run");
const RESET = args.has("--reset");
const PUBLIC = join(REPO_ROOT, "public");
const ASSET_DIRS = ["organizations", "clubs", "certificates/images", "certificates/pdfs"];
const ASSET_EXT = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".pdf"]);

const walk = (dir: string): string[] =>
  existsSync(dir)
    ? readdirSync(dir).flatMap((n) => {
        const p = join(dir, n);
        return statSync(p).isDirectory() ? walk(p) : ASSET_EXT.has(extname(n).toLowerCase()) ? [p] : [];
      })
    : [];

/** Deep-replaces any string that is a local /path we uploaded with its Cloudinary URL. */
const rewrite = (value: unknown, map: Map<string, string>): unknown => {
  if (typeof value === "string") return map.get(value) ?? value;
  if (Array.isArray(value)) return value.map((v) => rewrite(v, map));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, rewrite(v, map)]));
  }
  return value;
};

async function main() {
  const seed = buildSeed();
  const sensitiveIds = new Set(
    seed.sections
      .find((s) => s.key === "certificates")!
      .items.filter((c) => c.is_sensitive_certificate === true)
      .map((c) => String(c.id)),
  );

  console.log(`Connecting to MongoDB${DRY ? " (dry run)" : ""}…`);
  await mongoose.connect(mongoUri());
  const Section = mongoose.model("Section", SectionSchema);
  const Item = mongoose.model("Item", ItemSchema);
  const Settings = mongoose.model("Settings", SettingsSchema);
  const Media = mongoose.model("Media", MediaSchema);

  const existing = await Section.countDocuments();
  if (existing > 0 && !RESET) {
    throw new Error(`Database already has ${existing} sections. Re-run with --reset to replace them.`);
  }

  // 1) Upload files
  getCloudinary();
  const files = ASSET_DIRS.flatMap((d) => walk(join(PUBLIC, d)));
  console.log(`Uploading ${files.length} files to Cloudinary folder "${cloudinaryFolder()}"…`);
  const urlMap = new Map<string, string>();
  const failures: string[] = [];
  let done = 0;

  const uploadOne = async (file: string) => {
    const rel = relative(PUBLIC, file).split("\\").join("/"); // certificates/images/Certificate_1.jpg
    const sitePath = `/${rel}`;
    const folder = rel.split("/").slice(0, -1).join("/");
    const publicId = basename(file, extname(file));
    const isPrivate = sensitiveIds.has(publicId);
    if (DRY) {
      urlMap.set(sitePath, `cloudinary://${folder}/${publicId}`);
      return;
    }
    const fullId = `${cloudinaryFolder()}/${folder}/${publicId}`;
    const known = await Media.findOne({ publicId: fullId }).lean();
    if (known) {
      urlMap.set(sitePath, known.url);
      return;
    }
    const res = await uploadFile(file, { folder, publicId, private: isPrivate, overwrite: false });
    await Media.updateOne(
      { publicId: res.public_id },
      {
        $set: {
          url: res.secure_url,
          resourceType: res.resource_type,
          deliveryType: res.type,
          format: res.format ?? "",
          bytes: res.bytes,
          originalName: basename(file),
        },
      },
      { upsert: true },
    );
    urlMap.set(sitePath, res.secure_url);
  };

  // A few uploads at a time keeps within Cloudinary's rate limits.
  const queue = [...files];
  await Promise.all(
    Array.from({ length: 4 }, async () => {
      for (let f = queue.shift(); f; f = queue.shift()) {
        try {
          await uploadOne(f);
        } catch (e) {
          failures.push(`${relative(PUBLIC, f)}: ${(e as Error).message}`);
        }
        if (++done % 25 === 0) console.log(`  ${done}/${files.length}`);
      }
    }),
  );
  console.log(`Uploaded/linked ${urlMap.size} files, ${failures.length} failed.`);
  failures.forEach((f) => console.warn("  ✗", f));

  // 2) Content
  const settings = rewrite(seed.settings, urlMap) as typeof seed.settings;
  if (!DRY) {
    if (RESET) {
      await Promise.all([Section.deleteMany({}), Item.deleteMany({}), Settings.deleteMany({})]);
    }
    await Settings.create({ key: "site", ...settings });
    for (const [order, s] of seed.sections.entries()) {
      const { items, ...meta } = s;
      const section = await Section.create({ ...meta, options: rewrite(meta.options ?? {}, urlMap), order });
      await Item.insertMany(
        items.map((data, i) => ({ section: section._id, order: i, data: rewrite(data, urlMap) })),
      );
      console.log(`  ✓ ${s.key}: ${items.length} items`);
    }
  }

  const report = join(REPO_ROOT, "backend", "migration-report.json");
  writeFileSync(report, JSON.stringify({ dryRun: DRY, uploaded: Object.fromEntries(urlMap), failures }, null, 2));
  console.log(`Done. Report: ${report}`);
  await mongoose.disconnect();
  if (failures.length) process.exitCode = 1;
}

main().catch(async (e) => {
  console.error("Migration failed:", e.message ?? e);
  await mongoose.disconnect().catch(() => undefined);
  process.exit(1);
});
