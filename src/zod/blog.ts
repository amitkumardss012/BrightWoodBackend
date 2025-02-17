import { z } from "zod";

export const blogValidationSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .max(100, "Title cannot exceed 100 characters"),
  heading: z
    .string({
      required_error: "Heading is required",
    })
    .max(150, "Heading cannot exceed 150 characters"),
  content: z
    .string({
      required_error: "Content is required",
    })
    .min(10, "Content must be at least 10 characters long"),
  author: z
    .string({
      required_error: "Author is required",
    })
    .min(3, "Author name must be at least 3 characters long"),
  image: z.object({
    mimetype: z.string().refine((val) => val.startsWith("image/"), {
      message: "File must be an image",
    }),
    size: z.number().max(2 * 1024 * 1024, "File size must be less than 2MB"),
  },{required_error: 'Image is required'}),
});
