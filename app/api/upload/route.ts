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

        let dataToUpload: string;
        const contentType = req.headers.get('content-type') || '';

        if (contentType.includes('application/json')) {
            const body = await req.json();
            dataToUpload = body.data;
        } else if (contentType.includes('multipart/form-data')) {
            const formData = await req.formData();
            const file = formData.get('file') as File | null;
            if (!file) {
                return NextResponse.json({ error: 'No file provided' }, { status: 400 });
            }
            
            // Convert file to base64 for Cloudinary Node SDK
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            dataToUpload = `data:${file.type};base64,${buffer.toString('base64')}`;
        } else {
            return NextResponse.json({ error: 'Unsupported content type. Send JSON or FormData.' }, { status: 400 });
        }

        if (!dataToUpload) {
            return NextResponse.json({ error: 'No data provided' }, { status: 400 });
        }

        const uploadResponse = await cloudinary.uploader.upload(dataToUpload, {
            // upload_preset: 'ml_default', // Removed to avoid errors if preset is not configured. Signed uploads don't need it.
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
