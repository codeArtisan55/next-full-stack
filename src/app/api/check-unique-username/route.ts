import {z} from "zod"
import { dbConnect } from "@/lib/dbConnect"
import {usernameValidation} from "@/schemas/SignUpSchema"
import UserModel from "@/models/user.model"


export async function GET(request:Request) {

    await dbConnect()

    try {
        const {searchParams}=new URL(request.url)
        console.log(searchParams);

         // 2nd way to get query
        // const searchParams = request.nextUrl.searchParams
        // const query = searchParams.get('query')

        // 3rd way to get query or username
        // const searchParams = useSearchParams()
        // const search = searchParams.get('query')
        const userNameValidationSchema=z.object({
            username:usernameValidation
        })

        //

        const userQueryParam={  // this object instead of variable , bcs zod accepts object for validation
            username:searchParams.get("username")
        }
        const result=userNameValidationSchema.safeParse(userQueryParam)
        console.log(result);


        if (!result.success) {
            const usernameError:any=result.error.format().username?._errors || ''
            console.log(usernameError);

            return Response.json({success:false, message:usernameError, errors:usernameError})
        }
        const uniqueUsernameData=result.data
        console.log("checking zod username validation",uniqueUsernameData);

        const checkUniqueUsername=await UserModel.findOne({username:uniqueUsernameData.username})
        if (checkUniqueUsername) {
        return Response.json({success:true, message:"user name already taken"})

        }
        return Response.json({success:false, message:"username unique "})

    } catch (error) {
        console.log("error in username",error);
        return Response.json({
            success:false,
            message:"username verification failed"
        },{status:400})

    }

}