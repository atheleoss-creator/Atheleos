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
            SELECT n.id, n.type, n.is_read, n.post_id, n.created_at, n.actor_id,
                   u.username AS actor_username, u.full_name AS actor_name, u.avatar_url AS actor_avatar,
                   p.media_url AS post_media, p.media_type AS post_media_type
            FROM notifications n
            JOIN users u ON n.actor_id = u.id
            LEFT JOIN posts p ON n.post_id = p.id
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

// PUT /api/notifications — Mark read (all or single ID)
export async function PUT(req: Request) {
    try {
        const currentUserId = await getUserId();
        if (!currentUserId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        let body = {};
        try {
            const rawBody = await req.json();
            if (rawBody) body = rawBody;
        } catch {
            // body is optional (for marking all)
        }

        const { id } = body as { id?: number };

        if (id) {
            // Mark a single notification as read
            await query('UPDATE notifications SET is_read = TRUE WHERE id = ? AND user_id = ?', [id, currentUserId]);
        } else {
            // Mark all as read
            await query('UPDATE notifications SET is_read = TRUE WHERE user_id = ?', [currentUserId]);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Mark Read Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
