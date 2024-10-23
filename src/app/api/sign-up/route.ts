/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcryptjs from "bcryptjs";
import { verify } from "crypto";
import { date } from "zod";

export async function Post(request : Request) {
    await dbConnect();
    try {
        const { email, password, username } = await request.json();
        const existingUserVerifiedByUsername = await UserModel.findOne({ username,
             isVerified:true });
        if (existingUserVerifiedByUsername) {
            return Response.json({ success: false, message: 'User already exists' },
                {
                    status: 400,
                })}

        const existingUserByEmail= await UserModel.findOne({email})
        if (existingUserByEmail) {
            true
        }
        else{
            const hashedPassword = await bcryptjs.hash(password, 10);
            const expiryDate= new Date()
            expiryDate.setDate(expiryDate.getHours()+1)
        
            const verifyCode= Math.floor(100000 + Math.random() * 900000);

            const newUser= new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessages: true,
                messages: [],

            })
            await newUser.save();
        }
        const emailResponse= await sendVerificationEmail(
            email,
            username,
            verifyCode,
        )


    }catch (error) {
        console.error('Error registering user', error);
        return Response.json({ success: false, message: 'Failed to register user' },
            {
                status: 500,

            }
        );
        
    }
}

