'use client';

import { useEffect, useState, useCallback } from 'react';
import { onTradesSnapshot, getTrades } from '@/lib/firebase/firestore';
import { TradeCard } from './TradeCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Trade } from '@/lib/types/trade';
import type { DocumentSnapshot } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';

type FilterTab = 'all' | 'featured' | 'w' | 'l' | 'f' | 'shark';

const FILTER_TABS: { value: FilterTab; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'featured', label: 'Featured' },
  { value: 'w', label: 'Win' },
  { value: 'l', label: 'Lose' },
  { value: 'f', label: 'Fair' },
  { value: 'shark', label: 'Shark' },
];

export function TradeList() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState(true);

  // Real-time listener for the default "all" view
  useEffect(() => {
    if (activeFilter !== 'all') return;

    setIsLoading(true);
    const unsub = onTradesSnapshot((newTrades) => {
      setTrades(newTrades);
      setIsLoading(false);
      setHasMore(newTrades.length >= 10);
    }, 10);

    return () => unsub();
  }, [activeFilter]);

  // Filtered fetch for non-"all" tabs
  useEffect(() => {
    if (activeFilter === 'all') return;

    const fetchFiltered = async () => {
      setIsLoading(true);
      setLastDoc(null);
      setHasMore(true);

      const filters: Record<string, string | boolean> = {};
      if (activeFilter === 'featured') filters.isFeatured = true;
      else if (activeFilter === 'shark') filters.isSharkMode = true;
      else filters.status = activeFilter;

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
  }, [activeFilter]);

  const loadMore = useCallback(async () => {
    if (!lastDoc || isLoadingMore) return;
    setIsLoadingMore(true);

    try {
      const filters: Record<string, string | boolean> = {};
      if (activeFilter === 'featured') filters.isFeatured = true;
      else if (activeFilter === 'shark') filters.isSharkMode = true;
      else if (activeFilter !== 'all') filters.status = activeFilter;

      const result = await getTrades(filters as Parameters<typeof getTrades>[0], 10, lastDoc);
      setTrades((prev) => [...prev, ...result.trades]);
      setLastDoc(result.lastDoc);
      setHasMore(result.trades.length >= 10);
    } catch (err) {
      console.error('Error loading more trades:', err);
    } finally {
      setIsLoadingMore(false);
    }
  }, [lastDoc, isLoadingMore, activeFilter]);

  return (
    <div className="flex flex-col gap-4">
      {/* Filter tabs */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveFilter(tab.value)}
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
          <p className="text-muted-foreground">No trades found for this filter.</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            {trades.map((trade) => (
              <TradeCard key={trade.id} trade={trade} />
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
