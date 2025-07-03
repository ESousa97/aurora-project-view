// components/FloatingIcons.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { FloatingIconData } from './hero/types/hero';

interface FloatingIconsProps {
  icons: FloatingIconData[];
}

export const FloatingIcons: React.FC<FloatingIconsProps> = ({ icons }) => {
  return (
    <>
      {icons.map(({ Icon, delay, position }, index) => (
        <motion.div
          key={index}
          className="absolute opacity-20 dark:opacity-30"
          style={position}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4 + index * 0.5,
            repeat: Infinity,
            delay: delay,
            ease: "easeInOut"
          }}
        >
          <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        </motion.div>
      ))}
    </>
  );
};
