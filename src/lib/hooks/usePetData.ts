'use client';

import { useEffect, useCallback, useState } from 'react';
import { config } from '@/lib/constants/config';
import { type Pet, type PetRaw, normalizePet } from '@/lib/types/pet';
import { getImageBaseUrl } from '@/lib/firebase/database';

// Shared module-level cache (same instance used by useImageBase)
let cachedImageBase: string | null = null;

async function getOrFetchImageBase(): Promise<string> {
  if (cachedImageBase) return cachedImageBase;
  const url = await getImageBaseUrl();
  cachedImageBase = url;
  return url;
}

export function usePetData() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastFetchTime, setLastFetchTime] = useState<number>(0);

  const fetchPetData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [res, imageBase] = await Promise.all([
        fetch(config.petDataUrl),
        getOrFetchImageBase(),
      ]);
      if (!res.ok) throw new Error('Failed to fetch pet data');
      const raw: PetRaw[] = await res.json();
      const normalized = raw.map((r) => normalizePet(r, imageBase));
      setPets(normalized);
      setLastFetchTime(Date.now());
    } catch (error) {
      console.error('Error fetching pet data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const now = Date.now();
    const isStale = now - lastFetchTime > config.cache.petData;

    if (isStale || pets.length === 0) {
      fetchPetData();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { pets, isLoading, refetch: fetchPetData };
}
