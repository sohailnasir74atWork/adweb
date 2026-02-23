'use client';

import { useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import { Search, Loader2, Users, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { PetImage } from '@/components/shared/PetImage';
import { searchUsers, type SearchUserResult } from '@/lib/firebase/searchUsers';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { Badge } from '@/components/ui/badge';

export function UserSearch() {
    const currentUser = useAuthStore((s) => s.user);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchUserResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    const doSearch = useCallback(
        async (q: string) => {
            const trimmed = q.trim();
            if (trimmed.length < 2) {
                setResults([]);
                setHasSearched(false);
                return;
            }

            setIsSearching(true);
            setHasSearched(true);
            try {
                const res = await searchUsers(trimmed, currentUser?.id);
                setResults(res);
            } catch (err) {
                console.error('Search failed:', err);
            } finally {
                setIsSearching(false);
            }
        },
        [currentUser?.id],
    );

    const handleInputChange = (value: string) => {
        setQuery(value);
        if (debounceRef.current) clearTimeout(debounceRef.current);

        if (!value.trim()) {
            setResults([]);
            setHasSearched(false);
            return;
        }

        debounceRef.current = setTimeout(() => doSearch(value), 400);
    };

    const handleClear = () => {
        setQuery('');
        setResults([]);
        setHasSearched(false);
    };

    return (
        <div className="flex flex-col gap-2">
            {/* Header */}
            <div className="flex items-center gap-2">
                <div className="rounded-lg bg-blue-200 dark:bg-blue-800/50 p-1.5">
                    <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-sm font-bold">Find Users</h3>
            </div>

            {/* Search input */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search by name..."
                    value={query}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            if (debounceRef.current) clearTimeout(debounceRef.current);
                            doSearch(query);
                        }
                    }}
                    className="pl-9 pr-8 h-10 rounded-xl text-sm"
                />
                {query && (
                    <button
                        onClick={handleClear}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>

            {/* Results */}
            {isSearching && (
                <div className="flex items-center justify-center py-6">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
            )}

            {!isSearching && hasSearched && results.length === 0 && (
                <div className="rounded-xl border border-dashed p-6 text-center">
                    <p className="text-xs text-muted-foreground">No users found</p>
                </div>
            )}

            {!isSearching && results.length > 0 && (
                <div className="flex flex-col gap-1 max-h-[320px] overflow-y-auto">
                    {results.map((user) => (
                        <Link
                            key={user.id}
                            href={`/profile/${user.id}`}
                            className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-accent/60 transition-colors group"
                        >
                            <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
                                <PetImage src={user.avatar} alt={user.displayName} size={36} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                    <p className="text-sm font-semibold truncate group-hover:text-app-primary transition-colors">
                                        {user.displayName}
                                    </p>
                                    {user.robloxUsernameVerified && (
                                        <Badge variant="outline" className="text-[7px] py-0 px-1 bg-blue-500/15 text-blue-600 border-blue-500/30">
                                            ✓
                                        </Badge>
                                    )}
                                </div>
                                {user.robloxUsername && (
                                    <p className="text-[11px] text-muted-foreground truncate">
                                        @{user.robloxUsername}
                                    </p>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
