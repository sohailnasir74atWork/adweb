import type { MetadataRoute } from 'next';
import { fetchPetDataServer } from '@/lib/data/pets';
import { slugify } from '@/lib/utils/slugify';
import { getOnlyPets } from '@/lib/utils/petHelpers';

const DOMAIN = 'https://adoptmevalues.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = ['/', '/values', '/calculator', '/trades', '/feed', '/chat', '/analytics', '/news'];

  const pets = await fetchPetDataServer();
  const onlyPets = getOnlyPets(pets);

  const petPages = onlyPets.map((pet) => ({
    url: `${DOMAIN}/values/${slugify(pet.name)}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  const staticEntries = staticPages.map((path) => ({
    url: `${DOMAIN}${path}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: path === '/' ? 1.0 : 0.9,
  }));

  return [...staticEntries, ...petPages];
}
