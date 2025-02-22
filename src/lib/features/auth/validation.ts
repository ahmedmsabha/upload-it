import * as z from "zod";
import type { FormType } from "./types";

export const authFormSchema = (type: FormType) => {
  return z.object({
    email: z
      .string()
      .trim()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email address" })
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
        message: "Invalid email address",
      }),
    fullName:
      type === "sign-up"
        ? z
            .string()
            .trim()
            .min(2, { message: "Full name is required" })
            .max(50, { message: "Full name must be less than 50 characters" })
        : z.string().optional(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  });
};
