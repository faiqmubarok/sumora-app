import { emailSchema } from "@/schemas/auth";
import { nameSchema, phoneSchema, photoSchema } from "@/schemas/profile";
import { z } from "zod";

export const editFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  photo: photoSchema,
});

export type EditFormSchema = z.infer<typeof editFormSchema>;
