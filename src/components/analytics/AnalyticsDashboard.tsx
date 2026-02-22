'use client';

import { useEffect, useState, useMemo } from 'react';
import { config } from '@/lib/constants/config';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { PetImage } from '@/components/shared/PetImage';
import { formatNumber } from '@/lib/utils/formatters';
import { TrendingUp, TrendingDown, BarChart3, Handshake, ArrowUpRight, ArrowDownRight, Flame, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ---------- Types matching CDN data ---------- */
interface AnalyticsItem {
  name: string;
  image: string;
  count: number;
  type?: string;
  ratio?: number;
  signal?: string;
  demand?: number;
  supply?: number;
  changePercent?: number;
  direction?: string;
  prediction?: string;
  confidence?: number;
}

interface CDNAnalytics {
  tradeVolume?: { today: number; last24h: number; thisWeek: number };
  statusDistribution?: { win: number; lose: number; fair: number };
  hourlyActivity?: number[];
  peakHour?: number;
  topTraded?: AnalyticsItem[];
  topWanted?: AnalyticsItem[];
  topOffered?: AnalyticsItem[];
  topMovers?: AnalyticsItem[];
  topLosers?: AnalyticsItem[];
  demandSupplyRatios?: AnalyticsItem[];
  predictions?: AnalyticsItem[];
  computedAt?: string;
}

interface DiffItem {
  name: string;
  image: string;
  type?: string;
  [key: string]: unknown;
}

interface DiffPayload {
  meta?: { generatedAt: string; changedCount: number };
  changed?: DiffItem[];
}

interface NormalizedChange {
  name: string;
  image: string;
  type: string;
  oldVal: number;
  newVal: number;
  pct: number;
  direction: 'up' | 'down';
}

/* ---------- Helpers ---------- */
const VM = 2; // visual multiplier (cosmetic, matches reference app)

const SKIP_KEYS = new Set(['key', 'name', 'type', 'image']);

function normalizeDiff(raw: DiffPayload): NormalizedChange[] {
  if (!raw?.changed) return [];
  const results: NormalizedChange[] = [];

  for (const item of raw.changed) {
    // Find the primary value key (first one with oldVal/newVal)
    let primary: { oldVal: number; newVal: number } | null = null;
    for (const k of Object.keys(item)) {
      if (SKIP_KEYS.has(k)) continue;
      const v = item[k];
      if (v && typeof v === 'object' && 'oldVal' in v && 'newVal' in v) {
        primary = v as { oldVal: number; newVal: number };
        break;
      }
    }
    if (!primary) continue;

    const diff = primary.newVal - primary.oldVal;
    const pct = primary.oldVal > 0 ? Math.round((diff / primary.oldVal) * 100) : 0;
    if (pct === 0) continue;

    results.push({
      name: item.name || '',
      image: item.image || '',
      type: (item.type as string) || 'Pet',
      oldVal: primary.oldVal,
      newVal: primary.newVal,
      pct,
      direction: pct > 0 ? 'up' : 'down',
    });
  }

  // Sort by absolute pct descending
  results.sort((a, b) => Math.abs(b.pct) - Math.abs(a.pct));
  return results;
}

/* ---------- Firestore REST normaliser (CDN may wrap in documents) ---------- */
function unwrapFirestoreValue(v: unknown): unknown {
  if (!v || typeof v !== 'object') return v;
  const obj = v as Record<string, unknown>;
  if ('stringValue' in obj) return obj.stringValue;
  if ('integerValue' in obj) return Number(obj.integerValue);
  if ('doubleValue' in obj) return Number(obj.doubleValue);
  if ('booleanValue' in obj) return Boolean(obj.booleanValue);
  if ('mapValue' in obj) {
    const fields = (obj.mapValue as Record<string, unknown>)?.fields || {};
    const out: Record<string, unknown> = {};
    for (const k of Object.keys(fields as Record<string, unknown>)) {
      out[k] = unwrapFirestoreValue((fields as Record<string, unknown>)[k]);
    }
    return out;
  }
  if ('arrayValue' in obj) {
    const values = ((obj.arrayValue as Record<string, unknown>)?.values || []) as unknown[];
    return values.map(unwrapFirestoreValue);
  }
  return v;
}

function normalizeFirestoreDoc(payload: unknown): CDNAnalytics {
  if (!payload || typeof payload !== 'object') return {};
  const p = payload as Record<string, unknown>;
  const doc = (p.documents as unknown[])?.[0] as Record<string, unknown> | undefined;
  if (doc?.fields) {
    const fields = doc.fields as Record<string, unknown>;
    const out: Record<string, unknown> = {};
    for (const k of Object.keys(fields)) {
      out[k] = unwrapFirestoreValue(fields[k]);
    }
    return out as unknown as CDNAnalytics;
  }
  return payload as CDNAnalytics;
}

/* ---------- Helpers: fix relative image paths ---------- */
function fixImagePath(img: string | undefined): string {
  if (!img) return '';
  if (img.startsWith('http')) return img;
  // Relative paths like /images/pets/X.png → CDN URL
  return `${config.cdnBaseUrl}${img}`;
}

function fixItemImages<T extends { image: string }>(items: T[] | undefined): T[] | undefined {
  if (!items) return items;
  return items.map((item) => ({ ...item, image: fixImagePath(item.image) }));
}

/* ---------- Component ---------- */
export function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<CDNAnalytics | null>(null);
  const [changes, setChanges] = useState<NormalizedChange[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'changes' | 'movers' | 'predictions'>('overview');

  useEffect(() => {
    async function fetchData() {
      try {
        const [analyticsRes, changesRes] = await Promise.all([
          fetch(`${config.tradeAnalyticsUrl}?cb=${Date.now()}`).then((r) => {
            if (!r.ok) { console.warn('Analytics CDN response:', r.status); return null; }
            return r.json();
          }).catch((e) => { console.warn('Analytics fetch failed:', e); return null; }),
          fetch(`${config.valueChangesUrl}?cb=${Date.now()}`).then((r) => {
            if (!r.ok) return null;
            return r.json();
          }).catch(() => null),
        ]);
        if (analyticsRes) {
          const data = normalizeFirestoreDoc(analyticsRes);
          // Fix image paths on all lists
          data.topTraded = fixItemImages(data.topTraded);
          data.topWanted = fixItemImages(data.topWanted);
          data.topOffered = fixItemImages(data.topOffered);
          data.topMovers = fixItemImages(data.topMovers);
          data.topLosers = fixItemImages(data.topLosers);
          data.demandSupplyRatios = fixItemImages(data.demandSupplyRatios);
          data.predictions = fixItemImages(data.predictions);
          setAnalytics(data);
        } else {
          setError('Could not load analytics data');
        }
        if (changesRes) {
          const normalized = normalizeDiff(changesRes as DiffPayload);
          // Fix image paths on changes
          setChanges(normalized.map((c) => ({ ...c, image: fixImagePath(c.image) })));
        }
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setError('Failed to load analytics');
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const increases = useMemo(() => changes.filter((c) => c.direction === 'up').slice(0, 15), [changes]);
  const decreases = useMemo(() => changes.filter((c) => c.direction === 'down').slice(0, 15), [changes]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-2xl" />
          ))}
        </div>
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
        <p className="text-4xl">🤔</p>
        <p className="text-lg font-bold">{error || 'No analytics yet'}</p>
        <p className="text-sm text-muted-foreground">Check back later — data updates every 12 hours.</p>
      </div>
    );
  }

  const vol = analytics.tradeVolume;
  const dist = analytics.statusDistribution;

  const tabs = [
    { key: 'overview' as const, label: 'Overview', emoji: '🏠' },
    { key: 'changes' as const, label: 'Value Changes', emoji: '📊' },
    { key: 'movers' as const, label: 'Movers', emoji: '🚀' },
    { key: 'predictions' as const, label: 'Predictions', emoji: '🔮' },
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* Tab Bar */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              'tap-target flex items-center gap-2 whitespace-nowrap rounded-2xl px-5 py-2.5 text-sm font-bold transition-all',
              activeTab === tab.key
                ? 'bg-app-primary text-white shadow-md'
                : 'bg-muted text-muted-foreground hover:bg-accent',
            )}
          >
            <span>{tab.emoji}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ═══ OVERVIEW TAB ═══ */}
      {activeTab === 'overview' && (
        <>
          {/* Trade Volume Cards */}
          {vol && (
            <div className="grid grid-cols-3 gap-3">
              <StatCard emoji="🤝" label="Today" value={formatNumber((vol.today || 0) * VM)} bg="bg-blue-100 dark:bg-blue-900/20" color="text-blue-600 dark:text-blue-400" />
              <StatCard emoji="⏰" label="24 Hours" value={formatNumber((vol.last24h || 0) * VM)} bg="bg-emerald-100 dark:bg-emerald-900/20" color="text-emerald-600 dark:text-emerald-400" />
              <StatCard emoji="📅" label="This Week" value={formatNumber((vol.thisWeek || 0) * VM)} bg="bg-pink-100 dark:bg-pink-900/20" color="text-pink-600 dark:text-pink-400" />
            </div>
          )}

          {/* Win/Lose/Fair */}
          {dist && (
            <Card className="p-4 rounded-2xl">
              <h2 className="font-extrabold text-base mb-3">🎯 Trade Results</h2>
              <div className="grid grid-cols-3 gap-3 text-center mb-3">
                <div>
                  <p className="text-2xl">🎉</p>
                  <p className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">{(dist.win || 0) * VM}</p>
                  <p className="text-xs font-semibold text-muted-foreground">Wins</p>
                </div>
                <div>
                  <p className="text-2xl">🤝</p>
                  <p className="text-lg font-extrabold text-amber-600 dark:text-amber-400">{(dist.fair || 0) * VM}</p>
                  <p className="text-xs font-semibold text-muted-foreground">Fair</p>
                </div>
                <div>
                  <p className="text-2xl">😔</p>
                  <p className="text-lg font-extrabold text-red-600 dark:text-red-400">{(dist.lose || 0) * VM}</p>
                  <p className="text-xs font-semibold text-muted-foreground">Losses</p>
                </div>
              </div>
              {/* Bar */}
              {(() => {
                const total = (dist.win || 0) + (dist.fair || 0) + (dist.lose || 0);
                if (total === 0) return null;
                return (
                  <div className="flex h-3 w-full overflow-hidden rounded-full">
                    <div className="bg-emerald-500 transition-all" style={{ width: `${((dist.win || 0) / total) * 100}%` }} />
                    <div className="bg-amber-400 transition-all" style={{ width: `${((dist.fair || 0) / total) * 100}%` }} />
                    <div className="bg-red-500 transition-all" style={{ width: `${((dist.lose || 0) / total) * 100}%` }} />
                  </div>
                );
              })()}
            </Card>
          )}

          {/* Top Traded */}
          {analytics.topTraded && analytics.topTraded.length > 0 && (
            <Card className="p-4 rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <Flame className="h-5 w-5 text-orange-500" />
                <h2 className="font-extrabold text-base">Most Traded</h2>
              </div>
              <div className="flex flex-col gap-2">
                {analytics.topTraded.slice(0, 10).map((item, i) => (
                  <ItemRow key={`traded-${i}`} item={item} index={i} badge={`${(item.count || 0) * VM}x`} />
                ))}
              </div>
            </Card>
          )}

          {/* Most Wanted */}
          {analytics.topWanted && analytics.topWanted.length > 0 && (
            <Card className="p-4 rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="h-5 w-5 text-violet-500" />
                <h2 className="font-extrabold text-base">Most Wanted</h2>
              </div>
              <div className="flex flex-col gap-2">
                {analytics.topWanted.slice(0, 10).map((item, i) => (
                  <ItemRow key={`wanted-${i}`} item={item} index={i} badge={`${(item.count || 0) * VM}x`} />
                ))}
              </div>
            </Card>
          )}
        </>
      )}

      {/* ═══ VALUE CHANGES TAB ═══ */}
      {activeTab === 'changes' && (
        <>
          {changes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-4xl mb-2">📊</p>
              <p className="font-bold">No value changes yet</p>
              <p className="text-sm text-muted-foreground">Values are checked daily.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Increases */}
              <Card className="p-4 rounded-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-emerald-500" />
                  <h2 className="font-extrabold text-base">Going Up ({increases.length})</h2>
                </div>
                {increases.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-6">No increases right now</p>
                ) : (
                  <div className="flex flex-col gap-2">
                    {increases.map((c, i) => (
                      <ChangeRow key={`up-${i}`} change={c} />
                    ))}
                  </div>
                )}
              </Card>

              {/* Decreases */}
              <Card className="p-4 rounded-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingDown className="h-5 w-5 text-red-500" />
                  <h2 className="font-extrabold text-base">Going Down ({decreases.length})</h2>
                </div>
                {decreases.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-6">No decreases right now</p>
                ) : (
                  <div className="flex flex-col gap-2">
                    {decreases.map((c, i) => (
                      <ChangeRow key={`down-${i}`} change={c} />
                    ))}
                  </div>
                )}
              </Card>
            </div>
          )}
        </>
      )}

      {/* ═══ MOVERS TAB ═══ */}
      {activeTab === 'movers' && (
        <>
          {/* Demand / Supply Rising */}
          {analytics.topMovers && analytics.topMovers.length > 0 && (
            <Card className="p-4 rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-emerald-500" />
                <h2 className="font-extrabold text-base">🚀 Rising Demand</h2>
              </div>
              <div className="flex flex-col gap-2">
                {analytics.topMovers.slice(0, 10).map((item, i) => (
                  <ItemRow
                    key={`mover-${i}`}
                    item={item}
                    index={i}
                    badge={`+${Math.abs(item.changePercent || 0)}%`}
                    badgeColor="text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30"
                  />
                ))}
              </div>
            </Card>
          )}

          {/* Falling */}
          {analytics.topLosers && analytics.topLosers.length > 0 && (
            <Card className="p-4 rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <TrendingDown className="h-5 w-5 text-red-500" />
                <h2 className="font-extrabold text-base">📉 Falling Demand</h2>
              </div>
              <div className="flex flex-col gap-2">
                {analytics.topLosers.slice(0, 10).map((item, i) => (
                  <ItemRow
                    key={`loser-${i}`}
                    item={item}
                    index={i}
                    badge={`${item.changePercent || 0}%`}
                    badgeColor="text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30"
                  />
                ))}
              </div>
            </Card>
          )}

          {/* Demand / Supply Ratios */}
          {analytics.demandSupplyRatios && analytics.demandSupplyRatios.length > 0 && (
            <Card className="p-4 rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="h-5 w-5 text-blue-500" />
                <h2 className="font-extrabold text-base">📈 Demand vs Supply</h2>
              </div>
              <div className="flex flex-col gap-2">
                {analytics.demandSupplyRatios.slice(0, 15).map((item, i) => {
                  const signalColor = item.signal === 'rising'
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : item.signal === 'falling'
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-amber-600 dark:text-amber-400';
                  return (
                    <div key={`ds-${i}`} className="flex items-center gap-2.5 rounded-2xl border p-2.5">
                      <PetImage src={item.image} alt={item.name} size={36} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate">{item.name}</p>
                        <p className="text-[11px] text-muted-foreground">
                          {item.demand || 0} want · {item.supply || 0} offer
                        </p>
                      </div>
                      <div className={cn('text-sm font-extrabold', signalColor)}>
                        {(item.ratio || 0).toFixed(1)}x
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}

          {/* No data fallback */}
          {(!analytics.topMovers || analytics.topMovers.length === 0) &&
            (!analytics.topLosers || analytics.topLosers.length === 0) &&
            (!analytics.demandSupplyRatios || analytics.demandSupplyRatios.length === 0) && (
              <div className="text-center py-12">
                <p className="text-4xl mb-2">🚀</p>
                <p className="font-bold">No movers data yet</p>
                <p className="text-sm text-muted-foreground">Check back after more trades happen.</p>
              </div>
            )}
        </>
      )}

      {/* ═══ PREDICTIONS TAB ═══ */}
      {activeTab === 'predictions' && (
        <>
          {analytics.predictions && analytics.predictions.length > 0 ? (
            <Card className="p-4 rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🔮</span>
                <h2 className="font-extrabold text-base">Price Predictions</h2>
              </div>
              <div className="flex flex-col gap-2">
                {analytics.predictions.slice(0, 20).map((item, i) => {
                  const pred = (item as unknown as Record<string, unknown>).prediction as string || '';
                  const conf = (item as unknown as Record<string, unknown>).confidence as number || 0;
                  const isRise = pred.includes('rise');
                  const isStrong = pred.includes('strong');
                  const predLabel = isRise
                    ? (isStrong ? '🚀 Strong Rise' : '📈 Rise')
                    : pred.includes('fall')
                      ? (isStrong ? '💥 Strong Fall' : '📉 Fall')
                      : '➡️ Stable';
                  const predColor = isRise
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : pred.includes('fall')
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-amber-600 dark:text-amber-400';
                  return (
                    <div key={`pred-${i}`} className="flex items-center gap-2.5 rounded-2xl border p-2.5">
                      <PetImage src={item.image} alt={item.name} size={36} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate">{item.name}</p>
                        <p className="text-[11px] text-muted-foreground">
                          {item.demand || 0} demand · {item.supply || 0} supply · {(item.ratio || 0).toFixed(1)}x
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-0.5">
                        <span className={cn('text-xs font-extrabold', predColor)}>{predLabel}</span>
                        <div className="flex items-center gap-1">
                          <div className="w-12 h-1.5 rounded-full bg-muted overflow-hidden">
                            <div
                              className={cn('h-full rounded-full', isRise ? 'bg-emerald-500' : pred.includes('fall') ? 'bg-red-500' : 'bg-amber-400')}
                              style={{ width: `${conf}%` }}
                            />
                          </div>
                          <span className="text-[9px] text-muted-foreground font-bold">{conf}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          ) : (
            <div className="text-center py-12">
              <p className="text-4xl mb-2">🔮</p>
              <p className="font-bold">No predictions yet</p>
              <p className="text-sm text-muted-foreground">Predictions update based on trading patterns.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ---------- Sub-components ---------- */

function StatCard({ emoji, label, value, bg, color }: {
  emoji: string; label: string; value: string; bg: string; color: string;
}) {
  return (
    <div className={cn('rounded-2xl p-4 text-center', bg)}>
      <p className="text-2xl mb-1">{emoji}</p>
      <p className={cn('text-xl font-extrabold', color)}>{value}</p>
      <p className="text-xs font-semibold text-muted-foreground">{label}</p>
    </div>
  );
}

function ItemRow({ item, index, badge, badgeColor }: {
  item: AnalyticsItem; index: number; badge: string; badgeColor?: string;
}) {
  const medals = ['🥇', '🥈', '🥉'];
  const rank = index < 3 ? medals[index] : `#${index + 1}`;

  return (
    <div className={cn('flex items-center gap-2.5 rounded-2xl p-2.5', index % 2 === 0 && 'bg-muted/40')}>
      <span className={cn('text-sm font-bold w-7 text-center', index < 3 ? 'text-lg' : 'text-muted-foreground')}>
        {rank}
      </span>
      <PetImage src={item.image} alt={item.name} size={36} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold truncate">{item.name}</p>
        <p className="text-[11px] text-muted-foreground capitalize">{item.type || 'pet'}</p>
      </div>
      <span className={cn('text-xs font-extrabold px-2.5 py-1 rounded-full',
        badgeColor || 'text-app-primary bg-app-primary/10'
      )}>
        {badge}
      </span>
    </div>
  );
}

function ChangeRow({ change }: { change: NormalizedChange }) {
  const isUp = change.direction === 'up';
  return (
    <div className="flex items-center gap-2.5 rounded-2xl border p-2.5">
      <PetImage src={change.image} alt={change.name} size={36} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold truncate">{change.name}</p>
        <p className="text-[11px] text-muted-foreground">
          {formatNumber(change.oldVal)} → {formatNumber(change.newVal)}
        </p>
      </div>
      <div className={cn('flex items-center gap-0.5 text-sm font-extrabold',
        isUp ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
      )}>
        {isUp ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
        {Math.abs(change.pct)}%
      </div>
    </div>
  );
}
