'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { getTrades } from '@/lib/firebase/firestore';
import { TradeCard } from './TradeCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Trade } from '@/lib/types/trade';
import type { DocumentSnapshot } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import { useAuthStore } from '@/lib/store/useAuthStore';
import type { ServerTrade } from '@/lib/data/trades';

type FilterTab = 'all' | 'w' | 'l' | 'f' | 'mine';

const FILTER_TABS: { value: FilterTab; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'w', label: 'Win' },
  { value: 'l', label: 'Lose' },
  { value: 'f', label: 'Fair' },
  { value: 'mine', label: '🧑 My Trades' },
];

// Polling interval for the "all" view (30 seconds)
const POLL_INTERVAL = 30_000;

/** Convert SSR trades to the Trade type used by TradeCard */
function serverTradesToTrades(serverTrades: ServerTrade[]): Trade[] {
  return serverTrades.map((t) => ({
    ...t,
    userId: '',
    hasItemNames: t.hasItems.map((i) => i.name),
    wantsItemNames: t.wantsItems.map((i) => i.name),
    isSharkMode: false,
    rating: null,
    ratingCount: 0,
    // Convert timestamp number to a Timestamp-like object for TradeCard
    timestamp: { toMillis: () => t.timestamp, toDate: () => new Date(t.timestamp) } as Trade['timestamp'],
  }));
}

interface TradeListProps {
  initialTrades?: ServerTrade[];
}

export function TradeList({ initialTrades }: TradeListProps) {
  const currentUser = useAuthStore((s) => s.user);
  const [trades, setTrades] = useState<Trade[]>(
    initialTrades ? serverTradesToTrades(initialTrades) : [],
  );
  const [isLoading, setIsLoading] = useState(!initialTrades || initialTrades.length === 0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [usedInitial, setUsedInitial] = useState(!!initialTrades && initialTrades.length > 0);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Fetch trades for "all" view using polling instead of onSnapshot
  const fetchAllTrades = useCallback(async (silent = false) => {
    if (!silent) setIsLoading(true);
    try {
      const result = await getTrades({}, 10);
      setTrades(result.trades);
      setLastDoc(result.lastDoc);
      setHasMore(result.trades.length >= 10);
    } catch (err) {
      console.error('Error fetching trades:', err);
    } finally {
      if (!silent) setIsLoading(false);
    }
  }, []);

  // "all" view: use SSR data initially, then poll every 30s
  useEffect(() => {
    if (activeFilter !== 'all') return;

    if (usedInitial) {
      setIsLoading(false);
      setHasMore(true);
    } else {
      fetchAllTrades();
    }

    // Start polling (silent refresh every 30s)
    pollRef.current = setInterval(() => {
      fetchAllTrades(true);
    }, POLL_INTERVAL);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [activeFilter, usedInitial, fetchAllTrades]);

  // When switching filters, reset initial state
  useEffect(() => {
    if (activeFilter === 'all') return;

    // Stop any active polling
    if (pollRef.current) clearInterval(pollRef.current);

    setUsedInitial(false);

    const fetchFiltered = async () => {
      setIsLoading(true);
      setLastDoc(null);
      setHasMore(true);

      const filters: Record<string, string | boolean> = {};

      if (activeFilter === 'mine') {
        if (!currentUser?.id) {
          setTrades([]);
          setIsLoading(false);
          return;
        }
        filters.userId = currentUser.id;
      } else {
        filters.status = activeFilter;
      }

      try {
        const result = await getTrades(filters as Parameters<typeof getTrades>[0], 10);
        setTrades(result.trades);
        setLastDoc(result.lastDoc);
        setHasMore(result.trades.length >= 10);
      } catch (err) {
        console.error('Error fetching trades:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFiltered();
  }, [activeFilter, currentUser?.id]);

  const loadMore = useCallback(async () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);

    // If we were using initial SSR trades, switch to client-side Firebase
    if (usedInitial) {
      setUsedInitial(false);
      try {
        const result = await getTrades({}, 10);
        // Merge: keep SSR trades + add new ones
        setTrades((prev) => {
          const existingIds = new Set(prev.map((t) => t.id));
          const newTrades = result.trades.filter((t) => !existingIds.has(t.id));
          return [...prev, ...newTrades];
        });
        setLastDoc(result.lastDoc);
        setHasMore(result.trades.length >= 10);
      } catch (err) {
        console.error('Error loading more trades:', err);
      } finally {
        setIsLoadingMore(false);
      }
      return;
    }

    if (!lastDoc) {
      setIsLoadingMore(false);
      return;
    }

    try {
      const filters: Record<string, string | boolean> = {};
      if (activeFilter === 'mine' && currentUser?.id) {
        filters.userId = currentUser.id;
      } else if (activeFilter !== 'all' && activeFilter !== 'mine') {
        filters.status = activeFilter;
      }

      const result = await getTrades(filters as Parameters<typeof getTrades>[0], 10, lastDoc);
      setTrades((prev) => [...prev, ...result.trades]);
      setLastDoc(result.lastDoc);
      setHasMore(result.trades.length >= 10);
    } catch (err) {
      console.error('Error loading more trades:', err);
    } finally {
      setIsLoadingMore(false);
    }
  }, [lastDoc, isLoadingMore, activeFilter, currentUser?.id, usedInitial]);

  // Remove trade from list when deleted
  const handleTradeDeleted = useCallback((tradeId: string) => {
    setTrades((prev) => prev.filter((t) => t.id !== tradeId));
  }, []);

  // Update reactions optimistically in local state
  const handleReaction = useCallback((tradeId: string, newReactions: Record<string, string>) => {
    setTrades((prev) =>
      prev.map((t) => (t.id === tradeId ? { ...t, reactions: newReactions } : t)),
    );
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {/* Filter tabs */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => {
              setActiveFilter(tab.value);
              if (tab.value !== 'all') setUsedInitial(false);
            }}
            className={cn(
              'whitespace-nowrap text-xs font-medium px-3.5 py-1.5 rounded-full border transition-colors',
              activeFilter === tab.value
                ? 'bg-app-primary text-white border-app-primary'
                : 'bg-card text-muted-foreground border-border hover:bg-accent',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Trade list */}
      {isLoading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
      ) : trades.length === 0 ? (
        <div className="rounded-xl border border-dashed p-12 text-center">
          <p className="text-muted-foreground">
            {activeFilter === 'mine'
              ? "You haven't posted any trades yet."
              : 'No trades found for this filter.'}
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            {trades.map((trade) => (
              <TradeCard key={trade.id} trade={trade} onDeleted={handleTradeDeleted} onReaction={handleReaction} />
            ))}
          </div>

          {hasMore && (
            <Button
              variant="outline"
              onClick={loadMore}
              disabled={isLoadingMore}
              className="mx-auto"
            >
              {isLoadingMore && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Load More
            </Button>
          )}
        </>
      )}
    </div>
  );
}
