"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GallerySchema = void 0;
const zod_1 = require("zod");
exports.GallerySchema = zod_1.z.object({
    title: zod_1.z
        .string({ required_error: "Title is required" })
        .min(1, "Title is required")
        .max(100, "Title is too long"),
});
