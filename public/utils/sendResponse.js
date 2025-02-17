"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, statusCode, success, message, data) => {
    res.status(statusCode).json({ success, message, data });
};
exports.sendResponse = sendResponse;
class SendResponse {
    constructor(res, statusCode, success, message, data = null) {
        this.data = null;
        this.res = res;
        this.statusCode = statusCode;
        this.success = success;
        this.message = message;
        this.data = data;
    }
}
