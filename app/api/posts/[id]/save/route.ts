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

// POST /api/posts/[id]/save — Toggle save/unsave
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const currentUserId = await getUserId();
        if (!currentUserId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id: postId } = await params;

        const existing = await query(
            'SELECT * FROM saved_posts WHERE post_id = ? AND user_id = ?',
            [postId, currentUserId]
        ) as Array<Record<string, unknown>>;

        if (existing.length > 0) {
            await query('DELETE FROM saved_posts WHERE post_id = ? AND user_id = ?', [postId, currentUserId]);
            return NextResponse.json({ saved: false });
        } else {
            await query('INSERT INTO saved_posts (post_id, user_id) VALUES (?, ?)', [postId, currentUserId]);
            return NextResponse.json({ saved: true });
        }
    } catch (error) {
        console.error('Save Post Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
