'use client';

import { Pokemon } from '@/types/pokemon';
import Image from 'next/image';
import Link from 'next/link';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <div className="w-full h-full">
      <Link 
        href={`/pokemons/${pokemon.id}`}
        className="block h-full"
      >
        <article className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow h-full flex flex-col items-center">
          <div className="relative w-full h-32">
            <Image
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 128px"
              priority
            />
          </div>
          <h2 className="text-xl font-semibold mt-4 capitalize text-center">{pokemon.name}</h2>
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100"
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </article>
      </Link>
    </div>
  );
}
