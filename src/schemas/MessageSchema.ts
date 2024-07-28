import {z} from "zod"

export const messageSchema=z.object({
    content:z.string()
    .min(4,"message should be min 4 characters ")
    .max(300,"message max should be 300 characters")
    
})