'use client';

import { ArrowRight, Star, Zap, Share2, Flag, ThumbsUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PetImage } from '@/components/shared/PetImage';
import { formatNumber, formatTimeAgo } from '@/lib/utils/formatters';
import type { Trade, TradeStatus } from '@/lib/types/trade';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface TradeDetailProps {
  trade: Trade;
}

const STATUS_STYLES: Record<TradeStatus, { bg: string; text: string; label: string }> = {
  w: { bg: 'bg-green-500/15', text: 'text-green-700 dark:text-green-400', label: 'Win' },
  l: { bg: 'bg-red-500/15', text: 'text-red-700 dark:text-red-400', label: 'Lose' },
  f: { bg: 'bg-yellow-500/15', text: 'text-yellow-700 dark:text-yellow-400', label: 'Fair' },
};

function ItemsGrid({ items, total, side }: { items: Trade['hasItems']; total: number; side: 'has' | 'wants' }) {
  const isHas = side === 'has';
  return (
    <div className={cn(
      'rounded-2xl border-2 p-4 flex-1',
      isHas ? 'border-app-has/40 bg-app-has/5' : 'border-app-want/40 bg-app-want/5',
    )}>
      <h3 className={cn(
        'text-sm font-bold uppercase tracking-wider mb-1',
        isHas ? 'text-app-has' : 'text-app-want',
      )}>
        {isHas ? 'Offering' : 'Looking For'}
      </h3>
      <p className="text-xs text-muted-foreground mb-3">
        Total: <span className={cn('font-bold', isHas ? 'text-app-has' : 'text-app-want')}>{formatNumber(total)}</span>
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <div key={`${item.name}-${i}`} className="flex flex-col items-center gap-1 rounded-xl border bg-card p-2.5">
            <PetImage src={item.image} alt={item.name} size={56} />
            <p className="text-xs font-semibold text-center max-w-[70px] truncate">{item.name}</p>
            <div className="flex gap-0.5">
              {item.isFly && (
                <Badge variant="outline" className="text-[8px] py-0 px-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30">
                  Fly
                </Badge>
              )}
              {item.isRide && (
                <Badge variant="outline" className="text-[8px] py-0 px-1 bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30">
                  Ride
                </Badge>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TradeDetail({ trade }: TradeDetailProps) {
  const statusStyle = STATUS_STYLES[trade.status];
  const timestamp = trade.timestamp?.toDate ? trade.timestamp.toDate() : new Date(trade.timestamp as unknown as number);

  const handleShare = async () => {
    const url = `${window.location.origin}/trades/${trade.id}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    } catch {
      toast.error('Failed to copy link');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Trader info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-sm font-bold overflow-hidden">
            {trade.avatar ? (
              <PetImage src={trade.avatar} alt={trade.traderName} size={40} />
            ) : (
              trade.traderName?.charAt(0)?.toUpperCase() || '?'
            )}
          </div>
          <div>
            <p className="font-semibold">{trade.traderName}</p>
            <p className="text-xs text-muted-foreground">{formatTimeAgo(timestamp)}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          {trade.isFeatured && (
            <Badge variant="outline" className="text-xs bg-yellow-500/15 text-yellow-700 dark:text-yellow-400 border-yellow-500/30 gap-1">
              <Star className="h-3 w-3" /> Featured
            </Badge>
          )}
          {trade.isSharkMode && (
            <Badge variant="outline" className="text-xs bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-500/30 gap-1">
              <Zap className="h-3 w-3" /> Shark
            </Badge>
          )}
        </div>
      </div>

      {/* Result badge */}
      <div className="flex justify-center">
        <Badge className={cn('text-lg px-6 py-1.5 font-bold', statusStyle.bg, statusStyle.text)} variant="outline">
          {statusStyle.label}
        </Badge>
      </div>

      {/* Trade items side by side */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch">
        <ItemsGrid items={trade.hasItems} total={trade.hasTotal} side="has" />
        <div className="flex items-center justify-center md:py-0 py-2">
          <ArrowRight className="h-6 w-6 text-muted-foreground md:rotate-0 rotate-90" />
        </div>
        <ItemsGrid items={trade.wantsItems} total={trade.wantsTotal} side="wants" />
      </div>

      {/* Description */}
      {trade.description && (
        <Card className="p-4">
          <p className="text-sm">{trade.description}</p>
        </Card>
      )}

      {/* Rating */}
      {trade.ratingCount > 0 && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ThumbsUp className="h-4 w-4" />
          <span>{trade.rating} rating from {trade.ratingCount} votes</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={handleShare} className="gap-1.5">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
        <Button variant="outline" size="sm" className="gap-1.5 text-destructive hover:text-destructive">
          <Flag className="h-4 w-4" />
          Report
        </Button>
      </div>
    </div>
  );
}
