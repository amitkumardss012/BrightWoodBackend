import z from "zod";

export const newsSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(5, { message: "Title must be at least 5 characters" }).trim()
    .refine((value) => value.trim() !== "", { message: "Title is required" }),

  pdfLink: z
    .string({ required_error: "PDF link is required" })
    .min(5, { message: "PDF link must be at least 5 characters" }).trim()
    .refine((value) => value.trim() !== "", {
      message: "PDF link is required",
    }),

  date: z
    .string({ required_error: "Date is required" })
    .regex(
      /^\d{2}\/\d{2}\/\d{4}$/,
      { message: "Date must follow the format DD/MM/YYYY" } // Regex for date format
    )
    .refine((value) => value.trim() !== "", { message: "Date is required" }),
});

export type NewsType = z.infer<typeof newsSchema>;
