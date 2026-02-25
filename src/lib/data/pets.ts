import { config } from '@/lib/constants/config';
import { type Pet, type PetRaw, normalizePet } from '@/lib/types/pet';
import { fetchImageBaseUrl } from './imageBase';

// Server-side fetch for SSG/ISR pages — NOT a client module
export async function fetchPetDataServer(): Promise<Pet[]> {
  const [res, imageBase] = await Promise.all([
    fetch(config.petDataUrl, { next: { revalidate: 3600 } }),
    fetchImageBaseUrl(),
  ]);
  if (!res.ok) throw new Error('Failed to fetch pet data');
  const raw: PetRaw[] = await res.json();
  return raw.map((r) => normalizePet(r, imageBase));
}
