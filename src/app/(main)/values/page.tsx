import { fetchPetDataServer } from '@/lib/data/pets';
import { PetGrid } from '@/components/values/PetGrid';

export const metadata = {
  title: 'All Adopt Me Pet Values — Updated Daily',
  description:
    'Browse all Adopt Me pet values including Legendary, Ultra-Rare, Rare, Uncommon and Common pets. Updated daily with Neon, Mega, Fly, Ride prices.',
};

export const revalidate = 300; // ISR: revalidate every 5 minutes

export default async function ValuesPage() {
  const pets = await fetchPetDataServer();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Adopt Me Pet Values</h1>
        <p className="text-muted-foreground mt-1">
          All pet values updated daily. Click any pet to see full value details including Neon, Mega, Fly, and Ride prices.
        </p>
      </div>
      <PetGrid pets={pets} />
    </div>
  );
}
