'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useImageBase } from '@/lib/hooks/useImageBase';

function resolveSrc(src: string, imageBase: string): string {
  if (!src) return '';
  if (src.startsWith('http')) return src;
  // Relative paths like /images/pets/X.png → dynamic base URL from RTDB
  return `${imageBase}${src.startsWith('/') ? '' : '/'}${src}`;
}

interface PetImageProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

export function PetImage({ src, alt, size = 64, className = '' }: PetImageProps) {
  const [error, setError] = useState(false);
  const imageBase = useImageBase();
  const resolved = resolveSrc(src, imageBase);

  if (error || !resolved) {
    return (
      <div
        className={`flex items-center justify-center rounded-lg bg-muted text-muted-foreground text-xs font-medium ${className}`}
        style={{ width: size, height: size }}
      >
        {alt.slice(0, 2).toUpperCase()}
      </div>
    );
  }

  return (
    <Image
      src={resolved}
      alt={alt}
      width={size}
      height={size}
      className={`object-contain ${className}`}
      onError={() => setError(true)}
      loading="lazy"
      unoptimized
    />
  );
}
