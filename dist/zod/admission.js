"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.admissionValidationSchema = void 0;
const zod_1 = require("zod");
exports.admissionValidationSchema = zod_1.z.object({
    firstname: zod_1.z
        .string({
        required_error: "First name is required",
    })
        .max(50, "First name cannot exceed 50 characters"),
    lastname: zod_1.z
        .string({
        required_error: "Last name is required",
    })
        .max(50, "Last name cannot exceed 50 characters").optional(),
    email: zod_1.z
        .string({
        required_error: "Email is required",
    })
        .email("Invalid email format"),
    phone: zod_1.z
        .string({
        required_error: "Phone number is required",
    })
        .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
    gradeLevelApplyingFor: zod_1.z
        .string({
        required_error: "Grade level is required",
    })
        .max(30, "Grade level cannot exceed 30 characters"),
    currentSchool: zod_1.z
        .string({
        required_error: "Current school is required",
    })
        .max(100, "Current school cannot exceed 100 characters"),
});
