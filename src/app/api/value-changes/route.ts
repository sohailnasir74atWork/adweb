import { NextResponse } from 'next/server';
import { config } from '@/lib/constants/config';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const res = await fetch(`${config.valueChangesUrl}?cb=${Date.now()}`, {
            next: { revalidate: 3600 }, // cache 1 hour — changes daily
        });
        if (!res.ok) {
            return NextResponse.json({ changed: [] }, { status: 200 });
        }
        const data = await res.json();
        return NextResponse.json(data);
    } catch {
        return NextResponse.json({ changed: [] }, { status: 200 });
    }
}
