import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    const { email, otp, newPassword } = await req.json();

    if (!email || !otp || !newPassword) {
      return NextResponse.json({ error: 'Email, OTP, and new password are required' }, { status: 400 });
    }

    const users: any = await query('SELECT * FROM users WHERE email = ?', [email]);
    
    if (users.length === 0) {
      return NextResponse.json({ error: 'Invalid details.' }, { status: 400 });
    }

    const user = users[0];

    // OTP Validation for Reset
    if (user.otp_code !== otp) {
        return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
    }
    if (new Date(user.otp_expires_at) < new Date()) {
        return NextResponse.json({ error: 'OTP has expired.' }, { status: 400 });
    }

    // Hash New Password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(newPassword, saltRounds);

    // Update Password and Clear OTP
    await query(
        'UPDATE users SET password_hash = ?, otp_code = NULL, otp_expires_at = NULL WHERE id = ?', 
        [passwordHash, user.id]
    );

    return NextResponse.json({ success: true, message: 'Password has been reset successfully. You can now log in.' }, { status: 200 });

  } catch (error) {
    console.error('Reset Password Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
