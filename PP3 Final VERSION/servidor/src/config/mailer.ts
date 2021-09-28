const nodemailer = require('nodemailer');
export const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "08f619889391bf",
      pass: "bd3e31d1c2c752"
    }
  });