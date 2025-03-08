'use client';

import { useState } from 'react';
import PokemonSelector from '@/components/PokemonSelector';
import PokemonStats from '@/components/PokemonStats';
import { Pokemon } from '@/types/pokemon';
import BattleAnimation from '@/components/BattleAnimation';

export default function BattlePage() {
  const [pokemon1, setPokemon1] = useState<Pokemon | null>(null);
  const [pokemon2, setPokemon2] = useState<Pokemon | null>(null);
  const [battleResult, setBattleResult] = useState<string>('');
  const [isBattling, setIsBattling] = useState(false);

  const startBattle = () => {
    if (!pokemon1 || !pokemon2) return;
    setBattleResult('');
    setIsBattling(true);
  };

  const handleBattleComplete = (result: string) => {
    setBattleResult(result);
  };

  const handleCloseBattle = () => {
    setIsBattling(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Pokemon Battle</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Pokemon 1</h2>
          <PokemonSelector onSelect={setPokemon1} label="Select first Pokemon" />
          {pokemon1 && <PokemonStats pokemon={pokemon1} />}
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Pokemon 2</h2>
          <PokemonSelector onSelect={setPokemon2} label="Select second Pokemon" />
          {pokemon2 && <PokemonStats pokemon={pokemon2} />}
        </div>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={startBattle}
          disabled={!pokemon1 || !pokemon2}
          className="bg-red-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Battle!
        </button>

        {battleResult && !isBattling && (
          <p className="mt-4 text-xl font-bold">{battleResult}</p>
        )}
      </div>

      {isBattling && pokemon1 && pokemon2 && (
        <BattleAnimation
          pokemon1={pokemon1}
          pokemon2={pokemon2}
          onBattleComplete={handleBattleComplete}
          onClose={handleCloseBattle}
        />
      )}
    </div>
  );
}