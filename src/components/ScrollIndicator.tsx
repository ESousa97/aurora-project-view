// components/ScrollIndicator.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const ScrollIndicator: React.FC = () => {
  return (
    <motion.div
      className="flex flex-col items-center gap-2 md:gap-3 mt-auto pt-4 cursor-pointer group"
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      whileHover={{ scale: 1.1 }}
    >
      <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
        Descubra mais
      </span>
      <motion.div
        className="p-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg group-hover:shadow-xl transition-shadow"
        whileHover={{ y: -2 }}
      >
        <ChevronDown className="h-4 w-4 md:h-5 md:w-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200" />
      </motion.div>
    </motion.div>
  );
};
