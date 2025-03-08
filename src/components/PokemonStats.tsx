 'use client';

import { Pokemon } from '@/types/pokemon';
import Image from 'next/image';

interface PokemonStatsProps {
  pokemon: Pokemon;
  comparisonStats?: {
    differences: number[];
    position: 'left' | 'right';
  };
  isComparing?: boolean;
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

const getStatColor = (diff: number) => {
  if (diff > 0) return 'text-green-600 dark:text-green-400';
  if (diff < 0) return 'text-red-600 dark:text-red-400';
  return 'text-gray-600 dark:text-gray-400';
};

const getStatBarColor = (baseStat: number) => {
  if (baseStat >= 100) return 'bg-green-600';
  if (baseStat >= 80) return 'bg-blue-600';
  if (baseStat >= 50) return 'bg-yellow-600';
  return 'bg-red-600';
};

export default function PokemonStats({ pokemon, comparisonStats, isComparing }: PokemonStatsProps) {

  return (
    <div className={`mt-4 p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow transition-all duration-300 ${
      isComparing ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
    }`}>
      <div className="relative w-32 h-32 mx-auto">
        <Image 
          src={pokemon.sprites.front_default} 
          alt={pokemon.name}
          fill
          className="object-contain"
          sizes="(max-width: 128px) 100vw, 128px"
          priority
        />
      </div>
      <h3 className="text-xl font-bold text-center mb-4 capitalize text-gray-900">
        {pokemon.name}
      </h3>
      <div className="space-y-2 text-gray-900">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="font-bold mb-1">Height</p>
            <p className="text-sm">{formatHeight(pokemon.height)}</p>
          </div>
          <div className="text-center">
            <p className="font-bold mb-1">Weight</p>
            <p className="text-sm">{formatWeight(pokemon.weight)}</p>
          </div>
        </div>
        <div className="mt-4 relative">
          <h4 className="font-bold mb-2">Stats:</h4>
          <div className="space-y-3">
            {pokemon.stats.map((stat, index) => (
              <div key={stat.stat.name} className="flex items-center group">
                <span className="w-24 capitalize font-medium">{stat.stat.name}:</span>
                <div className="flex-1 h-4 bg-gray-200/60 rounded overflow-hidden">
                  <div 
                    className={`h-full ${getStatBarColor(stat.base_stat)} rounded transition-all duration-300`}
                    style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                  />
                </div>
                <div className="flex items-center min-w-[80px] justify-end">
                  <span className="ml-2 font-medium tabular-nums">{stat.base_stat}</span>
                  {isComparing && comparisonStats && (
                    <span 
                      className={`ml-2 font-bold tabular-nums transition-all duration-300 ${getStatColor(comparisonStats.differences[index])}`}
                    >
                      {comparisonStats.differences[index] > 0 ? '+' : ''}
                      {comparisonStats.differences[index]}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
