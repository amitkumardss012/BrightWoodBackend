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
const admin_1 = require("../services/admin");
const jwt_1 = require("../services/jwt");
const types_1 = require("../types/types");
const ErrorClass_1 = __importDefault(require("../utils/ErrorClass"));
const error_1 = require("./error");
const isAdmin = (0, error_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const token = ((_b = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split("Bearer ")[1]) === null || _b === void 0 ? void 0 : _b.trim()) ||
        ((_d = (_c = req.headers.cookie) === null || _c === void 0 ? void 0 : _c.split("=")[1]) === null || _d === void 0 ? void 0 : _d.trim());
    if (!token) {
        return next(new ErrorClass_1.default("you are not authorized", types_1.statusCode.Unauthorized));
    }
    const decoded = jwt_1.jwtService.verifyToken(token);
    const admin = yield admin_1.AdminService.getAdminById(decoded.id);
    if (!admin) {
        return next(new ErrorClass_1.default("you are not authorized as admin", types_1.statusCode.Not_Found));
    }
    req.admin = admin;
    next();
}));
exports.default = isAdmin;
