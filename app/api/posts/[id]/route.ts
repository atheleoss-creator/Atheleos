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

// GET /api/posts/[id] — Fetch a single post with author, likes, comments, isLiked, isSaved
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: postId } = await params;
        const currentUserId = (await getUserId()) || 0;

        const rows: any = await query(`
            SELECT 
                p.id, p.media_url AS mediaUrl, p.media_type AS mediaType,
                p.caption, p.location, p.created_at AS createdAt, p.user_id,
                u.username, u.avatar_url AS avatarUrl, u.full_name AS fullName,
                u.is_verified AS isVerified, u.verification_level AS verificationLevel,
                (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.id) AS likes,
                (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) AS comments,
                (SELECT COUNT(*) > 0 FROM likes l WHERE l.post_id = p.id AND l.user_id = ?) AS isLiked,
                (SELECT COUNT(*) > 0 FROM saved_posts s WHERE s.post_id = p.id AND s.user_id = ?) AS isSaved
            FROM posts p
            JOIN users u ON p.user_id = u.id
            WHERE p.id = ? AND IFNULL(p.is_hidden, 0) = 0
        `, [currentUserId, currentUserId, postId]);

        if (!rows || rows.length === 0) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        const post = {
            ...rows[0],
            isLiked: !!rows[0].isLiked,
            isSaved: !!rows[0].isSaved,
            isVerified: !!rows[0].isVerified,
        };

        return NextResponse.json({ post });
    } catch (error) {
        console.error('Fetch Single Post Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// PUT /api/posts/[id] — Edit post caption
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: postId } = await params;
        const currentUserId = await getUserId();

        if (!currentUserId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { caption } = body;

        // Verify post ownership
        const rows: any = await query('SELECT user_id FROM posts WHERE id = ?', [postId]);
        if (!rows || rows.length === 0) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        if (rows[0].user_id !== currentUserId) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // Update post
        await query('UPDATE posts SET caption = ? WHERE id = ?', [caption, postId]);

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Update Post Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
