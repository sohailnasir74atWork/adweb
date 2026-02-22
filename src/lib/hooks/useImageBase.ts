'use client';

import { useState, useEffect } from 'react';
import { getImageBaseUrl } from '@/lib/firebase/database';

let cachedImageBase: string | null = null;

export function useImageBase(): string {
  const [imageBase, setImageBase] = useState(cachedImageBase || 'https://elvebredd.com');

  useEffect(() => {
    if (cachedImageBase) return;
    getImageBaseUrl().then((url) => {
      cachedImageBase = url;
      setImageBase(url);
    });
  }, []);

  return imageBase;
}
