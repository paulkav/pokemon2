'use client';

import { Pokemon } from '@/types/pokemon';
import { getInitialPokemon, searchPokemon } from '@/services/pokemonService';
import PokemonCard from '@/components/PokemonCard';
import Search from '@/components/Search';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function SearchWrapper() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <Search />
    </Suspense>
  );
}

export default function Home() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    async function loadPokemon() {
      try {
        setLoading(true);
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

  if (error) {
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Pokemon Explorer</h1>
          <SearchWrapper />
          <div className="text-red-500 text-center mb-8">{error}</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Pokemon Explorer</h1>
        <SearchWrapper />
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-800 border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {pokemon.map((p) => (
              <PokemonCard key={p.id} pokemon={p} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
