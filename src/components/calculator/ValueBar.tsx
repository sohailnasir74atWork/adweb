'use client';

import { formatNumber } from '@/lib/utils/formatters';
import { cn } from '@/lib/utils';

interface ValueBarProps {
  hasTotal: number;
  wantsTotal: number;
}

export function ValueBar({ hasTotal, wantsTotal }: ValueBarProps) {
  const total = hasTotal + wantsTotal;
  const hasPercent = total > 0 ? (hasTotal / total) * 100 : 50;
  const wantsPercent = total > 0 ? (wantsTotal / total) * 100 : 50;

  return (
    <div className="w-full space-y-1 sm:space-y-2">
      <div className="flex justify-between text-xs sm:text-sm font-bold">
        <span className="text-app-has"><span className="sm:hidden">You:</span><span className="hidden sm:inline">Your Pets:</span> {formatNumber(hasTotal)}</span>
        <span className="text-app-want"><span className="sm:hidden">Them:</span><span className="hidden sm:inline">Their Pets:</span> {formatNumber(wantsTotal)}</span>
      </div>
      <div className="flex h-3 sm:h-4 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-app-has transition-all duration-500 ease-out"
          style={{
            width: `${hasPercent}%`,
            borderRadius: wantsPercent === 0 ? '9999px' : '9999px 0 0 9999px',
          }}
        />
        <div
          className="h-full bg-app-want transition-all duration-500 ease-out"
          style={{
            width: `${wantsPercent}%`,
            borderRadius: hasPercent === 0 ? '9999px' : '0 9999px 9999px 0',
          }}
        />
      </div>
    </div>
  );
}
