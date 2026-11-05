import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema, Types } from "mongoose";

@Schema({ timestamps: true, minimize: false })
export class Item {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Section", required: true, index: true })
  section: Types.ObjectId;

  @Prop({ default: 0 })
  order: number;

  /** Hidden items stay in the admin panel but are left out of the public site. */
  @Prop({ default: true })
  visible: boolean;

  /** The item's fields; their shape depends on the section kind. */
  @Prop({ type: MongooseSchema.Types.Mixed, default: {} })
  data: Record<string, unknown>;
}

export type ItemDocument = HydratedDocument<Item>;
export const ItemSchema = SchemaFactory.createForClass(Item);
ItemSchema.index({ section: 1, order: 1 });
