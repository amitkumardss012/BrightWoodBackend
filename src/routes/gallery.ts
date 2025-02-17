import { Router } from "express";
import { deleteGallery, getAllGalleryImages, uploadGallery } from "../controllers/gallery";
import { multerUpload } from "../middlewares/multer";

const gallery = Router();

gallery.post("/create", multerUpload.single("image"), uploadGallery);
gallery.delete("/delete/:id", deleteGallery);
gallery.get("/all", getAllGalleryImages);

export default gallery;