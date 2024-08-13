import UserModel from "@/models/user.model";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../auth/[...nextauth]/options";
import { dbConnect } from "@/lib/dbConnect";
import mongoose from "mongoose";
import { Message } from "@/models/user.model";


export async  function POST(request:Request){
    await dbConnect()

    try {
        const session=await getServerSession(nextAuthOptions) //to check is user is logges in or not
        const userSession=session?.user

        if (!session && !userSession) {
            console.log("user not found");
            
            return Response.json({success:false, message:"could not fetch messages"})
            
        }
        const {username,content}=await request.json()
        const user=await UserModel.findOne({username})
        if (!user) {
            console.log("user not found");
            
            return Response.json({success:false, message:"could not find user"})
        }

        if (!user.isAcceptingMessage) {
            console.log("user not found");
            
            return Response.json({success:false, message:"user is not accepting messages"},{status:401})
        }
          const newMessage={content,createdAt:new Date()}
        user.messages.push(newMessage as Message) // this is assertion
        await user.save()
            
        return Response.json({success:true, message:"messages sent"},{status:200})

            
        }
        
        
     catch (error) {
        console.log("couldnot send messages");
            
        return Response.json({success:false, message:"could not send messages"})
        
    }
}

