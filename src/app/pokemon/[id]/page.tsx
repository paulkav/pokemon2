'use client';

import { Pokemon } from '@/types/pokemon';
import { getPokemonById } from '@/services/pokemonService';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

type PageProps = {
  params: {
    id: string;
  };
  searchParams?: Record<string, string | string[] | undefined>;
};

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

export default function PokemonDetailPage({ params }: PageProps) {
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
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="relative w-64 h-64">
            <Image
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              fill
              className="object-contain"
            />
          </div>
          
          <div className="flex-1">
            <h1 className="text-4xl font-bold capitalize mb-4">{pokemon.name}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">Physical Traits</h2>
                <p><strong>Height:</strong> {formatHeight(pokemon.height)}</p>
                <p><strong>Weight:</strong> {formatWeight(pokemon.weight)}</p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-2">Types</h2>
                <div className="flex gap-2">
                  {pokemon.types.map((type) => (
                    <span
                      key={type.type.name}
                      className="px-3 py-1 rounded-full text-white bg-blue-500"
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Stats</h2>
              <div className="space-y-2">
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name}>
                    <div className="flex justify-between mb-1">
                      <span className="capitalize">{stat.stat.name}</span>
                      <span>{stat.base_stat}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 rounded-full h-2"
                        style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Abilities</h2>
              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map((ability) => (
                  <span
                    key={ability.ability.name}
                    className="px-3 py-1 rounded-full bg-gray-200"
                  >
                    {ability.ability.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
