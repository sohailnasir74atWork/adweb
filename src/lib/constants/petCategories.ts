export const PET_RARITIES = [
  'Legendary',
  'Ultra-Rare',
  'Rare',
  'Uncommon',
  'Common',
] as const;

export type PetRarity = (typeof PET_RARITIES)[number];

export const PET_CATEGORIES = [
  'Pets',
  'Neon Pets',
  'Mega Neon',
] as const;

export type PetCategory = (typeof PET_CATEGORIES)[number];

export const VALUE_VARIANTS = ['d', 'n', 'm'] as const;
export const POTION_TYPES = ['nopotion', 'fly', 'ride', 'flyride'] as const;

export type ValueVariant = (typeof VALUE_VARIANTS)[number];
export type PotionType = (typeof POTION_TYPES)[number];

export const VALUE_VARIANT_LABELS: Record<ValueVariant, string> = {
  d: 'Normal',
  n: 'Neon',
  m: 'Mega Neon',
};

export const POTION_TYPE_LABELS: Record<PotionType, string> = {
  nopotion: 'No Potion',
  fly: 'Fly',
  ride: 'Ride',
  flyride: 'Fly Ride',
};

export const RARITY_COLORS: Record<PetRarity, string> = {
  'Legendary': '#FFD700',
  'Ultra-Rare': '#A855F7',
  'Rare': '#3B82F6',
  'Uncommon': '#22C55E',
  'Common': '#9CA3AF',
};
