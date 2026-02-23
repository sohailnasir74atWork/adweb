'use client';

import { useState, useMemo, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { PetImage } from '@/components/shared/PetImage';
import { formatNumber } from '@/lib/utils/formatters';
import { type Pet, getPetDefaultValue } from '@/lib/types/pet';
import { searchPets, filterPetsByRarity, filterPetsByType, isPetType, ITEM_TYPES } from '@/lib/utils/petHelpers';
import { cn } from '@/lib/utils';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { type BadgeValueType, calculateItemValue } from '@/lib/utils/tradeHelpers';


interface PetSelectorProps {
  open: boolean;
  onClose: () => void;
  pets: Pet[];
  onSelect: (pet: Pet, valueType: BadgeValueType, isFly: boolean, isRide: boolean) => void;
  side: 'has' | 'wants';
}

const RARITY_FILTERS = ['All', 'Legendary', 'Ultra Rare', 'Rare', 'Uncommon', 'Common'];

const RARITY_EMOJI: Record<string, string> = {
  All: '🌟',
  Legendary: '🏆',
  'Ultra Rare': '💎',
  Rare: '💙',
  Uncommon: '💚',
  Common: '🤍',
};

const VALUE_BADGES: { key: BadgeValueType; label: string; emoji: string; activeClass: string }[] = [
  { key: 'd', label: 'D', emoji: '🐾', activeClass: 'bg-emerald-500 text-white shadow-emerald-500/40' },
  { key: 'n', label: 'N', emoji: '✨', activeClass: 'bg-green-500 text-white shadow-green-500/40' },
  { key: 'm', label: 'M', emoji: '🌈', activeClass: 'bg-purple-500 text-white shadow-purple-500/40' },
];

const MODIFIER_BADGES: { key: 'F' | 'R'; label: string; emoji: string; activeClass: string }[] = [
  { key: 'F', label: 'F', emoji: '🪽', activeClass: 'bg-blue-500 text-white shadow-blue-500/40' },
  { key: 'R', label: 'R', emoji: '🏇', activeClass: 'bg-amber-500 text-white shadow-amber-500/40' },
];

export function PetSelector({ open, onClose, pets, onSelect, side }: PetSelectorProps) {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('pets');
  const [rarity, setRarity] = useState('All');
  const [valueType, setValueType] = useState<BadgeValueType>('d');
  const [isFly, setIsFly] = useState(false);
  const [isRide, setIsRide] = useState(false);
  const debouncedQuery = useDebounce(query, 200);

  const isPet = isPetType(type);

  const filtered = useMemo(() => {
    let result = filterPetsByType(pets, type);
    result = searchPets(result, debouncedQuery);
    result = filterPetsByRarity(result, rarity);
    return result;
  }, [pets, type, debouncedQuery, rarity]);

  const handleSelect = useCallback(
    (pet: Pet) => {
      // For non-pet items, always use default value type with no modifiers
      onSelect(pet, isPet ? valueType : 'd', isPet ? isFly : false, isPet ? isRide : false);
    },
    [onSelect, valueType, isFly, isRide, isPet],
  );

  const handleTypeChange = useCallback((t: string) => {
    setType(t);
    setRarity('All');
    // Reset pet-specific badges when switching away from pets
    if (!isPetType(t)) {
      setValueType('d');
      setIsFly(false);
      setIsRide(false);
    }
  }, []);

  const handleClose = useCallback(() => {
    setQuery('');
    setType('pets');
    setRarity('All');
    setValueType('d');
    setIsFly(false);
    setIsRide(false);
    onClose();
  }, [onClose]);

  const isHas = side === 'has';

  return (
    <Sheet open={open} onOpenChange={(o) => !o && handleClose()}>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className="h-[70vh] sm:h-[80vh] rounded-t-3xl flex flex-col p-0 gap-0 bg-muted/40 backdrop-blur-md border-t border-border/50"
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
        </div>

        {/* Header */}
        <SheetHeader className="px-5 pt-1 pb-2">
          <SheetTitle className="text-center text-lg font-extrabold tracking-tight">
            Pick an item for{' '}
            <span
              className={cn(
                'inline-block px-2.5 py-0.5 rounded-lg text-white text-base font-extrabold',
                isHas ? 'bg-app-has' : 'bg-app-want',
              )}
            >
              {isHas ? '🧸 Your Side' : '🎯 Their Side'}
            </span>
          </SheetTitle>
        </SheetHeader>

        {/* Search bar */}
        <div className="px-5 pb-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={`Search for ${isPet ? 'a pet' : 'an item'}...`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-9 h-11 rounded-2xl text-sm bg-muted/50 border-0 focus-visible:ring-2 focus-visible:ring-app-primary/30 placeholder:text-muted-foreground/60"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 flex items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-accent transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Type filter tabs */}
        <div className="px-5 pb-2">
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
            {ITEM_TYPES.map((t) => (
              <button
                key={t.value}
                onClick={() => handleTypeChange(t.value)}
                className={cn(
                  'whitespace-nowrap text-xs font-bold px-3 py-1.5 rounded-full border transition-all duration-150 shrink-0',
                  type === t.value
                    ? cn(
                      'text-white border-transparent shadow-sm scale-105',
                      isHas ? 'bg-app-has' : 'bg-app-want',
                    )
                    : 'bg-card text-muted-foreground border-border hover:bg-accent active:scale-95',
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Badge buttons — D/N/M + F/R (pets only) */}
        {isPet && (
          <div className="px-5 pb-3">
            <div className="flex items-center justify-center gap-2">
              {VALUE_BADGES.map((b) => (
                <button
                  key={b.key}
                  onClick={() => setValueType(b.key)}
                  className={cn(
                    'h-10 px-4 text-sm font-extrabold rounded-xl transition-all duration-200 flex items-center gap-1.5',
                    valueType === b.key
                      ? `${b.activeClass} shadow-lg scale-105`
                      : 'bg-muted text-muted-foreground hover:bg-accent hover:scale-105 active:scale-95',
                  )}
                >
                  <span className="text-base">{b.emoji}</span>
                  {b.label}
                </button>
              ))}
              <div className="w-px h-8 bg-border mx-0.5" />
              {MODIFIER_BADGES.map((b) => {
                const isActive = b.key === 'F' ? isFly : isRide;
                return (
                  <button
                    key={b.key}
                    onClick={() => (b.key === 'F' ? setIsFly(!isFly) : setIsRide(!isRide))}
                    className={cn(
                      'h-10 px-4 text-sm font-extrabold rounded-xl transition-all duration-200 flex items-center gap-1.5',
                      isActive
                        ? `${b.activeClass} shadow-lg scale-105`
                        : 'bg-muted text-muted-foreground hover:bg-accent hover:scale-105 active:scale-95',
                    )}
                  >
                    <span className="text-base">{b.emoji}</span>
                    {b.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Rarity filter pills */}
        <div className="px-5 pb-3">
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
            {RARITY_FILTERS.map((r) => (
              <button
                key={r}
                onClick={() => setRarity(r)}
                className={cn(
                  'whitespace-nowrap text-xs font-bold px-3.5 py-2 rounded-full border transition-all duration-150 shrink-0',
                  rarity === r
                    ? cn(
                      'text-white border-transparent shadow-sm scale-105',
                      isHas ? 'bg-app-has' : 'bg-app-want',
                    )
                    : 'bg-card text-muted-foreground border-border hover:bg-accent active:scale-95',
                )}
              >
                {RARITY_EMOJI[r] || ''} {r}
              </button>
            ))}
          </div>
        </div>

        {/* Pet grid — scrollable */}
        <div className="flex-1 min-h-0 overflow-y-auto px-5 pb-8">
          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-muted-foreground text-sm font-medium">No items found</p>
              <p className="text-muted-foreground/60 text-xs mt-1">Try a different search or filter</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {filtered.map((pet) => {
                const value =
                  calculateItemValue(pet, valueType, isFly, isRide) || getPetDefaultValue(pet);
                return (
                  <button
                    key={pet.id}
                    onClick={() => handleSelect(pet)}
                    className={cn(
                      'flex flex-col items-center gap-1 rounded-2xl border-2 bg-card p-2.5',
                      'hover:shadow-lg transition-all duration-150 active:scale-[0.97]',
                      isHas
                        ? 'border-transparent hover:border-app-has/40 hover:bg-app-has/5'
                        : 'border-transparent hover:border-app-want/40 hover:bg-app-want/5',
                    )}
                  >
                    <PetImage src={pet.image} alt={pet.name} size={48} />
                    <p className="text-[11px] font-bold text-center truncate w-full leading-tight">
                      {pet.name}
                    </p>
                    <p
                      className={cn(
                        'text-xs font-extrabold',
                        isHas ? 'text-app-has' : 'text-app-want',
                      )}
                    >
                      {formatNumber(value)}
                    </p>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
