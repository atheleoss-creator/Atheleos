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
    const decoded: any = jwt.verify(token, JWT_SECRET);
    return decoded.id;
  } catch {
    return null;
  }
}

// GET /api/messages — List all conversations for the current user
export async function GET() {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const conversations: any = await query(`
      SELECT 
        c.id as conversationId,
        c.updated_at,
        u.id as userId, u.username, u.full_name, u.avatar_url,
        (SELECT content FROM messages WHERE conversation_id = c.id ORDER BY created_at DESC LIMIT 1) as lastMessage,
        (SELECT created_at FROM messages WHERE conversation_id = c.id ORDER BY created_at DESC LIMIT 1) as lastMessageTime,
        (SELECT COUNT(*) FROM messages WHERE conversation_id = c.id AND sender_id != ? AND is_read = FALSE) as unreadCount
      FROM conversations c
      JOIN conversation_participants cp ON c.id = cp.conversation_id
      JOIN conversation_participants cp2 ON c.id = cp2.conversation_id AND cp2.user_id != ?
      JOIN users u ON cp2.user_id = u.id
      WHERE cp.user_id = ?
      ORDER BY c.updated_at DESC
    `, [userId, userId, userId]);

    return NextResponse.json({ conversations }, { status: 200 });
  } catch (error) {
    console.error('List Conversations Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/messages — Start a new conversation or send a message
export async function POST(req: Request) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { targetUserId, content } = await req.json();

    if (!targetUserId || !content?.trim()) {
      return NextResponse.json({ error: 'targetUserId and content are required' }, { status: 400 });
    }

    // Check if conversation already exists between these two users
    const existing: any = await query(`
      SELECT cp1.conversation_id 
      FROM conversation_participants cp1
      JOIN conversation_participants cp2 ON cp1.conversation_id = cp2.conversation_id
      WHERE cp1.user_id = ? AND cp2.user_id = ?
    `, [userId, targetUserId]);

    let conversationId: number;

    if (existing.length > 0) {
      conversationId = existing[0].conversation_id;
    } else {
      // Create new conversation
      const result: any = await query('INSERT INTO conversations () VALUES ()');
      conversationId = result.insertId;

      // Add both participants
      await query('INSERT INTO conversation_participants (conversation_id, user_id) VALUES (?, ?), (?, ?)', 
        [conversationId, userId, conversationId, targetUserId]);
    }

    // Insert message
    await query('INSERT INTO messages (conversation_id, sender_id, content) VALUES (?, ?, ?)',
      [conversationId, userId, content.trim()]);

    // Update conversation timestamp
    await query('UPDATE conversations SET updated_at = NOW() WHERE id = ?', [conversationId]);

    return NextResponse.json({ success: true, conversationId }, { status: 201 });
  } catch (error) {
    console.error('Send Message Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
