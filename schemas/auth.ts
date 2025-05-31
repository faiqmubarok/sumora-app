import { z } from "zod";

export const emailSchema = z
  .string({
    required_error: "Email is required",
  })
  .min(1, "Email is required")
  .email("Email is invalid");

export const passwordSchema = z
  .string({
    required_error: "Password is required",
  })
  .min(6, "Password must be at least 6 characters")
  .max(32, "Password must not exceed 32 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character"
  );
