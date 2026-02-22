'use client';

import Image from 'next/image';
import { useState } from 'react';

const CDN_BASE = 'https://adoptme.b-cdn.net';

function resolveSrc(src: string): string {
  if (!src) return '';
  if (src.startsWith('http')) return src;
  // Relative paths like /images/pets/X.png → CDN URL
  return `${CDN_BASE}${src.startsWith('/') ? '' : '/'}${src}`;
}

interface PetImageProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

export function PetImage({ src, alt, size = 64, className = '' }: PetImageProps) {
  const [error, setError] = useState(false);
  const resolved = resolveSrc(src);

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
      unoptimized
    />
  );
}
