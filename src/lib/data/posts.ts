// Fetches recent posts from Firestore via REST API (works server-side)
const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'adoptme-7b50c';
const FIRESTORE_BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

export interface ServerPost {
    id: string;
    userId: string;
    displayName: string;
    avatar: string | null;
    imageUrl: string[];
    desc: string;
    likes: Record<string, boolean>;
    commentCount: number;
    createdAt: number; // epoch ms (serializable)
    selectedTags: string[];
    isPro?: boolean;
    robloxUsername?: string | null;
    robloxUsernameVerified?: boolean;
    hasRecentGameWin?: boolean;
    lastGameWinAt?: number | null;
    flage?: string | null;
}

/**
 * Fetch most recent posts from Firestore via REST API. ISR-cached.
 */
export async function fetchPostsServer(count = 5): Promise<ServerPost[]> {
    try {
        const body = {
            structuredQuery: {
                from: [{ collectionId: 'designPosts' }],
                select: {
                    fields: [
                        { fieldPath: 'userId' },
                        { fieldPath: 'displayName' },
                        { fieldPath: 'avatar' },
                        { fieldPath: 'imageUrl' },
                        { fieldPath: 'desc' },
                        { fieldPath: 'likes' },
                        { fieldPath: 'commentCount' },
                        { fieldPath: 'createdAt' },
                        { fieldPath: 'selectedTags' },
                        { fieldPath: 'isPro' },
                        { fieldPath: 'robloxUsername' },
                        { fieldPath: 'robloxUsernameVerified' },
                        { fieldPath: 'hasRecentGameWin' },
                        { fieldPath: 'lastGameWinAt' },
                        { fieldPath: 'flage' },
                    ],
                },
                orderBy: [
                    { field: { fieldPath: 'createdAt' }, direction: 'DESCENDING' },
                ],
                limit: count,
            },
        };

        const res = await fetch(`${FIRESTORE_BASE}:runQuery`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
            next: { revalidate: 300 }, // ISR: 5 minutes
        });

        if (!res.ok) {
            console.error('Firestore posts REST query failed:', res.status);
            return [];
        }

        const data = await res.json();
        if (!Array.isArray(data)) return [];

        return data
            .filter((item: Record<string, unknown>) => item.document)
            .map((item: Record<string, unknown>) => {
                const doc = item.document as Record<string, unknown>;
                const fields = doc.fields as Record<string, Record<string, unknown>>;
                const fullName = doc.name as string;
                const id = fullName.split('/').pop() || '';

                // Parse imageUrl array
                const imageUrlArr = fields.imageUrl?.arrayValue as Record<string, unknown> | undefined;
                const imageUrl: string[] = [];
                if (imageUrlArr?.values && Array.isArray(imageUrlArr.values)) {
                    for (const v of imageUrlArr.values as Record<string, unknown>[]) {
                        if (v.stringValue) imageUrl.push(v.stringValue as string);
                    }
                }

                // Parse likes map
                const likesMap = fields.likes?.mapValue as Record<string, unknown> | undefined;
                const likes: Record<string, boolean> = {};
                if (likesMap?.fields) {
                    const likeFields = likesMap.fields as Record<string, Record<string, unknown>>;
                    for (const [uid, val] of Object.entries(likeFields)) {
                        likes[uid] = (val.booleanValue as boolean) || false;
                    }
                }

                // Parse selectedTags array
                const tagsArr = fields.selectedTags?.arrayValue as Record<string, unknown> | undefined;
                const selectedTags: string[] = [];
                if (tagsArr?.values && Array.isArray(tagsArr.values)) {
                    for (const v of tagsArr.values as Record<string, unknown>[]) {
                        if (v.stringValue) selectedTags.push(v.stringValue as string);
                    }
                }

                // Parse timestamp
                let createdAt = 0;
                if (fields.createdAt?.timestampValue) {
                    createdAt = new Date(fields.createdAt.timestampValue as string).getTime();
                } else if (fields.createdAt?.integerValue) {
                    createdAt = parseInt(String(fields.createdAt.integerValue), 10);
                }

                return {
                    id,
                    userId: (fields.userId?.stringValue as string) || '',
                    displayName: (fields.displayName?.stringValue as string) || 'Player',
                    avatar: (fields.avatar?.stringValue as string) || null,
                    imageUrl,
                    desc: (fields.desc?.stringValue as string) || '',
                    likes,
                    commentCount: parseInt(String(fields.commentCount?.integerValue || '0'), 10),
                    createdAt,
                    selectedTags,
                    isPro: (fields.isPro?.booleanValue as boolean) || false,
                    robloxUsername: (fields.robloxUsername?.stringValue as string) || null,
                    robloxUsernameVerified: (fields.robloxUsernameVerified?.booleanValue as boolean) || false,
                    hasRecentGameWin: (fields.hasRecentGameWin?.booleanValue as boolean) || false,
                    lastGameWinAt: fields.lastGameWinAt?.integerValue
                        ? parseInt(String(fields.lastGameWinAt.integerValue), 10)
                        : null,
                    flage: (fields.flage?.stringValue as string) || null,
                };
            });
    } catch (err) {
        console.error('Error fetching posts server-side:', err);
        return [];
    }
}
