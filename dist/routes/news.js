"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const news_1 = require("../controllers/news");
const admin_1 = __importDefault(require("../middlewares/admin"));
const news = (0, express_1.Router)();
news.get("/all", news_1.getAllNews);
news.use(admin_1.default);
news.post("/create", news_1.createNews);
news.delete("/delete/:id", news_1.deleteNews);
exports.default = news;
