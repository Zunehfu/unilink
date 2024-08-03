import nodemailer from "nodemailer";
import fs from "fs";
import { Err } from "../error.js";

const htmlEmail = fs.readFileSync("./utils/email/email.html", "utf-8");

const transporter = nodemailer.createTransport({
    host: process.env.email_host,
    port: process.env.email_port,
    auth: {
        user: process.env.email_user,
        pass: process.env.email_pass,
    },
});

export async function sendMail(to, token) {
    try {
        await transporter.sendMail({
            from: "support@uni.link",
            to: to,
            subject: "UniLnk - Email verification token",
            html: htmlEmail.replace("{{token}}", token),
        });
    } catch (err) {
        throw new Err(err.message);
    }
}
