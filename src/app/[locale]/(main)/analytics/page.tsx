import { BarChart3 } from 'lucide-react';
import { AnalyticsDashboard } from '@/components/analytics/AnalyticsDashboard';
import { config } from '@/lib/constants/config';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getLocalizedAlternates } from '@/lib/utils/seoHelpers';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const { canonical, languages } = getLocalizedAlternates('/analytics', locale);
  return {
    title: t('analyticsTitle'),
    description: t('analyticsDescription'),
    alternates: { canonical, languages },
  };
}

async function getSSRData() {
  try {
    const [analyticsRes, changesRes] = await Promise.all([
      fetch(config.tradeAnalyticsUrl, { next: { revalidate: 3600 } })
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
      fetch(config.valueChangesUrl, { next: { revalidate: 3600 } })
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
    ]);
    return { analyticsRaw: analyticsRes, changesRaw: changesRes };
  } catch {
    return { analyticsRaw: null, changesRaw: null };
  }
}

export default async function AnalyticsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const { analyticsRaw, changesRaw } = await getSSRData();

  return (
    <div className="flex flex-col gap-6">
      <section>
        <div className="flex items-center gap-3">
          <BarChart3 className="h-8 w-8 text-green-500" />
          <div>
            <h1 className="text-3xl font-bold">{t('analytics.title')}</h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              {t('analytics.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <AnalyticsDashboard ssrAnalyticsRaw={analyticsRaw} ssrChangesRaw={changesRaw} />

      <section className="prose dark:prose-invert max-w-none mt-4">
        <h2>{t('analytics.trendsTitle')}</h2>
        <p>{t('analytics.trendsDesc')}</p>
        <h3>{t('analytics.howWeTrackTitle')}</h3>
        <p>{t('analytics.howWeTrackDesc')}</p>
      </section>
    </div>
  );
}
