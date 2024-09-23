import NextAuth, { type DefaultSession } from "next-auth"
import {Message} from "@/schemas/UserSchema"
import { JWT } from "next-auth/jwt"
import nextauth from "next-auth"

 
declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    username:string,
    email:string,
    password:string,
    verifyCode:string,
    verifyCodeExpiry:Date,
    isVerified:boolean,
    isAcceptingMessage:boolean,
    messages:Message[]
  }
 
  interface Session {
    user:{
      _id?:string
      email?:string,
      username?:string,
      isAcceptingMessage:boolean,
    }

  }

  
}
 

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    _id?:string
    email?:string,
    username?:string,
    isAcceptingMessage:boolean,

}
  }
