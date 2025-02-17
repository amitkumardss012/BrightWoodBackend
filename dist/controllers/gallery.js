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
exports.getAllGalleryImages = exports.deleteGallery = exports.uploadGallery = void 0;
const cloudinary_1 = __importStar(require("../config/cloudinary"));
const error_1 = require("../middlewares/error");
const gallery_1 = require("../models/gallery");
const types_1 = require("../types/types");
const ErrorClass_1 = __importDefault(require("../utils/ErrorClass"));
const gallery_2 = require("../zod/gallery");
exports.uploadGallery = (0, error_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = gallery_2.GallerySchema.parse(req.body);
    if (!req.file)
        return next(new ErrorClass_1.default("Image file is required", types_1.statusCode.Bad_Request));
    const cloudinaryImage = yield (0, cloudinary_1.uploadToCloudinary)(req.file.buffer, "school-images");
    const newImage = yield gallery_1.Gallery.create({
        title,
        image: cloudinaryImage,
    });
    return res.status(201).json({
        message: "Image uploaded successfully",
        image: newImage,
    });
}));
exports.deleteGallery = (0, error_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    if (!id) {
        return next(new ErrorClass_1.default("Gallery ID is required", types_1.statusCode.Bad_Request));
    }
    const galleryRecord = yield gallery_1.Gallery.findById(id);
    if (!galleryRecord)
        return next(new ErrorClass_1.default("Gallery not found", types_1.statusCode.Not_Found));
    const public_id = (_a = galleryRecord.image) === null || _a === void 0 ? void 0 : _a.public_id;
    if (!public_id)
        return next(new ErrorClass_1.default("Image not found", types_1.statusCode.Not_Found));
    const cloudinaryResult = yield cloudinary_1.default.uploader.destroy(public_id);
    if (cloudinaryResult.result !== "ok") {
        return res.status(500).json({ error: "Failed to delete image from Cloudinary" });
    }
    yield gallery_1.Gallery.findByIdAndDelete(id);
    return res.status(200).json({
        message: "Gallery record and image deleted successfully",
    });
}));
exports.getAllGalleryImages = (0, error_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1; // Current page (default is 1)
    const limit = parseInt(req.query.limit) || 10; // Number of items per page (default is 10)
    const skip = (page - 1) * limit; // Number of items to skip for pagination
    const totalImages = yield gallery_1.Gallery.countDocuments(); // Total number of images
    const totalPages = Math.ceil(totalImages / limit); // Total number of pages
    if (page > totalPages && totalImages > 0) {
        return res.status(404).json({
            success: false,
            message: "Page not found",
        });
    }
    const galleryImages = yield gallery_1.Gallery.find()
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
}));
