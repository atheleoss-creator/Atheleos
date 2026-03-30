import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: Request, { params }: { params: Promise<{ username: string }> }) {
  try {
    const { username } = await params; // Get username from URL

    // 1. Fetch User Data (Excluding sensitives)
    const userQuery: any = await query(`
      SELECT 
        id, username, full_name, bio, avatar_url, cover_url, 
        is_verified, verification_level, role, 
        sport, position, height, weight, top_speed, vertical_leap, 
        recruiting_status, city, state, created_at
      FROM users 
      WHERE username = ?
    `, [username]);

    if (userQuery.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const user = userQuery[0];

    // 2. Fetch User Achievements
    const achievements: any = await query(`
      SELECT id, title, description, year, verified, icon_type
      FROM achievements
      WHERE user_id = ?
      ORDER BY year DESC
    `, [user.id]);

    // 3. Fetch User Posts (Feed aggregation)
    const posts: any = await query(`
      SELECT 
        p.id, p.caption, p.media_url, p.media_type, p.created_at,
        u.username, u.full_name, u.avatar_url, u.is_verified, u.verification_level,
        (SELECT COUNT(*) FROM likes WHERE post_id = p.id) as likes_count,
        (SELECT COUNT(*) FROM comments WHERE post_id = p.id) as comments_count
      FROM posts p
      JOIN users u ON p.user_id = u.id
      WHERE u.id = ? AND IFNULL(p.is_hidden, 0) = 0
      ORDER BY p.created_at DESC
      LIMIT 20
    `, [user.id]);

    // 4. Follower/Following Counts
    const followersQuery: any = await query('SELECT COUNT(*) as count FROM follows WHERE following_id = ?', [user.id]);
    const followingQuery: any = await query('SELECT COUNT(*) as count FROM follows WHERE follower_id = ?', [user.id]);

    const profileData = {
      ...user,
      followersCount: followersQuery[0].count,
      followingCount: followingQuery[0].count,
      achievements: achievements,
      posts: posts
    };

    return NextResponse.json({ success: true, profile: profileData }, { status: 200 });

  } catch (error) {
    console.error('Fetch Profile Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
