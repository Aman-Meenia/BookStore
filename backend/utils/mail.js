import nodemailer from "nodemailer";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateTemporaryToken } from "./generateAccessAndRefreshToken.js";

export const sendEmailToUser = async ({ email, userId }) => {
  try {
    const user = await User.findById(userId);

    const { unHashedToken, hashedToken, tokenExpiry } =
      generateTemporaryToken();
    (user.forgotPasswordToken = hashedToken),
      (user.forgotPasswordTokenExpiry = tokenExpiry);
    const newUser = await user.save({ validateBeforeSave: false });
    // Create a nodemailer transporter instance which is responsible to send a mail
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_SMTP_HOST,
      port: process.env.MAILTRAP_SMTP_PORT,
      auth: {
        user: process.env.MAILTRAP_SMTP_USER,
        pass: process.env.MAILTRAP_SMTP_PASS,
      },
    });

    // Send Email
    const mailOptions = {
      from: "amanmeneia09876@gmail.com",
      to: email,
      subject: "Reset your password",
      html: `
        <p>
          Click<a href="${process.env.DOMAIN} +${unHashedToken}">here</a>
        </p>
    `,
    };
    await transporter.sendMail(mailOptions);

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
