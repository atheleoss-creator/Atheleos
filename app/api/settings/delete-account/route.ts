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

// DELETE /api/settings/delete-account
export async function DELETE() {
    try {
        const currentUserId = await getUserId();
        if (!currentUserId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Execute the delete query
        // The users table and related tables use ON DELETE CASCADE, which will wipe out posts, comments, likes, messages, etc. automatically
        await query('DELETE FROM users WHERE id = ?', [currentUserId]);

        // Securely wipe the client token from cookies
        const cookieStore = await cookies();
        cookieStore.delete('atheleos_token');

        return NextResponse.json({ success: true, message: 'Account permanently deleted' });
    } catch (error) {
        console.error('Account Deletion Error:', error);
        return NextResponse.json({ error: 'Internal server error while deleting account' }, { status: 500 });
    }
}
