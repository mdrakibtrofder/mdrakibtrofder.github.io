import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { getCloudinary, uploadBuffer } from "./cloudinary";
import { Media } from "./media.schema";

const ALLOWED = /^(image\/(png|jpe?g|gif|webp|svg\+xml|avif)|application\/pdf)$/;
const MAX_BYTES = 10 * 1024 * 1024; // Cloudinary free plan limit per file

@Injectable()
export class MediaService {
  constructor(@InjectModel(Media.name) private readonly media: Model<Media>) {}

  list() {
    return this.media.find().sort({ createdAt: -1 }).limit(500).lean();
  }

  async upload(file: Express.Multer.File, folder = "uploads", isPrivate = false) {
    if (!file) throw new BadRequestException("No file received");
    if (!ALLOWED.test(file.mimetype)) throw new BadRequestException("Only images and PDFs can be uploaded");
    if (file.size > MAX_BYTES) throw new BadRequestException("File is larger than 10 MB");
    const safeFolder = folder.replace(/[^a-z0-9/_-]/gi, "").replace(/^\/+|\/+$/g, "") || "uploads";
    const res = await uploadBuffer(file.buffer, { folder: safeFolder, private: isPrivate });
    return this.media.create({
      publicId: res.public_id,
      url: res.secure_url,
      resourceType: res.resource_type,
      deliveryType: res.type,
      format: res.format ?? "",
      bytes: res.bytes,
      originalName: file.originalname,
    });
  }

  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException("Invalid id");
    const m = await this.media.findById(id);
    if (!m) throw new NotFoundException("File not found");
    await getCloudinary().uploader.destroy(m.publicId, { resource_type: m.resourceType, type: m.deliveryType });
    await m.deleteOne();
    return { deleted: true };
  }
}
