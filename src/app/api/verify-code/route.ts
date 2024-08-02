import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";


export async function POST(request:Request) {
    await dbConnect();
    try {
        const {email,code} = await request.json()
        const decodedEmail = decodeURIComponent(email)
        const user = await UserModel.findOne({email:decodedEmail})
        if (!user) {
            return Response.json({
                success:false,
                message:"User not found"
            },{status:400})    
        }
        const isCodeValid = user.verifyCode === code
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()

        if(isCodeValid && isCodeNotExpired){
            user.isVerified = true
            await user.save()
            return Response.json({
                success:true,
                message:"Account verified successfully"
            },{status:201})
        }else if(!isCodeValid){
        return Response.json({
            success:false,
            message:"Invalid code"
        },{status:400})
    }else{
        return Response.json({
            success:false,
            message:"Verification Code has expired. Please Sign Up again"
        },{status:400})
    }


    } catch (error) {
        console.error("Error checking verification code",error)
        return Response.json({
            success:false,
            message:"Error checking verification code"
        },{status:500})
    }
}
