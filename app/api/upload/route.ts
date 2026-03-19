import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import cloudinary from '@/lib/cloudinary';

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

export async function POST(req: Request) {
    try {
        const userId = await getUserId();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { data } = body;

        if (!data) {
            return NextResponse.json({ error: 'No data provided' }, { status: 400 });
        }

        const uploadResponse = await cloudinary.uploader.upload(data, {
            upload_preset: 'ml_default', // Ensure you have an unsigned preset in Cloudinary settings, or remove this if not using presets
            resource_type: 'auto',       // This allows both images and videos
            folder: `atheleos/user_${userId}`, // Keep things organized
        });

        // Return the secure URL
        return NextResponse.json({ success: true, url: uploadResponse.secure_url }, { status: 200 });
    } catch (error: any) {
        console.error('Cloudinary upload error:', error);
        return NextResponse.json({ error: error.message || 'Something went wrong with the upload' }, { status: 500 });
    }
}
