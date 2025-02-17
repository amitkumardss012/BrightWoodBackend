"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gallery = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const GallerySchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    image: {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
    },
}, { timestamps: true });
exports.Gallery = mongoose_1.default.model("gallery", GallerySchema);
