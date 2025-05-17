import nodemailer from "nodemailer";
import { config } from "../../config/configDotenv";

export const transporter = nodemailer.createTransport({
    host: config.emailHost,
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: config.email,
      pass: config.password,
    },
  });

transporter.verify().then(() => {
  console.log("Ready for send emails");
}).catch(err => {
    console.log('SMTP Error', err);
});
