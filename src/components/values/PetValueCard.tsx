'use client';

import Link from 'next/link';
import { PetImage } from '@/components/shared/PetImage';
import { type Pet, getPetDefaultValue } from '@/lib/types/pet';
import { formatNumber } from '@/lib/utils/formatters';
import { slugify } from '@/lib/utils/slugify';

const RARITY_BG: Record<string, string> = {
  legendary: 'from-amber-100 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/10 ring-amber-200/60 dark:ring-amber-700/40',
  'ultra rare': 'from-violet-100 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/10 ring-violet-200/60 dark:ring-violet-700/40',
  rare: 'from-blue-100 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/10 ring-blue-200/60 dark:ring-blue-700/40',
  uncommon: 'from-emerald-100 to-green-50 dark:from-emerald-900/20 dark:to-green-900/10 ring-emerald-200/60 dark:ring-emerald-700/40',
  common: 'from-gray-100 to-slate-50 dark:from-gray-800/20 dark:to-slate-800/10 ring-gray-200/60 dark:ring-gray-700/40',
};

const RARITY_TEXT: Record<string, string> = {
  legendary: 'text-amber-700 dark:text-amber-400',
  'ultra rare': 'text-violet-700 dark:text-violet-400',
  rare: 'text-blue-700 dark:text-blue-400',
  uncommon: 'text-emerald-700 dark:text-emerald-400',
  common: 'text-gray-600 dark:text-gray-400',
};

interface PetValueCardProps {
  pet: Pet;
}

export function PetValueCard({ pet }: PetValueCardProps) {
  const value = getPetDefaultValue(pet);
  const bgClass = RARITY_BG[pet.rarity.toLowerCase()] || RARITY_BG.common;
  const textClass = RARITY_TEXT[pet.rarity.toLowerCase()] || RARITY_TEXT.common;

  return (
    <Link href={`/values/${slugify(pet.name)}`} prefetch={false}>
      <div className={`group flex flex-col items-center gap-1.5 sm:gap-2 rounded-2xl sm:rounded-3xl bg-gradient-to-b ${bgClass} ring-1 p-3 sm:p-4 hover:scale-[1.04] active:scale-[0.97] transition-all cursor-pointer h-full`}>
        <div className="rounded-xl sm:rounded-2xl bg-white/60 dark:bg-white/10 p-1.5 sm:p-2">
          <PetImage src={pet.image} alt={pet.name} size={72} className="drop-shadow-sm w-[56px] h-[56px] sm:w-[72px] sm:h-[72px]" />
        </div>
        <div className="text-center w-full">
          <p className="text-sm font-bold truncate group-hover:text-app-primary transition-colors">
            {pet.name}
          </p>
          <p className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${textClass}`}>
            {pet.rarity}
          </p>
        </div>
        <div className="text-center mt-auto pt-1">
          <p className="text-lg sm:text-xl font-extrabold text-app-primary leading-none">{formatNumber(value)}</p>
          {(pet.nvalue > 0 || pet.mvalue > 0) && (
            <div className="flex justify-center gap-2.5 text-[10px] font-semibold text-muted-foreground mt-1.5">
              {pet.nvalue > 0 && <span>Neon {formatNumber(pet.nvalue)}</span>}
              {pet.mvalue > 0 && <span>Mega {formatNumber(pet.mvalue)}</span>}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
