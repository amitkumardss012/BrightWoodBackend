"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.adminSchema = zod_1.default.object({
    name: zod_1.default
        .string({ required_error: "Name is required" })
        .trim()
        .nonempty("Name is required")
        .max(20, "Name must be at most 20 characters"),
    email: zod_1.default
        .string({ required_error: "Email is required" })
        .email("Invalid email")
        .nonempty("Email is required")
        .trim(),
    password: zod_1.default
        .string({ required_error: "Password is required" })
        .min(6, "Password must be at least 6 characters")
        .max(20, "Password must be at most 20 characters")
        .trim(),
    role: zod_1.default.enum(["admin", "sub-admin"]),
});
// .instanceof(File,{message:"Avatar is required"}).refine((file) => file instanceof Image, "Avatar must be a Image").refine((file) => file.size <= 2* 1024 * 1024, "Avatar size must be less than 2MB"),
