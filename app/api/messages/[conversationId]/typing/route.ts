import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

// Module-level typing status map (persists across requests in the same process)
// Key: `${conversationId}_${userId}` -> timestamp (ms)
const typingMap = new Map<string, number>();

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

// POST /api/messages/[conversationId]/typing — Set typing status
export async function POST(req: Request, { params }: { params: Promise<{ conversationId: string }> }) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { conversationId } = await params;
    const key = `${conversationId}_${userId}`;
    typingMap.set(key, Date.now());

    // Auto-clean old entries (older than 10 seconds)
    for (const [k, v] of typingMap.entries()) {
      if (Date.now() - v > 10000) typingMap.delete(k);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET /api/messages/[conversationId]/typing — Check if other user is typing
export async function GET(req: Request, { params }: { params: Promise<{ conversationId: string }> }) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { conversationId } = await params;

    // Find the other participant
    const otherUser: any = await query(
      `SELECT user_id FROM conversation_participants WHERE conversation_id = ? AND user_id != ?`,
      [conversationId, userId]
    );

    let isTyping = false;
    if (otherUser.length > 0) {
      const otherUserId = otherUser[0].user_id;
      const key = `${conversationId}_${otherUserId}`;
      const lastTyped = typingMap.get(key);
      // Consider "typing" if within last 3 seconds
      isTyping = !!lastTyped && (Date.now() - lastTyped < 3000);
    }

    return NextResponse.json({ isTyping }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
