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

export async function POST(req: Request, { params }: { params: Promise<{ conversationId: string }> }) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { conversationId } = await params;

    // We only update the typing indicator for the person typing (userId)
    // so the *other* person can see it.
    await query(
      'UPDATE conversation_participants SET last_typing_at = NOW() WHERE conversation_id = ? AND user_id = ?',
      [conversationId, userId]
    ).catch(async (err: any) => {
        // Auto-migrate if column doesn't exist
        if (err.code === 'ER_BAD_FIELD_ERROR' || err.message?.includes("Unknown column")) {
            await query(`ALTER TABLE conversation_participants ADD COLUMN last_typing_at DATETIME NULL`);
            await query(
                'UPDATE conversation_participants SET last_typing_at = NOW() WHERE conversation_id = ? AND user_id = ?',
                [conversationId, userId]
            );
        } else {
            throw err;
        }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    // Fail silently so we don't break frontend
    return NextResponse.json({ success: false });
  }
}
