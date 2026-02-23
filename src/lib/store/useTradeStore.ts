import { create } from 'zustand';
import { type Pet } from '@/lib/types/pet';
import { calculateItemValue, getTradeResult, type CalculatorItem, type BadgeValueType } from '@/lib/utils/tradeHelpers';

interface TradeState {
  hasItems: CalculatorItem[];
  wantsItems: CalculatorItem[];
  hasTotal: number;
  wantsTotal: number;
  result: 'w' | 'l' | 'f' | null;
  resultPercentage: number;
  // Actions
  addHasItem: (pet: Pet, valueType?: BadgeValueType, isFly?: boolean, isRide?: boolean) => void;
  addWantsItem: (pet: Pet, valueType?: BadgeValueType, isFly?: boolean, isRide?: boolean) => void;
  removeHasItem: (index: number) => void;
  removeWantsItem: (index: number) => void;
  updateHasItem: (index: number, badge: 'D' | 'N' | 'M' | 'F' | 'R') => void;
  updateWantsItem: (index: number, badge: 'D' | 'N' | 'M' | 'F' | 'R') => void;
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

function createItem(pet: Pet, valueType: BadgeValueType = 'd', isFly = false, isRide = false): CalculatorItem {
  return {
    pet,
    valueType,
    isFly,
    isRide,
    value: calculateItemValue(pet, valueType, isFly, isRide),
  };
}

// Toggle a badge on an existing item (D/N/M exclusive, F/R toggle)
function applyBadge(item: CalculatorItem, badge: 'D' | 'N' | 'M' | 'F' | 'R'): CalculatorItem {
  let { valueType, isFly, isRide } = item;

  if (badge === 'F') isFly = !isFly;
  else if (badge === 'R') isRide = !isRide;
  else valueType = badge.toLowerCase() as BadgeValueType;

  const value = calculateItemValue(item.pet, valueType, isFly, isRide);
  return { ...item, valueType, isFly, isRide, value };
}

export const useTradeStore = create<TradeState>((set, get) => ({
  hasItems: [],
  wantsItems: [],
  hasTotal: 0,
  wantsTotal: 0,
  result: null,
  resultPercentage: 0,

  addHasItem: (pet, valueType = 'd', isFly = false, isRide = false) => {
    const { hasItems, wantsItems } = get();
    const newHas = [...hasItems, createItem(pet, valueType, isFly, isRide)];
    set({ hasItems: newHas, ...recalculate(newHas, wantsItems) });
  },

  addWantsItem: (pet, valueType = 'd', isFly = false, isRide = false) => {
    const { hasItems, wantsItems } = get();
    const newWants = [...wantsItems, createItem(pet, valueType, isFly, isRide)];
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

  updateHasItem: (index, badge) => {
    const { hasItems, wantsItems } = get();
    const newHas = hasItems.map((item, i) =>
      i === index ? applyBadge(item, badge) : item,
    );
    set({ hasItems: newHas, ...recalculate(newHas, wantsItems) });
  },

  updateWantsItem: (index, badge) => {
    const { hasItems, wantsItems } = get();
    const newWants = wantsItems.map((item, i) =>
      i === index ? applyBadge(item, badge) : item,
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
