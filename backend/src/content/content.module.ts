import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "../auth/auth.module";
import { AdminContentController, PublicController } from "./content.controller";
import { ContentService } from "./content.service";
import { Item, ItemSchema } from "./schemas/item.schema";
import { Section, SectionSchema } from "./schemas/section.schema";
import { Settings, SettingsSchema } from "./schemas/settings.schema";

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Section.name, schema: SectionSchema },
      { name: Item.name, schema: ItemSchema },
      { name: Settings.name, schema: SettingsSchema },
    ]),
  ],
  controllers: [PublicController, AdminContentController],
  providers: [ContentService],
  exports: [ContentService],
})
export class ContentModule {}
