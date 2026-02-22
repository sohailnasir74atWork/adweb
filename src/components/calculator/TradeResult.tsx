'use client';

import { cn } from '@/lib/utils';
import { formatNumber } from '@/lib/utils/formatters';
import { Trophy, ThumbsDown, Scale } from 'lucide-react';

interface TradeResultProps {
  result: 'w' | 'l' | 'f' | null;
  percentage: number;
  hasTotal: number;
  wantsTotal: number;
  compact?: boolean;
}

const RESULT_CONFIG = {
  w: {
    label: 'Win',
    icon: Trophy,
    bg: 'bg-green-500/15 dark:bg-green-500/20',
    border: 'border-green-500/40',
    text: 'text-green-700 dark:text-green-400',
    description: 'You receive more value!',
  },
  l: {
    label: 'Lose',
    icon: ThumbsDown,
    bg: 'bg-red-500/15 dark:bg-red-500/20',
    border: 'border-red-500/40',
    text: 'text-red-700 dark:text-red-400',
    description: 'You give more value.',
  },
  f: {
    label: 'Fair',
    icon: Scale,
    bg: 'bg-yellow-500/15 dark:bg-yellow-500/20',
    border: 'border-yellow-500/40',
    text: 'text-yellow-700 dark:text-yellow-400',
    description: 'Trade is roughly equal!',
  },
} as const;

export function TradeResult({ result, percentage, hasTotal, wantsTotal, compact }: TradeResultProps) {
  if (!result) {
    if (compact) return null;
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center">
        <Scale className="h-12 w-12 text-muted-foreground/40 mb-3" />
        <p className="text-base font-semibold text-muted-foreground">
          Add pets to both sides to see if it&apos;s fair!
        </p>
      </div>
    );
  }

  const config = RESULT_CONFIG[result];
  const Icon = config.icon;

  if (compact) {
    return (
      <div className={cn('flex flex-col items-center rounded-xl px-4 py-1.5', config.bg)}>
        <Icon className={cn('h-5 w-5', config.text)} />
        <p className={cn('text-sm font-extrabold', config.text)}>{config.label}</p>
        {percentage > 0 && (
          <p className={cn('text-[10px] font-bold', config.text)}>{percentage.toFixed(1)}%</p>
        )}
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col items-center rounded-2xl border-2 p-6 transition-all', config.bg, config.border)}>
      <Icon className={cn('h-12 w-12 mb-2', config.text)} />
      <p className={cn('text-3xl sm:text-4xl font-extrabold', config.text)}>{config.label}</p>
      {percentage > 0 && (
        <p className={cn('text-xl font-bold mt-1', config.text)}>
          {percentage.toFixed(1)}%
        </p>
      )}
      <p className="text-sm text-muted-foreground mt-1 font-semibold">{config.description}</p>
      <div className="flex items-center gap-6 mt-4 text-base">
        <div className="text-center">
          <p className="text-xs font-bold text-muted-foreground">Your Pets</p>
          <p className="text-lg font-extrabold text-app-has">{formatNumber(hasTotal)}</p>
        </div>
        <span className="text-lg font-bold text-muted-foreground">vs</span>
        <div className="text-center">
          <p className="text-xs font-bold text-muted-foreground">Their Pets</p>
          <p className="text-lg font-extrabold text-app-want">{formatNumber(wantsTotal)}</p>
        </div>
      </div>
    </div>
  );
}
