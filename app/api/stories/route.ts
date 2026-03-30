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

// GET /api/stories — Fetch active (not expired) stories grouped by user
export async function GET() {
    try {
        const rows: any = await query(`
            SELECT 
                s.id, s.media_url, s.media_type, s.created_at, s.expires_at, s.user_id,
                u.username, u.avatar_url, u.full_name, u.is_verified, u.verification_level
            FROM stories s
            JOIN users u ON s.user_id = u.id
            WHERE s.expires_at > NOW()
            ORDER BY s.created_at DESC
        `);

        // Group by user
        const groupedMap = new Map<number, any>();
        for (const story of rows) {
            if (!groupedMap.has(story.user_id)) {
                groupedMap.set(story.user_id, {
                    userId: story.user_id,
                    username: story.username,
                    avatarUrl: story.avatar_url || '/default_avatar.svg',
                    fullName: story.full_name,
                    isVerified: !!story.is_verified,
                    verificationLevel: story.verification_level,
                    stories: [],
                });
            }
            groupedMap.get(story.user_id).stories.push({
                id: story.id,
                mediaUrl: story.media_url,
                mediaType: story.media_type,
                createdAt: story.created_at,
                expiresAt: story.expires_at,
            });
        }

        const storyGroups = Array.from(groupedMap.values());

        return NextResponse.json({ storyGroups });
    } catch (error) {
        console.error('Fetch Stories Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// POST /api/stories — Create a new story
export async function POST(req: Request) {
    try {
        const currentUserId = await getUserId();
        if (!currentUserId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { mediaUrl, mediaType = 'image' } = await req.json();

        if (!mediaUrl) {
            return NextResponse.json({ error: 'Media URL is required' }, { status: 400 });
        }

        await query(
            'INSERT INTO stories (user_id, media_url, media_type) VALUES (?, ?, ?)',
            [currentUserId, mediaUrl, mediaType]
        );

        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        console.error('Create Story Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
