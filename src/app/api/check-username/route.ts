import dbConnect from "@/lib/dbConnect";
import {z} from "zod"
import userModel from "@/models/User";
import { usernameValidation } from "@/schemas/signUpSchema";


const usernameQuerySchema = z.object({
    username: usernameValidation
})

export default async function GET(request:Request) {
    await dbConnect();
      try {
        const {searchParams} = new URL(request.url)
        const queryParams = {
            username:searchParams.get("username")
        }
        const result = usernameQuerySchema.safeParse(queryParams)
        if (!result.success) {
            const usernameErrors = result.error.format().username?._errors || []
            return Response.json({
                success:false,
                message:usernameErrors?.length>0?usernameErrors.join(','):"Invalid query parameters"
            },{status:400})
        }
        const {username} = result.data
        return Response.json({
            success:true,
            message:"Username is available"
        },{status:200})       
      } catch (error) {
        console.error("Error checking Username",error)
        return Response.json({
            success:false,
            message:"Error checking Username"
        },{status:500})
      }
  }