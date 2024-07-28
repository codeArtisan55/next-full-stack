import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import UserModel from "@/models/user.model";
import { dbConnect } from "@/lib/dbConnect";


providers: [

    CredentialsProvider({
        name: "Credentials",
        id:"Credentials",
        credentials: {
            email: { label: "email", type: "text" },
            password: { label: "Password", type: "password" }
          },

        async authorize():Promise<any>{


        }
    
    })
]