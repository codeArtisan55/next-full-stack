import mongoose,{Schema,Document} from "mongoose"  // Document is for , typescript , typesafety


export interface Message extends Document{
    content:string,
    createdAt:Date

}

const messageSchema:Schema<Message>=new Schema({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    }
})

export interface User extends Document{
    username:string,
    email:string,
    password:string,
    verifyCode:string,
    verifyCodeExpiry:Date,
    isVerified:boolean,
    isAcceptingMessage:boolean,
    messages:Message[]


}

const userSchema:Schema<User>=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    
    email:{
        type:String,
        required:true,
        unique:true,
    },
    
    password:{
        type:String,
        required:true,
    },
    verifyCode:{
        type:String
    },
    verifyCodeExpiry:{
        type:Date,
    },
    isAcceptingMessage:{
        type:Boolean,
        default:true
    },
    
    isVerified:{
        type:Boolean,
        default:false,
    },
    

    messages:[messageSchema]
    
},{timestamps:true})


const UserModel=(mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",userSchema)
// const UserModel=mongoose.model<User>("User",userSchema)

export default UserModel