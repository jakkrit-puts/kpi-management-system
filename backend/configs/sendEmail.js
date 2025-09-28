import { createTransport } from "nodemailer"

const sendMail = async ({ to, subject, html }) => {
    if (!to) {
        throw new Error("No recipients defined for KPI update email");
    }

    try {
        const transport = createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            },
            connectionTimeout: 5000
        });

        await transport.sendMail({
            from: `"Admin ระบบ" <${process.env.SMTP_USER}>`,
            to,
            subject,
            html
        });

        console.log("Email sent to:", to);
    } catch (err) {
        console.error("Failed to send email:", err.message);
    }
}

export default sendMail;
