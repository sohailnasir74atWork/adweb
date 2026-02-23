'use client';

import { useState, useMemo } from 'react';
import { type Pet } from '@/lib/types/pet';
import { PetValueCard } from './PetValueCard';
import { SearchBar } from './SearchBar';
import { FilterBar } from './FilterBar';
import { searchPets, filterPetsByRarity, filterPetsByType, sortPetsByValue, sortPetsByName, sortPetsByScore } from '@/lib/utils/petHelpers';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { Button } from '@/components/ui/button';

interface PetGridProps {
  pets: Pet[];
}

const PAGE_SIZE = 60;

export function PetGrid({ pets }: PetGridProps) {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('pets');
  const [rarity, setRarity] = useState('All');
  const [sort, setSort] = useState('score');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const debouncedSearch = useDebounce(search, 200);

  const filteredPets = useMemo(() => {
    let result = filterPetsByType(pets, type);
    result = searchPets(result, debouncedSearch);
    result = filterPetsByRarity(result, rarity);

    switch (sort) {
      case 'value-desc':
        result = sortPetsByValue(result, 'desc');
        break;
      case 'value-asc':
        result = sortPetsByValue(result, 'asc');
        break;
      case 'name':
        result = sortPetsByName(result, 'asc');
        break;
      case 'score':
      default:
        result = sortPetsByScore(result);
        break;
    }

    return result;
  }, [pets, type, debouncedSearch, rarity, sort]);

  const visiblePets = filteredPets.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPets.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  // Reset visible count and rarity when type changes
  const handleTypeChange = (t: string) => {
    setType(t);
    setRarity('All');
    setVisibleCount(PAGE_SIZE);
  };

  const handleRarityChange = (r: string) => {
    setRarity(r);
    setVisibleCount(PAGE_SIZE);
  };

  const handleSortChange = (s: string) => {
    setSort(s);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <div className="flex flex-col gap-4">
      <SearchBar value={search} onChange={setSearch} />
      <FilterBar
        activeType={type}
        onTypeChange={handleTypeChange}
        activeRarity={rarity}
        onRarityChange={handleRarityChange}
        activeSort={sort}
        onSortChange={handleSortChange}
        totalCount={filteredPets.length}
      />

      {visiblePets.length === 0 ? (
        <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
          No items found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {visiblePets.map((pet) => (
            <PetValueCard key={pet.id} pet={pet} />
          ))}
        </div>
      )}

      {hasMore && (
        <div className="flex justify-center mt-4">
          <Button
            variant="outline"
            onClick={handleLoadMore}
            className="px-8"
          >
            Load More ({filteredPets.length - visibleCount} remaining)
          </Button>
        </div>
      )}
    </div>
  );
}
