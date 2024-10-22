import {z} from "zod"

export const userNameValidation=z
    .string()
    .min(2,"min 2 words")
    .max(20,"max 20")
    .regex(/^[a-zA-Z0-9]*$/
,"No special character")

export const signUpSchema=z.object({
    userName:userNameValidation,
    email: z.string().email({message:"invalid"}),
    password: z.string().min(6,{message:"min 6 characters"})


})

