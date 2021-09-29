"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer = require('nodemailer');
exports.transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "e52dc9e77a5269",
        pass: "4d515ab9932707"
    }
});
//# sourceMappingURL=mailer.js.map