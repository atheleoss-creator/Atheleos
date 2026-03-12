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

// GET /api/messages/[conversationId]/poll?after=TIMESTAMP
// Efficient polling endpoint: returns only new messages since the given timestamp
// Also returns the other user's typing status and read receipt updates
export async function GET(req: Request, { params }: { params: Promise<{ conversationId: string }> }) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { conversationId } = await params;
    const { searchParams } = new URL(req.url);
    const after = searchParams.get('after'); // ISO timestamp or null

    // Verify user is a participant
    const participant: any = await query(
      'SELECT * FROM conversation_participants WHERE conversation_id = ? AND user_id = ?',
      [conversationId, userId]
    );
    if (participant.length === 0) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
    }

    // Fetch only new messages (after the given timestamp)
    let newMessages: any;
    if (after) {
      newMessages = await query(`
        SELECT m.id, m.content, m.sender_id, m.is_read, m.created_at, m.iv, m.recipient_encrypted_key, m.sender_encrypted_key,
               u.username, u.avatar_url
        FROM messages m
        JOIN users u ON m.sender_id = u.id
        WHERE m.conversation_id = ? AND m.created_at > ?
        ORDER BY m.created_at ASC
      `, [conversationId, after]);
    } else {
      newMessages = [];
    }

    // Check if the other user has read our messages (read receipt)
    const unreadByOther: any = await query(
      'SELECT COUNT(*) as count FROM messages WHERE conversation_id = ? AND sender_id = ? AND is_read = FALSE',
      [conversationId, userId]
    );
    const allRead = unreadByOther[0].count === 0;

    // Mark received messages as read (since we're actively polling = actively viewing)
    if (newMessages.length > 0) {
      await query(
        'UPDATE messages SET is_read = TRUE WHERE conversation_id = ? AND sender_id != ? AND is_read = FALSE',
        [conversationId, userId]
      );
    }

    return NextResponse.json({
      messages: newMessages,
      allRead,       // true if the other user has read all our messages
      timestamp: new Date().toISOString(), // use this as the next 'after' param
    }, { status: 200 });
  } catch (error) {
    console.error('Poll Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
