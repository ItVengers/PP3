"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer = require('nodemailer');
exports.transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "08f619889391bf",
        pass: "bd3e31d1c2c752"
    }
});
//# sourceMappingURL=mailer.js.map