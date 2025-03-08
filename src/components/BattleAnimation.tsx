'use client';

import { Pokemon } from '@/types/pokemon';
import { useEffect, useState } from 'react';
import { getBattleResult } from '@/utils/battleUtils';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface BattleAnimationProps {
  pokemon1: Pokemon;
  pokemon2: Pokemon;
  onBattleComplete: (result: string) => void;
  onClose: () => void;
}

export default function BattleAnimation({ pokemon1, pokemon2, onBattleComplete, onClose }: BattleAnimationProps) {
  const [animationPhase, setAnimationPhase] = useState<'start' | 'approach' | 'clash' | 'retreat' | 'result'>('start');
  const [battleResult, setBattleResult] = useState<string>('');
  const [winnerPokemon, setWinnerPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const battleSequence = async () => {
      // Start sequence
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAnimationPhase('approach');

      // Pokemon approach each other
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAnimationPhase('clash');

      // Clash animation
      await new Promise(resolve => setTimeout(resolve, 1500));
      setAnimationPhase('retreat');

      // Calculate and show result
      await new Promise(resolve => setTimeout(resolve, 1000));
      const result = getBattleResult(pokemon1, pokemon2);
      setBattleResult(result.message);
      setWinnerPokemon(result.winner);
      setAnimationPhase('result');
      onBattleComplete(result.message);
    };

    battleSequence();
  }, [pokemon1, pokemon2, onBattleComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center"
      >
        <div className="relative w-full h-96 flex items-center justify-center">
          {/* Pokemon 1 */}
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            animate={{
              x: animationPhase === 'start' ? -200 :
                 animationPhase === 'approach' ? -50 :
                 animationPhase === 'clash' ? 0 :
                 animationPhase === 'retreat' ? -100 : -200,
              opacity: 1,
              scale: animationPhase === 'clash' ? 1.2 : 1
            }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <Image
              src={pokemon1.sprites.front_default}
              alt={pokemon1.name}
              width={192}
              height={192}
              className="object-contain"
              style={{
                filter: winnerPokemon?.id === pokemon1.id ? 'brightness(1.5) drop-shadow(0 0 10px #fff)' : 'brightness(1)'
              }}
            />
            {animationPhase === 'clash' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
              >
                <div className="bg-yellow-400 rounded-full w-12 h-12 animate-pulse opacity-75" />
              </motion.div>
            )}
          </motion.div>

          {/* Pokemon 2 */}
          <motion.div
            initial={{ x: 200, opacity: 0 }}
            animate={{
              x: animationPhase === 'start' ? 200 :
                 animationPhase === 'approach' ? 50 :
                 animationPhase === 'clash' ? 0 :
                 animationPhase === 'retreat' ? 100 : 200,
              opacity: 1,
              scale: animationPhase === 'clash' ? 1.2 : 1
            }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <Image
              src={pokemon2.sprites.front_default}
              alt={pokemon2.name}
              width={192}
              height={192}
              className="object-contain"
              style={{
                filter: winnerPokemon?.id === pokemon2.id ? 'brightness(1.5) drop-shadow(0 0 10px #fff)' : 'brightness(1)'
              }}
            />
            {animationPhase === 'clash' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
              >
                <div className="bg-yellow-400 rounded-full w-12 h-12 animate-pulse opacity-75" />
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Battle Result */}
        {animationPhase === 'result' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white mt-8"
          >
            <h2 className="text-4xl font-bold mb-4">{battleResult}</h2>
            <button
              onClick={onClose}
              className="mt-4 bg-red-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-600 transition-colors"
            >
              Return to Selection
            </button>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
