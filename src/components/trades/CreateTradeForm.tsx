'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, ArrowRight, RotateCcw, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { PetImage } from '@/components/shared/PetImage';
import { PetSelector } from '@/components/calculator/PetSelector';
import { usePetData } from '@/lib/hooks/usePetData';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { createTrade } from '@/lib/firebase/firestore';
import { formatNumber } from '@/lib/utils/formatters';
import { getTradeResult, tradeItemFromPet } from '@/lib/utils/tradeHelpers';
import { getPetValue, getPetDefaultValue, type Pet, type ValueVariant, type PotionType } from '@/lib/types/pet';
import { Timestamp } from 'firebase/firestore';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

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

interface SelectedPet {
  pet: Pet;
  variant: ValueVariant;
  potion: PotionType;
  value: number;
}

export function CreateTradeForm() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const { pets, isLoading: petsLoading } = usePetData();

  const [hasItems, setHasItems] = useState<SelectedPet[]>([]);
  const [wantsItems, setWantsItems] = useState<SelectedPet[]>([]);
  const [description, setDescription] = useState('');
  const [selectorSide, setSelectorSide] = useState<'has' | 'wants' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasTotal = hasItems.reduce((s, i) => s + i.value, 0);
  const wantsTotal = wantsItems.reduce((s, i) => s + i.value, 0);
  const { status } = getTradeResult(hasTotal, wantsTotal);

  const addPet = (pet: Pet) => {
    const variant: ValueVariant = 'r';
    const potion: PotionType = 'default';
    const value = getPetValue(pet, variant, potion) || getPetDefaultValue(pet);
    const item: SelectedPet = { pet, variant, potion, value };
    if (selectorSide === 'has') setHasItems((prev) => [...prev, item]);
    else setWantsItems((prev) => [...prev, item]);
  };

  const updateHasItem = (index: number, variant: ValueVariant, potion: PotionType) => {
    setHasItems((prev) => prev.map((item, i) => {
      if (i !== index) return item;
      const value = getPetValue(item.pet, variant, potion) || getPetDefaultValue(item.pet);
      return { ...item, variant, potion, value };
    }));
  };

  const updateWantsItem = (index: number, variant: ValueVariant, potion: PotionType) => {
    setWantsItems((prev) => prev.map((item, i) => {
      if (i !== index) return item;
      const value = getPetValue(item.pet, variant, potion) || getPetDefaultValue(item.pet);
      return { ...item, variant, potion, value };
    }));
  };

  const removeHas = (index: number) => setHasItems((prev) => prev.filter((_, i) => i !== index));
  const removeWants = (index: number) => setWantsItems((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = async () => {
    if (!user) return;
    if (hasItems.length === 0 || wantsItems.length === 0) {
      toast.error('Add at least one pet to each side');
      return;
    }

    setIsSubmitting(true);
    try {
      await createTrade({
        userId: user.id,
        traderName: user.displayName || 'Unknown',
        avatar: user.avatar || '',
        hasItems: hasItems.map((i) => tradeItemFromPet(i.pet, i.variant, i.potion)),
        wantsItems: wantsItems.map((i) => tradeItemFromPet(i.pet, i.variant, i.potion)),
        hasItemNames: hasItems.map((i) => i.pet.name),
        wantsItemNames: wantsItems.map((i) => i.pet.name),
        hasTotal,
        wantsTotal,
        status,
        timestamp: Timestamp.now(),
        isFeatured: false,
        description,
        isPro: user.isPro || false,
        isSharkMode: false,
        rating: 0,
        ratingCount: 0,
      });
      toast.success('Trade posted!');
      router.push('/trades');
    } catch (err) {
      console.error('Error creating trade:', err);
      toast.error('Failed to post trade. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (petsLoading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-48 rounded-2xl" />
        <Skeleton className="h-48 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* HAS side */}
        <PetColumn
          label="Offering"
          side="has"
          items={hasItems}
          total={hasTotal}
          onAdd={() => setSelectorSide('has')}
          onRemove={removeHas}
          onUpdate={updateHasItem}
        />
        {/* WANTS side */}
        <PetColumn
          label="Looking For"
          side="wants"
          items={wantsItems}
          total={wantsTotal}
          onAdd={() => setSelectorSide('wants')}
          onRemove={removeWants}
          onUpdate={updateWantsItem}
        />
      </div>

      {/* Description */}
      <div>
        <label className="text-sm font-medium mb-1.5 block">Description (optional)</label>
        <Textarea
          placeholder="Add a note about your trade..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          maxLength={200}
        />
        <p className="text-xs text-muted-foreground mt-1 text-right">{description.length}/200</p>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || hasItems.length === 0 || wantsItems.length === 0}
          className="bg-app-primary hover:bg-app-primary/90 text-white flex-1 sm:flex-none gap-2"
        >
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          Post Trade
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setHasItems([]);
            setWantsItems([]);
            setDescription('');
          }}
          className="gap-1.5"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>

      {/* Pet selector */}
      <PetSelector
        open={selectorSide !== null}
        onClose={() => setSelectorSide(null)}
        pets={pets}
        onSelect={addPet}
        side={selectorSide || 'has'}
      />
    </div>
  );
}

