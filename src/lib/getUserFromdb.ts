import mongoose from "mongoose";
import UserModel from "@/models/user.model";
import { dbConnect } from "./dbConnect";


export const getUserFromDb=async ({identifier}:{identifier:any})=>{
   await dbConnect()

    const user=await UserModel.findOne({$or:[{email:identifier},{username:identifier}]})
    if (!user) {
        return null
    }

    return user
}