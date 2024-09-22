import UserModel from "@/models/user.model";
import { dbConnect } from "@/lib/dbConnect";
import mongoose from "mongoose";
import { auth } from "@/auth";


export async  function GET(request:Request){
    await dbConnect()
    type userT={
        _id:string,
        email:string,
        username:string
    }

    try {
        const session=await auth() // this requires the authoptions
        const user=session?.user as userT

        if (!session && !user) {
            console.log("user not found");

            return Response.json({success:false, message:"could not fetch messages"})

        }
        const userId= new mongoose.Types.ObjectId( user._id) // this method will convert userid string to mongodb Objectid

        const userMessages=await UserModel.aggregate([
            {$match:{_id:userId}}, // match id and get user
            {$unwind:'$messages'}, // separate messages
            {$sort:{"messages.createdAt": -1}},
            {$group:{_id:"$_id", messages:{$push:"$messages"}}}
        ])


        return Response.json({success:true, message:"showing all messages",messages:userMessages})


    } catch (error) {
        console.log("user not found");

        return Response.json({success:false, message:"could not fetch messages"})

    }

}