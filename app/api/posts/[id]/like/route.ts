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

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: postId } = await params;
    const currentUserId = await getUserId();

    if (!currentUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if like exists
    const existingLike: any = await query('SELECT * FROM likes WHERE post_id = ? AND user_id = ?', [postId, currentUserId]);

    if (existingLike.length > 0) {
      // Unlike
      await query('DELETE FROM likes WHERE post_id = ? AND user_id = ?', [postId, currentUserId]);
      return NextResponse.json({ liked: false });
    } else {
      // Like
      await query('INSERT INTO likes (post_id, user_id) VALUES (?, ?)', [postId, currentUserId]);
      return NextResponse.json({ liked: true });
    }
  } catch (error) {
    console.error('Toggle Like Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
