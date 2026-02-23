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
import { firestore } from '@/lib/firebase/config';
import { getDoc, doc } from 'firebase/firestore';
import { formatNumber } from '@/lib/utils/formatters';
import { getTradeResult, tradeItemFromPet } from '@/lib/utils/tradeHelpers';
import { getPetValue, getPetDefaultValue, type Pet, type ValueVariant, type PotionType } from '@/lib/types/pet';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

// Badge system matching RN: D/N/M are exclusive value types, F/R are independent toggles
type BadgeValueType = 'd' | 'n' | 'm';

interface SelectedPet {
  pet: Pet;
  valueType: BadgeValueType;
  isFly: boolean;
  isRide: boolean;
  value: number;
}

// Map badge value type to the Pet value variant used in getPetValue
function badgeToVariant(vt: BadgeValueType): ValueVariant {
  return vt === 'd' ? 'r' : vt; // 'd' (default) maps to 'r' (regular) in data
}

// Map isFly/isRide toggles to PotionType
function modifiersToPotion(isFly: boolean, isRide: boolean): PotionType {
  if (isFly && isRide) return 'flyride';
  if (isFly) return 'fly';
  if (isRide) return 'ride';
  return 'nopotion'; // When neither F nor R selected, use nopotion (matches RN)
}

function calcPetValue(pet: Pet, valueType: BadgeValueType, isFly: boolean, isRide: boolean): number {
  return getPetValue(pet, badgeToVariant(valueType), modifiersToPotion(isFly, isRide)) || getPetDefaultValue(pet);
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

  const addPet = (pet: Pet, valueType: BadgeValueType = 'd', isFly = false, isRide = false) => {
    const value = calcPetValue(pet, valueType, isFly, isRide);
    const item: SelectedPet = { pet, valueType, isFly, isRide, value };
    if (selectorSide === 'has') setHasItems((prev) => [...prev, item]);
    else setWantsItems((prev) => [...prev, item]);
    toast.success(`${pet.name} added!`, { duration: 1500 });
  };

  // Toggle a badge for a pet in a specific list
  const updateItem = (
    setter: React.Dispatch<React.SetStateAction<SelectedPet[]>>,
    index: number,
    badge: 'D' | 'N' | 'M' | 'F' | 'R',
  ) => {
    setter((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item;
        let { valueType, isFly, isRide } = item;

        if (badge === 'F') isFly = !isFly;
        else if (badge === 'R') isRide = !isRide;
        else valueType = badge.toLowerCase() as BadgeValueType;

        const value = calcPetValue(item.pet, valueType, isFly, isRide);
        return { ...item, valueType, isFly, isRide, value };
      }),
    );
  };

  const removeHas = (index: number) => setHasItems((prev) => prev.filter((_, i) => i !== index));
  const removeWants = (index: number) => setWantsItems((prev) => prev.filter((_, i) => i !== index));

  // Cooldown tracking (2 min, matches RN)
  const [lastTradeTime, setLastTradeTime] = useState<number | null>(null);

  const handleSubmit = async () => {
    if (!user) return;
    if (hasItems.length === 0 || wantsItems.length === 0) {
      toast.error('Add at least one pet to each side');
      return;
    }

    // 2-minute cooldown check (matches RN)
    const now = Date.now();
    const COOLDOWN_MS = 120000;
    if (lastTradeTime && (now - lastTradeTime) < COOLDOWN_MS) {
      const secondsLeft = Math.ceil((COOLDOWN_MS - (now - lastTradeTime)) / 1000);
      const minutesLeft = Math.floor(secondsLeft / 60);
      const remainingSeconds = secondsLeft % 60;
      const timeMessage = minutesLeft > 0
        ? `${minutesLeft}m ${remainingSeconds}s`
        : `${secondsLeft}s`;
      toast.error(`Please wait ${timeMessage} before creating a new trade.`);
      return;
    }

    setIsSubmitting(true);
    try {
      // Fetch real rating from Firestore (matches RN's user_ratings_summary)
      let userRating: number | null = null;
      let ratingCount = 0;

      try {
        const summaryDoc = await getDoc(doc(firestore, 'user_ratings_summary', user.id));
        if (summaryDoc.exists()) {
          const summaryData = summaryDoc.data();
          userRating = summaryData.averageRating || null;
          ratingCount = summaryData.count || 0;
        }
      } catch (err) {
        console.warn('Failed to fetch user rating:', err);
      }

      // Generate search tokens (matches RN's createSearchTokens)
      const createSearchTokens = (itemName: string): string[] => {
        const name = itemName.toLowerCase().trim();
        const tokens = [name];
        const words = name.split(/\s+/).filter((w) => w.length > 0);
        tokens.push(...words);
        return [...new Set(tokens)];
      };

      const hasRecentWin =
        typeof user.lastGameWinAt === 'number' &&
        now - user.lastGameWinAt <= 24 * 60 * 60 * 1000;

      await createTrade(
        {
          userId: user.id,
          traderName: user.displayName || 'Unknown',
          avatar: user.avatar || null,
          hasItems: hasItems.map((i) => ({
            name: i.pet.name,
            type: i.pet.type,
            valueType: i.valueType,
            isFly: i.isFly,
            isRide: i.isRide,
            image: i.pet.image,
          })),
          wantsItems: wantsItems.map((i) => ({
            name: i.pet.name,
            type: i.pet.type,
            valueType: i.valueType,
            isFly: i.isFly,
            isRide: i.isRide,
            image: i.pet.image,
          })),
          hasItemNames: hasItems.flatMap((i) => createSearchTokens(i.pet.name)),
          wantsItemNames: wantsItems.flatMap((i) => createSearchTokens(i.pet.name)),
          hasTotal,
          wantsTotal,
          status,
          timestamp: null, // Will be overridden by serverTimestamp() in createTrade
          isFeatured: false,
          description,
          isPro: user.isPro || false,
          isSharkMode: false,
          rating: userRating,
          ratingCount,
          flage: user.flage || null,
          robloxUsername: user.robloxUsername || null,
          robloxUsernameVerified: user.robloxUsernameVerified || false,
          hasRecentGameWin: hasRecentWin,
          lastGameWinAt: user.lastGameWinAt || null,
        },
        {
          userId: user.id,
          displayName: user.displayName || 'Unknown',
          avatar: user.avatar || null,
          description,
        },
      );

      setLastTradeTime(now);
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
          onUpdate={(index, badge) => updateItem(setHasItems, index, badge)}
        />
        {/* WANTS side */}
        <PetColumn
          label="Looking For"
          side="wants"
          items={wantsItems}
          total={wantsTotal}
          onAdd={() => setSelectorSide('wants')}
          onRemove={removeWants}
          onUpdate={(index, badge) => updateItem(setWantsItems, index, badge)}
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
  onUpdate: (index: number, badge: 'D' | 'N' | 'M' | 'F' | 'R') => void;
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
                className="absolute top-0.5 right-0.5 h-5 w-5 rounded-full bg-destructive text-white text-[10px] flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
              <PetImage src={item.pet.image} alt={item.pet.name} size={40} />
              <p className="text-[10px] font-medium truncate max-w-[50px]">{item.pet.name}</p>
              {/* 5-badge system: D/N/M (exclusive) + F/R (toggles) - matches RN */}
              <div className="flex gap-0.5">
                {(['D', 'N', 'M'] as const).map((badge) => (
                  <button
                    key={badge}
                    onClick={() => onUpdate(i, badge)}
                    className={cn(
                      'w-6 h-5 text-[8px] font-extrabold rounded transition-all',
                      item.valueType === badge.toLowerCase()
                        ? cn(
                          'text-white ring-1 ring-offset-1 ring-offset-background ring-current',
                          badge === 'D' && 'bg-emerald-500',
                          badge === 'N' && 'bg-green-500',
                          badge === 'M' && 'bg-purple-500',
                        )
                        : 'bg-muted text-muted-foreground hover:bg-accent',
                    )}
                  >
                    {badge}
                  </button>
                ))}
                {(['F', 'R'] as const).map((badge) => {
                  const isActive = badge === 'F' ? item.isFly : item.isRide;
                  return (
                    <button
                      key={badge}
                      onClick={() => onUpdate(i, badge)}
                      className={cn(
                        'w-6 h-5 text-[8px] font-extrabold rounded transition-all',
                        isActive
                          ? cn(
                            'text-white ring-1 ring-offset-1 ring-offset-background ring-current',
                            badge === 'F' && 'bg-blue-500',
                            badge === 'R' && 'bg-emerald-500',
                          )
                          : 'bg-muted text-muted-foreground hover:bg-accent',
                      )}
                    >
                      {badge}
                    </button>
                  );
                })}
              </div>
              <p className="text-[10px] font-bold text-app-primary">{formatNumber(item.value)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
