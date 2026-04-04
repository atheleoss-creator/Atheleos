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

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: postIdStr } = await params;
        const postId = parseInt(postIdStr, 10);
        
        if (isNaN(postId)) {
            return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
        }

        const currentUserId = await getCurrentUserId();

        const followCheck = currentUserId
            ? `EXISTS(SELECT 1 FROM follows WHERE follower_id = ${currentUserId} AND following_id = u.id) AS is_following`
            : '0 AS is_following';

        const sql = `
            SELECT u.id, u.username, u.full_name, u.avatar_url, u.is_verified, u.verification_level,
                ${followCheck}
            FROM likes l
            JOIN users u ON l.user_id = u.id
            WHERE l.post_id = ?
            ORDER BY l.created_at DESC
        `;

        const users: any = await query(sql, [postId]);

        const usersWithFollowState = users.map((u: any) => ({
            ...u,
            is_following: !!u.is_following,
        }));

        return NextResponse.json({ users: usersWithFollowState }, { status: 200 });

    } catch (error) {
        console.error('Fetch Likes Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
