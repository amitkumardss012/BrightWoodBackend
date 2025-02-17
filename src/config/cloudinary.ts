// src/utils/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";
import { env } from "../utils/env";
import { UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';

cloudinary.config({
  cloud_name: env.cloud_name,
  api_key: env.cloud_api_key,
  api_secret: env.cloud_api_secret,
});

export default cloudinary

export const uploadToCloudinary = (fileBuffer: Buffer, folder: string): Promise<{ public_id: string; url: string }> => {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder },
        (error, result) => {
          if (error) {
            return reject(new Error("Failed to upload image to Cloudinary: " + error.message));
          }
          if (!result?.secure_url || !result.public_id) {
            return reject(new Error("Failed to retrieve public_id or URL from Cloudinary response"));
          }
          resolve({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }
      );

      console.log(uploadStream.map(r => console.log(r)));
  
      // Create a readable stream from the file buffer and pipe it to the upload stream
      const stream = Readable.from(fileBuffer);
      stream.pipe(uploadStream);
    });
  };