import type { MetadataRoute } from 'next';
import { fetchPetDataServer } from '@/lib/data/pets';
import { slugify } from '@/lib/utils/slugify';
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
  const staticPages = ['/', '/values', '/calculator', '/trades', '/feed', '/chat', '/analytics', '/scammer', '/news', '/privacy', '/terms', '/about', '/contact', '/disclaimer'];

  const allItems = await fetchPetDataServer();

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

  // All item pages — one entry per locale
  for (const item of allItems) {
    const itemPath = `/values/${slugify(item.name)}`;
    for (const locale of locales) {
      entries.push({
        url: localizedUrl(itemPath, locale),
        lastModified: BUILD_DATE,
        changeFrequency: 'daily',
        priority: item.type === 'pets' ? 0.8 : 0.7,
        alternates: { languages: alternatesForPath(itemPath) },
      });
    }
  }

  return entries;
}
