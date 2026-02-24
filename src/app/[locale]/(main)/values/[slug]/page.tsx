import { fetchPetDataServer } from '@/lib/data/pets';
import { Pet, isPetType } from '@/lib/types/pet';
import { slugify, formatNumber, getPetDefaultValue, getSimilarPets } from '@/lib/utils/petHelpers';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { PetImage } from '@/components/common/PetImage';
import { PetValueCard } from '@/components/values/PetValueCard';
import { Badge } from '@/components/ui/badge';
import { JsonLd } from '@/components/seo/JsonLd';
import { getLocalizedAlternates } from '@/lib/utils/seoHelpers';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  const items = await fetchPetDataServer();
  return items.filter((i) => i.type === 'pets').map((item) => ({ slug: slugify(item.name) }));
}

// Dynamic SEO metadata per pet
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const pets = await fetchPetDataServer();
  const pet = pets.find((p) => slugify(p.name) === slug);

  if (!pet) {
    return { title: 'Pet Not Found' };
  }

  const value = getPetDefaultValue(pet);
  const isPet = isPetType(pet.type);
  const neonInfo = isPet ? ` See Neon (${formatNumber(pet.nvalue)}), Mega Neon (${formatNumber(pet.mvalue)}), Fly, Ride prices and demand.` : '';
  const ogNeon = isPet ? ` Neon: ${formatNumber(pet.nvalue)}, Mega: ${formatNumber(pet.mvalue)}.` : '';
  const { canonical, languages } = getLocalizedAlternates(`/values/${slug}`, locale);
  return {
    title: `${pet.name} Value in Adopt Me 2026 — Trading Value${isPet ? ', Neon & Mega Prices' : ''}`,
    description: `Check the latest ${pet.name} trading value in Roblox Adopt Me. Current value: ${formatNumber(value)}.${neonInfo} Rarity: ${pet.rarity}. Updated daily in 2026.`,
    openGraph: {
      title: `${pet.name} Trading Value | Adopt Me Values 2026`,
      description: `${pet.name} is worth ${formatNumber(value)} in Adopt Me.${ogNeon} Check trading values daily.`,
      images: [pet.image],
    },
    alternates: { canonical, languages },
  };
}

const RARITY_COLORS: Record<string, string> = {
  legendary: 'bg-yellow-500/15 text-yellow-700 dark:text-yellow-400 border-yellow-500/30',
  'ultra rare': 'bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-500/30',
  rare: 'bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30',
  uncommon: 'bg-green-500/15 text-green-700 dark:text-green-400 border-green-500/30',
  common: 'bg-gray-500/15 text-gray-700 dark:text-gray-400 border-gray-500/30',
};

