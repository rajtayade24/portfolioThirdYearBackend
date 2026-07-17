import { z } from "zod";

const studentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name should be at least 3 characters")
    .max(30, "Name should be at most 30 characters"),

  email: z
    .string()
    .trim()
    .email("Email is invalid"),

  subject: z
    .string()
    .trim()
    .optional()
    .nullable()
    .default(""),

  message: z
    .string()
    .trim()
    .optional()
    .nullable()
    .default(""),

  mobileNumber: z
    .coerce
    .number()
    .int()
    .positive()
    .optional()
    .nullable(),

  rating: z
    .coerce
    .number()
    .int()
    .min(1, "Rating must be between 1 and 5")
    .max(5, "Rating must be between 1 and 5")
});

export { studentSchema };