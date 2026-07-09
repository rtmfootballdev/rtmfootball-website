import "server-only";
import { v2 as cloudinary } from "cloudinary";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

export const isCloudinaryConfigured = Boolean(cloudName && apiKey && apiSecret);

if (isCloudinaryConfigured) {
  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });
}

export async function uploadJerseyPhotoToCloudinary(file: File): Promise<string> {
  if (!isCloudinaryConfigured) {
    throw new Error("Cloudinary is not configured.");
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  const dataUri = `data:${file.type || "image/jpeg"};base64,${buffer.toString("base64")}`;
  const result = await cloudinary.uploader.upload(dataUri, {
    folder: "rtm-football/jerseys",
  });
  return result.secure_url;
}
