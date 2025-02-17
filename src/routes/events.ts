import { Router } from "express";
import { multerUpload } from "../middlewares/multer";
import { createEvent, deleteEvent, getAllEvents, getEventById, getPastEvents, getUpcomingEvents } from "../controllers/events";

const event = Router();

event.post("/create", multerUpload.single("image"), createEvent);
event.delete("/delete/:id", deleteEvent);
event.get("/all", getAllEvents)
event.get("/past", getPastEvents)
event.get("/upcoming", getUpcomingEvents)
event.get("/:id", getEventById)

export default event;