import {
    ref,
    get,
    query,
    orderByChild,
    startAt,
    endAt,
    limitToFirst,
} from 'firebase/database';
import { database } from './config';

export interface SearchUserResult {
    id: string;
    displayName: string;
    avatar: string;
    robloxUsername: string | null;
    robloxUsernameVerified: boolean;
}

const SEARCH_LIMIT = 15;

/**
 * Search users by displayName prefix in Firebase RTDB.
 * Matches the sibling RN project's SocialDashboard search pattern.
 * Case-insensitive via dual query (lowercase + uppercase-first).
 */
export async function searchUsers(
    searchQuery: string,
    currentUserId?: string | null,
    limit = SEARCH_LIMIT,
): Promise<SearchUserResult[]> {
    const trimmed = searchQuery.trim();
    if (trimmed.length < 2) return [];

    // Sanitize: strip chars invalid in Firebase RTDB queries
    const sanitized = trimmed.replace(/[.#$[\]\\/]/g, '');
    if (!sanitized) return [];

    const lower = sanitized.toLowerCase();
    const upperFirst = lower.charAt(0).toUpperCase() + lower.slice(1);
    const variants = lower === upperFirst ? [lower] : [lower, upperFirst];

    const seen = new Set<string>();
    const results: SearchUserResult[] = [];

    for (const variant of variants) {
        const q = query(
            ref(database, 'users'),
            orderByChild('displayName'),
            startAt(variant),
            endAt(variant + '\uf8ff'),
            limitToFirst(limit),
        );

        try {
            const snapshot = await get(q);
            if (!snapshot.exists()) continue;

            const data = snapshot.val() as Record<string, Record<string, unknown>>;
            for (const [id, userData] of Object.entries(data)) {
                // Skip current user and duplicates
                if (id === currentUserId || seen.has(id)) continue;
                seen.add(id);

                results.push({
                    id,
                    displayName:
                        (userData.displayName as string) ||
                        (userData.userName as string) ||
                        'Unknown',
                    avatar:
                        (userData.avatar as string) ||
                        'https://bloxfruitscalc.com/wp-content/uploads/2025/display-pic.png',
                    robloxUsername: (userData.robloxUsername as string) || null,
                    robloxUsernameVerified:
                        (userData.robloxUsernameVerified as boolean) || false,
                });
            }
        } catch (err) {
            console.error('Search error for variant:', variant, err);
        }
    }

    return results.slice(0, limit);
}
