import { writeFileSync } from "fs";
import { join } from "path";
import { buildSeed, REPO_ROOT, seedSnapshot } from "./seed-data";

// Writes src/data/site.json from the legacy JSON files, without touching the database.
const out = join(REPO_ROOT, "src/data/site.json");
writeFileSync(out, JSON.stringify(seedSnapshot(buildSeed()), null, 2) + "\n");
console.log(`Wrote ${out}`);
