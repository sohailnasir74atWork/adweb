// Fetches all active groups from Firestore via REST API (works server-side)
const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'adoptme-7b50c';
const FIRESTORE_BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

export interface ServerGroup {
    id: string;
    groupName: string;
    description: string | null;
    avatar: string | null;
    memberCount: number;
}

/**
 * Fetch all active public groups from Firestore via REST API.
 * Uses structured query to filter isActive == true.
 */
export async function fetchGroupsServer(): Promise<ServerGroup[]> {
    try {
        const body = {
            structuredQuery: {
                from: [{ collectionId: 'groups' }],
                select: {
                    fields: [
                        { fieldPath: 'groupName' },
                        { fieldPath: 'name' },
                        { fieldPath: 'description' },
                        { fieldPath: 'avatar' },
                        { fieldPath: 'memberCount' },
                    ],
                },
                where: {
                    fieldFilter: {
                        field: { fieldPath: 'isActive' },
                        op: 'EQUAL',
                        value: { booleanValue: true },
                    },
                },
                limit: 12,
            },
        };

        const res = await fetch(`${FIRESTORE_BASE}:runQuery`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
            next: { revalidate: 300 }, // ISR: 5 minutes
        });

        if (!res.ok) {
            console.error('Firestore REST query failed:', res.status);
            return [];
        }

        const data = await res.json();

        // Firestore REST returns array of { document: { fields: ... } }
        if (!Array.isArray(data)) return [];

        const groups: ServerGroup[] = data
            .filter((item: Record<string, unknown>) => item.document)
            .map((item: Record<string, unknown>) => {
                const doc = item.document as Record<string, unknown>;
                const fields = doc.fields as Record<string, Record<string, unknown>>;
                // Extract document ID from the full path
                const fullName = doc.name as string;
                const id = fullName.split('/').pop() || '';

                return {
                    id,
                    groupName: (fields.groupName?.stringValue as string) || (fields.name?.stringValue as string) || 'Group',
                    description: (fields.description?.stringValue as string) || null,
                    avatar: (fields.avatar?.stringValue as string) || null,
                    memberCount: parseInt(String(fields.memberCount?.integerValue || '0'), 10),
                };
            });

        // Sort by member count descending (popular groups first)
        groups.sort((a, b) => b.memberCount - a.memberCount);

        // Return first 12 for SSR
        return groups.slice(0, 12);
    } catch (err) {
        console.error('Error fetching groups server-side:', err);
        return [];
    }
}
