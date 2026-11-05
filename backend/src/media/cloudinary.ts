import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { cloudinaryFolder } from "../config/env";

let configured = false;

/** The SDK reads CLOUDINARY_URL from the environment; this just fails early with a clear message. */
export const getCloudinary = () => {
  if (!configured) {
    if (!process.env.CLOUDINARY_URL) throw new Error("Missing CLOUDINARY_URL. See backend/.env.example.");
    cloudinary.config({ secure: true });
    configured = true;
  }
  return cloudinary;
};

export interface UploadOptions {
  /** Path under the base folder, e.g. "certificates/images". */
  folder?: string;
  /** File name without extension; Cloudinary makes one up if omitted. */
  publicId?: string;
  /** Private files are not reachable by public URL. */
  private?: boolean;
  overwrite?: boolean;
}

const uploadOptions = (o: UploadOptions) => ({
  folder: [cloudinaryFolder(), o.folder].filter(Boolean).join("/"),
  public_id: o.publicId,
  resource_type: "auto" as const,
  type: o.private ? ("private" as const) : ("upload" as const),
  overwrite: o.overwrite ?? false,
  unique_filename: !o.publicId,
  use_filename: false,
});

export const uploadFile = (path: string, o: UploadOptions = {}): Promise<UploadApiResponse> =>
  getCloudinary().uploader.upload(path, uploadOptions(o));

export const uploadBuffer = (buffer: Buffer, o: UploadOptions = {}): Promise<UploadApiResponse> =>
  new Promise((resolve, reject) => {
    const stream = getCloudinary().uploader.upload_stream(uploadOptions(o), (err, res) =>
      err || !res ? reject(err ?? new Error("Upload failed")) : resolve(res),
    );
    stream.end(buffer);
  });
