import { fetchPetDataServer } from '@/lib/data/pets';
import { PetGrid } from '@/components/values/PetGrid';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getLocalizedAlternates } from '@/lib/utils/seoHelpers';
import { JsonLd } from '@/components/seo/JsonLd';
import { slugify } from '@/lib/utils/slugify';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const { canonical, languages } = getLocalizedAlternates('/values', locale);
  return {
    title: t('valuesTitle'),
    description: t('valuesDescription'),
    alternates: { canonical, languages },
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
      url: `https://adoptmevalues.app/values/${slugify(pet.name)}`,
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
    </div>
  );
}
