import { z } from "zod";

const titleValidation = z
    .string()
    .min(10, { message: "Title must be at least 10 characters long." })
    .max(50, { message: "Title must be less than 50 characters long." })
    .regex(/^[a-zA-Z0-9 ]+$/, { message: "Title must only contain alphabetic characters and spaces." });

const MAX_FILE_SIZE = 5 * 1024 * 1024; 
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const addProductSchema = z.object({
    title: titleValidation,
    description: z
        .string()
        .min(100, { message: "Description must be at least 100 characters long." })
        .max(900, { message: "Description must be less than 900 characters long." }),
    price: z.string().nonempty({ message: "Price is required." }),
    category: z.string().nonempty({ message: "Category is required." }),
    stock: z.string().nonempty({ message: "Stock is required." }),
    image: z
        .any()
        .refine((files) => {
            return files?.length >=1}, { message: "One image is required." })
        .refine(
            (files) => files?.[0]?.size <= MAX_FILE_SIZE,
            { message: "Max file size is 5MB." }
        )
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            { message: ".jpg, .jpeg, .png, and .webp formats are accepted." }
        ),
    color: z.string().nonempty({ message: "Color is required." }),
});
