import { z } from "zod";

export const usernameValidation = z
    .string()
    .min(2, "Username must be at least two characters")
    .max(20, "Username must be less than twenty characters")
    .regex(/^[a-zA-Z ]+$/, "Username must only contain alphabetic characters and spaces");



export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message:"Invalid email address"}),
    password: z.string().min(6,{message:"Password Must be atleast 6 characters"})
})