import { Pokemon, PokemonListResponse } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

export async function getInitialPokemon(): Promise<Pokemon[]> {
  const response = await fetch(`${BASE_URL}/pokemon?limit=30`);
  const data: PokemonListResponse = await response.json();
  
  const pokemonDetails = await Promise.all(
    data.results.map(pokemon => 
      fetch(pokemon.url).then(res => res.json())
    )
  );
  
  return pokemonDetails;
}

export async function searchPokemon(query: string): Promise<Pokemon[]> {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${query.toLowerCase()}`);
    if (!response.ok) return [];
    const pokemon: Pokemon = await response.json();
    return [pokemon];
  } catch (error) {
    console.error('Error searching Pokemon:', error);
    return [];
  }
}

export async function getPokemonById(id: string | number): Promise<Pokemon | null> {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${id}`);
    if (!response.ok) return null;
    const pokemon: Pokemon = await response.json();
    return pokemon;
  } catch (error) {
    console.error('Error fetching Pokemon by ID:', error);
    return null;
  }
}

export async function getPokemonByType(type: string): Promise<Pokemon[]> {
  try {
    const response = await fetch(`${BASE_URL}/type/${type.toLowerCase()}`);
    if (!response.ok) return [];
    const data = await response.json();
    
    const pokemonDetails = await Promise.all(
      data.pokemon
        .slice(0, 20) // Limit to 20 Pokemon per type to avoid too many requests
        .map(async (p: { pokemon: { url: string } }) => {
          const res = await fetch(p.pokemon.url);
          return res.json();
        })
    );
    
    return pokemonDetails;
  } catch (error) {
    console.error('Error fetching Pokemon by type:', error);
    return [];
  }
}
