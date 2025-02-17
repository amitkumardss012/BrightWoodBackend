"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const newsSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    pdfLink: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
}, { timestamps: true });
const News = (0, mongoose_1.model)("News", newsSchema);
exports.default = News;
