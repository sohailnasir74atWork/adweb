'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const RARITIES = ['All', 'legendary', 'ultra rare', 'rare', 'uncommon', 'common'];
const SORT_OPTIONS = [
  { value: 'score', label: 'Demand' },
  { value: 'value-desc', label: 'Value ↓' },
  { value: 'value-asc', label: 'Value ↑' },
  { value: 'name', label: 'A-Z' },
];

interface FilterBarProps {
  activeRarity: string;
  onRarityChange: (rarity: string) => void;
  activeSort: string;
  onSortChange: (sort: string) => void;
  totalCount: number;
}

export function FilterBar({
  activeRarity,
  onRarityChange,
  activeSort,
  onSortChange,
  totalCount,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Rarity filters */}
      <div className="flex flex-wrap gap-1.5">
        {RARITIES.map((rarity) => (
          <Button
            key={rarity}
            variant="outline"
            size="sm"
            onClick={() => onRarityChange(rarity)}
            className={cn(
              'h-8 text-xs capitalize',
              activeRarity === rarity &&
                'bg-app-primary text-white border-app-primary hover:bg-app-primary/90 hover:text-white',
            )}
          >
            {rarity}
          </Button>
        ))}
      </div>

      {/* Sort + count */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          {SORT_OPTIONS.map((opt) => (
            <Button
              key={opt.value}
              variant="ghost"
              size="sm"
              onClick={() => onSortChange(opt.value)}
              className={cn(
                'h-7 text-xs',
                activeSort === opt.value && 'bg-accent font-semibold',
              )}
            >
              {opt.label}
            </Button>
          ))}
        </div>
        <span className="text-xs text-muted-foreground">{totalCount} pets</span>
      </div>
    </div>
  );
}
