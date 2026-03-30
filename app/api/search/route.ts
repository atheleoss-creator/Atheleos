import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET /api/search?q=term — Search users and posts
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const q = searchParams.get('q');

        if (!q || q.trim().length === 0) {
            return NextResponse.json({ users: [], posts: [] });
        }

        const searchTerm = `%${q.trim()}%`;

        // Search users — include follower counts for relevance
        const users = await query(`
            SELECT u.id, u.username, u.full_name, u.avatar_url, u.is_verified, u.verification_level, u.sport, u.position,
                   (SELECT COUNT(*) FROM follows WHERE following_id = u.id) AS followers_count
            FROM users u
            WHERE u.username LIKE ? OR u.full_name LIKE ? OR u.sport LIKE ? OR u.position LIKE ?
            ORDER BY 
                CASE WHEN u.username LIKE ? THEN 0 ELSE 1 END,
                followers_count DESC
            LIMIT 20
        `, [searchTerm, searchTerm, searchTerm, searchTerm, `${q.trim()}%`]);

        // Search posts by caption — include user info and engagement
        const posts = await query(`
            SELECT p.id, p.caption, p.media_url, p.media_type, p.created_at,
                   u.username, u.avatar_url, u.is_verified, u.verification_level,
                   (SELECT COUNT(*) FROM likes WHERE post_id = p.id) AS likes_count,
                   (SELECT COUNT(*) FROM comments WHERE post_id = p.id) AS comments_count
            FROM posts p
            JOIN users u ON p.user_id = u.id
            WHERE p.caption LIKE ?
            ORDER BY likes_count DESC, p.created_at DESC
            LIMIT 20
        `, [searchTerm]);

        return NextResponse.json({ users, posts });
    } catch (error) {
        console.error('Search Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
