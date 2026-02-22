'use client';

import { useEffect, useState } from 'react';
import { getTrades } from '@/lib/firebase/firestore';
import { TradeCard } from '@/components/trades/TradeCard';
import { Skeleton } from '@/components/ui/skeleton';
import type { Trade } from '@/lib/types/trade';

interface ProfileTradesProps {
  userId: string;
}

export function ProfileTrades({ userId }: ProfileTradesProps) {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const result = await getTrades({ userId }, 10);
        setTrades(result.trades);
      } catch (err) {
        console.error('Error loading user trades:', err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [userId]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-xl" />
        ))}
      </div>
    );
  }

  if (trades.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-8 text-center">
        <p className="text-sm text-muted-foreground">No trades yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {trades.map((trade) => (
        <TradeCard key={trade.id} trade={trade} />
      ))}
    </div>
  );
}
