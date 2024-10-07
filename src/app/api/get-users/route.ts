import { auth } from "@/auth";
import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/models/user.model";

export async function GET(request:Request){

    await dbConnect()
    type userT={
        _id:string,
        email:string,
        username:string
    }

    const session=await auth() // this requires the authoptions

        const user=session?.user as userT

        if (!user) {

            return Response.json({success:false, message:"please login"})

        }

    try {

        const users=await UserModel.find()
        console.log(users);


        if(users.length <0){
            console.log("users not found");

            return Response.json({success:false, message:"could not find users"})

        }
        console.log(users);

        return Response.json({success:true, message:"users found", data:users})


    } catch (error:any) {
        return Response.json({success:false, message:error?.message})


    }




}