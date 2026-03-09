import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

// Helper to get connected user ID from cookie
async function getUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get('atheleos_token')?.value;
  if (!token) return null;
  
  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    return decoded.id;
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const currentUserId = await getUserId();

    // Query to fetch posts along with user details, like counts, and if the current user liked/saved it
    const sql = `
      SELECT 
        p.id, p.media_url as mediaUrl, p.media_type as mediaType, p.caption, p.location, p.created_at as createdAt,
        u.username, u.avatar_url as avatarUrl,
        (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.id) as likes,
        (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) as comments,
        (SELECT COUNT(*) > 0 FROM likes l WHERE l.post_id = p.id AND l.user_id = ?) as isLiked,
        (SELECT COUNT(*) > 0 FROM saved_posts s WHERE s.post_id = p.id AND s.user_id = ?) as isSaved
      FROM posts p
      JOIN users u ON p.user_id = u.id
      ORDER BY p.created_at DESC
      LIMIT 20
    `;

    // Use current user id for isLiked and isSaved checks (0 if not logged in)
    const userId = currentUserId || 0;
    
    const rows: any = await query(sql, [userId, userId]);
    
    // Format boolean fields properly for frontend
    const posts = rows.map((post: any) => ({
      ...post,
      isLiked: !!post.isLiked,
      isSaved: !!post.isSaved,
      type: 'post' // Helper to map with frontend Mock data union structure
    }));

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error('Fetch Posts Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const currentUserId = await getUserId();
    
    if (!currentUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { mediaUrl, mediaType = 'image', caption, location } = await req.json();

    const insertSql = `
      INSERT INTO posts (user_id, media_url, media_type, caption, location)
      VALUES (?, ?, ?, ?, ?)
    `;

    const result: any = await query(insertSql, [currentUserId, mediaUrl, mediaType, caption || null, location || null]);

    return NextResponse.json({ success: true, postId: result.insertId }, { status: 201 });
  } catch (error) {
    console.error('Create Post Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const currentUserId = await getUserId();
    if (!currentUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const postId = searchParams.get('id');

    if (!postId) {
      return NextResponse.json({ error: 'Missing post id' }, { status: 400 });
    }

    // Verify ownership
    const post: any = await query('SELECT user_id FROM posts WHERE id = ?', [postId]);
    if (post.length === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    if (post[0].user_id !== currentUserId) {
      return NextResponse.json({ error: 'Not authorized to delete this post' }, { status: 403 });
    }

    // Delete related data first, then the post
    await query('DELETE FROM likes WHERE post_id = ?', [postId]);
    await query('DELETE FROM comments WHERE post_id = ?', [postId]);
    await query('DELETE FROM saved_posts WHERE post_id = ?', [postId]).catch(() => {});
    await query('DELETE FROM posts WHERE id = ?', [postId]);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Delete Post Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

