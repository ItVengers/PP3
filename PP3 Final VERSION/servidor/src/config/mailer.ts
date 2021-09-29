const nodemailer = require('nodemailer');
export const transporter = nodemailer.createTransport({

  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "e52dc9e77a5269",
    pass: "4d515ab9932707"
  }

});