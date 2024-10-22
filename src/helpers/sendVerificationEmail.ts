import VerificationEmail from "@/emails/VerificationEmail";
import { resend } from "@/lib/resend";
import { apiResponse } from "@/types/apiResponse";


export async function sendVerificationEmail(
    email:string,
    username :string,
    verifycode:string


):Promise<apiResponse> {
    try {
        await resend.emails.send({
            from:'onboarding@resend.dev',
            to:email,
            subject:'mystry mssg',
            react:VerificationEmail({username,otp:verifycode})

        });
        // console.log('Successfully sent verification email.')
        return{success:true, message:"Successfully sent"}

    } catch (emailError) {
        console.log('Failed to send verification email.')
        return{success:false, message: 'Failed to send the verification mail'}
            
        
        
    }
}