import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import UserModel from "@/models/user.model";
import bcrypt from "bcryptjs"
import { randomInt } from 'crypto';
import { sendEmail } from "@/utilities/verificationEmail";



export async function POST(request:Request) {

    await dbConnect()
    try {
        const {username,email,password}= await request.json()
        
    
        const existingUserByUsernameandVerified=await UserModel.findOne({username,isVerified:true})
    
    
        const existingUserByEmail=await UserModel.findOne({email})
        const otp = randomInt(100000, 999999).toString();
        
    
        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) { // if user is verified 
      return Response.json({success:false, message:"Email address is taken , use another email"})
                
            }else{ // email exists but not verified
            const hashedPassword=await bcrypt.hash(password,10)
            existingUserByEmail.password=hashedPassword
            existingUserByEmail.verifyCode=otp
            existingUserByEmail.verifyCodeExpiry=new Date(Date.now() + 3600000)

            }


            
        }else{
            const hashedPassword=await bcrypt.hash(password,10)
            const expiryDate=new Date()
            expiryDate.setHours(expiryDate.getHours()+1)
            

            const newUser=new UserModel({
                username:username,
                email:email,
                password:hashedPassword,
                verifyCode:otp,
                verifyCodeExpiry:expiryDate,
                isVerified:false,
                isAcceptingMessage:true,
                messages:[]
            })
            await newUser.save()
            
        }
      const emailResponse= await sendEmail(email ,username,otp)
      console.log(emailResponse);
      
      if (!emailResponse.success) {
      return Response.json({success:false, message:"verification email could not be send"})
        
      }
      return Response.json({success:true, message:"user registered successfully"})
    } catch (error) {
       return  Response.json({success:false, message:"user couldnot be registerd ", error})
        
    }
} 