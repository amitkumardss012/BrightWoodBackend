"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
exports.multerUpload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 1 * 1024 * 1024 }, // Limit file size to 10KB
    fileFilter: (_, file, cb) => {
        const allowedMimeTypes = ["image/jpeg", "image/png, image/webp"];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error("Only JPEG, PNG and WEBP images are allowed"));
        }
        if (file.size > 10 * 1024) {
            cb(new Error("File size is too largeeee"));
        }
    },
});
