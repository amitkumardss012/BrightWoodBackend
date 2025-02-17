"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("cloudinary"));
const env_1 = require("../utils/env");
cloudinary_1.default.v2.config({
    cloud_name: env_1.env.cloud_name, // Your Cloudinary cloud name
    api_key: env_1.env.cloud_api_key, // Your Cloudinary API key
    api_secret: env_1.env.cloud_api_secret, // Your Cloudinary API secret
});
