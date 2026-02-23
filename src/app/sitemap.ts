import type { MetadataRoute } from 'next';
import { fetchPetDataServer } from '@/lib/data/pets';
import { slugify } from '@/lib/utils/slugify';
import { getOnlyPets } from '@/lib/utils/petHelpers';
import { locales, defaultLocale } from '@/i18n/config';

const DOMAIN = 'https://adoptmevalues.app';
const BUILD_DATE = new Date();

function localizedUrl(path: string, locale: string): string {
  if (locale === defaultLocale) return `${DOMAIN}${path}`;
  return `${DOMAIN}/${locale}${path}`;
}

function alternatesForPath(path: string): Record<string, string> {
  const alts: Record<string, string> = {};
  for (const locale of locales) {
    alts[locale] = localizedUrl(path, locale);
  }
  return alts;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = ['/', '/values', '/calculator', '/trades', '/feed', '/chat', '/analytics', '/scammer', '/news'];

  const pets = await fetchPetDataServer();
  const onlyPets = getOnlyPets(pets);

  const entries: MetadataRoute.Sitemap = [];

  // Static pages — one entry per locale
  for (const path of staticPages) {
    for (const locale of locales) {
      entries.push({
        url: localizedUrl(path, locale),
        lastModified: BUILD_DATE,
        changeFrequency: 'daily',
        priority: path === '/' ? 1.0 : 0.9,
        alternates: { languages: alternatesForPath(path) },
      });
    }
  }

  // Pet pages — one entry per locale
  for (const pet of onlyPets) {
    const petPath = `/values/${slugify(pet.name)}`;
    for (const locale of locales) {
      entries.push({
        url: localizedUrl(petPath, locale),
        lastModified: BUILD_DATE,
        changeFrequency: 'daily',
        priority: 0.8,
        alternates: { languages: alternatesForPath(petPath) },
      });
    }
  }

  return entries;
}
