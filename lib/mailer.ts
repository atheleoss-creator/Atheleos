import nodemailer from 'nodemailer';
import path from 'path';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.hostinger.com',
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: true, // true for 465
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function sendOTP(to: string, otp: string, purpose: 'signup' | 'reset' = 'signup') {
    const subject = purpose === 'signup' 
        ? 'Welcome to Atheleos - Verify Your Email'
        : 'Atheleos - Password Reset Verification';

    const logoPath = path.join(process.cwd(), 'public', 'atheleos.png');
    const textPath = path.join(process.cwd(), 'public', 'AtheleosText.png');

    const headerHtml = `
        <div style="text-align: center; margin-bottom: 28px;">
            <img src="cid:atheleos_logo" alt="Logo" style="height: 42px; width: auto; vertical-align: middle; margin-right: 10px;" />
            <img src="cid:atheleos_text" alt="ATHELEOS" style="height: 28px; width: auto; vertical-align: middle;" />
        </div>
    `;

    const html_signup = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 30px; text-align: center; background-color: #0a0a0a; color: #f5f5f5; border-radius: 16px; border: 1px solid #222;">
            ${headerHtml}
            <h2 style="font-size: 22px; font-weight: 800; color: #fff; margin: 0 0 12px 0;">Verify your identity</h2>
            <p style="color: #a3a3a3; font-size: 14px; line-height: 1.6; margin: 0 0 32px 0;">Enter the following 6-digit verification code to activate your premium Atheleos account.</p>
            <div style="font-size: 34px; font-weight: 800; letter-spacing: 8px; color: #0095F6; background-color: #141414; display: inline-block; padding: 16px 32px; border-radius: 12px; border: 2px solid rgba(0, 149, 246, 0.4); box-shadow: 0 0 20px rgba(0, 149, 246, 0.15);">
                ${otp}
            </div>
            <p style="color: #525252; margin: 36px 0 0 0; font-size: 12px;">This code will expire in 15 minutes.</p>
        </div>
    `;

    const html_reset = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 30px; text-align: center; background-color: #0a0a0a; color: #f5f5f5; border-radius: 16px; border: 1px solid #222;">
            ${headerHtml}
            <h2 style="font-size: 22px; font-weight: 800; color: #fff; margin: 0 0 12px 0;">Password Reset Request</h2>
            <p style="color: #a3a3a3; font-size: 14px; line-height: 1.6; margin: 0 0 32px 0;">Enter the following 6-digit code to securely reset your Atheleos password.</p>
            <div style="font-size: 34px; font-weight: 800; letter-spacing: 8px; color: #0095F6; background-color: #141414; display: inline-block; padding: 16px 32px; border-radius: 12px; border: 2px solid rgba(0, 149, 246, 0.4); box-shadow: 0 0 20px rgba(0, 149, 246, 0.15);">
                ${otp}
            </div>
            <p style="color: #525252; margin: 36px 0 0 0; font-size: 12px;">This code will expire in 15 minutes. If you did not request this, please ignore this email.</p>
        </div>
    `;

    const mailOptions = {
        from: `"Atheleos Security" <${process.env.SMTP_USER}>`,
        to,
        subject,
        html: purpose === 'signup' ? html_signup : html_reset,
        attachments: [
            {
                filename: 'atheleos.png',
                path: logoPath,
                cid: 'atheleos_logo'
            },
            {
                filename: 'AtheleosText.png',
                path: textPath,
                cid: 'atheleos_text'
            }
        ]
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Mail Send Error:', error);
        return false;
    }
}
