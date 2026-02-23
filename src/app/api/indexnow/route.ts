import { NextRequest, NextResponse } from 'next/server';
import { fetchPetDataServer } from '@/lib/data/pets';
import { slugify } from '@/lib/utils/slugify';

const DOMAIN = 'https://adoptmevalues.app';
const INDEXNOW_KEY = 'b4d7e2a1c8f5039d';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

// Static pages to submit
const STATIC_PAGES = [
    '/',
    '/values',
    '/calculator',
    '/trades',
    '/feed',
    '/chat',
    '/analytics',
    '/scammer',
    '/news',
];

/**
 * POST /api/indexnow
 * Submit all site URLs to IndexNow (Bing, Yandex, Seznam, Naver)
 * 
 * Optional body: { urls?: string[] }
 * - If urls provided, submit only those specific URLs
 * - If no urls provided, submit all static pages + all item pages
 */
export async function POST(request: NextRequest) {
    try {
        // Check for optional custom URL list
        let urlList: string[] = [];

        try {
            const body = await request.json();
            if (body.urls && Array.isArray(body.urls)) {
                urlList = body.urls;
            }
        } catch {
            // No body or invalid JSON — we'll submit all URLs
        }

        // If no custom URLs, build the full URL list
        if (urlList.length === 0) {
            // Add static pages
            const staticUrls = STATIC_PAGES.map((path) => `${DOMAIN}${path}`);

            // Add all item pages (pets, toys, vehicles, etc.)
            const allItems = await fetchPetDataServer();
            const itemUrls = allItems.map(
                (item) => `${DOMAIN}/values/${slugify(item.name)}`
            );

            urlList = [...staticUrls, ...itemUrls];
        }

        // Submit to IndexNow
        const response = await fetch(INDEXNOW_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify({
                host: 'adoptmevalues.app',
                key: INDEXNOW_KEY,
                keyLocation: `${DOMAIN}/${INDEXNOW_KEY}.txt`,
                urlList,
            }),
        });

        if (response.ok) {
            return NextResponse.json({
                success: true,
                message: `Successfully submitted ${urlList.length} URLs to IndexNow`,
                urlCount: urlList.length,
            });
        } else {
            const errorText = await response.text();
            return NextResponse.json(
                {
                    success: false,
                    message: `IndexNow returned status ${response.status}`,
                    error: errorText,
                },
                { status: response.status }
            );
        }
    } catch (error) {
        console.error('IndexNow submission error:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to submit to IndexNow',
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}

/**
 * GET /api/indexnow
 * Returns info about the IndexNow integration status
 */
export async function GET() {
    return NextResponse.json({
        status: 'active',
        key: INDEXNOW_KEY,
        keyLocation: `${DOMAIN}/${INDEXNOW_KEY}.txt`,
        endpoint: INDEXNOW_ENDPOINT,
        searchEngines: ['Bing', 'Yandex', 'Seznam', 'Naver'],
        usage: 'POST to this endpoint to submit URLs. Send { "urls": [...] } for specific URLs, or empty body for all pages.',
    });
}
