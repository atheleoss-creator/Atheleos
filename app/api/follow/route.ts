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

// POST /api/follow — Toggle follow/unfollow
export async function POST(req: Request) {
    try {
        const currentUserId = await getUserId();
        if (!currentUserId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { targetUserId } = await req.json();

        if (!targetUserId || targetUserId === currentUserId) {
            return NextResponse.json({ error: 'Invalid target user' }, { status: 400 });
        }

        // Check if already following
        const existing = await query(
            'SELECT * FROM follows WHERE follower_id = ? AND following_id = ?',
            [currentUserId, targetUserId]
        ) as Array<Record<string, unknown>>;

        if (existing.length > 0) {
            // Unfollow
            await query('DELETE FROM follows WHERE follower_id = ? AND following_id = ?', [currentUserId, targetUserId]);

            // Create unfollow notification (optional — we skip for unfollows)
            return NextResponse.json({ following: false });
        } else {
            // Follow
            await query('INSERT INTO follows (follower_id, following_id) VALUES (?, ?)', [currentUserId, targetUserId]);

            // Create notification for the target user
            await query(
                'INSERT INTO notifications (user_id, actor_id, type) VALUES (?, ?, ?)',
                [targetUserId, currentUserId, 'follow']
            ).catch(() => {}); // Silently fail if notifications table doesn't exist yet

            return NextResponse.json({ following: true });
        }
    } catch (error) {
        console.error('Follow Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// GET /api/follow?targetUserId=X — Check follow status
export async function GET(req: Request) {
    try {
        const currentUserId = await getUserId();
        if (!currentUserId) {
            return NextResponse.json({ following: false });
        }

        const { searchParams } = new URL(req.url);
        const targetUserId = searchParams.get('targetUserId');

        if (!targetUserId) {
            return NextResponse.json({ error: 'Missing targetUserId' }, { status: 400 });
        }

        const existing = await query(
            'SELECT * FROM follows WHERE follower_id = ? AND following_id = ?',
            [currentUserId, parseInt(targetUserId)]
        ) as Array<Record<string, unknown>>;

        return NextResponse.json({ following: existing.length > 0 });
    } catch (error) {
        console.error('Check Follow Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