function ValueTable({ pet, t }: { pet: Pet; t: any }) {
  const rows = [
    { label: 'Normal', default: pet.rvalue, fly: pet.rvalueFly, ride: pet.rvalueRide, flyride: pet.rvalueFlyRide, nopotion: pet.rvalueNoPotion },
    { label: t('detail.neon'), default: pet.nvalue, fly: pet.nvalueFly, ride: pet.nvalueRide, flyride: pet.nvalueFlyRide, nopotion: pet.nvalueNoPotion },
    { label: t('detail.megaNeon'), default: pet.mvalue, fly: pet.mvalueFly, ride: pet.mvalueRide, flyride: pet.mvalueFlyRide, nopotion: pet.mvalueNoPotion },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 pr-4 font-semibold">Variant</th>
            <th className="text-right py-2 px-3 font-semibold">{t('detail.defaultValue')}</th>
            <th className="text-right py-2 px-3 font-semibold">No Potion</th>
            <th className="text-right py-2 px-3 font-semibold">Fly</th>
            <th className="text-right py-2 px-3 font-semibold">Ride</th>
            <th className="text-right py-2 px-3 font-semibold">Fly Ride</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b last:border-0">
              <td className="py-2.5 pr-4 font-medium">{row.label}</td>
              <td className="text-right py-2.5 px-3 font-bold text-app-primary">{formatNumber(row.default)}</td>
              <td className="text-right py-2.5 px-3">{formatNumber(row.nopotion)}</td>
              <td className="text-right py-2.5 px-3">{formatNumber(row.fly)}</td>
              <td className="text-right py-2.5 px-3">{formatNumber(row.ride)}</td>
              <td className="text-right py-2.5 px-3">{formatNumber(row.flyride)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function PetDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const allPets = await fetchPetDataServer();
  const pet = allPets.find((p) => slugify(p.name) === slug);

  if (!pet) {
    notFound();
  }

  const similarPets = getSimilarPets(allPets, pet, 8);
  const value = getPetDefaultValue(pet);
  const isPet = isPetType(pet.type);
  const typeLabel = pet.type.replace(/\b\w/g, (c) => c.toUpperCase());
  const rarityClass = RARITY_COLORS[pet.rarity.toLowerCase()] || RARITY_COLORS.common;

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${pet.name} — Adopt Me Roblox`,
    description: `${pet.name} pet trading value in Roblox Adopt Me. Rarity: ${pet.rarity}. Value: ${formatNumber(value)}. Updated daily in 2026.`,
    image: pet.image,
    category: pet.rarity,
    offers: {
      '@type': 'Offer',
      price: String(value),
      priceCurrency: 'GAME_VALUE',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <>
      <JsonLd data={jsonLdData} />

      <div className="flex flex-col gap-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            {t('nav.home')}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/values" className="hover:text-foreground transition-colors">
            {t('nav.values')}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium">{pet.name}</span>
        </nav>

        {/* Hero Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="flex-shrink-0 rounded-2xl border bg-card p-4">
            <PetImage src={pet.image} alt={pet.name} size={140} />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold">{pet.name}</h1>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2">
              <Badge variant="outline" className={`capitalize ${rarityClass}`}>
                {pet.rarity}
              </Badge>
              <Badge variant="outline">{pet.category || typeLabel}</Badge>
              {pet.score <= 10 && (
                <Badge className="bg-green-500/15 text-green-700 dark:text-green-400 border-green-500/30" variant="outline">
                  {t('detail.highDemand')}
                </Badge>
              )}
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">{t('detail.defaultValue')}</p>
              <p className="text-4xl font-bold text-app-primary">{formatNumber(value)}</p>
            </div>
            <div className="flex gap-6 mt-3">
              {isPet && pet.nvalue > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground">{t('detail.neon')}</p>
                  <p className="text-xl font-semibold">{formatNumber(pet.nvalue)}</p>
                </div>
              )}
              {isPet && pet.mvalue > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground">{t('detail.megaNeon')}</p>
                  <p className="text-xl font-semibold">{formatNumber(pet.mvalue)}</p>
                </div>
              )}
              <div>
                <p className="text-xs text-muted-foreground">{t('detail.demandRank')}</p>
                <p className="text-xl font-semibold">#{pet.score}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Value Table */}
        {isPet && (
          <section>
            <h2 className="text-xl font-bold mb-3">{t('detail.allValues')}</h2>
            <div className="rounded-lg border bg-card p-4">
              <ValueTable pet={pet} t={t} />
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="flex gap-3">
          <Link href="/" className="inline-flex items-center gap-2 rounded-lg bg-app-primary px-5 py-2.5 text-white font-medium hover:bg-app-primary/90 transition-colors text-sm">
            {t('detail.useInCalculator')}
          </Link>
          <Link href="/values" className="inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 font-medium hover:bg-accent transition-colors text-sm">
            {t('detail.browseAllItems')}
          </Link>
        </div>

        {/* Similar Pets */}
        {similarPets.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-3">{t('detail.similar', { type: typeLabel })}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {similarPets.map((p) => (
                <PetValueCard key={p.id} pet={p} />
              ))}
            </div>
          </section>
        )}

        {/* SEO Content */}
        <section className="prose dark:prose-invert max-w-none">
          <h2>{t('detail.aboutTitle', { name: pet.name })}</h2>
          {isPet ? (
            <>
              <p>
                {t.rich('detail.petDesc', {
                  name: pet.name, rarity: pet.rarity, value: formatNumber(value),
                  neonValue: formatNumber(pet.nvalue), megaValue: formatNumber(pet.mvalue),
                  strong: (chunks) => <strong>{chunks}</strong>,
                })}
                {' '}
                {pet.score <= 10
                  ? t('detail.petHighDemand', { name: pet.name })
                  : t('detail.petDemandRank', { name: pet.name, rank: pet.score })}
              </p>
              <p>
                {t.rich('detail.petPotionInfo', {
                  name: pet.name,
                  noPotion: formatNumber(pet.rvalueNoPotion),
                  fly: formatNumber(pet.rvalueFly),
                  ride: formatNumber(pet.rvalueRide),
                  flyRide: formatNumber(pet.rvalueFlyRide),
                  strong: (chunks) => <strong>{chunks}</strong>,
                  link: (chunks) => <a href="/calculator">{chunks}</a>,
                })}
              </p>
            </>
          ) : (
            <p>
              {t.rich('detail.itemDesc', {
                name: pet.name, rarity: pet.rarity, type: pet.type, value: formatNumber(value),
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
              {' '}
              {pet.score <= 10
                ? t('detail.petHighDemand', { name: pet.name })
                : t('detail.petDemandRank', { name: pet.name, rank: pet.score })}
              {' '}
              {t.rich('detail.itemCta', {
                link: (chunks) => <a href="/calculator">{chunks}</a>,
              })}
            </p>
          )}
        </section>
      </div>
    </>
  );
}
