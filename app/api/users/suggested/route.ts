import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

async function getUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get('atheleos_token')?.value;
  if (!token) return null;
  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    return decoded.id;
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const currentUserId = await getUserId();

    let users: any;

    if (currentUserId) {
      // Get users that the current user is NOT following
      users = await query(`
        SELECT id, username, full_name, avatar_url, sport, is_verified, verification_level
        FROM users
        WHERE id != ?
        AND id NOT IN (SELECT following_id FROM follows WHERE follower_id = ?)
        ORDER BY RAND()
        LIMIT 5
      `, [currentUserId, currentUserId]);
    } else {
      users = await query(`
        SELECT id, username, full_name, avatar_url, sport, is_verified, verification_level
        FROM users
        ORDER BY RAND()
        LIMIT 5
      `);
    }

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error('Suggested Users Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
