import { auth } from "@/auth";
import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";




export async function DELETE(request:Request,params:{params:{messageid:string}}){
    await dbConnect()
    console.log(params.params.messageid);
    

    const session=await auth()
    const sessionUser=session?.user
    const messageId=new mongoose.Types.ObjectId(params.params.messageid)
    console.log( messageId);
    

    if(!session || !sessionUser){
        return NextResponse.json({
            success:false,
            message:"you are not authenticated"
        })

    }
    try {
        const user=await UserModel.updateOne(
            {_id:sessionUser._id},
            {$pull:{messages:{_id:messageId}}}
        )
    

        if (user.modifiedCount==0) {
            return NextResponse.json({
                success:false,
                message:"Oops! message couldnot be deleted"
            })

            
        }
        return NextResponse.json({
            success:true,
            message:"message deleted successfully"
        })

        
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"something went wrong ..."
        })
        
    }

}