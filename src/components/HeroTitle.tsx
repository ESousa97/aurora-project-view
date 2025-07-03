// components/HeroTitle.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroTitleProps {
  currentWordIndex: number;
  inspirationWords: string[];
}

export const HeroTitle: React.FC<HeroTitleProps> = ({ currentWordIndex, inspirationWords }) => {
  return (
    <motion.h1 
      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black tracking-tight leading-[0.9]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8 }}
    >
      <motion.span 
        className="block bg-gradient-to-r from-emerald-600 via-blue-600 to-cyan-600 dark:from-emerald-400 dark:via-blue-400 dark:to-cyan-400 bg-clip-text text-transparent"
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: "100% 50%" }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        style={{ backgroundSize: "200% 200%" }}
      >
        Cada Projeto
      </motion.span>
      <motion.span 
        className="block bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 dark:from-purple-400 dark:via-pink-400 dark:to-red-400 bg-clip-text text-transparent mt-2"
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: "100% 50%" }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 1.5 }}
        style={{ backgroundSize: "200% 200%" }}
      >
        Uma{' '}
        <AnimatePresence mode="wait">
          <motion.span
            key={currentWordIndex}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            {inspirationWords[currentWordIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </motion.h1>
  );
};
