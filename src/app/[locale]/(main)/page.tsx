import Link from 'next/link';
import { Calculator, TrendingUp, Handshake, MessageCircle, BarChart3, Newspaper, Search, ArrowLeftRight, Sparkles, HelpCircle } from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getLocalizedAlternates } from '@/lib/utils/seoHelpers';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const { canonical, languages } = getLocalizedAlternates('/', locale);
  return {
    title: t('homeTitle'),
    description: t('homeDescription'),
    alternates: { canonical, languages },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: t('jsonLd.websiteName'),
    url: 'https://adoptmevalues.app',
    description: t('jsonLd.websiteDescription'),
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://adoptmevalues.app/values?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const FEATURES = [
    {
      href: '/values',
      title: t('nav.values'),
      description: t('home.heroSubtitle'),
      icon: TrendingUp,
      bg: 'bg-emerald-100 dark:bg-emerald-900/30',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      ring: 'ring-emerald-200 dark:ring-emerald-800',
    },
    {
      href: '/calculator',
      title: t('nav.calculator'),
      description: t('calculator.subtitle'),
      icon: Calculator,
      bg: 'bg-rose-100 dark:bg-rose-900/30',
      iconColor: 'text-rose-600 dark:text-rose-400',
      ring: 'ring-rose-200 dark:ring-rose-800',
    },
    {
      href: '/trades',
      title: t('nav.trades'),
      description: t('trades.subtitle'),
      icon: Handshake,
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400',
      ring: 'ring-blue-200 dark:ring-blue-800',
    },
    {
      href: '/chat',
      title: t('nav.chat'),
      description: t('chat.subtitle'),
      icon: MessageCircle,
      bg: 'bg-violet-100 dark:bg-violet-900/30',
      iconColor: 'text-violet-600 dark:text-violet-400',
      ring: 'ring-violet-200 dark:ring-violet-800',
    },
    {
      href: '/analytics',
      title: t('analytics.title'),
      description: t('analytics.subtitle'),
      icon: BarChart3,
      bg: 'bg-amber-100 dark:bg-amber-900/30',
      iconColor: 'text-amber-600 dark:text-amber-400',
      ring: 'ring-amber-200 dark:ring-amber-800',
    },
    {
      href: '/news',
      title: t('news.title'),
      description: t('news.subtitle'),
      icon: Newspaper,
      bg: 'bg-cyan-100 dark:bg-cyan-900/30',
      iconColor: 'text-cyan-600 dark:text-cyan-400',
      ring: 'ring-cyan-200 dark:ring-cyan-800',
    },
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: t('home.faqWhatTitle'),
        acceptedAnswer: { '@type': 'Answer', text: t.raw('home.faqWhatDesc').replace(/<[^>]*>/g, '') },
      },
      {
        '@type': 'Question',
        name: t('home.faqTradeTitle'),
        acceptedAnswer: { '@type': 'Answer', text: t.raw('home.faqTradeDesc').replace(/<[^>]*>/g, '') },
      },
      {
        '@type': 'Question',
        name: t('home.faqBrowseTitle'),
        acceptedAnswer: { '@type': 'Answer', text: t.raw('home.faqBrowseDesc').replace(/<[^>]*>/g, '') },
      },
    ],
  };

  return (
    <div className="flex flex-col gap-5 sm:gap-8">
      <JsonLd data={homeJsonLd} />
      <JsonLd data={faqJsonLd} />

      {/* Hero */}
      <section className="text-center py-5 sm:py-10 lg:py-16 px-4">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
          {t('home.heroTitle')}
        </h1>
        <p className="mt-2 sm:mt-3 text-muted-foreground text-sm sm:text-lg max-w-xl mx-auto leading-relaxed">
          {t('home.heroSubtitle')}
        </p>
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-center gap-2.5 sm:gap-3 px-4">
          <Link
            href="/calculator"
            className="tap-target inline-flex items-center justify-center gap-2 rounded-2xl bg-app-primary px-6 py-3 sm:px-8 sm:py-3.5 text-white font-bold text-sm sm:text-base shadow-lg shadow-app-primary/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Calculator className="h-4 w-4 sm:h-5 sm:w-5" />
            {t('nav.calculator')}
          </Link>
          <Link
            href="/values"
            className="tap-target inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-border px-6 py-3 sm:px-8 sm:py-3.5 font-bold text-sm sm:text-base hover:bg-accent active:scale-[0.98] transition-all"
          >
            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
            {t('nav.values')}
          </Link>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="px-1">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-4">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link key={feature.href} href={feature.href}>
                <div className={`flex flex-col items-center gap-1.5 sm:gap-2.5 rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 ring-1 ${feature.ring} ${feature.bg} hover:scale-[1.03] active:scale-[0.97] transition-all cursor-pointer text-center h-full`}>
                  <div className={`rounded-xl sm:rounded-2xl p-2 sm:p-3 ${feature.bg}`}>
                    <Icon className={`h-6 w-6 sm:h-9 sm:w-9 ${feature.iconColor}`} />
                  </div>
                  <p className="font-bold text-xs sm:text-base leading-tight">{feature.title}</p>
                  <p className="text-[11px] sm:text-sm text-muted-foreground leading-snug">{feature.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Info Cards */}
      <section className="mt-2 sm:mt-4 px-1 space-y-3 sm:space-y-4">
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-violet-100 to-fuchsia-100 dark:from-violet-950/40 dark:to-fuchsia-950/40 ring-1 ring-violet-200 dark:ring-violet-800 p-4 sm:p-6">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="rounded-2xl bg-violet-200 dark:bg-violet-800/50 p-2.5">
              <HelpCircle className="h-6 w-6 text-violet-600 dark:text-violet-400" />
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold">{t('home.faqWhatTitle')}</h2>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {t.rich('home.faqWhatDesc', {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </p>
        </div>

        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-sky-100 to-cyan-100 dark:from-sky-950/40 dark:to-cyan-950/40 ring-1 ring-sky-200 dark:ring-sky-800 p-4 sm:p-6">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="rounded-2xl bg-sky-200 dark:bg-sky-800/50 p-2.5">
              <ArrowLeftRight className="h-6 w-6 text-sky-600 dark:text-sky-400" />
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold">{t('home.faqTradeTitle')}</h2>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {t.rich('home.faqTradeDesc', {
              strong: (chunks) => <strong>{chunks}</strong>,
              link: (chunks) => <Link href="/calculator" className="text-sky-600 dark:text-sky-400 font-semibold hover:underline">{chunks}</Link>,
            })}
          </p>
        </div>

        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-950/40 dark:to-teal-950/40 ring-1 ring-emerald-200 dark:ring-emerald-800 p-4 sm:p-6">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="rounded-2xl bg-emerald-200 dark:bg-emerald-800/50 p-2.5">
              <Search className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold">{t('home.faqBrowseTitle')}</h2>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {t.rich('home.faqBrowseDesc', {
              link: (chunks) => <Link href="/values" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">{chunks}</Link>,
            })}
          </p>
        </div>
      </section>
    </div>
  );
}
