"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../utils/env");
class jwtService {
    static generateToken(id) {
        const token = jsonwebtoken_1.default.sign({ id }, env_1.env.jwtSecret, { expiresIn: '5d' });
        return token;
    }
    static verifyToken(token) {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.env.jwtSecret);
        return decoded;
    }
}
exports.jwtService = jwtService;
