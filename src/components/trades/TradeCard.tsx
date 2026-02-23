'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Star, Zap, ThumbsUp, Trash2, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { PetImage } from '@/components/shared/PetImage';
import { formatNumber } from '@/lib/utils/formatters';
import { formatTimeAgo } from '@/lib/utils/formatters';
import { deleteTrade } from '@/lib/firebase/firestore';
import { useAuthStore } from '@/lib/store/useAuthStore';
import type { Trade, TradeItem, TradeStatus } from '@/lib/types/trade';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface TradeCardProps {
  trade: Trade;
  onDeleted?: (tradeId: string) => void;
}

const STATUS_STYLES: Record<TradeStatus, { bg: string; text: string; label: string }> = {
  w: { bg: 'bg-green-500/15', text: 'text-green-700 dark:text-green-400', label: 'Win' },
  l: { bg: 'bg-red-500/15', text: 'text-red-700 dark:text-red-400', label: 'Lose' },
  f: { bg: 'bg-yellow-500/15', text: 'text-yellow-700 dark:text-yellow-400', label: 'Fair' },
};

function parseVariantBadges(item: TradeItem) {
  const badges: { label: string; className: string }[] = [];
  const vt = (item.valueType || 'd').split('_')[0];
  // Value type badge — D (default), N (neon), M (mega)
  if (vt === 'n') badges.push({ label: 'N', className: 'bg-green-500 text-white' });
  else if (vt === 'm') badges.push({ label: 'M', className: 'bg-purple-500 text-white' });
  else badges.push({ label: 'D', className: 'bg-emerald-500 text-white' });
  // Modifier badges — F (fly), R (ride) shown separately
  if (item.isFly) badges.push({ label: 'F', className: 'bg-blue-500 text-white' });
  if (item.isRide) badges.push({ label: 'R', className: 'bg-amber-500 text-white' });
  return badges;
}

