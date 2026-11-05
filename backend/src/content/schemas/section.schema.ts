import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";

/**
 * Built-in kinds have a dedicated layout on the site. Generic kinds
 * ("timeline", "cards", "links") are for new sections you add from the admin panel.
 */
export const SECTION_KINDS = [
  "about",
  "experience",
  "teaching",
  "mentorship",
  "workshops",
  "projects",
  "skills",
  "education",
  "programs",
  "certificates",
  "supervision",
  "volunteer",
  "timeline",
  "cards",
  "links",
] as const;
export type SectionKind = (typeof SECTION_KINDS)[number];

@Schema({ timestamps: true, minimize: false })
export class Section {
  /** URL anchor, e.g. "projects" → /#projects. */
  @Prop({ required: true, unique: true, trim: true })
  key: string;

  @Prop({ required: true, enum: SECTION_KINDS })
  kind: SectionKind;

  /** Chapter id from settings.chapters (groups sections in the nav). */
  @Prop({ default: "" })
  chapter: string;

  @Prop({ default: "" })
  navLabel: string;

  @Prop({ default: "" })
  eyebrow: string;

  @Prop({ required: true })
  title: string;

  @Prop({ default: "" })
  description: string;

  @Prop({ default: "neutral", enum: ["neutral", "academic", "engineering"] })
  accent: string;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: true })
  visible: boolean;

  /** Kind-specific settings, e.g. counseling hours for "teaching". */
  @Prop({ type: MongooseSchema.Types.Mixed, default: {} })
  options: Record<string, unknown>;
}

export type SectionDocument = HydratedDocument<Section>;
export const SectionSchema = SchemaFactory.createForClass(Section);
