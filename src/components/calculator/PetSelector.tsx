'use client';

import { useState, useMemo, useCallback } from 'react';
import { Search, X, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PetImage } from '@/components/shared/PetImage';
import { Badge } from '@/components/ui/badge';
import { formatNumber } from '@/lib/utils/formatters';
import { type Pet, type ValueVariant, type PotionType, getPetValue, getPetDefaultValue } from '@/lib/types/pet';
import { searchPets, filterPetsByRarity, getOnlyPets } from '@/lib/utils/petHelpers';
import { cn } from '@/lib/utils';
import { useDebounce } from '@/lib/hooks/useDebounce';

interface PetSelectorProps {
  open: boolean;
  onClose: () => void;
  pets: Pet[];
  onSelect: (pet: Pet, variant?: ValueVariant, potion?: PotionType) => void;
  side: 'has' | 'wants';
}

const RARITY_FILTERS = ['All', 'Legendary', 'Ultra Rare', 'Rare', 'Uncommon', 'Common'];

const RARITY_COLORS: Record<string, string> = {
  legendary: 'bg-yellow-500/15 text-yellow-700 dark:text-yellow-400 border-yellow-500/30',
  'ultra rare': 'bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-500/30',
  rare: 'bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30',
  uncommon: 'bg-green-500/15 text-green-700 dark:text-green-400 border-green-500/30',
  common: 'bg-gray-500/15 text-gray-700 dark:text-gray-400 border-gray-500/30',
};

const VARIANT_OPTIONS: { value: ValueVariant; label: string; color: string }[] = [
  { value: 'r', label: 'N', color: '' },
  { value: 'n', label: 'Ne', color: 'bg-amber-500 text-white' },
  { value: 'm', label: 'M', color: 'bg-fuchsia-500 text-white' },
];

const POTION_OPTIONS: { value: PotionType; label: string; color: string }[] = [
  { value: 'default', label: 'Def', color: '' },
  { value: 'nopotion', label: 'NP', color: '' },
  { value: 'fly', label: 'F', color: 'bg-blue-500 text-white' },
  { value: 'ride', label: 'R', color: 'bg-green-500 text-white' },
  { value: 'flyride', label: 'FR', color: 'bg-purple-500 text-white' },
];

export function PetSelector({ open, onClose, pets, onSelect, side }: PetSelectorProps) {
  const [query, setQuery] = useState('');
  const [rarity, setRarity] = useState('All');
  const [variant, setVariant] = useState<ValueVariant>('r');
  const [potion, setPotion] = useState<PotionType>('default');
  const debouncedQuery = useDebounce(query, 200);

  const onlyPets = useMemo(() => getOnlyPets(pets), [pets]);

  const filtered = useMemo(() => {
    let result = onlyPets;
    result = searchPets(result, debouncedQuery);
    result = filterPetsByRarity(result, rarity);
    return result;
  }, [onlyPets, debouncedQuery, rarity]);

  const handleSelect = useCallback(
    (pet: Pet) => {
      onSelect(pet, variant, potion);
    },
    [onSelect, variant, potion],
  );

  const handleClose = useCallback(() => {
    setQuery('');
    setRarity('All');
    setVariant('r');
    setPotion('default');
    onClose();
  }, [onClose]);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="max-w-lg max-h-[85vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-4 pt-4 pb-2">
          <DialogTitle className="text-lg font-extrabold">
            Pick a pet for{' '}
            <span className={side === 'has' ? 'text-app-has' : 'text-app-want'}>
              {side === 'has' ? 'Your Side' : 'Their Side'}
            </span>
          </DialogTitle>
        </DialogHeader>

        {/* Search */}
        <div className="px-4 pb-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for a pet..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 pr-8 h-11 rounded-xl text-base"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Variant + Potion badges */}
        <div className="px-4 pb-2 flex flex-wrap items-center gap-1.5">
          {VARIANT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setVariant(opt.value)}
              className={cn(
                'h-7 px-2.5 text-[10px] font-extrabold rounded-lg transition-all',
                variant === opt.value
                  ? (opt.color || 'bg-app-primary text-white') + ' ring-2 ring-offset-1 ring-offset-background ring-current'
                  : 'bg-muted text-muted-foreground hover:bg-accent',
              )}
            >
              {opt.label}
            </button>
          ))}
          <span className="w-px h-5 bg-border mx-0.5" />
          {POTION_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setPotion(opt.value)}
              className={cn(
                'h-6 px-2 text-[9px] font-extrabold rounded-lg transition-all',
                potion === opt.value
                  ? (opt.color || 'bg-app-secondary text-white') + ' ring-2 ring-offset-1 ring-offset-background ring-current'
                  : 'bg-muted text-muted-foreground hover:bg-accent',
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Rarity filter */}
        <div className="flex gap-1.5 px-4 pb-3 overflow-x-auto no-scrollbar">
          {RARITY_FILTERS.map((r) => (
            <button
              key={r}
              onClick={() => setRarity(r)}
              className={cn(
                'tap-target whitespace-nowrap text-xs font-bold px-4 py-1.5 rounded-xl border transition-all',
                rarity === r
                  ? 'bg-app-primary text-white border-app-primary shadow-sm'
                  : 'bg-card text-muted-foreground border-border hover:bg-accent active:scale-95',
              )}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Pet grid */}
        <ScrollArea className="flex-1 px-4 pb-4">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground text-sm">
              No pets found
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {filtered.map((pet) => {
                const value = getPetValue(pet, variant, potion) || getPetDefaultValue(pet);
                return (
                  <button
                    key={pet.id}
                    onClick={() => handleSelect(pet)}
                    className="tap-target flex flex-col items-center gap-1 rounded-2xl border bg-card p-2 hover:border-app-primary/50 hover:shadow-md transition-all active:scale-95"
                  >
                    <PetImage src={pet.image} alt={pet.name} size={44} />
                    <p className="text-[10px] font-bold text-center truncate w-full leading-tight">
                      {pet.name}
                    </p>
                    <p className="text-xs font-extrabold text-app-primary">{formatNumber(value)}</p>
                  </button>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
