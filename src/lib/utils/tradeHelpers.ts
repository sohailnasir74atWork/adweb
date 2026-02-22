import type { TradeItem } from '@/lib/types/trade';
import { type Pet, type ValueVariant, type PotionType, getPetValue } from '@/lib/types/pet';

export interface CalculatorItem {
  pet: Pet;
  variant: ValueVariant;
  potion: PotionType;
  value: number;
}

export function calculateItemValue(pet: Pet, variant: ValueVariant, potion: PotionType): number {
  return getPetValue(pet, variant, potion);
}

export function calculateTotalValue(items: CalculatorItem[]): number {
  return items.reduce((sum, item) => sum + item.value, 0);
}

export function getTradeResult(
  hasTotal: number,
  wantsTotal: number,
): { status: 'w' | 'l' | 'f'; percentage: number } {
  if (hasTotal === 0 && wantsTotal === 0) {
    return { status: 'f', percentage: 0 };
  }

  const max = Math.max(hasTotal, wantsTotal);
  if (max === 0) return { status: 'f', percentage: 0 };

  const diff = wantsTotal - hasTotal;
  const percentage = Math.abs(diff / max) * 100;

  // Within 10% is fair
  if (percentage <= 10) {
    return { status: 'f', percentage };
  }

  // If wants > has, it's a win (user receives more)
  if (diff > 0) {
    return { status: 'w', percentage };
  }

  // If has > wants, it's a lose (user gives more)
  return { status: 'l', percentage };
}

export function tradeItemFromPet(
  pet: Pet,
  variant: ValueVariant = 'r',
  potion: PotionType = 'default',
): TradeItem {
  return {
    name: pet.name,
    type: pet.type,
    valueType: `${variant}_${potion}`,
    isFly: potion === 'fly' || potion === 'flyride',
    isRide: potion === 'ride' || potion === 'flyride',
    image: pet.image,
  };
}
