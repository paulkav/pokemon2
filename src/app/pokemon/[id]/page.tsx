import PokemonDetail from '@/components/PokemonDetail';
import { Pokemon } from '@/types/pokemon';

async function getData(id: string): Promise<Pokemon> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const pokemon = await getData(params.id);
  return <PokemonDetail pokemon={pokemon} />;
}
