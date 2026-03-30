import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

async function getCurrentUserId() {
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

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');
        const type = searchParams.get('type'); // 'followers' or 'following'

        if (!userId || !type) {
            return NextResponse.json({ error: 'Missing userId or type' }, { status: 400 });
        }

        const currentUserId = await getCurrentUserId();

        let sql = '';
        const followCheck = currentUserId
            ? `EXISTS(SELECT 1 FROM follows WHERE follower_id = ${currentUserId} AND following_id = u.id) AS is_following`
            : '0 AS is_following';

        if (type === 'followers') {
            sql = `
                SELECT u.id, u.username, u.full_name, u.avatar_url, u.is_verified, u.verification_level,
                    ${followCheck}
                FROM follows f
                JOIN users u ON f.follower_id = u.id
                WHERE f.following_id = ?
                ORDER BY f.created_at DESC
            `;
        } else if (type === 'following') {
            sql = `
                SELECT u.id, u.username, u.full_name, u.avatar_url, u.is_verified, u.verification_level,
                    ${followCheck}
                FROM follows f
                JOIN users u ON f.following_id = u.id
                WHERE f.follower_id = ?
                ORDER BY f.created_at DESC
            `;
        } else {
            return NextResponse.json({ error: 'Type must be "followers" or "following"' }, { status: 400 });
        }

        const users: any = await query(sql, [parseInt(userId)]);

        const usersWithFollowState = users.map((u: any) => ({
            ...u,
            is_following: !!u.is_following,
        }));

        return NextResponse.json({ users: usersWithFollowState }, { status: 200 });

    } catch (error) {
        console.error('Follow List Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
