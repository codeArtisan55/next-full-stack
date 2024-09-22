import NextAuth, { CredentialsSignin } from "next-auth"
import CredentialProvider from "next-auth/providers/credentials"
import { dbConnect } from "./lib/dbConnect"
import { signinSchema } from "./schemas/SignInSchema"
import UserModel from "./models/user.model"
import bcrypt from "bcryptjs"
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialProvider({
        name:"credentials",
        credentials:{
            identifier:{name:"identif", type:"text"},
            password:{name:"password", type:"text"}

        },
        authorize: async (credentials) => {

            await dbConnect()


              const {password } = await signinSchema.parseAsync(credentials) // data from frontend
              // const { identifier, password } =await credentials // data from frontend

              const User=await UserModel.findOne({$or:[{email:credentials.identifier},{username:credentials.identifier}]})
              if (!User) {
                throw new CredentialsSignin("User no found")
              }
              const isPasswordCorrect=await bcrypt.compare(password,User.password).then((res)=>{
                return res
              })

              if (!isPasswordCorrect) {
                throw new CredentialsSignin("password is invalid")
              }

              // return JSON object with the User data and also the data which you want to store in session
              if(User){
                  return User
              }
              else{
                return null
              }


            // return User object with their profile data
          },
    }
    )
  ],
  callbacks:{
    async jwt({ token,user }) {
        // Persist the OAuth access_token to the token right after signin
        if (user) {
          token._id=user.id,
          token.email=user.email as string
          token.username=user.username
          token.isAcceptingMessage=user.isAcceptingMessage
        }
        return token
      },
      async session({ session, token }) {
        // Send properties to the client, like an access_token from a provider.
        if(token){
            session.user._id=token._id
            session.user.username=token.username as string
            session.user.email=token.email as string
            session.user.isAcceptingMessage=token.isAcceptingMessage as boolean
        }
        return session
      }

  },
  pages:{
    signIn:'/signin',
  },
  session:{
    strategy:'jwt',
    maxAge:30 * 24 * 60 * 60, // 30 days
    updateAge:24 * 60 * 60, // 24 hours
  },
  trustHost:true,
  secret:process.env.AUTH_SECRET,
})