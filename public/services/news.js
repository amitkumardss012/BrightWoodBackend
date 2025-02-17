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
exports.NewsService = void 0;
// src/services/newsService.ts
const news_1 = __importDefault(require("../models/news"));
// Service to handle news-related operations
class NewsService {
    static createNews(newsData) {
        return __awaiter(this, void 0, void 0, function* () {
            const news = yield news_1.default.create(newsData);
            return news;
        });
    }
    static deleteNews(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const news = yield news_1.default.findByIdAndDelete(id);
            return news;
        });
    }
    static findNewsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const news = yield news_1.default.findById(id);
            return news;
        });
    }
    static getAllNews() {
        return __awaiter(this, void 0, void 0, function* () {
            const news = yield news_1.default.find();
            return news;
        });
    }
}
exports.NewsService = NewsService;
