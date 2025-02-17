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
exports.getAllNews = exports.deleteNews = exports.createNews = void 0;
const error_1 = require("../middlewares/error");
const news_1 = require("../services/news");
const types_1 = require("../types/types");
const ErrorClass_1 = __importDefault(require("../utils/ErrorClass"));
const sendResponse_1 = require("../utils/sendResponse");
const news_2 = require("../zod/news");
exports.createNews = (0, error_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, pdfLink, date } = news_2.newsSchema.parse(req.body);
    const news = yield news_1.NewsService.createNews({ title, pdfLink, date });
    (0, sendResponse_1.sendResponse)(res, types_1.statusCode.Created, true, "News created successfully", news);
}));
exports.deleteNews = (0, error_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        return next(new ErrorClass_1.default("News id is required", types_1.statusCode.Bad_Request));
    const news = yield news_1.NewsService.findNewsById(id);
    if (!news)
        return next(new ErrorClass_1.default("News not found", types_1.statusCode.Not_Found));
    yield news_1.NewsService.deleteNews(id);
    (0, sendResponse_1.sendResponse)(res, types_1.statusCode.OK, true, "News deleted successfully", news);
}));
exports.getAllNews = (0, error_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const news = yield news_1.NewsService.getAllNews();
    (0, sendResponse_1.sendResponse)(res, types_1.statusCode.OK, true, "News fetched successfully", news);
}));
