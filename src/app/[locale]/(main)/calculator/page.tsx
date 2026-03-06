import { CalculatorBoard } from '@/components/calculator/CalculatorBoard';
import { JsonLd } from '@/components/seo/JsonLd';
import { ListOrdered, HelpCircle, Sparkles, BarChart3 } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getLocalizedAlternates } from '@/lib/utils/seoHelpers';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const { canonical, languages } = getLocalizedAlternates('/calculator', locale);
  return {
    title: t('calculatorTitle'),
    description: t('calculatorDescription'),
    alternates: { canonical, languages },
    openGraph: {
      title: t('calculatorTitle'),
      description: t('calculatorDescription'),
    },
    twitter: {
      title: t('calculatorTitle'),
      description: t('calculatorDescription'),
    },
  };
}

export default async function CalculatorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  const calculatorJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: t('jsonLd.calculatorName'),
    url: 'https://www.adoptmevalues.app/calculator',
    description: t('jsonLd.calculatorDescription'),
    applicationCategory: 'GameApplication',
    operatingSystem: 'Web',
  };

  const stripTags = (s: string) => s.replace(/<[^>]*>/g, '');

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: t('calculator.faqAccuracyTitle'),
        acceptedAnswer: { '@type': 'Answer', text: stripTags(t.raw('calculator.faqAccuracyDesc')) },
      },
      {
        '@type': 'Question',
        name: t('calculator.faqWinLoseTitle'),
        acceptedAnswer: {
          '@type': 'Answer',
          text: stripTags(
            (t.raw('calculator.faqWinLoseDesc') as string)
              .replace('{win}', t('calculator.win'))
              .replace('{loss}', t('calculator.loss'))
              .replace('{fair}', t('calculator.fairTrade'))
          ),
        },
      },
      {
        '@type': 'Question',
        name: t('calculator.faqNeonTitle'),
        acceptedAnswer: { '@type': 'Answer', text: stripTags(t.raw('calculator.faqNeonDesc')) },
      },
    ],
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <JsonLd data={calculatorJsonLd} />
      <JsonLd data={faqJsonLd} />
      <section>
        <h1 className="text-2xl sm:text-3xl font-bold">
          {t('calculator.title')}
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base mt-1">
          {t('calculator.subtitle')}
        </p>
      </section>

      <CalculatorBoard />

      {/* How to Use */}
      <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-rose-100 to-orange-100 dark:from-rose-950/40 dark:to-orange-950/40 ring-1 ring-rose-200 dark:ring-rose-800 p-4 sm:p-6 mt-4 sm:mt-6">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="rounded-2xl bg-rose-200 dark:bg-rose-800/50 p-2.5">
            <ListOrdered className="h-6 w-6 text-rose-600 dark:text-rose-400" />
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold">{t('calculator.howToTitle')}</h2>
        </div>
        <div className="space-y-2.5">
          {[
            { num: '1', title: t('calculator.step1Title'), desc: t('calculator.step1Desc') },
            { num: '2', title: t('calculator.step2Title'), desc: t('calculator.step2Desc') },
            { num: '3', title: t('calculator.step3Title'), desc: t('calculator.step3Desc') },
            { num: '4', title: t('calculator.step4Title'), desc: t('calculator.step4Desc') },
          ].map((step) => (
            <div key={step.num} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-rose-500 text-white text-sm font-bold flex items-center justify-center">{step.num}</span>
              <div>
                <p className="text-sm sm:text-base font-bold">{step.title}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-4 space-y-3">
        <h2 className="text-lg sm:text-xl font-extrabold flex items-center gap-2 px-1">
          <HelpCircle className="h-5 w-5 text-violet-500" />
          {t('calculator.faqTitle')}
        </h2>

        <div className="rounded-2xl bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-950/40 dark:to-yellow-950/40 ring-1 ring-amber-200 dark:ring-amber-800 p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-1.5">
            <BarChart3 className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <h3 className="font-bold text-sm sm:text-base">{t('calculator.faqAccuracyTitle')}</h3>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {t('calculator.faqAccuracyDesc')}
          </p>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-sky-100 to-blue-100 dark:from-sky-950/40 dark:to-blue-950/40 ring-1 ring-sky-200 dark:ring-sky-800 p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-1.5">
            <HelpCircle className="h-4 w-4 text-sky-600 dark:text-sky-400" />
            <h3 className="font-bold text-sm sm:text-base">{t('calculator.faqWinLoseTitle')}</h3>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {t.rich('calculator.faqWinLoseDesc', {
              win: t('calculator.win'),
              loss: t('calculator.loss'),
              fair: t('calculator.fairTrade'),
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </p>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-950/40 dark:to-purple-950/40 ring-1 ring-violet-200 dark:ring-violet-800 p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-1.5">
            <Sparkles className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            <h3 className="font-bold text-sm sm:text-base">{t('calculator.faqNeonTitle')}</h3>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {t('calculator.faqNeonDesc')}
          </p>
        </div>
      </div>
    </div>
  );
}
