import { fetchPetDataServer } from '@/lib/data/pets';
import { PetGrid } from '@/components/values/PetGrid';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getLocalizedAlternates } from '@/lib/utils/seoHelpers';
import { JsonLd } from '@/components/seo/JsonLd';
import { slugify } from '@/lib/utils/slugify';
import { BarChart3, Crown, Sparkles } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const { canonical, languages } = getLocalizedAlternates('/values', locale);
  return {
    title: t('valuesTitle'),
    description: t('valuesDescription'),
    alternates: { canonical, languages },
    openGraph: {
      title: t('valuesTitle'),
      description: t('valuesDescription'),
    },
    twitter: {
      title: t('valuesTitle'),
      description: t('valuesDescription'),
    },
  };
}

export const revalidate = 3600; // ISR: 1 hour — values update daily, cost-optimized

export default async function ValuesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'values' });
  const pets = await fetchPetDataServer();

  // ItemList JSON-LD for top pets — helps with Google list rich results
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: t('title'),
    description: t('subtitle'),
    numberOfItems: pets.length,
    itemListElement: pets.slice(0, 20).map((pet, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: pet.name,
      url: `https://www.adoptmevalues.app/values/${slugify(pet.name)}`,
      image: pet.image,
    })),
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <JsonLd data={itemListJsonLd} />
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">{t('title')}</h1>
        <p className="text-muted-foreground text-sm sm:text-base mt-1">
          {t('subtitle')}
        </p>
      </div>
      <PetGrid pets={pets} />

      {/* SEO FAQ Section */}
      <div className="mt-4 space-y-3 sm:space-y-4">
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-950/40 dark:to-teal-950/40 ring-1 ring-emerald-200 dark:ring-emerald-800 p-4 sm:p-6">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="rounded-2xl bg-emerald-200 dark:bg-emerald-800/50 p-2.5">
              <BarChart3 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold">{t('faqHowTitle')}</h2>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {t.rich('faqHowDesc', {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </p>
        </div>

        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-950/40 dark:to-yellow-950/40 ring-1 ring-amber-200 dark:ring-amber-800 p-4 sm:p-6">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="rounded-2xl bg-amber-200 dark:bg-amber-800/50 p-2.5">
              <Crown className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold">{t('faqRarestTitle')}</h2>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {t.rich('faqRarestDesc', {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </p>
        </div>

        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-950/40 dark:to-purple-950/40 ring-1 ring-violet-200 dark:ring-violet-800 p-4 sm:p-6">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="rounded-2xl bg-violet-200 dark:bg-violet-800/50 p-2.5">
              <Sparkles className="h-6 w-6 text-violet-600 dark:text-violet-400" />
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold">{t('faqNeonTitle')}</h2>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {t.rich('faqNeonDesc', {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
