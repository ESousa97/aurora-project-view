// components/HeroBadge.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Search, Atom } from 'lucide-react';

export const HeroBadge: React.FC = () => {
  return (
    <motion.div
      className="inline-flex items-center gap-4 px-6 md:px-8 py-3 md:py-4 rounded-full border border-gray-200/80 dark:border-gray-700/80 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl shadow-blue-500/10 dark:shadow-purple-500/20"
      whileHover={{ scale: 1.05, y: -2 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        <Search className="h-5 w-5 md:h-6 md:w-6 text-blue-600 dark:text-blue-400" />
      </motion.div>
      <span className="font-semibold text-base md:text-lg bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
        Sua jornada de descoberta começa aqui
      </span>
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Atom className="h-6 w-6 md:h-7 md:w-7 text-purple-600 dark:text-purple-400" />
      </motion.div>
    </motion.div>
  );
};
