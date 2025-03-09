'use client';

import { useState } from 'react';
import PokemonSelector from '@/components/PokemonSelector';
import PokemonStats from '@/components/PokemonStats';
import { Pokemon } from '@/types/pokemon';

type PageProps = {
};

export default function ComparePage() {
  const [pokemon1, setPokemon1] = useState<Pokemon | null>(null);
  const [pokemon2, setPokemon2] = useState<Pokemon | null>(null);

  const calculateDifferences = (pokemon1: Pokemon, pokemon2: Pokemon) => {
    return pokemon1.stats.map((stat, index) => {
      return stat.base_stat - pokemon2.stats[index].base_stat;
    });
  };

  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 z-0 pokemon-bg opacity-5" />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">Compare Pokemon</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Pokemon 1</h2>
            <PokemonSelector onSelect={setPokemon1} label="Select first Pokemon" />
            {pokemon1 && pokemon2 && (
              <PokemonStats
                pokemon={pokemon1}
                comparisonStats={{
                  differences: calculateDifferences(pokemon1, pokemon2),
                  position: 'left'
                }}
                isComparing
              />
            )}
            {pokemon1 && !pokemon2 && <PokemonStats pokemon={pokemon1} />}
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Pokemon 2</h2>
            <PokemonSelector onSelect={setPokemon2} label="Select second Pokemon" />
            {pokemon1 && pokemon2 && (
              <PokemonStats
                pokemon={pokemon2}
                comparisonStats={{
                  differences: calculateDifferences(pokemon2, pokemon1),
                  position: 'right'
                }}
                isComparing
              />
            )}
            {!pokemon1 && pokemon2 && <PokemonStats pokemon={pokemon2} />}
          </div>
        </div>
      </div>
    </div>
  );
}
