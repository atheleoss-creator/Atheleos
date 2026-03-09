import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');
        const type = searchParams.get('type'); // 'followers' or 'following'

        if (!userId || !type) {
            return NextResponse.json({ error: 'Missing userId or type' }, { status: 400 });
        }

        let sql = '';
        if (type === 'followers') {
            sql = `
                SELECT u.id, u.username, u.full_name, u.avatar_url, u.is_verified, u.verification_level
                FROM follows f
                JOIN users u ON f.follower_id = u.id
                WHERE f.following_id = ?
                ORDER BY f.created_at DESC
            `;
        } else if (type === 'following') {
            sql = `
                SELECT u.id, u.username, u.full_name, u.avatar_url, u.is_verified, u.verification_level
                FROM follows f
                JOIN users u ON f.following_id = u.id
                WHERE f.follower_id = ?
                ORDER BY f.created_at DESC
            `;
        } else {
            return NextResponse.json({ error: 'Type must be "followers" or "following"' }, { status: 400 });
        }

        const users: any = await query(sql, [parseInt(userId)]);

        return NextResponse.json({ users }, { status: 200 });

    } catch (error) {
        console.error('Follow List Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
