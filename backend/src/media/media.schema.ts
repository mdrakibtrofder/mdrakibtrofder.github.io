import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

/** A file stored in Cloudinary. The URL is what content items point to. */
@Schema({ timestamps: true })
export class Media {
  @Prop({ required: true, unique: true })
  publicId: string;

  @Prop({ required: true })
  url: string;

  @Prop({ default: "image" })
  resourceType: string;

  /** "upload" (public) or "private" (only reachable through signed URLs). */
  @Prop({ default: "upload" })
  deliveryType: string;

  @Prop({ default: "" })
  format: string;

  @Prop({ default: 0 })
  bytes: number;

  @Prop({ default: "" })
  originalName: string;
}

export type MediaDocument = HydratedDocument<Media>;
export const MediaSchema = SchemaFactory.createForClass(Media);
