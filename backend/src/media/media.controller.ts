import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from "multer";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { MediaService } from "./media.service";

@Controller("admin/media")
@UseGuards(JwtAuthGuard)
export class MediaController {
  constructor(private readonly media: MediaService) {}

  @Get()
  list() {
    return this.media.list();
  }

  /** multipart/form-data: file, optional folder ("certificates/images"), optional private ("true"). */
  @Post()
  @UseInterceptors(FileInterceptor("file", { storage: memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } }))
  upload(@UploadedFile() file: Express.Multer.File, @Body() body: { folder?: string; private?: string }) {
    return this.media.upload(file, body.folder, body.private === "true");
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.media.remove(id);
  }
}
