'use client';

import { useState, useCallback } from 'react';
import { Users, MessageCircle, Smartphone, ArrowRight, Loader2, ChevronDown } from 'lucide-react';
import type { ServerGroup } from '@/lib/data/groups';

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'adoptme-7b50c';
const FIRESTORE_BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

const PAGE_SIZE = 12;

interface GroupsListProps {
    groups: ServerGroup[];
}

/**
 * Fetch next page of groups. Fetches all active groups, sorts by memberCount,
 * and returns the next PAGE_SIZE groups not already loaded.
 */
async function fetchMoreGroups(existingIds: Set<string>): Promise<ServerGroup[]> {
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
            limit: 200,
        },
    };

    const res = await fetch(`${FIRESTORE_BASE}:runQuery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    if (!res.ok) return [];
    const data = await res.json();
    if (!Array.isArray(data)) return [];

    const groups: ServerGroup[] = data
        .filter((item: Record<string, unknown>) => item.document)
        .map((item: Record<string, unknown>) => {
            const doc = item.document as Record<string, unknown>;
            const fields = doc.fields as Record<string, Record<string, unknown>>;
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

    // Sort by member count DESC, then return next page excluding already loaded
    groups.sort((a, b) => b.memberCount - a.memberCount);
    const remaining = groups.filter((g) => !existingIds.has(g.id));
    return remaining.slice(0, PAGE_SIZE);
}

export function GroupsList({ groups: initialGroups }: GroupsListProps) {
    const [groups, setGroups] = useState<ServerGroup[]>(initialGroups);
    const [loadingMore, setLoadingMore] = useState(false);
    const [allLoaded, setAllLoaded] = useState(initialGroups.length < PAGE_SIZE);

    const handleLoadMore = useCallback(async () => {
        setLoadingMore(true);
        try {
            const existingIds = new Set(groups.map((g) => g.id));
            const more = await fetchMoreGroups(existingIds);
            if (more.length === 0) {
                setAllLoaded(true);
            } else {
                setGroups((prev) => [...prev, ...more]);
                if (more.length < PAGE_SIZE) {
                    setAllLoaded(true);
                }
            }
        } catch {
            console.error('Failed to load more groups');
        } finally {
            setLoadingMore(false);
        }
    }, [groups]);

    if (groups.length === 0) return null;

    return (
        <section className="mt-4 sm:mt-6">
            <div className="flex items-center gap-2.5 mb-3">
                <div className="rounded-xl bg-violet-200 dark:bg-violet-800/50 p-2">
                    <Users className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                    <h2 className="text-lg sm:text-xl font-extrabold">Community Groups</h2>
                    <p className="text-xs text-muted-foreground">Join Adopt Me trading groups to find trades and chat with players</p>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-2.5">
                {groups.map((group) => (
                    <div
                        key={group.id}
                        className="group relative rounded-2xl ring-1 ring-border/60 bg-card hover:ring-violet-400 dark:hover:ring-violet-600 transition-all duration-300 cursor-pointer overflow-hidden hover:shadow-lg hover:shadow-violet-500/10 hover:-translate-y-0.5"
                    >
                        {/* Group Info */}
                        <div className="flex flex-col items-center text-center p-3 sm:p-3.5 gap-2">
                            <div className="h-11 w-11 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-400 dark:from-violet-500 dark:to-fuchsia-500 flex items-center justify-center flex-shrink-0 overflow-hidden ring-2 ring-white/60 dark:ring-white/20 shadow-sm">
                                {group.avatar ? (
                                    <img src={group.avatar} alt={group.groupName} className="h-11 w-11 object-cover rounded-full" />
                                ) : (
                                    <MessageCircle className="h-5 w-5 text-white" />
                                )}
                            </div>
                            <div className="min-w-0 w-full">
                                <h3 className="text-xs sm:text-sm font-bold truncate">{group.groupName}</h3>
                                {group.memberCount > 0 && (
                                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 flex items-center justify-center gap-1">
                                        <Users className="h-3 w-3" />
                                        <span>{group.memberCount.toLocaleString()} members</span>
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Mobile — small CTA banner always visible */}
                        <div className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 px-2 py-1.5 md:hidden">
                            <Smartphone className="h-3 w-3 text-white" />
                            <span className="text-[10px] text-white font-bold">Join on the App!</span>
                            <ArrowRight className="h-3 w-3 text-white" />
                        </div>

                        {/* Desktop — full hover overlay */}
                        <div className="absolute inset-0 rounded-2xl backdrop-blur-sm bg-gradient-to-br from-violet-500/95 via-fuchsia-500/95 to-pink-500/95 flex-col items-center justify-center gap-1.5 transition-all duration-300 scale-95 group-hover:scale-100 p-3 hidden md:flex opacity-0 group-hover:opacity-100">
                            <span className="text-2xl" role="img" aria-label="rocket">🚀</span>
                            <p className="text-white text-xs sm:text-sm font-extrabold text-center leading-tight">
                                Join on the App!
                            </p>
                            <p className="text-white/75 text-[10px] sm:text-xs text-center leading-snug">
                                Chat &amp; trade with players
                            </p>
                            <div className="flex items-center gap-1.5 mt-0.5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-[10px] sm:text-xs font-bold hover:bg-white/30 transition-colors">
                                <Smartphone className="h-3 w-3" />
                                <span>Get App</span>
                                <ArrowRight className="h-3 w-3" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Load More button */}
            {!allLoaded && (
                <div className="flex justify-center mt-4">
                    <button
                        onClick={handleLoadMore}
                        disabled={loadingMore}
                        className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-accent transition-colors disabled:opacity-50"
                    >
                        {loadingMore ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <ChevronDown className="h-4 w-4" />
                        )}
                        {loadingMore ? 'Loading...' : 'Load More Groups'}
                    </button>
                </div>
            )}

            {/* SEO content below groups */}
            <div className="mt-4 rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-950/40 dark:to-purple-950/40 ring-1 ring-violet-200 dark:ring-violet-800 p-4 sm:p-5">
                <h3 className="text-sm sm:text-base font-bold mb-1.5">Adopt Me Trading Groups</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Join Adopt Me trading groups to find the best trades, chat with other Roblox players, and stay updated on pet trading values in 2026.
                    Create your own group, invite friends, and build your trading community — all from our free app.
                </p>
            </div>
        </section>
    );
}
