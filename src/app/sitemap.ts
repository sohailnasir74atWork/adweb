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

/**
 * Single sitemap with one <url> entry per locale variant (~13K URLs).
 * Google requires each indexable URL to have its own <url> entry.
 * hreflang alternates are embedded in each entry so Google
 * understands the relationship between locale versions.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    '/', '/values', '/calculator', '/trades', '/feed', '/chat',
    '/analytics', '/scammer', '/news', '/privacy', '/terms',
    '/about', '/contact', '/disclaimer',
  ];

  const allItems = await fetchPetDataServer();

  const entries: MetadataRoute.Sitemap = [];

  // Static pages — one entry per locale
  for (const path of staticPages) {
    for (const locale of locales) {
      entries.push({
        url: localizedUrl(path, locale),
        lastModified: BUILD_DATE,
        changeFrequency: path === '/' || path === '/values' || path === '/calculator' ? 'daily' : 'weekly',
        priority: path === '/' ? 1.0 : path === '/values' || path === '/calculator' ? 0.9 : 0.7,
        alternates: { languages: alternatesForPath(path) },
      });
    }
  }

  // Item pages — one entry per locale, sorted by demand
  const sortedItems = [...allItems].sort((a, b) => {
    if (a.type === 'pets' && b.type !== 'pets') return -1;
    if (a.type !== 'pets' && b.type === 'pets') return 1;
    return (a.score || 999) - (b.score || 999);
  });

  for (const item of sortedItems) {
    const itemPath = `/values/${slugify(item.name)}`;
    for (const locale of locales) {
      entries.push({
        url: localizedUrl(itemPath, locale),
        lastModified: BUILD_DATE,
        changeFrequency: 'daily',
        priority: item.type === 'pets' ? (item.score <= 50 ? 0.8 : 0.6) : 0.5,
        alternates: { languages: alternatesForPath(itemPath) },
      });
    }
  }

  return entries;
}
