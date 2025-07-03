// components/HeroSection.tsx
import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useMousePosition } from './hero/hooks/useMousePosition';
import { useWordRotation } from './hero/hooks/useWordRotation';
import { HeroBackground } from './HeroBackground';
import { FloatingIcons } from './FloatingIcons';
import { HeroBadge } from './HeroBadge';
import { HeroTitle } from './HeroTitle';
import { HeroDescription } from './HeroDescription';
import { HeroCTA } from './HeroCTA';
import { HeroStats } from './HeroStats';
import { ScrollIndicator } from './ScrollIndicator';
import { StatsType } from './hero/types/hero';
import { INSPIRATION_WORDS, FLOATING_ICONS, SPRING_CONFIG } from './hero/constants/hero';

interface HeroSectionProps {
  stats: StatsType;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ stats }) => {
  const mousePosition = useMousePosition();
  const currentWordIndex = useWordRotation(INSPIRATION_WORDS);
  
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  
  const smoothOpacity = useSpring(heroOpacity, SPRING_CONFIG);
  const smoothY = useSpring(heroY, SPRING_CONFIG);

  return (
    <motion.section
      className="relative px-4 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/30 dark:from-slate-900 dark:via-blue-950/50 dark:to-purple-950/30 rounded-3xl flex items-center justify-center"
      style={{ 
        opacity: smoothOpacity, 
        y: smoothY,
        height: '90vh',
        maxHeight: '90vh'
      }}
    >
      {/* Background Elements */}
      <HeroBackground mousePosition={mousePosition} />

      {/* Floating Icons */}
      <FloatingIcons icons={FLOATING_ICONS} />

      {/* Main Content Container */}
      <div className="relative w-full max-w-6xl mx-auto text-center z-10 flex flex-col justify-center h-full py-8">
        <motion.div
          className="space-y-6 md:space-y-8 lg:space-y-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Badge */}
          <HeroBadge />

          {/* Main Title */}
          <HeroTitle 
            currentWordIndex={currentWordIndex} 
            inspirationWords={INSPIRATION_WORDS} 
          />

          {/* Description */}
          <HeroDescription />
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 md:gap-8 justify-center items-center mt-8 md:mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <HeroCTA />
          <HeroStats stats={stats} />
        </motion.div>

        {/* Scroll Indicator */}
        <ScrollIndicator />
      </div>
    </motion.section>
  );
};
