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

// GET /api/posts/reels — Get video posts for the reels feed
export async function GET() {
  try {
    const currentUserId = await getUserId();
    const userId = currentUserId || 0;

    const reels: any = await query(`
      SELECT 
        p.id, p.media_url, p.media_type, p.caption, p.created_at,
        u.id as user_id, u.username, u.avatar_url, u.full_name, u.is_verified,
        (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.id) as likes,
        (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) as comments,
        (SELECT COUNT(*) > 0 FROM likes l WHERE l.post_id = p.id AND l.user_id = ?) as isLiked,
        (SELECT COUNT(*) > 0 FROM saved_posts s WHERE s.post_id = p.id AND s.user_id = ?) as isSaved
      FROM posts p
      JOIN users u ON p.user_id = u.id
      WHERE p.media_type = 'video' AND p.media_url IS NOT NULL
      ORDER BY p.created_at DESC
      LIMIT 20
    `, [userId, userId]);

    const formatted = reels.map((r: any) => ({
      ...r,
      isLiked: !!r.isLiked,
      isSaved: !!r.isSaved,
    }));

    return NextResponse.json({ reels: formatted }, { status: 200 });
  } catch (error) {
    console.error('Fetch Reels Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
