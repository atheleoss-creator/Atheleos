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
       console.log(`[Forgot Password] Email not found in DB: ${email}`);
       // Best practice: Don't reveal if email exists, just return success
      return NextResponse.json({ success: true, message: 'If an account exists, an OTP has been sent.' }, { status: 200 });
    }

    // Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60000); // 15 minutes

    await query(
        'UPDATE users SET otp_code = ?, otp_expires_at = ? WHERE email = ?', 
        [otp, expiresAt, email]
    );

    if (process.env.SMTP_USER) {
        await sendOTP(email, otp, 'reset');
    } else {
         console.log(`[DEV MODE] Password Reset OTP for ${email} is: ${otp}`);
    }

    return NextResponse.json({ success: true, message: 'If an account exists, an OTP has been sent.' }, { status: 200 });

  } catch (error) {
    console.error('Forgot Password Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
