import { type Pet, type PetRaw, normalizePet, getPetDefaultValue } from '@/lib/types/pet';
import { matchesPetSearch } from '@/i18n/petNames';

export { getPetDefaultValue };

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

export function searchPets(pets: Pet[], query: string, locale?: string): Pet[] {
  if (!query.trim()) return pets;
  const loc = locale || 'en';
  return pets.filter((pet) => matchesPetSearch(pet.name, query, loc));
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
    .filter((p) => p.name !== targetPet.name && p.type === 'pets')
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
