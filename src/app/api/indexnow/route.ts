import { NextRequest, NextResponse } from 'next/server';
import { fetchPetDataServer } from '@/lib/data/pets';
import { slugify } from '@/lib/utils/slugify';
import { locales, defaultLocale } from '@/i18n/config';

const DOMAIN = 'https://www.adoptmevalues.app';
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

function localizedUrl(path: string, locale: string): string {
    if (locale === defaultLocale) return `${DOMAIN}${path}`;
    return `${DOMAIN}/${locale}${path}`;
}

/**
 * POST /api/indexnow
 * Submit all site URLs (including all locale variants) to IndexNow
 * 
 * Optional body: { urls?: string[] }
 * - If urls provided, submit only those specific URLs
 * - If no urls provided, submit all static pages + all item pages × all locales
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

        // If no custom URLs, build the full URL list with all locales
        if (urlList.length === 0) {
            // Add static pages for all locales
            for (const path of STATIC_PAGES) {
                for (const locale of locales) {
                    urlList.push(localizedUrl(path, locale));
                }
            }

            // Add all item pages for all locales
            const allItems = await fetchPetDataServer();
            for (const item of allItems) {
                const slug = slugify(item.name);
                for (const locale of locales) {
                    urlList.push(localizedUrl(`/values/${slug}`, locale));
                }
            }
        }

        // Submit to IndexNow in batches (max 10,000 URLs per request)
        const BATCH_SIZE = 10000;
        const batches = [];
        for (let i = 0; i < urlList.length; i += BATCH_SIZE) {
            batches.push(urlList.slice(i, i + BATCH_SIZE));
        }

        let totalSubmitted = 0;
        const results = [];

        for (const batch of batches) {
            const response = await fetch(INDEXNOW_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                body: JSON.stringify({
                    host: 'adoptmevalues.app',
                    key: INDEXNOW_KEY,
                    keyLocation: `${DOMAIN}/${INDEXNOW_KEY}.txt`,
                    urlList: batch,
                }),
            });

            results.push({
                batchSize: batch.length,
                status: response.status,
                ok: response.ok,
            });

            if (response.ok) {
                totalSubmitted += batch.length;
            }
        }

        return NextResponse.json({
            success: totalSubmitted > 0,
            message: `Submitted ${totalSubmitted}/${urlList.length} URLs to IndexNow in ${batches.length} batch(es)`,
            urlCount: urlList.length,
            totalSubmitted,
            batches: results,
        });
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
