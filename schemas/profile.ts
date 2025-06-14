import { z } from "zod";

export const nameSchema = z
  .string()
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name must not exceed 50 characters")
  .nullable()
  .optional();

export const phoneSchema = z
  .string()
  .min(10, "Phone number must be at least 10 characters")
  .max(15, "Phone number must not exceed 15 characters")
  .nullable()
  .optional();

export const photoSchema = z
  .union([
    z.object({
      uri: z.string().url("Invalid image URI"),
      type: z.string(),
      name: z.string(),
    }),
    z.string().url("Invalid image URL"),
  ])
  .optional();
