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
exports.adminLogout = exports.deletAdmin = exports.getAllAdmin = exports.adminLogin = exports.createAdmin = void 0;
const error_1 = require("../middlewares/error");
const admin_1 = require("../services/admin");
const jwt_1 = require("../services/jwt");
const types_1 = require("../types/types");
const ErrorClass_1 = __importDefault(require("../utils/ErrorClass"));
const admin_2 = require("../zod/admin");
const bcrypt_1 = __importDefault(require("bcrypt"));
// Create Admin Controller
exports.createAdmin = (0, error_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role } = admin_2.adminSchema.parse(req.body);
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const adminExists = yield admin_1.AdminService.getAdminByEmail(email);
    if (adminExists)
        return next(new ErrorClass_1.default("Admin already exists", types_1.statusCode.Conflict));
    const admin = yield admin_1.AdminService.createAdmin({
        name,
        email,
        password: hashedPassword,
        role,
    });
    return res
        .status(types_1.statusCode.OK)
        .json({ success: true, messsage: "Admin created successfully", admin });
}));
// Admin Login Controller
exports.adminLogin = (0, error_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password)
        return next(new ErrorClass_1.default("email and password are required", types_1.statusCode.Bad_Request));
    const admin = yield admin_1.AdminService.getAdminByEmail(email);
    if (!admin) {
        return next(new ErrorClass_1.default("Invalid email", types_1.statusCode.Unauthorized));
    }
    const isPasswordValid = yield bcrypt_1.default.compare(password, admin.password);
    if (!isPasswordValid) {
        return next(new ErrorClass_1.default("Invalid password", types_1.statusCode.Unauthorized));
    }
    const token = jwt_1.jwtService.generateToken(admin._id.toString());
    return res
        .status(types_1.statusCode.OK)
        .header("Authorization", `Bearer ${token}`)
        .cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production",
    })
        .json({
        success: true,
        message: "Admin logged in successfully",
        admin: Object.assign(Object.assign({}, admin.toObject()), { password: undefined }),
        token,
    });
}));
// Get All Admin Controller
exports.getAllAdmin = (0, error_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allAdmin = yield admin_1.AdminService.getAllAdmin();
    return res
        .status(types_1.statusCode.OK)
        .json({ success: true, message: "All Admins", admin: allAdmin });
}));
// Delete Admin Controller
exports.deletAdmin = (0, error_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        return next(new ErrorClass_1.default("Admin id is required", types_1.statusCode.Bad_Request));
    const admin = yield admin_1.AdminService.deleteAdmin(id);
    if (!admin)
        return next(new ErrorClass_1.default("Admin not found", types_1.statusCode.Not_Found));
    return res
        .status(types_1.statusCode.OK)
        .json({ success: true, message: "Admin deleted successfully" });
}));
// Admin Logout Controller
exports.adminLogout = (0, error_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res
        .status(types_1.statusCode.OK)
        .clearCookie("token")
        .json({ success: true, message: "Admin logged out successfully" });
}));
