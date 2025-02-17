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
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseForm = void 0;
// src/utils/formidableMiddleware.ts
const formidable_1 = require("formidable");
const parseForm = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const form = new formidable_1.IncomingForm({ maxFileSize: 2 * 1024 * 1024 }); // Max file size: 2MB
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err)
                return reject(err);
            resolve({ fields, files });
        });
    });
});
exports.parseForm = parseForm;
