import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import bcrypt from "bcryptjs"


export async function POST(request: Request) {
    await dbConnect();
    try {
        const { username, email, password } = await request.json()
        const existingUserByEmail = await UserModel.findOne({ email })
        const verifyCode = (Math.floor(Math.random() * 900000) + 100000).toString()
        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: "User already exists with this email"
                }, { status: 500 })
            } else {
                const hashedPassword = await bcrypt.hash(password,10)
                existingUserByEmail.password = hashedPassword
                existingUserByEmail.verifyCode = verifyCode
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)
                await existingUserByEmail.save()
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10)
            const expiryDate = new Date()
            expiryDate.setDate(expiryDate.getHours() + 1)

            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
            })
            await newUser.save()
        }
        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifyCode,
        )
        if (!emailResponse.success) {
            return Response.json({
                success: false,
                message: emailResponse.message || "Error sending Verification Email"
            }, { status: 500 })
        }
        return Response.json({
            success: true,
            message: "User Registered Successfully. Please verify your email"
        }, { status: 201 })

    } catch (error) {
        console.error("Error registering the user", error)
        return Response.json({
            success: false,
            message: "Error registering user"
        }, { status: 500 })
    }
}