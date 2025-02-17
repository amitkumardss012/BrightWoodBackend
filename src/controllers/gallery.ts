import cloudinary, { uploadToCloudinary } from "../config/cloudinary";
import { asyncHandler } from "../middlewares/error";
import { Gallery } from "../models/gallery";
import { statusCode } from "../types/types";
import ErrorHandler from "../utils/ErrorClass";
import { GallerySchema } from "../zod/gallery";

export const uploadGallery = asyncHandler(async (req, res, next) => {
    const { title } = GallerySchema.parse(req.body);

    if (!req.file) return next(new ErrorHandler("Image file is required", statusCode.Bad_Request));

    const cloudinaryImage = await uploadToCloudinary(req.file.buffer, "school-images");


    const newImage = await Gallery.create({
      title,
      image: cloudinaryImage,
    });

    return res.status(201).json({
      message: "Image uploaded successfully",
      image: newImage,
    });
});

export const deleteGallery = asyncHandler(async (req, res, next) => {
    const { id } = req.params; 

    if (!id) {
      return next(new ErrorHandler("Gallery ID is required", statusCode.Bad_Request));
    }
  
    const galleryRecord = await Gallery.findById(id);
    if (!galleryRecord) return next(new ErrorHandler("Gallery not found", statusCode.Not_Found));
  
    const public_id = galleryRecord.image?.public_id 
    if (!public_id) return next(new ErrorHandler("Image not found", statusCode.Not_Found));

    const cloudinaryResult = await cloudinary.uploader.destroy(public_id);
  
    if (cloudinaryResult.result !== "ok") {
      return res.status(500).json({ error: "Failed to delete image from Cloudinary" });
    }
  
    await Gallery.findByIdAndDelete(id);
  
    return res.status(200).json({
      message: "Gallery record and image deleted successfully",
    });
});


export const getAllGalleryImages = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page as string) || 1; // Current page (default is 1)
  const limit = parseInt(req.query.limit as string) || 10; // Number of items per page (default is 10)
  const skip = (page - 1) * limit; // Number of items to skip for pagination

  const totalImages = await Gallery.countDocuments(); // Total number of images
  const totalPages = Math.ceil(totalImages / limit); // Total number of pages

  if (page > totalPages && totalImages > 0) {
    return res.status(404).json({
      success: false,
      message: "Page not found",
    });
  }

  const galleryImages = await Gallery.find()
    .sort({ createdAt: -1 }) // Sort by newest first
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    success: true,
    page,
    totalPages,
    totalImages,
    count: galleryImages.length,
    images: galleryImages,
  });
});