import { create } from 'zustand';
import { type Pet, type ValueVariant, type PotionType } from '@/lib/types/pet';
import { calculateItemValue, getTradeResult, type CalculatorItem } from '@/lib/utils/tradeHelpers';

interface TradeState {
  hasItems: CalculatorItem[];
  wantsItems: CalculatorItem[];
  hasTotal: number;
  wantsTotal: number;
  result: 'w' | 'l' | 'f' | null;
  resultPercentage: number;
  // Actions
  addHasItem: (pet: Pet, variant?: ValueVariant, potion?: PotionType) => void;
  addWantsItem: (pet: Pet, variant?: ValueVariant, potion?: PotionType) => void;
  removeHasItem: (index: number) => void;
  removeWantsItem: (index: number) => void;
  updateHasItem: (index: number, variant: ValueVariant, potion: PotionType) => void;
  updateWantsItem: (index: number, variant: ValueVariant, potion: PotionType) => void;
  swapSides: () => void;
  clearAll: () => void;
}

function recalculate(hasItems: CalculatorItem[], wantsItems: CalculatorItem[]) {
  const hasTotal = hasItems.reduce((sum, item) => sum + item.value, 0);
  const wantsTotal = wantsItems.reduce((sum, item) => sum + item.value, 0);

  if (hasItems.length === 0 && wantsItems.length === 0) {
    return { hasTotal: 0, wantsTotal: 0, result: null, resultPercentage: 0 };
  }

  const { status, percentage } = getTradeResult(hasTotal, wantsTotal);
  return { hasTotal, wantsTotal, result: status, resultPercentage: percentage };
}

function createItem(pet: Pet, variant: ValueVariant = 'r', potion: PotionType = 'default'): CalculatorItem {
  return {
    pet,
    variant,
    potion,
    value: calculateItemValue(pet, variant, potion),
  };
}

export const useTradeStore = create<TradeState>((set, get) => ({
  hasItems: [],
  wantsItems: [],
  hasTotal: 0,
  wantsTotal: 0,
  result: null,
  resultPercentage: 0,

  addHasItem: (pet, variant = 'r', potion = 'default') => {
    const { hasItems, wantsItems } = get();
    const newHas = [...hasItems, createItem(pet, variant, potion)];
    set({ hasItems: newHas, ...recalculate(newHas, wantsItems) });
  },

  addWantsItem: (pet, variant = 'r', potion = 'default') => {
    const { hasItems, wantsItems } = get();
    const newWants = [...wantsItems, createItem(pet, variant, potion)];
    set({ wantsItems: newWants, ...recalculate(hasItems, newWants) });
  },

  removeHasItem: (index) => {
    const { hasItems, wantsItems } = get();
    const newHas = hasItems.filter((_, i) => i !== index);
    set({ hasItems: newHas, ...recalculate(newHas, wantsItems) });
  },

  removeWantsItem: (index) => {
    const { hasItems, wantsItems } = get();
    const newWants = wantsItems.filter((_, i) => i !== index);
    set({ wantsItems: newWants, ...recalculate(hasItems, newWants) });
  },

  updateHasItem: (index, variant, potion) => {
    const { hasItems, wantsItems } = get();
    const newHas = hasItems.map((item, i) =>
      i === index ? createItem(item.pet, variant, potion) : item,
    );
    set({ hasItems: newHas, ...recalculate(newHas, wantsItems) });
  },

  updateWantsItem: (index, variant, potion) => {
    const { hasItems, wantsItems } = get();
    const newWants = wantsItems.map((item, i) =>
      i === index ? createItem(item.pet, variant, potion) : item,
    );
    set({ wantsItems: newWants, ...recalculate(hasItems, newWants) });
  },

  swapSides: () => {
    const { hasItems, wantsItems } = get();
    set({
      hasItems: wantsItems,
      wantsItems: hasItems,
      ...recalculate(wantsItems, hasItems),
    });
  },

  clearAll: () =>
    set({
      hasItems: [],
      wantsItems: [],
      hasTotal: 0,
      wantsTotal: 0,
      result: null,
      resultPercentage: 0,
    }),
}));
