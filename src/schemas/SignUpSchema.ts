import {z} from "zod"


export const usernameValidation=z.string()
.min(4,"username must be 4 character")
.max(15,"usernmae must be 15 character")
.regex(/^[a-zA-Z0-9]+$/,"username must not contain any symbol")

export const signupSchema=z.object({
    username:usernameValidation,
    email:z.string().email({message:"invalid email address"}),
    password:z.string().min(5,"password should be minimum 5 character")
})