import { z } from "zod";


export const verifySchema = z.object({
    email: z.string().email({message:"Invalid email address"}),
    code: z.string().length(6,"Verification must be 6 digits")
})