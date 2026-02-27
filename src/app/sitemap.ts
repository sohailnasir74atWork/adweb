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
 * Sitemap Index — Next.js calls generateSitemaps() to discover how many
 * sitemaps exist, then calls sitemap({ id }) for each.
 *
 * Split strategy:
 *   id 0 — static pages (all locales)
 *   id 1 — pet items A-L (all locales)
 *   id 2 — pet items M-Z (all locales)
 *   id 3 — non-pet items (all locales)
 *
 * This produces /sitemap/0.xml, /sitemap/1.xml, etc. and a root
 * /sitemap.xml that acts as a sitemap index.
 */
export async function generateSitemaps() {
  return [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }];
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    '/', '/values', '/calculator', '/trades', '/feed', '/chat',
    '/analytics', '/scammer', '/news', '/privacy', '/terms',
    '/about', '/contact', '/disclaimer',
  ];

  // Static pages sitemap
  if (id === 0) {
    return staticPages.map((path) => ({
      url: localizedUrl(path, defaultLocale),
      lastModified: BUILD_DATE,
      changeFrequency: path === '/' || path === '/values' || path === '/calculator' ? 'daily' : 'weekly',
      priority: path === '/' ? 1.0 : path === '/values' || path === '/calculator' ? 0.9 : 0.7,
      alternates: { languages: alternatesForPath(path) },
    }));
  }

  const allItems = await fetchPetDataServer();

  // Pets A-L
  if (id === 1) {
    const pets = allItems
      .filter((i) => i.type === 'pets' && i.name.charAt(0).toLowerCase() <= 'l')
      .sort((a, b) => (a.score || 999) - (b.score || 999));

    return pets.map((item) => {
      const itemPath = `/values/${slugify(item.name)}`;
      return {
        url: localizedUrl(itemPath, defaultLocale),
        lastModified: BUILD_DATE,
        changeFrequency: 'daily' as const,
        priority: item.score <= 50 ? 0.8 : 0.6,
        alternates: { languages: alternatesForPath(itemPath) },
      };
    });
  }

  // Pets M-Z
  if (id === 2) {
    const pets = allItems
      .filter((i) => i.type === 'pets' && i.name.charAt(0).toLowerCase() > 'l')
      .sort((a, b) => (a.score || 999) - (b.score || 999));

    return pets.map((item) => {
      const itemPath = `/values/${slugify(item.name)}`;
      return {
        url: localizedUrl(itemPath, defaultLocale),
        lastModified: BUILD_DATE,
        changeFrequency: 'daily' as const,
        priority: item.score <= 50 ? 0.8 : 0.6,
        alternates: { languages: alternatesForPath(itemPath) },
      };
    });
  }

  // Non-pet items (id === 3)
  const nonPets = allItems
    .filter((i) => i.type !== 'pets')
    .sort((a, b) => (a.score || 999) - (b.score || 999));

  return nonPets.map((item) => {
    const itemPath = `/values/${slugify(item.name)}`;
    return {
      url: localizedUrl(itemPath, defaultLocale),
      lastModified: BUILD_DATE,
      changeFrequency: 'daily' as const,
      priority: 0.5,
      alternates: { languages: alternatesForPath(itemPath) },
    };
  });
}
