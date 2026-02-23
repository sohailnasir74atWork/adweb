import { fetchPetDataServer } from '@/lib/data/pets';
import { PetGrid } from '@/components/values/PetGrid';

export const metadata = {
  title: 'Adopt Me Pet Values 2026 — Trading Values Updated Daily',
  description:
    'Browse all Adopt Me trading values for every Roblox pet. Legendary, Ultra Rare, Rare, Uncommon, and Common pets with Neon, Mega Neon, Fly, and Ride prices. Updated daily in 2026.',
};

export const revalidate = 300; // ISR: revalidate every 5 minutes

export default async function ValuesPage() {
  const pets = await fetchPetDataServer();

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Adopt Me Pet Values</h1>
        <p className="text-muted-foreground text-sm sm:text-base mt-1">
          All Adopt Me trading values updated daily for 2026. Click any pet to see full value details including Neon, Mega Neon, Fly, and Ride prices. Use our <a href="/calculator" className="text-app-primary font-semibold hover:underline">trade calculator</a> to check if your trade is fair.
        </p>
      </div>
      <PetGrid pets={pets} />
    </div>
  );
}
