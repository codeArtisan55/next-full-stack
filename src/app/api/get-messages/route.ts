import UserModel from "@/models/user.model";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../auth/[...nextauth]/options";
import { dbConnect } from "@/lib/dbConnect";
import mongoose from "mongoose";


export async  function GET(request:Request){
    await dbConnect()

    try {
        const session=await getServerSession(nextAuthOptions) //to check is user is logges in or not
        const user=session?.user

        if (!session && !user) {
            console.log("user not found");
            
            return Response.json({success:false, message:"could not fetch messages"})
            
        }
        const userId= new mongoose.Schema.ObjectId( user._id) // this method will convert userid string to mongodb Objectid

        const userMessages=await UserModel.aggregate([
            {$match:{_id:userId}}, // match id and get user
            {$unwind:'$messages'}, // separate messages 
            {$sort:{"messages.createdAt": -1}},
            {$group:{_id:"$_id", messages:{$push:"$messages"}}}
        ])
        
        
    } catch (error) {
        console.log("user not found");
            
        return Response.json({success:false, message:"could not fetch messages"})
        
    }

}