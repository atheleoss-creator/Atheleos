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

// GET /api/posts/[id]/comments — Fetch comments for a post
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: postId } = await params;

        const comments = await query(`
            SELECT c.id, c.content, c.created_at,
                   u.username, u.full_name, u.avatar_url, u.is_verified, u.verification_level
            FROM comments c
            JOIN users u ON c.user_id = u.id
            WHERE c.post_id = ?
            ORDER BY c.created_at ASC
            LIMIT 50
        `, [postId]);

        return NextResponse.json({ comments });
    } catch (error) {
        console.error('Fetch Comments Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// POST /api/posts/[id]/comments — Add a comment
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const currentUserId = await getUserId();
        if (!currentUserId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id: postId } = await params;
        const { content } = await req.json();

        if (!content || content.trim().length === 0) {
            return NextResponse.json({ error: 'Comment cannot be empty' }, { status: 400 });
        }

        await query(
            'INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)',
            [postId, currentUserId, content.trim()]
        );

        // Create notification for the post owner
        const postOwner = await query('SELECT user_id FROM posts WHERE id = ?', [postId]) as Array<Record<string, unknown>>;
        if (postOwner.length > 0 && postOwner[0].user_id !== currentUserId) {
            await query(
                'INSERT INTO notifications (user_id, actor_id, type, post_id) VALUES (?, ?, ?, ?)',
                [postOwner[0].user_id, currentUserId, 'comment', postId]
            ).catch(() => {});
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Add Comment Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// DELETE /api/posts/[id]/comments?commentId=xxx
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const currentUserId = await getUserId();
        if (!currentUserId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const commentId = searchParams.get('commentId');

        if (!commentId) {
            return NextResponse.json({ error: 'Missing commentId' }, { status: 400 });
        }

        const { id: postId } = await params;

        // Verify authorization: current user must be the comment author OR the post author
        const checkSql = `
            SELECT c.user_id AS comment_author, p.user_id AS post_author
            FROM comments c
            JOIN posts p ON c.post_id = p.id
            WHERE c.id = ? AND c.post_id = ?
        `;
        const result = await query(checkSql, [commentId, postId]) as Array<Record<string, unknown>>;

        if (result.length === 0) {
            return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
        }

        const commentAuthorId = result[0].comment_author;
        const postAuthorId = result[0].post_author;

        if (currentUserId !== commentAuthorId && currentUserId !== postAuthorId) {
            return NextResponse.json({ error: 'Not authorized to delete this comment' }, { status: 403 });
        }

        // Output of the delete
        await query('DELETE FROM comments WHERE id = ?', [commentId]);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete Comment Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
