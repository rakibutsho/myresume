/* eslint-disable @typescript-eslint/no-explicit-any */
import { contactEmailTemplate } from "@/lib/emailTemplate";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;
    console.log("Received contact form submission:", { name, email, subject, message });

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 },
      );
    }

    //transform the data as needed, e.g. send email, store in database, etc.
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.SMTP_USER,
      replyTo: email,
      subject: subject ? `${subject} — Message from ${name}` : `New Message from ${name} (${email})`,
      html: contactEmailTemplate({ name, email, subject, message }),
    };

    await transporter.sendMail(mailOptions);
    return Response.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error: any) {
    return Response.json(
      { success: false, error: `Failed to send message: ${error.message}` },
      { status: 500 },
    );
  }
}
