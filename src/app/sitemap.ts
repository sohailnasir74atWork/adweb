import type { MetadataRoute } from 'next';
import { fetchPetDataServer } from '@/lib/data/pets';
import { slugify } from '@/lib/utils/slugify';
import { getOnlyPets } from '@/lib/utils/petHelpers';

const DOMAIN = 'https://adoptmevalues.app';
const BUILD_DATE = new Date();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = ['/', '/values', '/calculator', '/trades', '/feed', '/chat', '/analytics', '/scammer', '/news'];

  const pets = await fetchPetDataServer();
  const onlyPets = getOnlyPets(pets);

  const petPages = onlyPets.map((pet) => ({
    url: `${DOMAIN}/values/${slugify(pet.name)}`,
    lastModified: BUILD_DATE,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  const staticEntries = staticPages.map((path) => ({
    url: `${DOMAIN}${path}`,
    lastModified: BUILD_DATE,
    changeFrequency: 'daily' as const,
    priority: path === '/' ? 1.0 : 0.9,
  }));

  return [...staticEntries, ...petPages];
}
