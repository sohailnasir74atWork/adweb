import type { TradeItem } from '@/lib/types/trade';
import { type Pet, type ValueVariant, type PotionType, getPetValue, getPetDefaultValue } from '@/lib/types/pet';

// Badge value type matching RN: D (default/regular), N (neon), M (mega)
export type BadgeValueType = 'd' | 'n' | 'm';

export interface CalculatorItem {
  pet: Pet;
  valueType: BadgeValueType;
  isFly: boolean;
  isRide: boolean;
  value: number;
}

// Map badge value type to data variant
export function badgeToVariant(vt: BadgeValueType): ValueVariant {
  return vt === 'd' ? 'r' : vt;
}

// Map isFly/isRide toggles to PotionType
export function modifiersToPotion(isFly: boolean, isRide: boolean): PotionType {
  if (isFly && isRide) return 'flyride';
  if (isFly) return 'fly';
  if (isRide) return 'ride';
  return 'nopotion';
}

export function calculateItemValue(pet: Pet, valueType: BadgeValueType, isFly: boolean, isRide: boolean): number {
  return getPetValue(pet, badgeToVariant(valueType), modifiersToPotion(isFly, isRide)) || getPetDefaultValue(pet);
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
  valueType: BadgeValueType = 'd',
  isFly: boolean = false,
  isRide: boolean = false,
): TradeItem {
  return {
    name: pet.name,
    type: pet.type,
    valueType: valueType,
    isFly,
    isRide,
    image: pet.image,
  };
}

