import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ username: string }> }
) {
    try {
        const { username } = await params;
        if (!username) return NextResponse.json({ error: 'Username required' }, { status: 400 });

        const users: any = await query('SELECT public_key FROM users WHERE username = ?', [username]);

        if (users.length === 0) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ publicKey: users[0].public_key }, { status: 200 });
    } catch (error) {
        console.error('Fetch Public Key Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
