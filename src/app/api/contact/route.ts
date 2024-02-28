import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    let body;

    if (req.body instanceof ReadableStream) {
        const rawBody = await new Response(req.body).text();
        body = JSON.parse(rawBody);
    } else {
        body = req.body;
    }
    console.log("Request Body:", body);
    const { name, email, message } = body;
    
    const name_string_friend = name.replace(/\s/g, '').toLowerCase();

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
        from: `${name_string_friend}@adityasahas.tech`,
        to: "contact@adityasahas.tech",
        subject: `New Contact Form Submission from ${name}`,
        html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong> ${message}</p>`,
        reply_to: email,
    });

    return NextResponse.json({
        success: true,
        message: "Email sent successfully",
    });
}