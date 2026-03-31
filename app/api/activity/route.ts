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

// GET /api/activity — Fetch the current user's recent activity (likes, comments, follows)
export async function GET() {
    try {
        const currentUserId = await getUserId();
        if (!currentUserId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Fetch recent likes
        const likes = await query(`
            SELECT 'like' AS type, l.created_at, p.id AS post_id, p.media_url, p.media_type, p.caption,
                   u.username AS post_owner_username
            FROM likes l
            JOIN posts p ON l.post_id = p.id
            JOIN users u ON p.user_id = u.id
            WHERE l.user_id = ?
            ORDER BY l.created_at DESC
            LIMIT 20
        `, [currentUserId]) as Array<Record<string, unknown>>;

        // Fetch recent comments
        const comments = await query(`
            SELECT 'comment' AS type, c.created_at, c.content, p.id AS post_id, p.media_url, p.media_type,
                   u.username AS post_owner_username
            FROM comments c
            JOIN posts p ON c.post_id = p.id
            JOIN users u ON p.user_id = u.id
            WHERE c.user_id = ?
            ORDER BY c.created_at DESC
            LIMIT 20
        `, [currentUserId]) as Array<Record<string, unknown>>;

        // Fetch recent follows
        const follows = await query(`
            SELECT 'follow' AS type, f.created_at, u.username, u.avatar_url, u.full_name
            FROM follows f
            JOIN users u ON f.following_id = u.id
            WHERE f.follower_id = ?
            ORDER BY f.created_at DESC
            LIMIT 20
        `, [currentUserId]) as Array<Record<string, unknown>>;

        // Merge and sort by created_at descending
        const activity = [...likes, ...comments, ...follows]
            .sort((a, b) => new Date(b.created_at as string).getTime() - new Date(a.created_at as string).getTime())
            .slice(0, 40);

        return NextResponse.json({ activity });
    } catch (error) {
        console.error('Fetch Activity Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
