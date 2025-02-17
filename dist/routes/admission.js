"use strict";
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
const express_1 = require("express");
const error_1 = require("../middlewares/error");
const admission_1 = require("../zod/admission");
const admission_2 = __importDefault(require("../models/admission"));
const types_1 = require("../types/types");
const ErrorClass_1 = __importDefault(require("../utils/ErrorClass"));
const admission = (0, express_1.Router)();
admission.post("/apply", (0, error_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, email, phone, gradeLevelApplyingFor, currentSchool, } = admission_1.admissionValidationSchema.parse(req.body);
    const existingAdmission = yield admission_2.default.findOne({ email });
    if (existingAdmission) {
        return next(new ErrorClass_1.default("An admission with this email already exists", types_1.statusCode.Bad_Request));
    }
    // Create a new admission record
    const admission = new admission_2.default({
        firstname,
        lastname,
        email,
        phone,
        gradeLevelApplyingFor,
        currentSchool,
    });
    yield admission.save();
    // Return success response
    res.status(201).json({
        success: true,
        message: "Admission application submitted successfully",
        admission,
    });
})));
admission.get("/all", (0, error_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const admissions = yield admission_2.default.find().sort({ createdAt: -1 }); // Sort by latest
    if (!admissions || admissions.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No admissions found",
        });
    }
    // Return response
    res.status(200).json({
        success: true,
        count: admissions.length,
        admissions,
    });
})));
exports.default = admission;
