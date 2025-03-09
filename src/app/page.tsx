'use client';

import { Pokemon } from '@/types/pokemon';
import { getInitialPokemon, searchPokemon } from '@/services/pokemonService';
import PokemonCard from '@/components/PokemonCard';
import Search from '@/components/Search';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function SearchSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto" role="status" aria-label="Loading search...">
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

function LoadingSpinner({ size = 'md', label = 'Loading...' }: { size?: 'sm' | 'md' | 'lg', label?: string }) {
  const sizeClasses = {
    sm: 'h-8 w-8 border-2',
    md: 'h-12 w-12 border-4',
    lg: 'h-16 w-16 border-4'
  };

  return (
    <div className="flex flex-col items-center justify-center my-8" role="status" aria-label={label}>
      <div className={`animate-spin rounded-full border-gray-800 border-t-transparent ${sizeClasses[size]}`} />
      <span className="sr-only">{label}</span>
    </div>
  );
}

function ErrorMessage({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div 
      role="alert" 
      className="text-red-500 text-center my-8 p-4 bg-red-50 rounded-lg border border-red-200 shadow-sm"
      aria-live="assertive"
    >
      <p className="font-medium">Error</p>
      <p className="mt-1">{message}</p>
      <button 
        onClick={onRetry}
        className="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        aria-label="Retry loading Pokemon"
      >
        Try Again
      </button>
    </div>
  );
}

function EmptyState({ query }: { query?: string | null }) {
  return (
    <div className="col-span-full text-center py-12" role="status">
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

function PokemonGrid({ pokemon }: { pokemon: Pokemon[] }) {
  return (
    <div 
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      role="list"
      aria-label="Pokemon list"
    >
      {pokemon.map((p) => (
        <div key={p.id} role="listitem">
          <PokemonCard pokemon={p} />
        </div>
      ))}
    </div>
  );
}

function HomeContent() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  const loadPokemon = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
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
  }, [query]);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
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
    };

    load();

    return () => {
      mounted = false;
    };
  }, [query]);

  const handleRetry = useCallback(() => {
    loadPokemon();
  }, [loadPokemon]);

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
          <ErrorMessage message={error} onRetry={handleRetry} />
        ) : loading ? (
          <LoadingSpinner 
            size="lg" 
            label={query ? `Searching for "${query}"...` : 'Loading Pokemon...'}
          />
        ) : (
          pokemon.length > 0 ? (
            <PokemonGrid pokemon={pokemon} />
          ) : (
            <EmptyState query={query} />
          )
        )}
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense 
      fallback={
        <main className="min-h-screen p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
              Pokemon Explorer
            </h1>
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <SearchSkeleton />
            </div>
            <LoadingSpinner size="lg" label="Loading Pokemon Explorer..." />
          </div>
        </main>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
