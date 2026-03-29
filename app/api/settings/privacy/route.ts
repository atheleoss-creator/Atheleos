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

// GET /api/settings/privacy — Get current privacy status
export async function GET() {
    try {
        const currentUserId = await getUserId();
        if (!currentUserId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const rows = await query('SELECT is_private FROM users WHERE id = ?', [currentUserId]) as Array<Record<string, unknown>>;
        const isPrivate = rows.length > 0 ? !!rows[0].is_private : false;

        return NextResponse.json({ isPrivate });
    } catch (error) {
        console.error('Get Privacy Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// PUT /api/settings/privacy — Toggle privacy
export async function PUT(req: Request) {
    try {
        const currentUserId = await getUserId();
        if (!currentUserId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { isPrivate } = await req.json();
        await query('UPDATE users SET is_private = ? WHERE id = ?', [isPrivate ? 1 : 0, currentUserId]);

        return NextResponse.json({ success: true, isPrivate: !!isPrivate });
    } catch (error) {
        console.error('Update Privacy Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
