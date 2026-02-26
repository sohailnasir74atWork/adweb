import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getTradeById } from '@/lib/firebase/firestore';
import { TradeDetail } from '@/components/trades/TradeDetail';
import { formatNumber } from '@/lib/utils/formatters';
import { getLocalizedAlternates } from '@/lib/utils/seoHelpers';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
  const { id, locale } = await params;
  const trade = await getTradeById(id);

  if (!trade) {
    return { title: 'Trade Not Found' };
  }

  const hasNames = trade.hasItemNames?.join(', ') || 'pets';
  const wantsNames = trade.wantsItemNames?.join(', ') || 'pets';
  const { canonical, languages } = getLocalizedAlternates(`/trades/${id}`, locale);

  return {
    title: `Trade: ${hasNames} for ${wantsNames} — Adopt Me Trading`,
    description: `${trade.traderName} is trading ${hasNames} (${formatNumber(trade.hasTotal)}) for ${wantsNames} (${formatNumber(trade.wantsTotal)}). Trade result: ${trade.status === 'w' ? 'Win' : trade.status === 'l' ? 'Lose' : 'Fair'}.`,
    openGraph: {
      title: `Adopt Me Trade: ${hasNames} → ${wantsNames}`,
      description: `Value: ${formatNumber(trade.hasTotal)} vs ${formatNumber(trade.wantsTotal)}`,
    },
    alternates: { canonical, languages },
  };
}

export default async function TradeDetailPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const trade = await getTradeById(id);

  if (!trade) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          {t('nav.home')}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/trades" className="hover:text-foreground transition-colors">
          {t('nav.trades')}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-medium">{t('trades.title')}</span>
      </nav>

      <TradeDetail trade={trade} />
    </div>
  );
}
