import { createTransport } from "nodemailer"

const sendMail = async ({ to, subject, html }) => {


    if (!to) {
        throw new Error("No recipients defined for KPI update email");
    }

    const transport = createTransport({
        host: "smtp.gmail.com",
        port: 587, // 456
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        },
    });

    await transport.sendMail({
        from: "Admin ระบบ",
        to: to,
        subject,
        html
    })
}

export default sendMail;