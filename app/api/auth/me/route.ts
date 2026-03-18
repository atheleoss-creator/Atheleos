import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('atheleos_token');

    if (!tokenCookie || !tokenCookie.value) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const token = tokenCookie.value;
    
    try {
      const decoded: any = jwt.verify(token, JWT_SECRET);
      
      const users: any = await query('SELECT id, username, full_name, avatar_url, cover_url, bio, is_verified, verification_level, role, public_key FROM users WHERE id = ?', [decoded.id]);
      
      if (users.length === 0) {
        return NextResponse.json({ user: null }, { status: 404 });
      }

      const user = users[0];
      
      // format boolean fields
      user.isVerified = !!user.is_verified;
      user.fullName = user.full_name;
      user.avatarUrl = user.avatar_url;
      user.coverUrl = user.cover_url;
      user.verificationLevel = user.verification_level;
      user.publicKey = user.public_key;

      return NextResponse.json({ user }, { status: 200 });
      
    } catch (jwtError) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

  } catch (error) {
    console.error('Session Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
