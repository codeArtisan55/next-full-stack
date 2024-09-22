import UserModel from "@/models/user.model";
import { dbConnect } from "@/lib/dbConnect";
import { auth } from "@/auth";

export async function POST(request:Request){ // this post method is to update user isAccepting messages status
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

        return Response.json({success:false, message:"user not found"},{status:400})

        }

        const userId=user._id
        const {acceptingMessages}=await request.json()

        const updatedUser=await UserModel.findByIdAndUpdate(userId,{isAcceptingMessage:acceptingMessages}, {new:true})
        if (!updatedUser) {
            console.log("failed to update user accept messages");
            return Response.json({success:false, message:"could not update acceptmessages"},{status:401})

        }
        return Response.json({success:true, message:"user messages updated successfully",updatedUser},{status:200})





    } catch (error) {
        console.log("failed to update user accept messages");
        return Response.json({success:false, message:"something went wrong"})

    }

}

export async function GET(request:Request){
    type userT={
        _id:string,
        email:string,
        username:string
    }

    try {
        const session=await auth() // this requires the authoptions
        const user=session?.user as userT
        if (!session && !user) {

        return Response.json({success:false, message:"user not found"},{status:400})

        }

        const userId=user._id
        const foundUser=await UserModel.findById(userId)
        if (!foundUser) {
            console.log("user not found");
            return Response.json({success:false, message:"couldnot find user"})

        }
        return Response.json({success:true,isAcceptingMessage:foundUser.isAcceptingMessage})
    } catch (error) {
        console.log("failed to update user accept messages");
        return Response.json({success:false, message:"couldnot found user"})


    }
}