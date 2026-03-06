'use client';

import { useState } from 'react';
import { Plus, ArrowLeftRight, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTradeStore } from '@/lib/store/useTradeStore';
import { usePetData } from '@/lib/hooks/usePetData';
import { CalculatorPetCard } from './CalculatorPetCard';
import { PetSelector } from './PetSelector';
import { TradeResult } from './TradeResult';
import { ValueBar } from './ValueBar';
import { cn } from '@/lib/utils';
import { formatNumber } from '@/lib/utils/formatters';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

type SelectorSide = 'has' | 'wants' | null;

export function CalculatorBoard() {
  const [selectorSide, setSelectorSide] = useState<SelectorSide>(null);
  const { pets, isLoading } = usePetData();

  const {
    hasItems,
    wantsItems,
    hasTotal,
    wantsTotal,
    result,
    resultPercentage,
    addHasItem,
    addWantsItem,
    removeHasItem,
    removeWantsItem,
    updateHasItem,
    updateWantsItem,
    swapSides,
    clearAll,
  } = useTradeStore();

  if (isLoading) {
    return <CalculatorSkeleton />;
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Top controls */}
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="outline"
          onClick={swapSides}
          disabled={hasItems.length === 0 && wantsItems.length === 0}
          className="tap-target gap-2 rounded-2xl font-bold"
        >
          <ArrowLeftRight className="h-5 w-5" />
          Swap
        </Button>
        <Button
          variant="outline"
          onClick={clearAll}
          disabled={hasItems.length === 0 && wantsItems.length === 0}
          className="tap-target gap-2 rounded-2xl font-bold"
        >
          <RotateCcw className="h-5 w-5" />
          Start Over
        </Button>
      </div>

      {/* Summary — always visible */}
      {(hasItems.length > 0 || wantsItems.length > 0) && (
        <div className="sticky top-16 z-10 bg-background/95 backdrop-blur-sm rounded-xl sm:rounded-2xl border p-1.5 sm:p-3 shadow-sm">
          <div className="flex items-center justify-between gap-1 sm:gap-3">
            <div className="text-center flex-1">
              <p className="text-[7px] sm:text-[10px] uppercase tracking-wider text-muted-foreground font-bold">You ({hasItems.length})</p>
              <p className="text-[9px] sm:text-sm font-extrabold text-app-has">{formatNumber(hasTotal)}</p>
            </div>
            <TradeResult result={result} percentage={resultPercentage} hasTotal={hasTotal} wantsTotal={wantsTotal} compact />
            <div className="text-center flex-1">
              <p className="text-[7px] sm:text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Them ({wantsItems.length})</p>
              <p className="text-[9px] sm:text-sm font-extrabold text-app-want">{formatNumber(wantsTotal)}</p>
            </div>
          </div>
          <ValueBar hasTotal={hasTotal} wantsTotal={wantsTotal} />
        </div>
      )}

      {/* Two sides — always side by side */}
      <div className="grid grid-cols-2 gap-3">
        {/* HAS / Offering side */}
        <div className="rounded-2xl border-2 border-app-has/40 bg-app-has/5 p-1.5 sm:p-3">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <div>
              <h3 className="text-[7px] sm:text-sm font-extrabold text-app-has"><span className="sm:hidden">You</span><span className="hidden sm:inline">Your Pets</span></h3>
              <p className="text-[7px] sm:text-[10px] text-muted-foreground">
                Total: <span className="font-semibold text-app-has">{formatNumber(hasTotal)}</span>
              </p>
            </div>
            <Button
              size="sm"
              onClick={() => setSelectorSide('has')}
              className="bg-app-has hover:bg-app-has/90 text-white gap-0.5 rounded-lg sm:rounded-xl font-bold h-5 sm:h-8 px-1.5 sm:px-3 text-[8px] sm:text-xs"
            >
              <Plus className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5" />
              Add
            </Button>
          </div>

          {hasItems.length === 0 ? (
            <button
              onClick={() => setSelectorSide('has')}
              className="w-full rounded-xl border-2 border-dashed border-app-has/30 p-4 sm:p-6 text-center text-xs sm:text-sm text-muted-foreground hover:border-app-has/50 hover:bg-app-has/5 transition-colors"
            >
              Tap here to add your pets!
            </button>
          ) : (
            <div className="max-h-[420px] overflow-y-auto overflow-x-hidden pr-0.5">
              <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-px sm:gap-1.5">
                {hasItems.map((item, i) => (
                  <CalculatorPetCard
                    key={`has-${i}-${item.pet.id}`}
                    item={item}
                    index={i}
                    onRemove={removeHasItem}
                    onUpdate={updateHasItem}
                  />
                ))}
                <button
                  onClick={() => setSelectorSide('has')}
                  className="flex flex-col items-center justify-center gap-0.5 rounded-xl border-2 border-dashed border-app-has/30 p-2 text-muted-foreground hover:border-app-has/50 hover:bg-app-has/5 transition-colors min-h-[50px] sm:min-h-[70px]"
                >
                  <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-[9px] sm:text-[10px]">Add</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* WANTS / Looking For side */}
        <div className="rounded-2xl border-2 border-app-want/40 bg-app-want/5 p-1.5 sm:p-3">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <div>
              <h3 className="text-[7px] sm:text-sm font-extrabold text-app-want"><span className="sm:hidden">Them</span><span className="hidden sm:inline">Their Pets</span></h3>
              <p className="text-[7px] sm:text-[10px] text-muted-foreground">
                Total: <span className="font-semibold text-app-want">{formatNumber(wantsTotal)}</span>
              </p>
            </div>
            <Button
              size="sm"
              onClick={() => setSelectorSide('wants')}
              className="bg-app-want hover:bg-app-want/90 text-white gap-0.5 rounded-lg sm:rounded-xl font-bold h-5 sm:h-8 px-1.5 sm:px-3 text-[8px] sm:text-xs"
            >
              <Plus className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5" />
              Add
            </Button>
          </div>

          {wantsItems.length === 0 ? (
            <button
              onClick={() => setSelectorSide('wants')}
              className="w-full rounded-xl border-2 border-dashed border-app-want/30 p-4 sm:p-6 text-center text-xs sm:text-sm text-muted-foreground hover:border-app-want/50 hover:bg-app-want/5 transition-colors"
            >
              Tap here to add their pets!
            </button>
          ) : (
            <div className="max-h-[420px] overflow-y-auto overflow-x-hidden pr-0.5">
              <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-px sm:gap-1.5">
                {wantsItems.map((item, i) => (
                  <CalculatorPetCard
                    key={`wants-${i}-${item.pet.id}`}
                    item={item}
                    index={i}
                    onRemove={removeWantsItem}
                    onUpdate={updateWantsItem}
                  />
                ))}
                <button
                  onClick={() => setSelectorSide('wants')}
                  className="flex flex-col items-center justify-center gap-0.5 rounded-xl border-2 border-dashed border-app-want/30 p-2 text-muted-foreground hover:border-app-want/50 hover:bg-app-want/5 transition-colors min-h-[50px] sm:min-h-[70px]"
                >
                  <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-[9px] sm:text-[10px]">Add</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pet selector modal */}
      <PetSelector
        open={selectorSide !== null}
        onClose={() => setSelectorSide(null)}
        pets={pets}
        onSelect={(pet, valueType, isFly, isRide) => {
          if (selectorSide === 'has') addHasItem(pet, valueType, isFly, isRide);
          else if (selectorSide === 'wants') addWantsItem(pet, valueType, isFly, isRide);
          toast.success(`${pet.name} added!`, { duration: 1500 });
        }}
        side={selectorSide || 'has'}
      />
    </div>
  );
}

function CalculatorSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end gap-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Skeleton className="h-48 rounded-2xl" />
        <Skeleton className="h-48 rounded-2xl" />
      </div>
      <Skeleton className="h-24 rounded-xl" />
    </div>
  );
}
