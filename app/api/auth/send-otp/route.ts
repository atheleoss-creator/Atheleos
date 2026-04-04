import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { sendOTP } from '@/lib/mailer';

export async function POST(req: Request) {
  try {
    const { email: rawEmail } = await req.json();
    const email = rawEmail?.trim();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const users: any = await query('SELECT * FROM users WHERE email = ?', [email]);
    
    if (users.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const user = users[0];

    if (user.is_verified) {
        return NextResponse.json({ error: 'User is already verified' }, { status: 400 });
    }

    // Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60000); // 15 minutes from now

    // Update User in Database
    await query(
        'UPDATE users SET otp_code = ?, otp_expires_at = ? WHERE id = ?', 
        [otp, expiresAt, user.id]
    );

    // Send the OTP Email
    if (process.env.SMTP_USER) {
        const mailSent = await sendOTP(email, otp, 'signup');
        if (!mailSent) {
             console.log(`Failed to send resend email to ${email}. OTP is: ${otp}`);
        }
    } else {
        console.log(`[DEV MODE] Skipping email. Resent OTP for ${email} is: ${otp}`);
    }

    return NextResponse.json({ 
        success: true, 
        message: 'A new OTP has been sent to your email.'
    }, { status: 200 });

  } catch (error: any) {
    console.error('Send OTP Error:', error);
    return NextResponse.json({ 
      error: 'Internal server error'
    }, { status: 500 });
  }
}
