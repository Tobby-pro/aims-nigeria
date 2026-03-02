// src/services/email.ts
import nodemailer, { Transporter } from "nodemailer";

const isProduction = process.env.NODE_ENV === "production";
const PROD_EMAIL_USER = process.env.EMAIL_USER || "";

interface EmailService {
  transporter: Transporter;
  fromEmail: string;
}

const createEmailService = async (): Promise<EmailService> => {
  if (isProduction) {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("EMAIL_USER or EMAIL_PASS not set in .env");
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App Password
      },
    });

    return { transporter, fromEmail: PROD_EMAIL_USER };
  } else {
    const testAccount = await nodemailer.createTestAccount();

    console.log(
      "🧪 Using Ethereal test account. Preview emails at: https://ethereal.email/messages"
    );

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    return { transporter, fromEmail: testAccount.user };
  }
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const { transporter, fromEmail } = await createEmailService();

  const link = `http://localhost:3000/api/members/verify?token=${token}`;

  const info = await transporter.sendMail({
    from: `"AIMSN" <${fromEmail}>`,
    to: email,
    subject: "Verify your membership",
    html: `
      <h2>Welcome to AIMSN 👋</h2>
      <p>Please verify your email by clicking below:</p>
      <a href="${link}">Verify Account</a>
      <p>This link will activate your membership.</p>
    `,
  });

  if (!isProduction) {
    console.log("📧 Preview URL:", nodemailer.getTestMessageUrl(info));
  } else {
    console.log(`📧 Sending verification email to ${email} with token: ${token}`);
  }
};