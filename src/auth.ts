import NextAuth from "next-auth"
import { ZodError } from "zod"
import Credentials from "next-auth/providers/credentials"
import { signinSchema } from "./schemas/SignInSchema"
import { dbConnect } from "./lib/dbConnect"
import {UserModel} from "@/models/user.model"
// Your own logic for dealing with plaintext password strings; be careful!

 
export const { handlers, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        identifier: { label: "identifier", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        await dbConnect()
        try {
 
          const { identifier, password } = await signinSchema.parseAsync(credentials) // data from frontend
 
 
          // return JSON object with the user data
          return user
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null
          }
        }
      },
    }),
  ],
})