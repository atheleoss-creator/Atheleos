import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import * as jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_super_secret_jwt_key_here') as any;
    const { publicKey } = await req.json();

    if (!publicKey) {
      return NextResponse.json({ error: 'Public key is required' }, { status: 400 });
    }

    await query('UPDATE users SET public_key = ? WHERE id = ?', [publicKey, decoded.id]);

    return NextResponse.json({ success: true, message: 'Public key updated' }, { status: 200 });
  } catch (error: any) {
    console.error('Update Key Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
