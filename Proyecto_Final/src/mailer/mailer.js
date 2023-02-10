import nodemailer from "nodemailer";

export const mailTransport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.ADMIN_MAIL,
    pass: process.env.ADMIN_PASS_GOOGLE,
  },
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
});


