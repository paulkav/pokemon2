'use client';

import { Pokemon } from '@/types/pokemon';

export const typeEffectiveness: { [key: string]: { [key: string]: number } } = {
  normal: {
    rock: 0.5,
    ghost: 0,
    steel: 0.5
  },
  fire: {
    fire: 0.5,
    water: 0.5,
    grass: 2,
    ice: 2,
    bug: 2,
    rock: 0.5,
    dragon: 0.5,
    steel: 2
  },
  water: {
    fire: 2,
    water: 0.5,
    grass: 0.5,
    ground: 2,
    rock: 2,
    dragon: 0.5
  },
  electric: {
    water: 2,
    electric: 0.5,
    grass: 0.5,
    ground: 0,
    flying: 2,
    dragon: 0.5
  },
  grass: {
    fire: 0.5,
    water: 2,
    grass: 0.5,
    poison: 0.5,
    ground: 2,
    flying: 0.5,
    bug: 0.5,
    rock: 2,
    dragon: 0.5,
    steel: 0.5
  },
  ice: {
    fire: 0.5,
    water: 0.5,
    grass: 2,
    ice: 0.5,
    ground: 2,
    flying: 2,
    dragon: 2,
    steel: 0.5
  },
  fighting: {
    normal: 2,
    ice: 2,
    poison: 0.5,
    flying: 0.5,
    psychic: 0.5,
    bug: 0.5,
    rock: 2,
    ghost: 0,
    dark: 2,
    steel: 2,
    fairy: 0.5
  },
  poison: {
    grass: 2,
    poison: 0.5,
    ground: 0.5,
    rock: 0.5,
    ghost: 0.5,
    steel: 0,
    fairy: 2
  },
  ground: {
    fire: 2,
    electric: 2,
    grass: 0.5,
    poison: 2,
    flying: 0,
    bug: 0.5,
    rock: 2,
    steel: 2
  },
  flying: {
    electric: 0.5,
    grass: 2,
    fighting: 2,
    bug: 2,
    rock: 0.5,
    steel: 0.5
  },
  psychic: {
    fighting: 2,
    poison: 2,
    psychic: 0.5,
    dark: 0,
    steel: 0.5
  },
  bug: {
    fire: 0.5,
    grass: 2,
    fighting: 0.5,
    poison: 0.5,
    flying: 0.5,
    psychic: 2,
    ghost: 0.5,
    dark: 2,
    steel: 0.5,
    fairy: 0.5
  },
  rock: {
    fire: 2,
    ice: 2,
    fighting: 0.5,
    ground: 0.5,
    flying: 2,
    bug: 2,
    steel: 0.5
  },
  ghost: {
    normal: 0,
    psychic: 2,
    ghost: 2,
    dark: 0.5
  },
  dragon: {
    dragon: 2,
    steel: 0.5,
    fairy: 0
  },
  dark: {
    fighting: 0.5,
    psychic: 2,
    ghost: 2,
    dark: 0.5,
    fairy: 0.5
  },
  steel: {
    fire: 0.5,
    water: 0.5,
    electric: 0.5,
    ice: 2,
    rock: 2,
    steel: 0.5,
    fairy: 2
  },
  fairy: {
    fire: 0.5,
    fighting: 2,
    poison: 0.5,
    dragon: 2,
    dark: 2,
    steel: 0.5
  }
};

export const calculateTypeEffectiveness = (attackerTypes: string[], defenderTypes: string[]): number => {
  let effectiveness = 1;
  
  attackerTypes.forEach(attackType => {
    defenderTypes.forEach(defendType => {
      const multiplier = typeEffectiveness[attackType]?.[defendType] || 1;
      effectiveness *= multiplier;
    });
  });
  
  return effectiveness;
};

export const calculateDamage = (attacker: Pokemon, defender: Pokemon): number => {
  const attackerTypes = attacker.types.map(t => t.type.name);
  const defenderTypes = defender.types.map(t => t.type.name);
  
  const typeEffect = calculateTypeEffectiveness(attackerTypes, defenderTypes);
  const attack = attacker.stats.find(s => s.stat.name === 'attack')?.base_stat || 0;
  const defense = defender.stats.find(s => s.stat.name === 'defense')?.base_stat || 0;
  
  // Basic damage formula inspired by Pokemon games
  const damage = Math.floor((((2 * 50 / 5 + 2) * attack * 60 / defense) / 50 + 2) * typeEffect);
  return damage;
};

export const getBattleResult = (pokemon1: Pokemon, pokemon2: Pokemon): { winner: Pokemon, message: string } => {
  const hp1 = pokemon1.stats.find(s => s.stat.name === 'hp')?.base_stat || 0;
  const hp2 = pokemon2.stats.find(s => s.stat.name === 'hp')?.base_stat || 0;
  
  const damage1to2 = calculateDamage(pokemon1, pokemon2);
  const damage2to1 = calculateDamage(pokemon2, pokemon1);
  
  const turns1Survives = Math.ceil(hp1 / damage2to1);
  const turns2Survives = Math.ceil(hp2 / damage1to2);
  
  if (turns1Survives > turns2Survives) {
    return {
      winner: pokemon1,
      message: `${pokemon1.name} wins in ${turns2Survives} turns!`
    };
  } else if (turns2Survives > turns1Survives) {
    return {
      winner: pokemon2,
      message: `${pokemon2.name} wins in ${turns1Survives} turns!`
    };
  } else {
    // In case of a tie, the faster Pokemon wins
    const speed1 = pokemon1.stats.find(s => s.stat.name === 'speed')?.base_stat || 0;
    const speed2 = pokemon2.stats.find(s => s.stat.name === 'speed')?.base_stat || 0;
    
    if (speed1 >= speed2) {
      return {
        winner: pokemon1,
        message: `${pokemon1.name} wins by being faster!`
      };
    } else {
      return {
        winner: pokemon2,
        message: `${pokemon2.name} wins by being faster!`
      };
    }
  }
};
