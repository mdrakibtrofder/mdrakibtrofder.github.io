import { Body, Controller, Delete, Get, Header, Param, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { ContentService } from "./content.service";
import { CreateItemDto, CreateSectionDto, ReorderDto, UpdateItemDto, UpdateSectionDto, UpdateSettingsDto } from "./dto";

/** Read-only, no login: the snapshot the static site is built from. */
@Controller("public")
export class PublicController {
  constructor(private readonly content: ContentService) {}

  @Get("site")
  @Header("Cache-Control", "no-store")
  site() {
    return this.content.buildSnapshot();
  }
}

@Controller("admin")
@UseGuards(JwtAuthGuard)
export class AdminContentController {
  constructor(private readonly content: ContentService) {}

  @Get("settings")
  getSettings() {
    return this.content.getSettings();
  }

  @Put("settings")
  updateSettings(@Body() dto: UpdateSettingsDto) {
    return this.content.updateSettings(dto);
  }

  @Get("sections")
  listSections() {
    return this.content.listSections();
  }

  @Post("sections")
  createSection(@Body() dto: CreateSectionDto) {
    return this.content.createSection(dto);
  }

  @Put("sections/order")
  reorderSections(@Body() dto: ReorderDto) {
    return this.content.reorderSections(dto.ids);
  }

  @Get("sections/:id")
  getSection(@Param("id") id: string) {
    return this.content.getSection(id);
  }

  @Patch("sections/:id")
  updateSection(@Param("id") id: string, @Body() dto: UpdateSectionDto) {
    return this.content.updateSection(id, dto);
  }

  @Delete("sections/:id")
  deleteSection(@Param("id") id: string) {
    return this.content.deleteSection(id);
  }

  @Get("sections/:id/items")
  listItems(@Param("id") id: string) {
    return this.content.listItems(id);
  }

  @Post("sections/:id/items")
  createItem(@Param("id") id: string, @Body() dto: CreateItemDto) {
    return this.content.createItem(id, dto);
  }

  @Put("sections/:id/items/order")
  reorderItems(@Param("id") id: string, @Body() dto: ReorderDto) {
    return this.content.reorderItems(id, dto.ids);
  }

  @Patch("items/:id")
  updateItem(@Param("id") id: string, @Body() dto: UpdateItemDto) {
    return this.content.updateItem(id, dto);
  }

  @Delete("items/:id")
  deleteItem(@Param("id") id: string) {
    return this.content.deleteItem(id);
  }

  /** Preview of exactly what the next publish will contain. */
  @Get("preview")
  preview() {
    return this.content.buildSnapshot();
  }
}
