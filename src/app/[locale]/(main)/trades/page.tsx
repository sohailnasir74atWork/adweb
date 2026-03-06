import Link from 'next/link';
import { Handshake, Plus, Search, Shield, Scale, TrendingUp } from 'lucide-react';
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
    openGraph: {
      title: t('tradesTitle'),
      description: t('tradesDescription'),
    },
    twitter: {
      title: t('tradesTitle'),
      description: t('tradesDescription'),
    },
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

      {/* SEO cards */}
      <div className="space-y-3 sm:space-y-4 mt-2">
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-950/40 dark:to-indigo-950/40 ring-1 ring-blue-200 dark:ring-blue-800 p-4 sm:p-6">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="rounded-2xl bg-blue-200 dark:bg-blue-800/50 p-2.5">
              <Search className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold">{t('trades.seoTitle')}</h2>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {t.rich('trades.seoDesc', {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </p>
          <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
            <Shield className="h-3.5 w-3.5 text-emerald-500" />
            <span>{t('trades.seoUpdated')}</span>
          </div>
        </div>

        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-950/40 dark:to-teal-950/40 ring-1 ring-emerald-200 dark:ring-emerald-800 p-4 sm:p-6">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="rounded-2xl bg-emerald-200 dark:bg-emerald-800/50 p-2.5">
              <Scale className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold">{t('trades.faqFairTitle')}</h2>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {t.rich('trades.faqFairDesc', {
              link: (chunks) => <Link href="/calculator" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">{chunks}</Link>,
            })}
          </p>
        </div>

        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-950/40 dark:to-orange-950/40 ring-1 ring-amber-200 dark:ring-amber-800 p-4 sm:p-6">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="rounded-2xl bg-amber-200 dark:bg-amber-800/50 p-2.5">
              <TrendingUp className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold">{t('trades.faqBestTitle')}</h2>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {t.rich('trades.faqBestDesc', {
              strong: (chunks) => <strong>{chunks}</strong>,
              link2: (chunks) => <Link href="/analytics" className="text-amber-600 dark:text-amber-400 font-semibold hover:underline">{chunks}</Link>,
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
