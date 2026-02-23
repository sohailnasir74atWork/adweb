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
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm font-bold">
        <span className="text-app-has">Your Pets: {formatNumber(hasTotal)}</span>
        <span className="text-app-want">Their Pets: {formatNumber(wantsTotal)}</span>
      </div>
      <div className="flex h-4 w-full overflow-hidden rounded-full bg-muted">
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
