// components/HeroDescription.tsx
import React from 'react';
import { motion } from 'framer-motion';

export const HeroDescription: React.FC = () => {
  return (
    <motion.div
      className="max-w-3xl lg:max-w-5xl mx-auto px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
    >
      <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl leading-relaxed text-gray-600 dark:text-gray-300 mb-4 md:mb-6">
        Não procure.{' '}
        <motion.strong 
          className="text-gray-900 dark:text-white relative"
          whileHover={{ scale: 1.05 }}
        >
          Explore.
          <motion.span
            className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 1.2, duration: 0.8 }}
          />
        </motion.strong>
      </p>
      <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-500 dark:text-gray-400">
        Cada projeto esconde uma história, uma solução elegante, uma técnica revolucionária. Sua próxima inspiração está esperando{' '}
        <strong className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          descoberta
        </strong>.
      </p>
    </motion.div>
  );
};
