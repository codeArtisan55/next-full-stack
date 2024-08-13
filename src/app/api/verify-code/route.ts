import UserModel from "@/models/user.model"
import { dbConnect } from "@/lib/dbConnect"


export async function POST(request:Request) {
    await dbConnect()

    try {
        const {username,code}=await request.json()

        const user=await UserModel.findOne({username})
        if (!user) {
        return Response.json({success:false, message:"user not found"})
            
        }

        const isCodeValid=code=== user?.verifyCode
        const isCodeNotExpired= new Date(user?.verifyCodeExpiry || '') > new Date()

        if(isCodeValid && isCodeNotExpired){

            user.isVerified=true
            user.verifyCode=''
            await user.save()
        return Response.json({success:true, message:"usr verified  successfully"})


        }else if(!isCodeNotExpired){
        return Response.json({success:false, message:"usr verification code expired"})

        }else{
        return Response.json({success:false, message:"invalid code"})

        }
        
    } catch (error) {
        return Response.json({success:false, message:"could not verify user", error:error})
        
    }
    
}