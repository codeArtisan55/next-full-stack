import {z} from "zod"

export const AcceptmessageSchema=z.object({
    isAcceptingMessage:z.boolean()
})