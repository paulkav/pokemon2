import { getPokemonById } from '@/services/pokemonService';
import { notFound } from 'next/navigation';
import Image from 'next/image';

async function getPokemon(id: string) {
  try {
    const pokemon = await getPokemonById(id);
    if (!pokemon) {
      notFound();
    }
    return pokemon;
  } catch {
    notFound();
  }
}

async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

export { generateStaticParams };

// @ts-expect-error - Next.js 15.1.7 type issue
export default async function Page({ params }) {
  const pokemon = await getPokemon(params.id);

  return (
    <div className="min-h-screen p-8 text-gray-800">
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-center items-center">
            <Image
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              width={256}
              height={256}
              className="object-contain"
              priority
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold capitalize mb-4 text-gray-800">{pokemon.name}</h1>
            <div className="flex gap-2 mb-4">
              {pokemon.types.map((type) => (
                <span
                  key={type.type.name}
                  className="px-4 py-1 rounded-full text-sm bg-gray-200 text-gray-700"
                >
                  {type.type.name}
                </span>
              ))}
            </div>
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold mb-2 text-gray-800">Stats</h2>
                <div className="space-y-2">
                  {pokemon.stats.map((stat) => (
                    <div key={stat.stat.name} className="flex items-center">
                      <span className="w-32 capitalize text-gray-700">{stat.stat.name}:</span>
                      <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                        />
                      </div>
                      <span className="ml-2 w-12 text-gray-700">{stat.base_stat}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2 text-gray-800">Abilities</h2>
                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities.map((ability) => (
                    <span
                      key={ability.ability.name}
                      className="px-3 py-1 bg-gray-100 rounded-full capitalize text-gray-700"
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
    </div>
  );
}
