'use client';

import { X } from 'lucide-react';
import { PetImage } from '@/components/shared/PetImage';
import { Button } from '@/components/ui/button';
import { formatNumber } from '@/lib/utils/formatters';
import { type ValueVariant, type PotionType } from '@/lib/types/pet';
import type { CalculatorItem } from '@/lib/utils/tradeHelpers';
import { cn } from '@/lib/utils';

interface CalculatorPetCardProps {
  item: CalculatorItem;
  index: number;
  onRemove: (index: number) => void;
  onUpdate: (index: number, variant: ValueVariant, potion: PotionType) => void;
}

const VARIANT_OPTIONS: { value: ValueVariant; label: string; color: string }[] = [
  { value: 'r', label: 'N', color: '' },
  { value: 'n', label: 'Ne', color: 'bg-amber-500 text-white' },
  { value: 'm', label: 'M', color: 'bg-fuchsia-500 text-white' },
];

const POTION_OPTIONS: { value: PotionType; label: string; color: string }[] = [
  { value: 'default', label: 'Def', color: '' },
  { value: 'nopotion', label: 'NP', color: '' },
  { value: 'fly', label: 'F', color: 'bg-blue-500 text-white' },
  { value: 'ride', label: 'R', color: 'bg-green-500 text-white' },
  { value: 'flyride', label: 'FR', color: 'bg-purple-500 text-white' },
];

export function CalculatorPetCard({ item, index, onRemove, onUpdate }: CalculatorPetCardProps) {
  // Build selected badge indicators
  const variantBadge = VARIANT_OPTIONS.find((o) => o.value === item.variant);
  const potionBadge = POTION_OPTIONS.find((o) => o.value === item.potion);

  return (
    <div className="relative flex flex-col items-center gap-0.5 rounded-xl border bg-card p-1.5 group text-center">
      {/* Remove button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-destructive/90 text-white opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-destructive z-10"
        onClick={() => onRemove(index)}
      >
        <X className="h-3 w-3" />
      </Button>

      {/* Pet image — big */}
      <PetImage src={item.pet.image} alt={item.pet.name} size={48} />
      <p className="text-[9px] font-bold text-center truncate w-full leading-tight">{item.pet.name}</p>

      {/* Only selected badges shown */}
      <div className="flex gap-0.5 justify-center">
        {variantBadge && variantBadge.value !== 'r' && (
          <span className={cn('text-[7px] font-extrabold px-1.5 py-0.5 rounded', variantBadge.color)}>{variantBadge.label}</span>
        )}
        {potionBadge && potionBadge.value !== 'default' && (
          <span className={cn('text-[7px] font-extrabold px-1.5 py-0.5 rounded', potionBadge.color || 'bg-muted text-muted-foreground')}>{potionBadge.label}</span>
        )}
      </div>

      {/* Value — small */}
      <p className="text-[10px] font-bold text-app-primary">{formatNumber(item.value)}</p>
    </div>
  );
}