function PetColumn({
  label,
  side,
  items,
  total,
  onAdd,
  onRemove,
  onUpdate,
}: {
  label: string;
  side: 'has' | 'wants';
  items: SelectedPet[];
  total: number;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, variant: ValueVariant, potion: PotionType) => void;
}) {
  const isHas = side === 'has';
  return (
    <div
      className={cn(
        'rounded-2xl border-2 p-3 sm:p-4',
        isHas ? 'border-app-has/40 bg-app-has/5' : 'border-app-want/40 bg-app-want/5',
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3
            className={cn(
              'text-sm font-bold uppercase tracking-wider',
              isHas ? 'text-app-has' : 'text-app-want',
            )}
          >
            {label}
          </h3>
          <p className="text-xs text-muted-foreground">
            Total:{' '}
            <span className={cn('font-semibold', isHas ? 'text-app-has' : 'text-app-want')}>
              {formatNumber(total)}
            </span>
          </p>
        </div>
        <Button
          size="sm"
          onClick={onAdd}
          className={cn(
            'text-white gap-1 h-8',
            isHas ? 'bg-app-has hover:bg-app-has/90' : 'bg-app-want hover:bg-app-want/90',
          )}
        >
          <Plus className="h-3.5 w-3.5" />
          Add
        </Button>
      </div>

      {items.length === 0 ? (
        <button
          onClick={onAdd}
          className={cn(
            'w-full rounded-xl border-2 border-dashed p-8 text-center text-sm text-muted-foreground transition-colors',
            isHas
              ? 'border-app-has/30 hover:border-app-has/50 hover:bg-app-has/5'
              : 'border-app-want/30 hover:border-app-want/50 hover:bg-app-want/5',
          )}
        >
          Tap to add pets
        </button>
      ) : (
        <div className="flex flex-wrap gap-2">
          {items.map((item, i) => (
            <div
              key={`${item.pet.id}-${i}`}
              className="relative flex flex-col items-center gap-1 rounded-xl border bg-card p-2 group"
            >
              <button
                onClick={() => onRemove(i)}
                className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-destructive text-white text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
              <PetImage src={item.pet.image} alt={item.pet.name} size={40} />
              <p className="text-[10px] font-medium truncate max-w-[50px]">{item.pet.name}</p>
              {/* Variant badges */}
              <div className="flex gap-0.5">
                {VARIANT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => onUpdate(i, opt.value, item.potion)}
                    className={cn(
                      'w-6 h-5 text-[8px] font-extrabold rounded transition-all',
                      item.variant === opt.value
                        ? (opt.color || 'bg-app-primary text-white') + ' ring-1 ring-offset-1 ring-offset-background ring-current'
                        : 'bg-muted text-muted-foreground hover:bg-accent',
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {/* Potion badges */}
              <div className="flex gap-0.5">
                {POTION_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => onUpdate(i, item.variant, opt.value)}
                    className={cn(
                      'w-5 h-4 text-[7px] font-extrabold rounded transition-all',
                      item.potion === opt.value
                        ? (opt.color || 'bg-app-secondary text-white') + ' ring-1 ring-offset-1 ring-offset-background ring-current'
                        : 'bg-muted text-muted-foreground hover:bg-accent',
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <p className="text-[10px] font-bold text-app-primary">{formatNumber(item.value)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
