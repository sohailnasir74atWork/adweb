import { NextResponse } from 'next/server';
import { config } from '@/lib/constants/config';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const res = await fetch(`${config.tradeAnalyticsUrl}?cb=${Date.now()}`);
        if (!res.ok) {
            return NextResponse.json(null, { status: 200 });
        }
        const data = await res.json();
        return NextResponse.json(data);
    } catch {
        return NextResponse.json(null, { status: 200 });
    }
}