function TradeItemsRow({ items, total, side }: { items: Trade['hasItems']; total: number; side: 'has' | 'wants' }) {
  // Empty side — show "Give Offer" instead of 0
  if (!items || items.length === 0) {
    return (
      <div className="flex-1 min-w-0 flex flex-col items-center justify-center py-2">
        <p className="text-xs font-bold text-app-primary bg-app-primary/10 px-3 py-1.5 rounded-full">
          Give Offer
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 min-w-0 flex flex-col items-center gap-2">
      {/* Total chip — above images */}
      <span className={cn(
        'text-xs font-extrabold px-3 py-1 rounded-full',
        side === 'has'
          ? 'bg-app-has/10 text-app-has'
          : 'bg-app-want/10 text-app-want',
      )}>
        {formatNumber(total)}
      </span>

      {/* Pet images row */}
      <div className="flex flex-wrap gap-1.5 justify-center">
        {items.slice(0, 4).map((item, i) => {
          const badges = parseVariantBadges(item);
          return (
            <div key={`${item.name}-${i}`} className="flex flex-col items-center gap-0.5">
              <PetImage src={item.image} alt={item.name} size={36} />
              <p className="text-[9px] font-medium text-center truncate w-[40px]">{item.name}</p>
              {badges.length > 0 && (
                <div className="flex gap-0.5">
                  {badges.map((b, idx) => (
                    <span key={idx} className={cn('text-[7px] font-bold px-1 rounded', b.className)}>{b.label}</span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
        {items.length > 4 && (
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-muted text-xs font-medium text-muted-foreground">
            +{items.length - 4}
          </div>
        )}
      </div>
    </div>
  );
}

export function TradeCard({ trade, onDeleted }: TradeCardProps) {
  const currentUser = useAuthStore((s) => s.user);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const statusStyle = STATUS_STYLES[trade.status] || { bg: 'bg-muted', text: 'text-muted-foreground', label: 'N/A' };
  const timestamp = trade.timestamp?.toDate ? trade.timestamp.toDate() : new Date(trade.timestamp as unknown as number);

  const isOwn = currentUser?.id === trade.userId;

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowConfirm(true);
  };

  const handleConfirmDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowConfirm(false);
    setIsDeleting(true);
    try {
      await deleteTrade(trade.id);
      toast.success('Trade deleted!');
      onDeleted?.(trade.id);
    } catch (err) {
      console.error('Failed to delete trade:', err);
      toast.error('Failed to delete trade. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowConfirm(false);
  };

  return (
    <Link href={`/trades/${trade.id}`}>
      <Card className="p-3 sm:p-4 hover:shadow-md transition-shadow cursor-pointer group">
        {/* Header: user info + badges */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 min-w-0">
            <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-xs font-bold flex-shrink-0 overflow-hidden">
              {trade.avatar ? (
                <PetImage src={trade.avatar} alt={trade.traderName} size={28} />
              ) : (
                trade.traderName?.charAt(0)?.toUpperCase() || '?'
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">{trade.traderName}</p>
              <p className="text-[10px] text-muted-foreground">{formatTimeAgo(timestamp)}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {trade.isFeatured && (
              <Badge variant="outline" className="text-[10px] bg-yellow-500/15 text-yellow-700 dark:text-yellow-400 border-yellow-500/30 gap-0.5">
                <Star className="h-2.5 w-2.5" />
                Featured
              </Badge>
            )}
            {trade.isSharkMode && (
              <Badge variant="outline" className="text-[10px] bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-500/30 gap-0.5">
                <Zap className="h-2.5 w-2.5" />
                Shark
              </Badge>
            )}
            {trade.isPro && (
              <Badge variant="outline" className="text-[10px] bg-app-primary/15 text-app-primary border-app-primary/30">
                PRO
              </Badge>
            )}
            {/* Delete button for own trades */}
            {isOwn && !showConfirm && (
              <button
                onClick={handleDeleteClick}
                disabled={isDeleting}
                className="h-7 w-7 flex items-center justify-center rounded-full bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors disabled:opacity-50"
                title="Delete trade"
              >
                {isDeleting ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Trash2 className="h-3.5 w-3.5" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Delete confirmation bar */}
        {showConfirm && (
          <div className="flex items-center justify-between gap-2 rounded-xl bg-destructive/10 border border-destructive/20 px-3 py-2 mb-2 animate-in fade-in slide-in-from-top-1 duration-200">
            <p className="text-xs font-medium text-destructive">Delete this trade?</p>
            <div className="flex gap-1.5">
              <button
                onClick={handleConfirmDelete}
                className="px-3 py-1 text-xs font-bold text-white bg-destructive rounded-lg hover:bg-destructive/90 transition-colors"
              >
                Yes, delete
              </button>
              <button
                onClick={handleCancelDelete}
                className="px-3 py-1 text-xs font-medium bg-card border rounded-lg hover:bg-accent transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Trade items: has → wants */}
        <div className="flex items-center justify-center gap-3">
          <TradeItemsRow items={trade.hasItems} total={trade.hasTotal} side="has" />
          <div className="flex flex-col items-center gap-1 flex-shrink-0">
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <Badge className={cn('text-[10px] font-bold', statusStyle.bg, statusStyle.text)} variant="outline">
              {statusStyle.label}
            </Badge>
          </div>
          <TradeItemsRow items={trade.wantsItems} total={trade.wantsTotal} side="wants" />
        </div>

        {/* Description */}
        {trade.description && (
          <p className="text-xs text-muted-foreground mt-2 line-clamp-1">{trade.description}</p>
        )}

        {/* Footer: rating */}
        {trade.ratingCount > 0 && (
          <div className="flex items-center gap-1 mt-2 text-[10px] text-muted-foreground">
            <ThumbsUp className="h-3 w-3" />
            <span>{trade.rating} ({trade.ratingCount})</span>
          </div>
        )}
      </Card>
    </Link>
  );
}
