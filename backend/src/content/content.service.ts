import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateItemDto, CreateSectionDto, UpdateItemDto, UpdateSectionDto, UpdateSettingsDto } from "./dto";
import { Item } from "./schemas/item.schema";
import { Section } from "./schemas/section.schema";
import { Settings } from "./schemas/settings.schema";

const toId = (id: string): Types.ObjectId => {
  if (!Types.ObjectId.isValid(id)) throw new BadRequestException("Invalid id");
  return new Types.ObjectId(id);
};

/** Fields that must never reach the public site, whatever the section kind. */
const isPrivateItem = (data: Record<string, unknown>): boolean =>
  data.is_sensitive_certificate === true || data.private === true;

const stripPrivateFields = (data: Record<string, unknown>): Record<string, unknown> => {
  const { notes: _notes, ...rest } = data; // "notes" are internal (e.g. mentorship notes)
  return rest;
};

@Injectable()
export class ContentService {
  constructor(
    @InjectModel(Section.name) private readonly sections: Model<Section>,
    @InjectModel(Item.name) private readonly items: Model<Item>,
    @InjectModel(Settings.name) private readonly settings: Model<Settings>,
  ) {}

  // ---------- settings ----------

  async getSettings() {
    const doc = await this.settings.findOne({ key: "site" }).lean();
    return doc ?? { key: "site", profile: {}, chapters: [] };
  }

  async updateSettings(dto: UpdateSettingsDto) {
    return this.settings
      .findOneAndUpdate({ key: "site" }, { $set: dto }, { upsert: true, new: true, lean: true })
      .exec();
  }

  // ---------- sections ----------

  async listSections() {
    const [sections, counts] = await Promise.all([
      this.sections.find().sort({ order: 1 }).lean(),
      this.items.aggregate<{ _id: Types.ObjectId; n: number }>([{ $group: { _id: "$section", n: { $sum: 1 } } }]),
    ]);
    const byId = new Map(counts.map((c) => [String(c._id), c.n]));
    return sections.map((s) => ({ ...s, itemCount: byId.get(String(s._id)) ?? 0 }));
  }

  async getSection(id: string) {
    const s = await this.sections.findById(toId(id)).lean();
    if (!s) throw new NotFoundException("Section not found");
    return s;
  }

  async createSection(dto: CreateSectionDto) {
    if (await this.sections.exists({ key: dto.key })) throw new ConflictException(`Section key "${dto.key}" is taken`);
    const last = await this.sections.findOne().sort({ order: -1 }).lean();
    return this.sections.create({ ...dto, order: (last?.order ?? -1) + 1 });
  }

  async updateSection(id: string, dto: UpdateSectionDto) {
    if (dto.key && (await this.sections.exists({ key: dto.key, _id: { $ne: toId(id) } }))) {
      throw new ConflictException(`Section key "${dto.key}" is taken`);
    }
    const s = await this.sections.findByIdAndUpdate(toId(id), { $set: dto }, { new: true }).lean();
    if (!s) throw new NotFoundException("Section not found");
    return s;
  }

  async deleteSection(id: string) {
    const s = await this.sections.findByIdAndDelete(toId(id)).lean();
    if (!s) throw new NotFoundException("Section not found");
    const { deletedCount } = await this.items.deleteMany({ section: s._id });
    return { deleted: true, itemsDeleted: deletedCount };
  }

  async reorderSections(ids: string[]) {
    await this.sections.bulkWrite(
      ids.map((id, order) => ({ updateOne: { filter: { _id: toId(id) }, update: { $set: { order } } } })),
    );
    return this.listSections();
  }

  // ---------- items ----------

  async listItems(sectionId: string) {
    return this.items.find({ section: toId(sectionId) }).sort({ order: 1 }).lean();
  }

  async createItem(sectionId: string, dto: CreateItemDto) {
    const section = toId(sectionId);
    if (!(await this.sections.exists({ _id: section }))) throw new NotFoundException("Section not found");
    let order = dto.order;
    if (order === undefined) {
      const last = await this.items.findOne({ section }).sort({ order: -1 }).lean();
      order = (last?.order ?? -1) + 1;
    } else {
      await this.items.updateMany({ section, order: { $gte: order } }, { $inc: { order: 1 } });
    }
    return this.items.create({ section, order, data: dto.data, visible: dto.visible ?? true });
  }

  async updateItem(id: string, dto: UpdateItemDto) {
    const item = await this.items.findByIdAndUpdate(toId(id), { $set: dto }, { new: true }).lean();
    if (!item) throw new NotFoundException("Item not found");
    return item;
  }

  async deleteItem(id: string) {
    const item = await this.items.findByIdAndDelete(toId(id)).lean();
    if (!item) throw new NotFoundException("Item not found");
    return { deleted: true };
  }

  async reorderItems(sectionId: string, ids: string[]) {
    const section = toId(sectionId);
    await this.items.bulkWrite(
      ids.map((id, order) => ({ updateOne: { filter: { _id: toId(id), section }, update: { $set: { order } } } })),
    );
    return this.listItems(sectionId);
  }

  // ---------- public snapshot ----------

  /**
   * Everything the public site needs, in one JSON document.
   * GitHub Actions saves this into the static build, so visitors never call the API.
   */
  async buildSnapshot() {
    const [settings, sections, items] = await Promise.all([
      this.getSettings(),
      this.sections.find({ visible: true }).sort({ order: 1 }).lean(),
      this.items.find({ visible: true }).sort({ order: 1 }).lean(),
    ]);

    const bySection = new Map<string, Record<string, unknown>[]>();
    for (const it of items) {
      const data = (it.data ?? {}) as Record<string, unknown>;
      if (isPrivateItem(data)) continue;
      const key = String(it.section);
      if (!bySection.has(key)) bySection.set(key, []);
      bySection.get(key)!.push({ _id: String(it._id), ...stripPrivateFields(data) });
    }

    return {
      generatedAt: new Date().toISOString(),
      settings: { profile: settings.profile ?? {}, chapters: settings.chapters ?? [] },
      sections: sections.map((s) => ({
        _id: String(s._id),
        key: s.key,
        kind: s.kind,
        chapter: s.chapter,
        navLabel: s.navLabel,
        eyebrow: s.eyebrow,
        title: s.title,
        description: s.description,
        accent: s.accent,
        options: s.options ?? {},
        items: bySection.get(String(s._id)) ?? [],
      })),
    };
  }
}
