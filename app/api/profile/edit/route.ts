import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

export async function PUT(req: Request) {
    try {
        // 1. Authenticate Request
        const cookieStore = await cookies();
        const token = cookieStore.get('atheleos_token')?.value;

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const decoded: any = jwt.verify(token, JWT_SECRET);
        const userId = decoded.id;

        // 2. Extract editable body payload
        const updates = await req.json();
        
        // Allowed fields mapping logic
        const allowedFields = [
            'full_name', 'bio', 'sport', 'position', 'height', 
            'weight', 'top_speed', 'vertical_leap', 'recruiting_status', 
            'city', 'state'
        ];

        const sqlSetClauses = [];
        const queryParams = [];

        for (const [key, value] of Object.entries(updates)) {
            if (allowedFields.includes(key) && value !== undefined) {
                sqlSetClauses.push(`${key} = ?`);
                queryParams.push(value);
            }
        }

        if (sqlSetClauses.length === 0) {
             return NextResponse.json({ error: 'No valid fields provided for update' }, { status: 400 });
        }

        queryParams.push(userId); // For the WHERE clause

        const sql = `UPDATE users SET ${sqlSetClauses.join(', ')} WHERE id = ?`;
        
        await query(sql, queryParams);

        return NextResponse.json({ success: true, message: 'Profile updated successfully' }, { status: 200 });

    } catch (error) {
        console.error('Update Profile Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
