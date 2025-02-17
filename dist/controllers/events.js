"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getEventById = exports.getUpcomingEvents = exports.getPastEvents = exports.getAllEvents = exports.deleteEvent = exports.createEvent = void 0;
const cloudinary_1 = __importStar(require("../config/cloudinary"));
const error_1 = require("../middlewares/error");
const events_1 = __importDefault(require("../models/events"));
const types_1 = require("../types/types");
const ErrorClass_1 = __importDefault(require("../utils/ErrorClass"));
const events_2 = require("../zod/events");
exports.createEvent = (0, error_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, date, time, location, description } = events_2.eventValidationSchema.parse(Object.assign(Object.assign({}, req.body), { image: req.file }));
    const image = req.file;
    if (!image)
        return next(new ErrorClass_1.default("Image is required.", types_1.statusCode.Bad_Request));
    const cloudinaryResult = yield (0, cloudinary_1.uploadToCloudinary)(image.buffer, "school-images");
    const newEvent = new events_1.default({
        title,
        date,
        time,
        location,
        description,
        image: {
            public_id: cloudinaryResult.public_id,
            url: cloudinaryResult.url,
        },
    });
    yield newEvent.save();
    return res.status(types_1.statusCode.Created).json({
        message: 'Event created successfully.',
        event: newEvent,
    });
}));
exports.deleteEvent = (0, error_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const eventToDelete = yield events_1.default.findById(id);
    if (!eventToDelete) {
        return next(new ErrorClass_1.default("Event not found", types_1.statusCode.Not_Found));
    }
    const cloudinaryResult = yield cloudinary_1.default.uploader.destroy(eventToDelete.image.public_id);
    if (cloudinaryResult.result !== "ok") {
        return next(new ErrorClass_1.default("Failed to delete image from Cloudinary", types_1.statusCode.Internal_Server_Error));
    }
    yield events_1.default.findByIdAndDelete(id);
    return res.status(200).json({
        message: "Event deleted successfully.",
        deletedEvent: eventToDelete,
    });
}));
exports.getAllEvents = (0, error_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const events = yield events_1.default.find().sort({ date: 1 }); // Sort by event date (earliest first)
    res.status(200).json({
        success: true,
        count: events.length,
        events,
    });
}));
exports.getPastEvents = (0, error_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date(); // Current date and time
    const pastEvents = yield events_1.default.find({ date: { $lt: today } }).sort({ date: -1 }); // Sort by date descending
    res.status(200).json({
        success: true,
        count: pastEvents.length,
        events: pastEvents,
    });
}));
exports.getUpcomingEvents = (0, error_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date(); // Current date and time
    const upcomingEvents = yield events_1.default.find({ date: { $gte: today } }).sort({ date: 1 }); // Sort by date ascending
    res.status(200).json({
        success: true,
        count: upcomingEvents.length,
        events: upcomingEvents,
    });
}));
exports.getEventById = (0, error_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return next(new ErrorClass_1.default("Event ID is required", types_1.statusCode.Bad_Request));
    }
    const event = yield events_1.default.findById(id);
    if (!event) {
        return next(new ErrorClass_1.default("Event not found", types_1.statusCode.Not_Found));
    }
    res.status(200).json({
        success: true,
        event,
    });
}));
