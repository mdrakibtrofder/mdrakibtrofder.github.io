import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";

/** Single document holding site-wide content: profile and chapters (nav groups). */
@Schema({ timestamps: true, minimize: false })
export class Settings {
  @Prop({ default: "site", unique: true })
  key: string;

  @Prop({ type: MongooseSchema.Types.Mixed, default: {} })
  profile: Record<string, unknown>;

  /** [{ id, navLabel, label, title, description, icon, accent, showHeader }] in display order. */
  @Prop({ type: [MongooseSchema.Types.Mixed], default: [] })
  chapters: Record<string, unknown>[];
}

export type SettingsDocument = HydratedDocument<Settings>;
export const SettingsSchema = SchemaFactory.createForClass(Settings);
