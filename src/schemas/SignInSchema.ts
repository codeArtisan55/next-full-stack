import {z} from "zod"

export const signinSchema=z.object({
    identifier:z.string().email({message:"invalid email address"}),
    password:z.string()
})