import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

function authenticateRequest(req: Request) {
    const token = cookies().get('atheleos_token')?.value;
    if (!token) return null;
    try {
        return jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret') as any;
    } catch {
        return null;
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const category = searchParams.get('category');
        const search = searchParams.get('q');
        
        let sql = `
            SELECT m.*, u.username, u.full_name, u.avatar_url 
            FROM marketplace_items m
            JOIN users u ON m.seller_id = u.id
            WHERE m.status = 'listed'
        `;
        const params: any[] = [];

        if (category && category !== 'All') {
            sql += ` AND m.category = ?`;
            params.push(category);
        }

        if (search) {
            sql += ` AND (m.title LIKE ? OR m.description LIKE ?)`;
            params.push(`%${search}%`, `%${search}%`);
        }

        sql += ` ORDER BY m.created_at DESC`;

        const items = await query(sql, params);

        return NextResponse.json({ success: true, items }, { status: 200 });

    } catch (error) {
        console.error('Marketplace GET Error:', error);
        return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const user = authenticateRequest(req);
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { title, description, price, category, condition_state, image_url } = body;

        if (!title || !price) {
            return NextResponse.json({ error: 'Title and price are required' }, { status: 400 });
        }

        const insertQuery = `
            INSERT INTO marketplace_items 
            (seller_id, title, description, price, category, condition_state, image_url)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        await query(insertQuery, [
            user.id,
            title,
            description || null,
            parseFloat(price),
            category || 'Equipment',
            condition_state || 'Used',
            image_url || null
        ]);

        return NextResponse.json({ success: true, message: 'Item listed successfully' }, { status: 201 });

    } catch (error) {
        console.error('Marketplace POST Error:', error);
        return NextResponse.json({ error: 'Failed to create listing' }, { status: 500 });
    }
}
