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

// POST /api/posts/[id]/hide — Toggle hide status of a post
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: postId } = await params;
        const currentUserId = await getUserId();

        if (!currentUserId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Verify post ownership
        const rows: any = await query('SELECT user_id, is_hidden FROM posts WHERE id = ?', [postId]);
        if (!rows || rows.length === 0) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        if (rows[0].user_id !== currentUserId) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const isCurrentlyHidden = !!rows[0].is_hidden;
        const newHiddenStatus = !isCurrentlyHidden;

        // Toggle visibility
        await query('UPDATE posts SET is_hidden = ? WHERE id = ?', [newHiddenStatus, postId]);

        return NextResponse.json({ success: true, is_hidden: newHiddenStatus }, { status: 200 });
    } catch (error) {
        console.error('Hide Post Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
