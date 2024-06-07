import { z } from "zod";

export const signupSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(255,{ message: "Name must be at most 255 characters long"}),

    email: z
    .string({ required_error: "Email is required"})
    .trim()
    .email({ message: "Please enter a valid email address" })
    .min(3, { message: "Email must be at least 3 characters long" })
    .max(255,{ message: "Email must be at most 255 characters long"}),

    password: z
   .string({ required_error: "Password is required" })
   .min(7,{ message: "Password must be at least 7 characters long"})
   .max(1024,{ message: "Password must be at most 1024 characters long"})
});

