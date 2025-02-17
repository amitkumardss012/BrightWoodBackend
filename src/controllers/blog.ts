import { asyncHandler } from "../middlewares/error";
import Blog from "../models/blog";
import { blogValidationSchema } from "../zod/blog";
import cloudinary, { uploadToCloudinary } from "../config/cloudinary";
import ErrorHandler from "../utils/ErrorClass";
import { statusCode } from "../types/types";
import { sendResponse } from "../utils/sendResponse";

// Controller to create a blog
export const createBlog = asyncHandler(async (req, res, next) => {
  // Parse and validate input using Zod
  const { title, heading, content, author } = blogValidationSchema.parse({
    ...req.body,
    image: req.file
  });

  if (!req.file) {
    return next(new ErrorHandler("Image is required", statusCode.Bad_Request));
  }

  // Upload image to Cloudinary
  const cloudinaryResult = await uploadToCloudinary(req.file.buffer, "school-images");

  if (!cloudinaryResult) {
    return next(new ErrorHandler("Failed to upload image", statusCode.Internal_Server_Error));
  }

  // Create a new blog document
  const blog = new Blog({
    title,
    heading,
    content,
    author,
    image: {
      public_id: cloudinaryResult.public_id,
      url: cloudinaryResult.url,
    },
  });

  await blog.save();

  return res.status(statusCode.Created).json({
    success: true,
    message: "Blog created successfully",
    blog
  })
});


export const deleteBlog = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
  
    // Find the blog by ID
    const blog = await Blog.findById(id);
  
    if (!blog) {
      return next(new ErrorHandler("Blog not found", statusCode.Not_Found));
    }
  
    // Delete the image from Cloudinary
    const cloudinaryResult = await cloudinary.uploader.destroy(blog.image.public_id);
  
    if (cloudinaryResult.result !== "ok") {
      return next(new ErrorHandler("Failed to delete image from Cloudinary", statusCode.Internal_Server_Error));
    }
  
    // Delete the blog from the database
    await blog.deleteOne({ _id: id });
  
    // Return success response
    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  });
  
  export const getAllBlogs = asyncHandler(async (req, res, next) => {
    const page = parseInt(req.query.page as string) || 1; // Current page (default is 1)
    const limit = parseInt(req.query.limit as string) || 10; // Items per page (default is 10)
    const skip = (page - 1) * limit; // Number of items to skip for pagination
  
    const totalBlogs = await Blog.countDocuments(); // Total number of blogs
    const totalPages = Math.ceil(totalBlogs / limit); // Total number of pages
  
    if (page > totalPages && totalBlogs > 0) {
      return next(new ErrorHandler("Page not found", statusCode.Not_Found));
    }
  
    const blogs = await Blog.find()
      .sort({ createdAt: -1 }) // Sort by newest first
      .skip(skip)
      .limit(limit);
  
    return res.status(200).json({
      success: true,
      page,
      totalPages,
      totalBlogs,
      count: blogs.length,
      blogs,
    });
  });

  export const searchBlogsByTitle = asyncHandler(async (req, res, next) => {
    const searchQuery = req.query.title as string;
  
    // Check if search query is provided
    if (!searchQuery) {
      return next(new ErrorHandler("Search query is required", statusCode.Bad_Request));
    }
  
    const blogs = await Blog.find({
      title: { $regex: searchQuery, $options: "i" }, // Case-insensitive search
    });
  
    return res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });
  });