"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.newsSchema = zod_1.default.object({
    title: zod_1.default
        .string({ required_error: "Title is required" })
        .min(5, { message: "Title must be at least 5 characters" }).trim()
        .refine((value) => value.trim() !== "", { message: "Title is required" }),
    pdfLink: zod_1.default
        .string({ required_error: "PDF link is required" })
        .min(5, { message: "PDF link must be at least 5 characters" }).trim()
        .refine((value) => value.trim() !== "", {
        message: "PDF link is required",
    }),
    date: zod_1.default
        .string({ required_error: "Date is required" })
        .regex(/^\d{2}\/\d{2}\/\d{4}$/, { message: "Date must follow the format DD/MM/YYYY" } // Regex for date format
    )
        .refine((value) => value.trim() !== "", { message: "Date is required" }),
});
