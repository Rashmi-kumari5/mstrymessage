import {z} from "zod"


// export const verifyScheme=z.object({
//     code: z.string().length(6,"code must be of 6 digitd.")
// })

export const signInScheme=z.object({
    Identifier: z.string(),
    password: z.string()
})


