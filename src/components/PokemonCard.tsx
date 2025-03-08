'use client';

import { Pokemon } from '@/types/pokemon';
import Image from 'next/image';
import Link from 'next/link';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Link href={`/pokemon/${pokemon.id}`}>
      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow">
        <div className="relative w-32 h-32 mx-auto">
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            fill
            className="object-contain"
            sizes="(max-width: 128px) 100vw, 128px"
          />
        </div>
        <h2 className="text-xl font-bold text-center mt-4 capitalize text-gray-900">{pokemon.name}</h2>
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
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
    </Link>
  );
}
