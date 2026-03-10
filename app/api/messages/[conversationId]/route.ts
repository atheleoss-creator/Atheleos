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

// GET /api/messages/[conversationId] — Get messages in a conversation
export async function GET(req: Request, { params }: { params: Promise<{ conversationId: string }> }) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { conversationId } = await params;

    // Verify user is a participant
    const participant: any = await query(
      'SELECT * FROM conversation_participants WHERE conversation_id = ? AND user_id = ?',
      [conversationId, userId]
    );

    if (participant.length === 0) {
      return NextResponse.json({ error: 'Not authorized to view this conversation' }, { status: 403 });
    }

    // Fetch messages
    const messages: any = await query(`
      SELECT m.id, m.content, m.sender_id, m.is_read, m.created_at,
             u.username, u.avatar_url
      FROM messages m
      JOIN users u ON m.sender_id = u.id
      WHERE m.conversation_id = ?
      ORDER BY m.created_at ASC
      LIMIT 100
    `, [conversationId]);

    // Mark messages as read
    await query(
      'UPDATE messages SET is_read = TRUE WHERE conversation_id = ? AND sender_id != ?',
      [conversationId, userId]
    );

    // Get the other participant's info
    const otherUser: any = await query(`
      SELECT u.id, u.username, u.full_name, u.avatar_url
      FROM conversation_participants cp
      JOIN users u ON cp.user_id = u.id
      WHERE cp.conversation_id = ? AND cp.user_id != ?
    `, [conversationId, userId]);

    return NextResponse.json({ 
      messages, 
      otherUser: otherUser[0] || null 
    }, { status: 200 });
  } catch (error) {
    console.error('Fetch Messages Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/messages/[conversationId] — Send a message in an existing conversation
export async function POST(req: Request, { params }: { params: Promise<{ conversationId: string }> }) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { conversationId } = await params;
    const { content } = await req.json();

    if (!content?.trim()) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    // Verify user is a participant
    const participant: any = await query(
      'SELECT * FROM conversation_participants WHERE conversation_id = ? AND user_id = ?',
      [conversationId, userId]
    );

    if (participant.length === 0) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
    }

    await query('INSERT INTO messages (conversation_id, sender_id, content) VALUES (?, ?, ?)',
      [conversationId, userId, content.trim()]);

    await query('UPDATE conversations SET updated_at = NOW() WHERE id = ?', [conversationId]);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Send Message Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/messages/[conversationId] — Mark messages as read
export async function PUT(req: Request, { params }: { params: Promise<{ conversationId: string }> }) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { conversationId } = await params;

    await query(
      'UPDATE messages SET is_read = TRUE WHERE conversation_id = ? AND sender_id != ? AND is_read = FALSE',
      [conversationId, userId]
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Mark Read Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
