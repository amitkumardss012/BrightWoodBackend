import z from "zod";

export const adminSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .nonempty("Name is required")
    .max(20, "Name must be at most 20 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email")
    .nonempty("Email is required")
    .trim(),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters")
    .trim(),
  role: z.enum(["admin", "sub-admin"]),
});

export type AdminType = z.infer<typeof adminSchema>;

// .instanceof(File,{message:"Avatar is required"}).refine((file) => file instanceof Image, "Avatar must be a Image").refine((file) => file.size <= 2* 1024 * 1024, "Avatar size must be less than 2MB"),
