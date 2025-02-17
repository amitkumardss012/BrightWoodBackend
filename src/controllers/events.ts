import cloudinary, { uploadToCloudinary } from "../config/cloudinary";
import { asyncHandler } from "../middlewares/error";
import Event from "../models/events";
import { statusCode } from "../types/types";
import ErrorHandler from "../utils/ErrorClass";
import { eventValidationSchema } from "../zod/events";

export const createEvent = asyncHandler(async (req, res, next) => {
    const { title, date, time, location, description } = eventValidationSchema.parse({
        ...req.body,
        image: req.file,
      });

      const image = req.file;
  
      if (!image) return next(new ErrorHandler("Image is required.", statusCode.Bad_Request));
      const cloudinaryResult = await uploadToCloudinary(image.buffer, "school-images");
  
      const newEvent = new Event({
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
  
      await newEvent.save();
  
      return res.status(statusCode.Created).json({
        message: 'Event created successfully.',
        event: newEvent,
      });
});

export const deleteEvent = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const eventToDelete = await Event.findById(id);
  
  if (!eventToDelete) {
    return next(new ErrorHandler("Event not found", statusCode.Not_Found));
  }

  const cloudinaryResult = await cloudinary.uploader.destroy(eventToDelete.image.public_id);
  
  if (cloudinaryResult.result !== "ok") {
    return next(new ErrorHandler("Failed to delete image from Cloudinary", statusCode.Internal_Server_Error));
  }
  await Event.findByIdAndDelete(id);

  return res.status(200).json({
    message: "Event deleted successfully.",
    deletedEvent: eventToDelete,
  });
});


export const getAllEvents = asyncHandler(async (req, res, next) => {
  const events = await Event.find().sort({ date: 1 }); // Sort by event date (earliest first)

  res.status(200).json({
    success: true,
    count: events.length,
    events,
  });
});


export const getPastEvents = asyncHandler(async (req, res, next) => {
  const today = new Date(); // Current date and time
  const pastEvents = await Event.find({ date: { $lt: today } }).sort({ date: -1 }); // Sort by date descending

  res.status(200).json({
    success: true,
    count: pastEvents.length,
    events: pastEvents,
  });
});


export const getUpcomingEvents = asyncHandler(async (req, res, next) => {
  const today = new Date(); // Current date and time
  const upcomingEvents = await Event.find({ date: { $gte: today } }).sort({ date: 1 }); // Sort by date ascending
  
  res.status(200).json({
    success: true,
    count: upcomingEvents.length,
    events: upcomingEvents,
  });
});

export const getEventById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new ErrorHandler("Event ID is required", statusCode.Bad_Request));
  }

  const event = await Event.findById(id);

  if (!event) {
    return next(new ErrorHandler("Event not found", statusCode.Not_Found));
  }

  res.status(200).json({
    success: true,
    event,
  });
});