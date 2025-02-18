'use client';

import { Pokemon } from '../types/pokemon';
import { useRouter } from 'next/navigation';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/pokemons/${pokemon.id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow text-gray-700 cursor-pointer"
    >
      <div className="w-32 h-32 mx-auto">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-full h-full object-contain"
        />
      </div>
      <h2 className="text-xl font-bold text-center capitalize mt-2 text-gray-800">
        {pokemon.name}
      </h2>
      <div className="flex gap-2 justify-center mt-2">
        {pokemon.types.map((type) => (
          <span
            key={type.type.name}
            className="px-2 py-1 rounded-full text-sm bg-gray-200 text-gray-700"
          >
            {type.type.name}
          </span>
        ))}
      </div>
    </div>
  );
}
