'use client';

import { X } from 'lucide-react';
import { PetImage } from '@/components/shared/PetImage';
import { Button } from '@/components/ui/button';
import { formatNumber } from '@/lib/utils/formatters';
import type { CalculatorItem } from '@/lib/utils/tradeHelpers';
import { cn } from '@/lib/utils';

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
  // Build list of active badges to display
  const activeBadges: string[] = [];

  // Value type badge (always one active)
  const vtLabel = item.valueType.toUpperCase(); // D, N, or M
  activeBadges.push(vtLabel);

  // Modifier badges (only if active)
  if (item.isFly) activeBadges.push('F');
  if (item.isRide) activeBadges.push('R');

  return (
    <div className="relative flex flex-col items-center gap-0.5 rounded-xl border bg-card p-1 sm:p-1.5 group text-center min-w-0">
      {/* Remove button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-0.5 right-0.5 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-destructive/90 text-white opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-destructive z-10"
        onClick={() => onRemove(index)}
      >
        <X className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
      </Button>

      {/* Pet image */}
      <PetImage src={item.pet.image} alt={item.pet.name} size={36} className="sm:w-12 sm:h-12" />
      <p className="text-[8px] sm:text-[9px] font-bold text-center truncate w-full leading-tight">{item.pet.name}</p>

      {/* Only show active badges */}
      {activeBadges.length > 0 && (
        <div className="flex gap-px sm:gap-0.5 justify-center">
          {activeBadges.map((badge) => (
            <span
              key={badge}
              className={cn(
                'px-1 sm:px-1.5 py-0.5 text-[6px] sm:text-[7px] font-extrabold rounded',
                BADGE_STYLES[badge] || 'bg-muted text-muted-foreground',
              )}
            >
              {badge}
            </span>
          ))}
        </div>
      )}

      {/* Value */}
      <p className="text-[9px] sm:text-[10px] font-bold text-app-primary">{formatNumber(item.value)}</p>
    </div>
  );
}
