'use client';

import { useEffect, useState } from 'react';

/* ---------- Types ---------- */
interface DemandEntry {
    score: number;
    label: string;
    count: number;
}

interface HotEntry {
    pct: number;
    isHot: true;
}

export interface AnalyticsMaps {
    demandMap: Record<string, DemandEntry>;
    hotMap: Record<string, HotEntry>;
}

/* ---------- Firestore REST unwrapper ---------- */
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

function normalizeFirestoreDoc(payload: unknown): Record<string, unknown> {
    if (!payload || typeof payload !== 'object') return {};
    const p = payload as Record<string, unknown>;
    const doc = (p.documents as unknown[])?.[0] as Record<string, unknown> | undefined;
    if (doc?.fields) {
        const fields = doc.fields as Record<string, unknown>;
        const out: Record<string, unknown> = {};
        for (const k of Object.keys(fields)) {
            out[k] = unwrapFirestoreValue(fields[k]);
        }
        return out;
    }
    return payload as Record<string, unknown>;
}

/* ---------- Diff normalizer (matching Android) ---------- */
const SKIP_KEYS = new Set(['key', 'name', 'type', 'image']);
const PRIORITY_KEYS = ['rvalue', 'score', 'dvalue', 'nvalue', 'mvalue'];

function normalizeName(name: string): string {
    return (name || '').toLowerCase().trim();
}

/* ---------- Build maps (same logic as Android analyticsDataHelper.js) ---------- */
function buildMaps(analyticsRaw: unknown, changesRaw: unknown): AnalyticsMaps {
    const result: AnalyticsMaps = { demandMap: {}, hotMap: {} };

    try {
        // Build demand map from topWanted
        if (analyticsRaw) {
            const analytics = normalizeFirestoreDoc(analyticsRaw);
            const topWanted = (analytics.topWanted || []) as Array<{ name: string; count?: number }>;
            const total = topWanted.length;

            if (total > 0) {
                topWanted.forEach((item, index) => {
                    const name = normalizeName(item.name);
                    if (!name) return;
                    const score = Math.max(1, Math.round(10 - (index / total) * 9));
                    result.demandMap[name] = { score, label: `${score}/10`, count: item.count || 0 };
                });
            }
        }

        // Build hot/rise map from value changes
        if (changesRaw) {
            const changesData = changesRaw as Record<string, unknown>;
            const rawList = (
                Array.isArray(changesData?.changed) ? changesData.changed
                    : Array.isArray(changesData?.changes) ? changesData.changes
                        : []
            ) as Array<Record<string, unknown>>;

            rawList.forEach((item) => {
                const name = normalizeName(item.name as string);
                if (!name) return;

                // Try priority keys for finding main value change
                let primary: { oldVal: number; newVal: number } | null = null;
                for (const pk of PRIORITY_KEYS) {
                    const v = item[pk];
                    if (v && typeof v === 'object' && 'oldVal' in (v as Record<string, unknown>) && 'newVal' in (v as Record<string, unknown>)) {
                        primary = v as { oldVal: number; newVal: number };
                        break;
                    }
                }

                // Fallback: any key with oldVal/newVal
                if (!primary) {
                    for (const k of Object.keys(item)) {
                        if (SKIP_KEYS.has(k)) continue;
                        const v = item[k];
                        if (v && typeof v === 'object' && 'oldVal' in (v as Record<string, unknown>) && 'newVal' in (v as Record<string, unknown>)) {
                            primary = v as { oldVal: number; newVal: number };
                            break;
                        }
                    }
                }

                if (!primary) return;
                if (primary.newVal <= primary.oldVal) return; // Only track increases

                const pct = primary.oldVal > 0 ? Math.round(((primary.newVal - primary.oldVal) / primary.oldVal) * 100) : 0;
                if (pct > 0) {
                    result.hotMap[name] = { pct, isHot: true };
                }
            });
        }
    } catch (error) {
        console.warn('[useAnalytics] Error building maps:', error);
    }

    return result;
}

/* ---------- In-flight deduplication ---------- */
let _cache: AnalyticsMaps | null = null;
let _inflight: Promise<AnalyticsMaps> | null = null;

async function fetchAnalyticsMaps(): Promise<AnalyticsMaps> {
    if (_cache) return _cache;
    if (_inflight) return _inflight;

    _inflight = (async () => {
        try {
            const [analyticsRes, changesRes] = await Promise.all([
                fetch('/api/analytics').then((r) => (r.ok ? r.json() : null)).catch(() => null),
                fetch('/api/value-changes').then((r) => (r.ok ? r.json() : null)).catch(() => null),
            ]);
            const maps = buildMaps(analyticsRes, changesRes);
            _cache = maps;
            // Clear cache after 1 hour
            setTimeout(() => { _cache = null; }, 60 * 60 * 1000);
            return maps;
        } catch {
            return { demandMap: {}, hotMap: {} };
        } finally {
            _inflight = null;
        }
    })();

    return _inflight;
}

/* ---------- Hook ---------- */
export function useAnalytics() {
    const [maps, setMaps] = useState<AnalyticsMaps>({ demandMap: {}, hotMap: {} });

    useEffect(() => {
        let cancelled = false;
        fetchAnalyticsMaps().then((data) => {
            if (!cancelled) setMaps(data);
        });
        return () => { cancelled = true; };
    }, []);

    return maps;
}

/* ---------- Lookup helpers ---------- */
export function getDemandScore(itemName: string, demandMap: Record<string, DemandEntry>): DemandEntry | null {
    return demandMap[normalizeName(itemName)] || null;
}

export function getHotStatus(itemName: string, hotMap: Record<string, HotEntry>): HotEntry | null {
    return hotMap[normalizeName(itemName)] || null;
}
