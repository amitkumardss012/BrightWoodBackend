"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchBlogsByTitle = exports.getAllBlogs = exports.deleteBlog = exports.createBlog = void 0;
const error_1 = require("../middlewares/error");
const blog_1 = __importDefault(require("../models/blog"));
const blog_2 = require("../zod/blog");
const cloudinary_1 = __importStar(require("../config/cloudinary"));
const ErrorClass_1 = __importDefault(require("../utils/ErrorClass"));
const types_1 = require("../types/types");
// Controller to create a blog
exports.createBlog = (0, error_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Parse and validate input using Zod
    const { title, heading, content, author } = blog_2.blogValidationSchema.parse(Object.assign(Object.assign({}, req.body), { image: req.file }));
    if (!req.file) {
        return next(new ErrorClass_1.default("Image is required", types_1.statusCode.Bad_Request));
    }
    // Upload image to Cloudinary
    const cloudinaryResult = yield (0, cloudinary_1.uploadToCloudinary)(req.file.buffer, "school-images");
    if (!cloudinaryResult) {
        return next(new ErrorClass_1.default("Failed to upload image", types_1.statusCode.Internal_Server_Error));
    }
    // Create a new blog document
    const blog = new blog_1.default({
        title,
        heading,
        content,
        author,
        image: {
            public_id: cloudinaryResult.public_id,
            url: cloudinaryResult.url,
        },
    });
    yield blog.save();
    return res.status(types_1.statusCode.Created).json({
        success: true,
        message: "Blog created successfully",
        blog
    });
}));
exports.deleteBlog = (0, error_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Find the blog by ID
    const blog = yield blog_1.default.findById(id);
    if (!blog) {
        return next(new ErrorClass_1.default("Blog not found", types_1.statusCode.Not_Found));
    }
    // Delete the image from Cloudinary
    const cloudinaryResult = yield cloudinary_1.default.uploader.destroy(blog.image.public_id);
    if (cloudinaryResult.result !== "ok") {
        return next(new ErrorClass_1.default("Failed to delete image from Cloudinary", types_1.statusCode.Internal_Server_Error));
    }
    // Delete the blog from the database
    yield blog.deleteOne({ _id: id });
    // Return success response
    res.status(200).json({
        success: true,
        message: "Blog deleted successfully",
    });
}));
exports.getAllBlogs = (0, error_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1; // Current page (default is 1)
    const limit = parseInt(req.query.limit) || 10; // Items per page (default is 10)
    const skip = (page - 1) * limit; // Number of items to skip for pagination
    const totalBlogs = yield blog_1.default.countDocuments(); // Total number of blogs
    const totalPages = Math.ceil(totalBlogs / limit); // Total number of pages
    if (page > totalPages && totalBlogs > 0) {
        return next(new ErrorClass_1.default("Page not found", types_1.statusCode.Not_Found));
    }
    const blogs = yield blog_1.default.find()
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
}));
exports.searchBlogsByTitle = (0, error_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const searchQuery = req.query.title;
    // Check if search query is provided
    if (!searchQuery) {
        return next(new ErrorClass_1.default("Search query is required", types_1.statusCode.Bad_Request));
    }
    const blogs = yield blog_1.default.find({
        title: { $regex: searchQuery, $options: "i" }, // Case-insensitive search
    });
    return res.status(200).json({
        success: true,
        count: blogs.length,
        blogs,
    });
}));
