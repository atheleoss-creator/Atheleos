import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 });
    }

    const users: any = await query('SELECT * FROM users WHERE email = ?', [email]);
    
    if (users.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const user = users[0];

    // Check OTP Match
    if (user.otp_code !== otp) {
        return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
    }

    // Check Expiration
    if (new Date(user.otp_expires_at) < new Date()) {
        return NextResponse.json({ error: 'OTP has expired. Please request a new one.' }, { status: 400 });
    }

    // Mark as Verified and Nullify OTP
    await query(
        'UPDATE users SET is_verified = TRUE, otp_code = NULL, otp_expires_at = NULL WHERE id = ?', 
        [user.id]
    );

    // Auto-login newly verified user
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role }, 
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const response = NextResponse.json({ 
        success: true, 
        message: 'Account verified successfully',
        user: {
            id: user.id,
            username: user.username,
            fullName: user.full_name,
            avatarUrl: user.avatar_url,
            isVerified: true
        }
    }, { status: 200 });

    response.cookies.set({
      name: 'atheleos_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;

  } catch (error) {
    console.error('Verify OTP Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
