import nodemailer from 'nodemailer';

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

    const html_signup = `
        <div style="font-family: Arial, sans-serif; padding: 40px; text-align: center; background-color: #0f172a; color: white;">
            <h1 style="color: #00D4FF; letter-spacing: 2px;">ATHELEOS</h1>
            <h2 style="margin-top: 20px;">Verify your identity</h2>
            <p style="color: #94a3b8; margin-bottom: 30px;">Enter the following 6-digit code to activate your premium Atheleos account.</p>
            <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #fff; background-color: #1e293b; display: inline-block; padding: 15px 30px; border-radius: 12px; border: 1px solid #334155;">
                ${otp}
            </div>
            <p style="color: #64748b; margin-top: 30px; font-size: 12px;">This code will expire in 15 minutes.</p>
        </div>
    `;

    const html_reset = `
        <div style="font-family: Arial, sans-serif; padding: 40px; text-align: center; background-color: #0f172a; color: white;">
            <h1 style="color: #00D4FF; letter-spacing: 2px;">ATHELEOS</h1>
            <h2 style="margin-top: 20px;">Password Reset Request</h2>
            <p style="color: #94a3b8; margin-bottom: 30px;">Enter the following 6-digit code to securely reset your password.</p>
            <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #fff; background-color: #1e293b; display: inline-block; padding: 15px 30px; border-radius: 12px; border: 1px solid #334155;">
                ${otp}
            </div>
            <p style="color: #64748b; margin-top: 30px; font-size: 12px;">This code will expire in 15 minutes. If you did not request this, please ignore this email.</p>
        </div>
    `;

    const mailOptions = {
        from: `"Atheleos Security" <${process.env.SMTP_USER}>`, // MUST match Hostinger authenticated user
        to,
        subject,
        html: purpose === 'signup' ? html_signup : html_reset,
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Mail Send Error:', error);
        return false;
    }
}
