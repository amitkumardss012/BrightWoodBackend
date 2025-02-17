import { z } from "zod";

export const GallerySchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title is required")
    .max(100, "Title is too long"),
});

export type galleryType = z.infer<typeof GallerySchema>;
