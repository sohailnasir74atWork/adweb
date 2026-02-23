import type { MetadataRoute } from 'next';
import { fetchPetDataServer } from '@/lib/data/pets';
import { slugify } from '@/lib/utils/slugify';
import { locales, defaultLocale } from '@/i18n/config';

const DOMAIN = 'https://adoptmevalues.app';
const BUILD_DATE = new Date();

// Sitemap IDs: 0 = static pages, then one per item type
const ITEM_TYPES = ['pets', 'toys', 'vehicles', 'pet wear', 'strollers', 'eggs', 'gifts', 'food', 'other'];

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

// Next.js calls this to generate sitemap index (sitemap.xml → /sitemap/0.xml, /sitemap/1.xml, etc.)
export async function generateSitemaps() {
  // 0 = static pages, 1-9 = item types
  return [
    { id: 0 },
    ...ITEM_TYPES.map((_, i) => ({ id: i + 1 })),
  ];
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  if (id === 0) {
    // Static pages
    const staticPages = ['/', '/values', '/calculator', '/trades', '/feed', '/chat', '/analytics', '/scammer', '/news'];
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
  } else {
    // Item type sitemap
    const typeIndex = id - 1;
    const itemType = ITEM_TYPES[typeIndex];
    if (!itemType) return entries;

    const allItems = await fetchPetDataServer();
    const items = allItems.filter((p) => p.type === itemType);

    for (const item of items) {
      const itemPath = `/values/${slugify(item.name)}`;
      for (const locale of locales) {
        entries.push({
          url: localizedUrl(itemPath, locale),
          lastModified: BUILD_DATE,
          changeFrequency: 'daily',
          priority: itemType === 'pets' ? 0.8 : 0.7,
          alternates: { languages: alternatesForPath(itemPath) },
        });
      }
    }
  }

  return entries;
}
