import { NextRequest, NextResponse } from 'next/server';

const BUNNY_STORAGE_HOST = 'storage.bunnycdn.com';
const BUNNY_STORAGE_ZONE = 'post-gag';
const BUNNY_ACCESS_KEY = '1b7e1a85-dff7-4a98-ba701fc7f9b9-6542-46e2';
const BUNNY_CDN_BASE = 'https://pull-gag.b-cdn.net';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File | null;
        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        const fileName = `scam_${Date.now()}_${Math.random().toString(36).slice(2, 9)}.jpg`;
        const remotePath = `scammer/${fileName}`;
        const bytes = await file.arrayBuffer();

        const res = await fetch(`https://${BUNNY_STORAGE_HOST}/${BUNNY_STORAGE_ZONE}/${remotePath}`, {
            method: 'PUT',
            headers: {
                AccessKey: BUNNY_ACCESS_KEY,
                'Content-Type': 'image/jpeg',
            },
            body: bytes,
        });

        if (!res.ok) {
            return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
        }

        return NextResponse.json({ url: `${BUNNY_CDN_BASE}/${remotePath}` });
    } catch (err) {
        console.error('Upload error:', err);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
