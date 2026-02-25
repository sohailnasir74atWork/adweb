import Link from 'next/link';
import { Handshake, Plus, Search, Shield } from 'lucide-react';
import { TradeList } from '@/components/trades/TradeList';
import { fetchTradesServer } from '@/lib/data/trades';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getLocalizedAlternates } from '@/lib/utils/seoHelpers';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const { canonical, languages } = getLocalizedAlternates('/trades', locale);
  return {
    title: t('tradesTitle'),
    description: t('tradesDescription'),
    alternates: { canonical, languages },
  };
}

export const revalidate = 300; // ISR: 5 min — client handles real-time, this is for SEO/initial load

export default async function TradesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const initialTrades = await fetchTradesServer();

  return (
    <div className="flex flex-col gap-4 sm:gap-6 max-w-3xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Handshake className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">{t('trades.title')}</h1>
            <p className="text-muted-foreground text-xs sm:text-sm mt-0.5">
              {t('trades.subtitle')}
            </p>
          </div>
        </div>
        <Link
          href="/trades/create"
          className="inline-flex items-center gap-1.5 rounded-xl bg-app-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-app-primary/90 transition-colors shadow-sm"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">{t('trades.createTrade')}</span>
        </Link>
      </div>

      <TradeList initialTrades={initialTrades} />

      {/* SEO card */}
      <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-950/40 dark:to-indigo-950/40 ring-1 ring-blue-200 dark:ring-blue-800 p-4 sm:p-6 mt-2">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="rounded-2xl bg-blue-200 dark:bg-blue-800/50 p-2.5">
            <Search className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold">Adopt Me Trading</h2>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Find the best Adopt Me trades in our real-time Roblox trade hub. Browse trading values from other players,
          filter by <strong>Win</strong>, <strong>Lose</strong>, or <strong>Fair</strong>, and post your own trades.
          All trades show accurate trading values so you know exactly what you&apos;re getting in 2026.
        </p>
        <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
          <Shield className="h-3.5 w-3.5 text-emerald-500" />
          <span>Values updated daily for fair trades</span>
        </div>
      </div>
    </div>
  );
}
