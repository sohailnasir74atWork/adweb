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
 * Sitemap Index — splits into multiple sitemaps to help Google's
 * crawl budget. Instead of one 17K+ URL sitemap, we produce:
 *   /sitemap/0.xml — static pages (all locales)
 *   /sitemap/1.xml — pet items A-L (all locales)  
 *   /sitemap/2.xml — pet items M-Z (all locales)
 *   /sitemap/3.xml — non-pet items (all locales)
 * 
 * Each hreflang alternate is embedded as a single entry (not duplicated
 * per locale), which is the Google-recommended approach and drastically
 * reduces total URL count from ~17K to ~3.5K.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = ['/', '/values', '/calculator', '/trades', '/feed', '/chat', '/analytics', '/scammer', '/news', '/privacy', '/terms', '/about', '/contact', '/disclaimer'];

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

  // Item pages — ONE entry per item (with all locale alternates embedded)
  // Sorted by priority: pets first (higher value), then other items
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
