import nodemailer from "nodemailer";

interface EmailOptions {
  email: string;
  subject: string;
  message: string;
}

export default async (options: EmailOptions) => {
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtpout.secureserver.net",
    port: process.env.SMTP_PORT || 465,
    auth: {
      user: process.env.SMTP_USER || "noreply@zhelps.in",
      pass: process.env.SMTP_PASSWORD || "Sh!v$h@mbu",
    },
  });

  const message = {
    from: `${process.env.SMTP_FROM_NAME || "ZHELP Repair Services"} <${process.env.SMTP_FROM_EMAIL || "noreply@zhelps.in"}>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  const response = await transport.sendMail(message);
  console.log(response);
};
