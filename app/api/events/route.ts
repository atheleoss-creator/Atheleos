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

// GET /api/events — List all events
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status'); // 'upcoming', 'ongoing', 'completed'
    const sport = searchParams.get('sport');
    const search = searchParams.get('q');

    let sql = 'SELECT * FROM events WHERE 1=1';
    const params: any[] = [];

    if (status) {
      sql += ' AND status = ?';
      params.push(status);
    }

    if (sport && sport !== 'All') {
      sql += ' AND sport = ?';
      params.push(sport);
    }

    if (search) {
      sql += ' AND (title LIKE ? OR location LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    sql += ' ORDER BY created_at DESC LIMIT 50';

    const events = await query(sql, params);
    return NextResponse.json({ events }, { status: 200 });
  } catch (error) {
    console.error('List Events Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/events — Create a new event (admin only)
export async function POST(req: Request) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { title, sport, description, event_date, location, image_url, status, max_teams } = await req.json();

    if (!title?.trim()) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const result: any = await query(`
      INSERT INTO events (title, sport, description, event_date, location, image_url, status, max_teams, created_by)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [title, sport || null, description || null, event_date || null, location || null, image_url || null, status || 'upcoming', max_teams || 16, userId]);

    return NextResponse.json({ success: true, eventId: result.insertId }, { status: 201 });
  } catch (error) {
    console.error('Create Event Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
