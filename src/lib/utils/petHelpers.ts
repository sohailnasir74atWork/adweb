import { type Pet, type PetRaw, normalizePet, getPetDefaultValue } from '@/lib/types/pet';

export { getPetDefaultValue };

// All item types in display order
export const ITEM_TYPES = [
  { value: 'pets', label: 'Pets' },
  { value: 'toys', label: 'Toys' },
  { value: 'vehicles', label: 'Vehicles' },
  { value: 'pet wear', label: 'Pet Wear' },
  { value: 'strollers', label: 'Strollers' },
  { value: 'eggs', label: 'Eggs' },
  { value: 'gifts', label: 'Gifts' },
  { value: 'food', label: 'Food' },
  { value: 'other', label: 'Other' },
] as const;

export function isPetType(type: string): boolean {
  return type === 'pets';
}

export function normalizePetData(rawData: PetRaw[], imageBase?: string): Pet[] {
  return rawData.map((r) => normalizePet(r, imageBase));
}

export function getPetHighestValue(pet: Pet): number {
  const allValues = [
    pet.rvalue, pet.rvalueFly, pet.rvalueRide, pet.rvalueFlyRide, pet.rvalueNoPotion,
    pet.nvalue, pet.nvalueFly, pet.nvalueRide, pet.nvalueFlyRide, pet.nvalueNoPotion,
    pet.mvalue, pet.mvalueFly, pet.mvalueRide, pet.mvalueFlyRide, pet.mvalueNoPotion,
  ].filter((v) => v > 0);

  return allValues.length > 0 ? Math.max(...allValues) : 0;
}

export function searchPets(pets: Pet[], query: string): Pet[] {
  if (!query.trim()) return pets;
  const lowerQuery = query.toLowerCase().trim();
  return pets.filter((pet) => {
    const lowerName = pet.name.toLowerCase();
    // Normal substring match (e.g. "dragon" → "Shadow Dragon")
    if (lowerName.includes(lowerQuery)) return true;
    // Acronym match — first letter of each word (e.g. "sbd" → "Shadow Bat Dragon")
    const initials = pet.name.split(/[\s\-]+/).map((w) => w[0]?.toLowerCase()).join('');
    return initials.includes(lowerQuery);
  });
}

export function filterPetsByType(pets: Pet[], type: string): Pet[] {
  if (!type || type === 'All') return pets;
  return pets.filter((pet) => pet.type === type);
}

export function filterPetsByRarity(pets: Pet[], rarity: string): Pet[] {
  if (!rarity || rarity === 'All') return pets;
  return pets.filter((pet) => pet.rarity.toLowerCase() === rarity.toLowerCase());
}

export function filterPetsByCategory(pets: Pet[], category: string): Pet[] {
  if (!category || category === 'All') return pets;
  return pets.filter((pet) => pet.category === category);
}

export function sortPetsByValue(pets: Pet[], direction: 'asc' | 'desc' = 'desc'): Pet[] {
  return [...pets].sort((a, b) => {
    const aVal = getPetDefaultValue(a);
    const bVal = getPetDefaultValue(b);
    return direction === 'desc' ? bVal - aVal : aVal - bVal;
  });
}

export function sortPetsByName(pets: Pet[], direction: 'asc' | 'desc' = 'asc'): Pet[] {
  return [...pets].sort((a, b) => {
    return direction === 'asc'
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });
}

export function sortPetsByScore(pets: Pet[]): Pet[] {
  return [...pets].sort((a, b) => a.score - b.score);
}

export function getSimilarPets(allPets: Pet[], targetPet: Pet, count = 8): Pet[] {
  const targetValue = getPetDefaultValue(targetPet);
  return allPets
    .filter((p) => p.name !== targetPet.name && p.type === targetPet.type)
    .sort((a, b) => {
      const aDiff = Math.abs(getPetDefaultValue(a) - targetValue);
      const bDiff = Math.abs(getPetDefaultValue(b) - targetValue);
      return aDiff - bDiff;
    })
    .slice(0, count);
}

export function getOnlyPets(pets: Pet[]): Pet[] {
  return pets.filter((p) => p.type === 'pets');
}
