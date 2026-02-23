// Matches the actual CDN JSON structure from https://adoptme.b-cdn.net
export interface PetRaw {
  id: string;
  name: string;
  image: string;            // Relative path like "/images/pets/Hedgehog.png"
  rarity: string;           // "legendary", "ultra rare", "rare", "uncommon", "common", "none"
  raity?: string;           // Typo in source data for some pet wear items
  type: string;             // "pets", "vehicles", "pet wear", "Pet Wear", "food", "eggs", "strollers", "toys", "gifts", "other"
  categoryd?: string;       // Category for default (e.g., "Classy", "Exotic", "2019")
  categoryn?: string;       // Category for neon
  categorym?: string;       // Category for mega
  categorypreppyd?: string; // Stringified bool
  categorypreppyn?: string;
  categorypreppym?: string;
  'fly&ride?'?: string;     // Stringified bool
  score: number;            // Ranking/demand score (lower = higher demand)
  status: string;           // "Ready"
  // Single value field (used by non-pet items: toys, vehicles, strollers, etc.)
  value?: number;
  // Regular (default) values (pets only)
  rvalue?: number;
  'rvalue - fly'?: number;
  'rvalue - ride'?: number;
  'rvalue - fly&ride'?: number;
  'rvalue - nopotion'?: number;
  // Neon values (pets only)
  nvalue?: number;
  'nvalue - fly'?: number;
  'nvalue - ride'?: number;
  'nvalue - fly&ride'?: number;
  'nvalue - nopotion'?: number;
  // Mega neon values (pets only)
  mvalue?: number;
  'mvalue - fly'?: number;
  'mvalue - ride'?: number;
  'mvalue - fly&ride'?: number;
  'mvalue - nopotion'?: number;
}

// Normalized pet for app use
export interface Pet {
  id: string;
  name: string;
  image: string;         // Full CDN URL
  rarity: string;
  type: string;
  category: string;
  score: number;
  // Regular values
  rvalue: number;
  rvalueFly: number;
  rvalueRide: number;
  rvalueFlyRide: number;
  rvalueNoPotion: number;
  // Neon values
  nvalue: number;
  nvalueFly: number;
  nvalueRide: number;
  nvalueFlyRide: number;
  nvalueNoPotion: number;
  // Mega values
  mvalue: number;
  mvalueFly: number;
  mvalueRide: number;
  mvalueFlyRide: number;
  mvalueNoPotion: number;
}

export type ValueVariant = 'r' | 'n' | 'm';
export type PotionType = 'default' | 'fly' | 'ride' | 'flyride' | 'nopotion';

export const CDN_BASE = 'https://adoptme.b-cdn.net';

export function buildPetImageUrl(relativePath: string, imageBase: string): string {
  if (!relativePath || !imageBase) return '';
  return `${imageBase.replace(/\/$/, '')}/${relativePath.replace(/^\//, '')}`;
}

export function normalizePet(raw: PetRaw, imageBase?: string): Pet {
  // Normalize type: "Pet Wear" → "pet wear"
  const type = raw.type.toLowerCase();
  // Normalize rarity: some pet wear items have 'none' rarity with actual rarity in 'raity' (typo)
  const rarity = (raw.rarity === 'none' && raw.raity) ? raw.raity : (raw.rarity || 'common');
  // For non-pet items, use single `value` field as rvalue
  const singleValue = raw.value ?? 0;

  return {
    id: raw.id,
    name: raw.name,
    image: imageBase ? buildPetImageUrl(raw.image, imageBase) : raw.image,
    rarity,
    type,
    category: String(raw.categoryd || ''),
    score: raw.score,
    rvalue: raw.rvalue ?? singleValue,
    rvalueFly: raw['rvalue - fly'] ?? 0,
    rvalueRide: raw['rvalue - ride'] ?? 0,
    rvalueFlyRide: raw['rvalue - fly&ride'] ?? 0,
    rvalueNoPotion: raw['rvalue - nopotion'] ?? 0,
    nvalue: raw.nvalue ?? 0,
    nvalueFly: raw['nvalue - fly'] ?? 0,
    nvalueRide: raw['nvalue - ride'] ?? 0,
    nvalueFlyRide: raw['nvalue - fly&ride'] ?? 0,
    nvalueNoPotion: raw['nvalue - nopotion'] ?? 0,
    mvalue: raw.mvalue ?? 0,
    mvalueFly: raw['mvalue - fly'] ?? 0,
    mvalueRide: raw['mvalue - ride'] ?? 0,
    mvalueFlyRide: raw['mvalue - fly&ride'] ?? 0,
    mvalueNoPotion: raw['mvalue - nopotion'] ?? 0,
  };
}

export function getPetValue(pet: Pet, variant: ValueVariant = 'r', potion: PotionType = 'default'): number {
  const key = `${variant}value${potion === 'default' ? '' : potion === 'fly' ? 'Fly' : potion === 'ride' ? 'Ride' : potion === 'flyride' ? 'FlyRide' : 'NoPotion'}` as keyof Pet;
  return (pet[key] as number) ?? 0;
}

export function getPetDefaultValue(pet: Pet): number {
  return pet.rvalue || pet.rvalueFlyRide || 0;
}
