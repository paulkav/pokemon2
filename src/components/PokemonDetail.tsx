'use client';

import { Pokemon } from '@/types/pokemon';
import Image from 'next/image';

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

type PokemonDetailProps = {
  pokemon: Pokemon;
};

export default function PokemonDetail({ pokemon }: PokemonDetailProps) {
  return (
    <div className="container mx-auto p-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row items-center gap-8">
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
                <h2 className="text-xl font-semibold mb-2">Details</h2>
                <p>Height: {formatHeight(pokemon.height)}</p>
                <p>Weight: {formatWeight(pokemon.weight)}</p>
                <p>Base Experience: {pokemon.base_experience}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Stats</h2>
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name} className="mb-2">
                    <div className="flex justify-between mb-1">
                      <span className="capitalize">{stat.stat.name}</span>
                      <span>{stat.base_stat}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Types</h2>
              <div className="flex gap-2">
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 capitalize"
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Abilities</h2>
              <div className="flex gap-2">
                {pokemon.abilities.map((ability) => (
                  <span
                    key={ability.ability.name}
                    className="px-3 py-1 rounded-full bg-green-100 text-green-800 capitalize"
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
