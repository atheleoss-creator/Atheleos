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

        // Search users
        const users = await query(`
            SELECT id, username, full_name, avatar_url, is_verified, verification_level, sport, position
            FROM users
            WHERE username LIKE ? OR full_name LIKE ? OR sport LIKE ?
            LIMIT 20
        `, [searchTerm, searchTerm, searchTerm]);

        // Search posts by caption
        const posts = await query(`
            SELECT p.id, p.caption, p.media_url, p.media_type, p.created_at,
                   u.username, u.avatar_url, u.is_verified
            FROM posts p
            JOIN users u ON p.user_id = u.id
            WHERE p.caption LIKE ?
            ORDER BY p.created_at DESC
            LIMIT 20
        `, [searchTerm]);

        return NextResponse.json({ users, posts });
    } catch (error) {
        console.error('Search Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
