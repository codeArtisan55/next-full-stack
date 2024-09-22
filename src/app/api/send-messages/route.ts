import UserModel from "@/models/user.model";
import { dbConnect } from "@/lib/dbConnect";
import { Message } from "@/models/user.model";
import { auth } from "@/auth";


export async  function POST(request:Request){
    await dbConnect()
    type userT={
        _id:string,
        email:string,
        username:string
    }

    try {
        const session=await auth() // this requires the authoptions
        const userSession=session?.user as userT

        if (!session && !userSession) {
            console.log("user not found");

            return Response.json({success:false, message:"could not fetch messages"})

        }
        const {username,content}=await request.json()
        console.log(username,content);

        const user=await UserModel.findOne({username})
        if (!user) {
            console.log("user not found");
            return Response.json({success:false, message:"could not find user"})
        }

        if (!user.isAcceptingMessage) {

            return Response.json({success:false, message:"user is not accepting messages"},{status:401})
        }
          const newMessage={content:content.bio,createdAt:new Date()}
        user.messages.push(newMessage as Message) // this is assertion
        await user.save()

        return Response.json({success:true, message:"messages sent"},{status:200})


        }
     catch (error) {
        console.log("couldnot send messages");

        return Response.json({success:false, message:"could not send messages"})

    }
}

