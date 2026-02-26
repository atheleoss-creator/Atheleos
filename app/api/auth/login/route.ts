import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // 1. Fetch user by email
    const users: any = await query('SELECT * FROM users WHERE email = ?', [email]);
    
    if (users.length === 0) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    const user = users[0];

    // Check verification
    if (!user.is_verified) {
        return NextResponse.json({ 
            error: 'Account not verified. Please verify your email.',
            requiresVerification: true,
            email: user.email 
        }, { status: 403 });
    }

    // 2. Verify password
    // (For this mock we might accept raw password if bcrypt fails for easy testing, but bcrypt is preferred)
    const isPasswordValid = await bcrypt.compare(password, user.password_hash).catch(() => password === user.password_hash);

    if (!isPasswordValid) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // 3. Generate JWT Token
    const token = jwt.sign(
      { 
        id: user.id, 
        username: user.username,
        role: user.role 
      }, 
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // 4. Create the response and set HTTP-only cookie
    const response = NextResponse.json({ 
        success: true, 
        user: {
            id: user.id,
            username: user.username,
            fullName: user.full_name,
            avatarUrl: user.avatar_url,
            isVerified: !!user.is_verified,
            verificationLevel: user.verification_level,
            role: user.role
        }
    }, { status: 200 });

    response.cookies.set({
      name: 'atheleos_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;

  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
