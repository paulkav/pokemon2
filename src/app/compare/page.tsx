'use client';

import { useState } from 'react';
import { Pokemon } from '@/types/pokemon';
import PokemonSelector from '@/components/PokemonSelector';
import PokemonStats from '@/components/PokemonStats';

interface PageProps {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function ComparePage({ params, searchParams }: PageProps) {
  const [leftPokemon, setLeftPokemon] = useState<Pokemon | null>(null);
  const [rightPokemon, setRightPokemon] = useState<Pokemon | null>(null);
  const [isComparing, setIsComparing] = useState(false);

  const calculateComparisons = () => {
    if (!leftPokemon || !rightPokemon || !isComparing) return null;

    const leftDifferences = leftPokemon.stats.map((stat, index) => 
      stat.base_stat - rightPokemon.stats[index].base_stat
    );

    const rightDifferences = rightPokemon.stats.map((stat, index) => 
      stat.base_stat - leftPokemon.stats[index].base_stat
    );

    return {
      left: { differences: leftDifferences, position: 'left' as const },
      right: { differences: rightDifferences, position: 'right' as const }
    };
  };

  const handleCompare = () => {
    setIsComparing(true);
  };

  const handleReset = () => {
    setIsComparing(false);
  };

  const comparisons = calculateComparisons();

  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 z-0 pokemon-bg opacity-5" />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">Compare Pokemon</h1>
        
        <div className="flex flex-col md:flex-row justify-center items-start gap-8">
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <PokemonSelector 
              onSelect={(pokemon) => {
                setLeftPokemon(pokemon);
                setIsComparing(false);
              }} 
              label="Select First Pokemon"
            />
            {leftPokemon && (
              <PokemonStats 
                pokemon={leftPokemon}
                comparisonStats={comparisons?.left}
                isComparing={isComparing}
              />
            )}
          </div>

          <div className="flex flex-col items-center justify-center">
            {leftPokemon && rightPokemon ? (
              <button
                onClick={isComparing ? handleReset : handleCompare}
                className={`px-6 py-3 rounded-lg transition-colors font-bold shadow-lg hover:shadow-xl ${
                  isComparing 
                    ? 'bg-gray-600 hover:bg-gray-700 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isComparing ? 'Reset' : 'Compare'}
              </button>
            ) : (
              <div className="text-gray-400 text-center">
                Select two Pokemon<br />to compare
              </div>
            )}
          </div>

          <div className="w-full md:w-1/2 flex flex-col items-center">
            <PokemonSelector 
              onSelect={(pokemon) => {
                setRightPokemon(pokemon);
                setIsComparing(false);
              }}
              label="Select Second Pokemon"
            />
            {rightPokemon && (
              <PokemonStats 
                pokemon={rightPokemon}
                comparisonStats={comparisons?.right}
                isComparing={isComparing}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
