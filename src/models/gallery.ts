import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export const Gallery = mongoose.model("gallery", GallerySchema);
