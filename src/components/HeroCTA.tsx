// components/HeroCTA.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Compass } from 'lucide-react';

export const HeroCTA: React.FC = () => {
  const [isHoveringCTA, setIsHoveringCTA] = useState(false);

  return (
    <Link to="/projects">
      <motion.button
        className="relative overflow-hidden text-lg md:text-xl px-8 md:px-12 py-4 md:py-5 rounded-2xl group flex items-center gap-3 md:gap-4 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 dark:from-purple-400 dark:via-blue-500 dark:to-cyan-400 text-white shadow-2xl shadow-purple-500/25 dark:shadow-purple-400/30 border border-white/20"
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 25px 50px -12px rgba(147, 51, 234, 0.4)"
        }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={() => setIsHoveringCTA(true)}
        onHoverEnd={() => setIsHoveringCTA(false)}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {/* Animated Background */}
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-400"
          initial={{ x: "-100%" }}
          animate={{ x: isHoveringCTA ? "0%" : "-100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />

        {/* Sparkle Effect */}
        <AnimatePresence>
          {isHoveringCTA && (
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(6)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 2) * 40}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content */}
        <span className="relative z-10 flex items-center gap-3 md:gap-4 font-bold">
          <motion.div
            animate={{ rotate: isHoveringCTA ? 360 : 0 }}
            transition={{ duration: 0.6 }}
          >
            <Compass className="h-6 w-6 md:h-7 md:w-7" />
          </motion.div>
          Começar a Explorar
          <motion.div
            animate={{ x: isHoveringCTA ? 5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowRight className="h-6 w-6 md:h-7 md:w-7" />
          </motion.div>
        </span>
      </motion.button>
    </Link>
  );
};
