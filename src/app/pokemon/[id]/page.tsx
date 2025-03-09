'use client';

import { Pokemon } from '@/types/pokemon';
import { getPokemonById } from '@/services/pokemonService';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PageProps {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

const formatHeight = (height: number) => {
  const meters = height / 10;
  const feet = Math.floor(meters * 3.28084);
  const inches = Math.round((meters * 3.28084 - feet) * 12);
  return `${meters.toFixed(1)}m (${feet}'${inches}")`;
};

const formatWeight = (weight: number) => {
  const kg = weight / 10;
  const lbs = kg * 2.20462;
  return `${kg.toFixed(1)}kg (${lbs.toFixed(1)}lbs)`;
};

export default function PokemonDetailPage({ params, searchParams }: PageProps) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPokemon() {
      try {
        const data = await getPokemonById(params.id);
        if (!data) {
          notFound();
        }
        setPokemon(data);
      } catch {
        notFound();
      } finally {
        setLoading(false);
      }
    }
    loadPokemon();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-800 border-t-transparent"></div>
      </div>
    );
  }

  if (!pokemon) return null;

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold capitalize mb-4">{pokemon.name}</h1>
          <div className="relative w-48 h-48 mx-auto">
            <Image 
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              fill
              className="object-contain"
              sizes="(max-width: 192px) 100vw, 192px"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Details</h2>
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Height:</p>
                <p>{formatHeight(pokemon.height)}</p>
              </div>
              <div>
                <p className="font-semibold">Weight:</p>
                <p>{formatWeight(pokemon.weight)}</p>
              </div>
              <div>
                <p className="font-semibold">Types:</p>
                <div className="flex gap-2">
                  {pokemon.types.map((type) => (
                    <span
                      key={type.type.name}
                      className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm"
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Stats</h2>
            <div className="space-y-4">
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name}>
                  <div className="flex justify-between mb-1">
                    <span className="capitalize font-medium">{stat.stat.name}</span>
                    <span>{stat.base_stat}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded transition-all duration-300"
                      style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
