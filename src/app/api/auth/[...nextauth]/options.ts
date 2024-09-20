import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { signinSchema } from "@/schemas/SignInSchema";
import UserModel from "@/models/user.model";
import { dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs"


export const authOptions:AuthOptions={
    providers: [
        CredentialsProvider({
          name: 'Credentials',
          id:"Credentials",
          credentials: {
            identifier: { label: "identifier", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials):Promise<any> {
            await dbConnect()
            try {
    
              const { identifier, password } = await signinSchema.parseAsync(credentials) // data from frontend
    
              const user=await UserModel.findOne({$or:[{email:identifier},{username:identifier}]})
              if (!user) {
                throw new Error("user not found")
              }
              const isPasswordCorrect= await bcrypt.compare(password,user.password)
    
              if (!isPasswordCorrect) {
                throw new Error("password is invalid")
              }
     
              // return JSON object with the user data
              return user
            } catch (error) {
              console.log(error);
              Response.json({success:false,message:"could not signin "})
             
            }

          }
        })
      ],
      callbacks: {
        async jwt({ token, user }) {
          if(user){
            token._id=user?.id
            token.email=user?.email 
            token.username=user.username
          }
          return token
        },
      
        async session({ session, token }){
          // Custom session callback logic
          if(token){
            session.user._id=token._id
            session.user.email=token.email 
            session.user.username=token?.username 
    
          }
          return session
        },
       
      },
      session:{
        strategy:"jwt"
      },
      pages:{
        signIn:"/signin"
      },
      secret:process.env.NEXT_AUTH_SECRET
}