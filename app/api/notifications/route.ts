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

// GET /api/notifications — Fetch notifications for the current user
export async function GET() {
    try {
        const currentUserId = await getUserId();
        if (!currentUserId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const notifications = await query(`
            SELECT n.id, n.type, n.is_read, n.post_id, n.created_at,
                   u.username AS actor_username, u.full_name AS actor_name, u.avatar_url AS actor_avatar
            FROM notifications n
            JOIN users u ON n.actor_id = u.id
            WHERE n.user_id = ?
            ORDER BY n.created_at DESC
            LIMIT 50
        `, [currentUserId]);

        return NextResponse.json({ notifications });
    } catch (error) {
        console.error('Fetch Notifications Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// PUT /api/notifications — Mark all as read
export async function PUT() {
    try {
        const currentUserId = await getUserId();
        if (!currentUserId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await query('UPDATE notifications SET is_read = TRUE WHERE user_id = ?', [currentUserId]);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Mark Read Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
