'use client';

import { useEffect, useState } from 'react';
import { config } from '@/lib/constants/config';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { PetImage } from '@/components/shared/PetImage';
import { formatNumber } from '@/lib/utils/formatters';
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ParsedChange {
  name: string;
  image: string;
  oldValue: number;
  newValue: number;
  changePercent: number;
  direction: 'up' | 'down';
}

type FilterTab = 'all' | 'up' | 'down';

const FILTER_TABS: { value: FilterTab; label: string }[] = [
  { value: 'all', label: 'All Changes' },
  { value: 'up', label: 'Rising' },
  { value: 'down', label: 'Falling' },
];

const SKIP_KEYS = new Set(['key', 'name', 'type', 'image']);
const PRIORITY_KEYS = ['rvalue', 'score', 'dvalue', 'nvalue', 'mvalue'];

function parseDiffData(raw: unknown): ParsedChange[] {
  if (!raw || typeof raw !== 'object') return [];
  const payload = raw as Record<string, unknown>;
  const changed = payload.changed as Array<Record<string, unknown>> | undefined;
  if (!Array.isArray(changed)) return [];

  const results: ParsedChange[] = [];

  for (const item of changed) {
    let primary: { oldVal: number; newVal: number } | null = null;

    for (const pk of PRIORITY_KEYS) {
      const v = item[pk];
      if (v && typeof v === 'object' && 'oldVal' in v && 'newVal' in v) {
        primary = v as { oldVal: number; newVal: number };
        break;
      }
    }
    if (!primary) {
      for (const k of Object.keys(item)) {
        if (SKIP_KEYS.has(k)) continue;
        const v = item[k];
        if (v && typeof v === 'object' && 'oldVal' in v && 'newVal' in v) {
          primary = v as { oldVal: number; newVal: number };
          break;
        }
      }
    }
    if (!primary) continue;

    const diff = primary.newVal - primary.oldVal;
    if (diff === 0) continue;

    const rawPct = primary.oldVal > 0 ? (diff / primary.oldVal) * 100 : 0;
    const pct = diff > 0 ? Math.max(1, Math.round(rawPct)) : Math.min(-1, Math.round(rawPct));

    results.push({
      name: (item.name as string) || '',
      image: (item.image as string) || '',
      oldValue: primary.oldVal,
      newValue: primary.newVal,
      changePercent: pct,
      direction: diff > 0 ? 'up' : 'down',
    });
  }

  results.sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent));
  return results;
}

export function ValueChangesFeed() {
  const [changes, setChanges] = useState<ParsedChange[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<FilterTab>('all');

  useEffect(() => {
    async function load() {
      try {
        const data = await fetch('/api/value-changes')
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null);
        if (data) setChanges(parseDiffData(data));
      } catch {
        // silently ignore
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const filtered =
    filter === 'all'
      ? changes
      : changes.filter((c) => c.direction === filter);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-16 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Filter tabs */}
      <div className="flex gap-1.5">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={cn(
              'text-xs font-medium px-3.5 py-1.5 rounded-full border transition-colors',
              filter === tab.value
                ? 'bg-app-primary text-white border-app-primary'
                : 'bg-card text-muted-foreground border-border hover:bg-accent',
            )}
          >
            {tab.label}
          </button>
        ))}
        <Badge variant="secondary" className="ml-auto text-xs">
          {filtered.length} changes
        </Badge>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-3 flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-green-500/15 flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Rising</p>
            <p className="text-lg font-bold text-green-600 dark:text-green-400">
              {changes.filter((c) => c.direction === 'up').length}
            </p>
          </div>
        </Card>
        <Card className="p-3 flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-red-500/15 flex items-center justify-center">
            <TrendingDown className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Falling</p>
            <p className="text-lg font-bold text-red-600 dark:text-red-400">
              {changes.filter((c) => c.direction === 'down').length}
            </p>
          </div>
        </Card>
      </div>

      {/* Value changes list */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed p-8 text-center">
          <p className="text-sm text-muted-foreground">No value changes found.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((change, i) => {
            const isUp = change.direction === 'up';
            return (
              <Card key={`${change.name}-${i}`} className="flex items-center gap-3 p-3">
                <PetImage src={change.image} alt={change.name} size={40} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{change.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatNumber(change.oldValue)} → {formatNumber(change.newValue)}
                  </p>
                </div>
                <div
                  className={cn(
                    'flex items-center gap-1 text-sm font-bold px-2.5 py-1 rounded-lg',
                    isUp
                      ? 'bg-green-500/15 text-green-700 dark:text-green-400'
                      : 'bg-red-500/15 text-red-700 dark:text-red-400',
                  )}
                >
                  {isUp ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  {Math.abs(change.changePercent)}%
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
