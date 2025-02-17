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
exports.AdminService = void 0;
const admin_1 = __importDefault(require("../models/admin"));
class AdminService {
    static createAdmin(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield admin_1.default.create(data);
            return admin;
        });
    }
    static getAdminByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield admin_1.default.findOne({ email });
            return admin;
        });
    }
    static getAdminById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield admin_1.default.findById(id);
            return admin;
        });
    }
    static getAllAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield admin_1.default.find();
            return admin;
        });
    }
    static getAdminOriginalPassword(adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield admin_1.default.findById(adminId);
            return admin ? admin.password : null;
        });
    }
    static deleteAdmin(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield admin_1.default.findByIdAndDelete(id);
            return admin;
        });
    }
}
exports.AdminService = AdminService;
