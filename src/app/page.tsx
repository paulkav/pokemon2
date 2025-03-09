'use client';

import { Pokemon } from '@/types/pokemon';
import { getInitialPokemon, searchPokemon } from '@/services/pokemonService';
import PokemonCard from '@/components/PokemonCard';
import Search from '@/components/Search';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function SearchSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="h-12 bg-gray-200 animate-pulse rounded-lg"></div>
    </div>
  );
}

function SearchWrapper() {
  return (
    <Suspense fallback={<SearchSkeleton />}>
      <Search />
    </Suspense>
  );
}

function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'h-8 w-8 border-2',
    md: 'h-12 w-12 border-4',
    lg: 'h-16 w-16 border-4'
  };

  return (
    <div className="flex justify-center my-8">
      <div className={`animate-spin rounded-full border-gray-800 border-t-transparent ${sizeClasses[size]}`}></div>
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="text-red-500 text-center my-8 p-4 bg-red-50 rounded-lg border border-red-200 shadow-sm">
      <p className="font-medium">Error</p>
      <p className="mt-1">{message}</p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-md transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}

function EmptyState({ query }: { query?: string | null }) {
  return (
    <div className="col-span-full text-center py-12">
      <div className="max-w-md mx-auto">
        <p className="text-gray-500 text-lg">
          {query 
            ? `No Pokemon found matching "${query}". Try a different search term.`
            : 'No Pokemon available. Please try again later.'}
        </p>
      </div>
    </div>
  );
}

function HomeContent() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  useEffect(() => {
    let mounted = true;

    async function loadPokemon() {
      try {
        setLoading(true);
        setError('');
        const data = query 
          ? await searchPokemon(query)
          : await getInitialPokemon();
        if (mounted) {
          setPokemon(data);
        }
      } catch (e) {
        if (mounted) {
          setError('Failed to load Pokemon. Please try again.');
          console.error('Error loading Pokemon:', e);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadPokemon();

    return () => {
      mounted = false;
    };
  }, [query]);

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
          Pokemon Explorer
        </h1>
        
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <SearchWrapper />
        </div>
        
        {error ? (
          <ErrorMessage message={error} />
        ) : loading ? (
          <LoadingSpinner size="lg" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {pokemon.length > 0 ? (
              pokemon.map((p) => (
                <PokemonCard key={p.id} pokemon={p} />
              ))
            ) : (
              <EmptyState query={query} />
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <main className="min-h-screen p-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
            Pokemon Explorer
          </h1>
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <SearchSkeleton />
          </div>
          <LoadingSpinner size="lg" />
        </div>
      </main>
    }>
      <HomeContent />
    </Suspense>
  );
}
