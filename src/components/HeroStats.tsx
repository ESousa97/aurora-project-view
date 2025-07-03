// components/HeroStats.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { StatsType } from './hero/types/hero';

interface HeroStatsProps {
  stats: StatsType;
}

export const HeroStats: React.FC<HeroStatsProps> = ({ stats }) => {
  return (
    <motion.div 
      className="flex items-center gap-3 px-4 md:px-6 py-2 md:py-3 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
      whileHover={{ scale: 1.05, y: -2 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <motion.div
        className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <span className="text-gray-700 dark:text-gray-300 font-medium text-sm md:text-base">
        <span className="font-bold text-lg md:text-xl bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400 bg-clip-text text-transparent">
          {stats.total}
        </span>{' '}
        projetos aguardando descoberta
      </span>
    </motion.div>
  );
};
