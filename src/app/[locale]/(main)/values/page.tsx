import { fetchPetDataServer } from '@/lib/data/pets';
import { PetGrid } from '@/components/values/PetGrid';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getLocalizedAlternates } from '@/lib/utils/seoHelpers';

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

export const revalidate = 300; // ISR: revalidate every 5 minutes

export default async function ValuesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'values' });
  const pets = await fetchPetDataServer();

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
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
