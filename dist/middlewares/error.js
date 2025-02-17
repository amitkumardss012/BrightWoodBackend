"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = exports.errorMiddleware = void 0;
const zod_1 = require("zod");
const types_1 = require("../types/types");
const errorMiddleware = (err, req, res, next) => {
    err.message || (err.message = "Internal Server Error");
    err.statusCode || (err.statusCode = 500);
    if (err.name === "CastError")
        err.message = "Invalid ID";
    // handle Zod error
    if (err instanceof zod_1.ZodError) {
        const zodErr = zodError(err);
        res.status(types_1.statusCode.Bad_Request).json({
            success: false,
            message: "Validation Error",
            errors: zodErr,
        });
    }
    else {
        // Final Error Response
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }
};
exports.errorMiddleware = errorMiddleware;
const zodError = (error) => {
    let errors = {};
    error.errors.map((issue) => {
        var _a;
        const path = (_a = issue.path) === null || _a === void 0 ? void 0 : _a[0];
        if (path)
            errors[path] = issue.message;
    });
    return errors;
};
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
exports.asyncHandler = asyncHandler;
