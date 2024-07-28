import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmai.template";
import { apiResponse } from "@/types/apiResponse";


export async function sendEmail(
    email: string,
    username: string,
    otp: string
): Promise<apiResponse> {
    try {

        const { data, error } = await resend.emails.send({
            from: 'Notescloudy <onboarding@resend.dev>',
            to: email,
            subject: ' NotesCody Verification Code',
            react: VerificationEmail({ username, otp }),
        });
        console.log(data);
        return { success: true, message: "Verification Email Sent", }


    } catch (error) {
        console.error("failed to send email")
        return { success: false, message: "couldn't send verification email" }

    }

}









