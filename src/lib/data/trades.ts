// Fetches recent trades from Firestore via REST API (works server-side)
const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'adoptme-7b50c';
const FIRESTORE_BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

export interface ServerTradeItem {
    name: string;
    type: string;
    valueType: string;
    isFly: boolean;
    isRide: boolean;
    image: string;
}

export interface ServerTrade {
    id: string;
    traderName: string;
    avatar: string | null;
    hasItems: ServerTradeItem[];
    wantsItems: ServerTradeItem[];
    hasTotal: number;
    wantsTotal: number;
    status: 'w' | 'l' | 'f';
    description: string;
    isPro: boolean;
    isFeatured: boolean;
    timestamp: number;
    robloxUsername?: string | null;
    robloxUsernameVerified?: boolean;
}

function parseTradeItems(arr: unknown): ServerTradeItem[] {
    if (!Array.isArray(arr)) return [];
    return arr.map((item: Record<string, unknown>) => {
        const mv = item.mapValue as Record<string, unknown> | undefined;
        const f = (mv?.fields || {}) as Record<string, Record<string, unknown>>;
        return {
            name: (f.name?.stringValue as string) || '',
            type: (f.type?.stringValue as string) || '',
            valueType: (f.valueType?.stringValue as string) || '',
            isFly: (f.isFly?.booleanValue as boolean) || false,
            isRide: (f.isRide?.booleanValue as boolean) || false,
            image: (f.image?.stringValue as string) || '',
        };
    });
}

/**
 * Fetch 10 most recent trades from Firestore via REST API.
 * Ordered by timestamp desc. Uses ISR caching.
 */
export async function fetchTradesServer(): Promise<ServerTrade[]> {
    try {
        const body = {
            structuredQuery: {
                from: [{ collectionId: 'trades_new' }],
                select: {
                    fields: [
                        { fieldPath: 'traderName' },
                        { fieldPath: 'avatar' },
                        { fieldPath: 'hasItems' },
                        { fieldPath: 'wantsItems' },
                        { fieldPath: 'hasTotal' },
                        { fieldPath: 'wantsTotal' },
                        { fieldPath: 'status' },
                        { fieldPath: 'description' },
                        { fieldPath: 'isPro' },
                        { fieldPath: 'isFeatured' },
                        { fieldPath: 'timestamp' },
                        { fieldPath: 'robloxUsername' },
                        { fieldPath: 'robloxUsernameVerified' },
                    ],
                },
                orderBy: [
                    { field: { fieldPath: 'timestamp' }, direction: 'DESCENDING' },
                ],
                limit: 12,
            },
        };

        const res = await fetch(`${FIRESTORE_BASE}:runQuery`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
            next: { revalidate: 300 }, // ISR: 5 min — client handles real-time
        });

        if (!res.ok) {
            console.error('Firestore trades REST query failed:', res.status);
            return [];
        }

        const data = await res.json();
        if (!Array.isArray(data)) return [];

        const trades: ServerTrade[] = data
            .filter((item: Record<string, unknown>) => item.document)
            .map((item: Record<string, unknown>) => {
                const doc = item.document as Record<string, unknown>;
                const fields = doc.fields as Record<string, Record<string, unknown>>;
                const fullName = doc.name as string;
                const id = fullName.split('/').pop() || '';

                // Parse array fields (hasItems, wantsItems)
                const hasItemsArr = fields.hasItems?.arrayValue as Record<string, unknown> | undefined;
                const wantsItemsArr = fields.wantsItems?.arrayValue as Record<string, unknown> | undefined;

                // Parse timestamp
                let timestamp = 0;
                if (fields.timestamp?.timestampValue) {
                    timestamp = new Date(fields.timestamp.timestampValue as string).getTime();
                } else if (fields.timestamp?.integerValue) {
                    timestamp = parseInt(String(fields.timestamp.integerValue), 10);
                }

                return {
                    id,
                    traderName: (fields.traderName?.stringValue as string) || 'Trader',
                    avatar: (fields.avatar?.stringValue as string) || null,
                    hasItems: parseTradeItems(hasItemsArr?.values),
                    wantsItems: parseTradeItems(wantsItemsArr?.values),
                    hasTotal: parseInt(String(fields.hasTotal?.integerValue || fields.hasTotal?.doubleValue || '0'), 10),
                    wantsTotal: parseInt(String(fields.wantsTotal?.integerValue || fields.wantsTotal?.doubleValue || '0'), 10),
                    status: ((fields.status?.stringValue as string) || 'f') as 'w' | 'l' | 'f',
                    description: (fields.description?.stringValue as string) || '',
                    isPro: (fields.isPro?.booleanValue as boolean) || false,
                    isFeatured: (fields.isFeatured?.booleanValue as boolean) || false,
                    timestamp,
                    robloxUsername: (fields.robloxUsername?.stringValue as string) || null,
                    robloxUsernameVerified: (fields.robloxUsernameVerified?.booleanValue as boolean) || false,
                };
            });

        return trades;
    } catch (err) {
        console.error('Error fetching trades server-side:', err);
        return [];
    }
}
