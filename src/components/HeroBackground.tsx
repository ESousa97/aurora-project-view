// components/HeroBackground.tsx
import React from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import { MousePosition } from './hero/types/hero';

interface HeroBackgroundProps {
  mousePosition: MousePosition;
}

export const HeroBackground: React.FC<HeroBackgroundProps> = ({ mousePosition }) => {
  const { scrollYProgress } = useScroll();
  const parallaxY1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <>
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 to-purple-500/3 dark:from-blue-400/8 dark:to-purple-400/8 rounded-3xl" />
      
      {/* Dynamic Mouse-following Gradient */}
      <motion.div
        className="absolute inset-0 opacity-30 dark:opacity-50"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.normalizedX}% ${mousePosition.normalizedY}%, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.1), transparent 50%)`,
        }}
      />

      {/* Animated Background Blobs */}
      <motion.div
        className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl"
        style={{ y: parallaxY1 }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-emerald-600/20 to-cyan-600/20 rounded-full blur-3xl"
        style={{ y: parallaxY2, rotate }}
        animate={{
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </>
  );
};
