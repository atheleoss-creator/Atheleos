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
        const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
        return decoded.id;
    } catch {
        return null;
    }
}

// GET /api/posts/saved — Fetch saved posts for the current user
export async function GET() {
    try {
        const currentUserId = await getUserId();
        if (!currentUserId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const posts = await query(`
            SELECT 
                p.id, p.media_url AS mediaUrl, p.media_type AS mediaType, 
                p.caption, p.location, p.created_at AS createdAt,
                u.username, u.avatar_url AS avatarUrl,
                (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.id) AS likes,
                (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) AS comments
            FROM saved_posts sp
            JOIN posts p ON sp.post_id = p.id
            JOIN users u ON p.user_id = u.id
            WHERE sp.user_id = ?
            ORDER BY sp.created_at DESC
        `, [currentUserId]);

        return NextResponse.json({ posts });
    } catch (error) {
        console.error('Fetch Saved Posts Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
