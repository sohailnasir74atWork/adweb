'use client';

import { X } from 'lucide-react';
import { PetImage } from '@/components/shared/PetImage';
import { Button } from '@/components/ui/button';
import { formatNumber } from '@/lib/utils/formatters';
import type { CalculatorItem } from '@/lib/utils/tradeHelpers';
import { cn } from '@/lib/utils';
import { useAnalytics, getDemandScore, getHotStatus } from '@/lib/hooks/useAnalytics';

interface CalculatorPetCardProps {
  item: CalculatorItem;
  index: number;
  onRemove: (index: number) => void;
  onUpdate: (index: number, badge: 'D' | 'N' | 'M' | 'F' | 'R') => void;
}

// Badge styling config
const BADGE_STYLES: Record<string, string> = {
  D: 'bg-emerald-500 text-white',
  N: 'bg-green-500 text-white',
  M: 'bg-purple-500 text-white',
  F: 'bg-blue-500 text-white',
  R: 'bg-amber-500 text-white',
};

export function CalculatorPetCard({ item, index, onRemove, onUpdate }: CalculatorPetCardProps) {
  const { demandMap, hotMap } = useAnalytics();
  const demand = getDemandScore(item.pet.name, demandMap);
  const hot = getHotStatus(item.pet.name, hotMap);

  // Build list of active badges to display
  const activeBadges: string[] = [];

  // Value type badge (always one active)
  const vtLabel = item.valueType.toUpperCase(); // D, N, or M
  activeBadges.push(vtLabel);

  // Modifier badges (only if active)
  if (item.isFly) activeBadges.push('F');
  if (item.isRide) activeBadges.push('R');

  return (
    <div
      onClick={() => onRemove(index)}
      className="relative flex flex-col items-center rounded-[3px] sm:rounded-xl border bg-card p-1 pb-3 sm:p-1.5 sm:pb-4 group text-center cursor-pointer hover:border-destructive/50 transition-colors"
    >
      {/* Demand badge — top-left corner */}
      {demand && demand.score >= 7 && (
        <span className="absolute top-0.5 left-0.5 sm:top-1 sm:left-1 flex items-center justify-center h-3 sm:h-4 px-0.5 sm:px-1 text-[5px] sm:text-[7px] font-extrabold rounded-full bg-orange-500 text-white shadow-sm leading-none z-10">
          {demand.score}/10
        </span>
      )}

      {/* Rise badge — top-right corner */}
      {hot && (
        <span className="absolute top-1 right-1 hidden sm:flex items-center justify-center h-3.5 sm:h-4 px-1 text-[6px] sm:text-[7px] font-extrabold rounded-full bg-emerald-500 text-white shadow-sm leading-none z-10">
          📈{hot.pct}%
        </span>
      )}

      {/* Pet image */}
      <PetImage src={item.pet.image} alt={item.pet.name} size={36} className="sm:w-14 sm:h-14" />

      {/* Variant badges — bottom-right corner, overlapping */}
      <div className="absolute bottom-1 right-1 flex z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            const cycle: Record<string, 'D' | 'N' | 'M'> = { D: 'N', N: 'M', M: 'D' };
            onUpdate(index, cycle[vtLabel] || 'D');
          }}
          title="Click to change variant"
          className={cn(
            'h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center text-[5px] sm:text-[8px] font-extrabold rounded-full shadow-sm text-white border-2 border-card',
            BADGE_STYLES[vtLabel] || 'bg-muted text-muted-foreground',
          )}
        >
          {vtLabel}
        </button>
        {item.isFly && (
          <button
            onClick={(e) => { e.stopPropagation(); onUpdate(index, 'F'); }}
            title="Remove Fly"
            className="h-4 w-4 sm:h-5 sm:w-5 -ml-1.5 flex items-center justify-center text-[5px] sm:text-[8px] font-extrabold rounded-full shadow-sm text-white bg-blue-500 border-2 border-card"
          >
            F
          </button>
        )}
        {item.isRide && (
          <button
            onClick={(e) => { e.stopPropagation(); onUpdate(index, 'R'); }}
            title="Remove Ride"
            className="h-4 w-4 sm:h-5 sm:w-5 -ml-1.5 flex items-center justify-center text-[5px] sm:text-[8px] font-extrabold rounded-full shadow-sm text-white bg-amber-500 border-2 border-card"
          >
            R
          </button>
        )}
      </div>

    </div>
  );
}

