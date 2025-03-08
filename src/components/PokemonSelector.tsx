'use client';

import { useState, useEffect } from 'react';
import { Pokemon } from '@/types/pokemon';

interface PokemonSelectorProps {
  onSelect: (pokemon: Pokemon | null) => void;
  label: string;
}

const PokemonSelector = ({ onSelect, label }: PokemonSelectorProps) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
        const data = await response.json();
        
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon: { name: string, url: string }) => {
            const detailResponse = await fetch(pokemon.url);
            return detailResponse.json();
          })
        );
        
        setPokemonList(pokemonDetails);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemonList();
  }, []);

  const handleSelect = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    onSelect(pokemon);
    setIsOpen(false);
  };

  return (
    <div className="relative w-64">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
      >
        {selectedPokemon ? selectedPokemon.name : label}
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-900">Loading...</div>
          ) : (
            <div className="py-1">
              {pokemonList.map((pokemon) => (
                <button
                  key={pokemon.id}
                  onClick={() => handleSelect(pokemon)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none text-gray-900"
                >
                  {pokemon.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PokemonSelector;
