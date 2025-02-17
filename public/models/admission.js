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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Admission Schema
const admissionSchema = new mongoose_1.Schema({
    firstname: {
        type: String,
        required: [true, "First name is required"],
        trim: true,
        maxlength: [50, "First name cannot exceed 50 characters"],
    },
    lastname: {
        type: String,
        trim: true,
        maxlength: [50, "Last name cannot exceed 50 characters"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Please provide a valid email address",
        ],
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        match: [/^\d{10,15}$/, "Phone number must be between 10 and 15 digits"],
    },
    gradeLevelApplyingFor: {
        type: String,
        required: [true, "Grade level is required"],
    },
    currentSchool: {
        type: String,
        required: [true, "Current school is required"],
        trim: true,
    },
}, {
    timestamps: true,
});
const Admission = mongoose_1.default.model("Admission", admissionSchema);
exports.default = Admission;
