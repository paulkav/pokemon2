'use client';

import { Pokemon } from '@/types/pokemon';
import { getInitialPokemon, searchPokemon } from '@/services/pokemonService';
import PokemonCard from '@/components/PokemonCard';
import Search from '@/components/Search';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function SearchWrapper() {
  return (
    <Suspense fallback={<div className="w-full max-w-4xl mx-auto">
      <div className="h-12 bg-gray-200 animate-pulse rounded-lg"></div>
    </div>}>
      <Search />
    </Suspense>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex justify-center my-8">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-800 border-t-transparent"></div>
    </div>
  );
}

function HomeContent() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    async function loadPokemon() {
      try {
        setLoading(true);
        setError('');
        const query = searchParams.get('query');
        const data = query 
          ? await searchPokemon(query)
          : await getInitialPokemon();
        setPokemon(data);
      } catch (e) {
        setError('Failed to load Pokemon. Please try again.');
        console.error('Error loading Pokemon:', e);
      } finally {
        setLoading(false);
      }
    }

    loadPokemon();
  }, [searchParams]);

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Pokemon Explorer</h1>
        <SearchWrapper />
        
        {error && (
          <div className="text-red-500 text-center my-8 p-4 bg-red-50 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        {loading ? (
          <LoadingSpinner />
        ) : !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {pokemon.length > 0 ? (
              pokemon.map((p) => (
                <PokemonCard key={p.id} pokemon={p} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                No Pokemon found. Try a different search term.
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HomeContent />
    </Suspense>
  );
}
