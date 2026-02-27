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
 * Single sitemap with all entries — Google allows up to 50K URLs per sitemap.
 * With ~3,500 items + 14 static pages = ~3,514 entries (well within limit).
 * Each entry embeds hreflang alternates for all locales (Google-recommended
 * approach — no duplicate entries per locale).
 *
 * Items are sorted by priority: static pages first, then pets by demand,
 * then non-pet items last.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    '/', '/values', '/calculator', '/trades', '/feed', '/chat',
    '/analytics', '/scammer', '/news', '/privacy', '/terms',
    '/about', '/contact', '/disclaimer',
  ];

  const allItems = await fetchPetDataServer();

  const entries: MetadataRoute.Sitemap = [];

  // Static pages — ONE entry per path (with all locale alternates embedded)
  for (const path of staticPages) {
    entries.push({
      url: localizedUrl(path, defaultLocale),
      lastModified: BUILD_DATE,
      changeFrequency: path === '/' || path === '/values' || path === '/calculator' ? 'daily' : 'weekly',
      priority: path === '/' ? 1.0 : path === '/values' || path === '/calculator' ? 0.9 : 0.7,
      alternates: { languages: alternatesForPath(path) },
    });
  }

  // Item pages — sorted by priority: pets first (higher value), then other items
  const sortedItems = [...allItems].sort((a, b) => {
    if (a.type === 'pets' && b.type !== 'pets') return -1;
    if (a.type !== 'pets' && b.type === 'pets') return 1;
    return (a.score || 999) - (b.score || 999); // Lower score = higher demand = first
  });

  for (const item of sortedItems) {
    const itemPath = `/values/${slugify(item.name)}`;
    entries.push({
      url: localizedUrl(itemPath, defaultLocale),
      lastModified: BUILD_DATE,
      changeFrequency: 'daily',
      priority: item.type === 'pets' ? (item.score <= 50 ? 0.8 : 0.6) : 0.5,
      alternates: { languages: alternatesForPath(itemPath) },
    });
  }

  return entries;
}
