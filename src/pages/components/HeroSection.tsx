import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ChevronDown,
  Search,
  Compass,
  Atom,
  Sparkles,
  Zap,
  Eye,
  Code,
  Palette
} from 'lucide-react';
import { StatsType } from '../types';

interface HeroSectionProps {
  stats: StatsType;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ stats }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringCTA, setIsHoveringCTA] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  
  const inspirationWords = ['Inovação', 'Criatividade', 'Solução', 'Revolução', 'Descoberta'];
  
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  const parallaxY1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const smoothOpacity = useSpring(heroOpacity, springConfig);
  const smoothY = useSpring(heroY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % inspirationWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const floatingIcons = [
    { Icon: Code, delay: 0, position: { top: '15%', left: '10%' } },
    { Icon: Palette, delay: 0.5, position: { top: '25%', right: '15%' } },
    { Icon: Atom, delay: 1, position: { bottom: '30%', left: '8%' } },
    { Icon: Zap, delay: 1.5, position: { bottom: '20%', right: '12%' } },
    { Icon: Eye, delay: 2, position: { top: '45%', left: '5%' } },
    { Icon: Sparkles, delay: 2.5, position: { top: '35%', right: '8%' } },
  ];

  return (
    <motion.section
      className="relative py-20 md:py-32 px-4 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/30 dark:from-slate-900 dark:via-blue-950/50 dark:to-purple-950/30 rounded-3xl min-h-[90vh] flex items-center"
      style={{ opacity: smoothOpacity, y: smoothY }}
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 to-purple-500/3 dark:from-blue-400/8 dark:to-purple-400/8 rounded-3xl" />
      
      {/* Dynamic Mouse-following Gradient */}
      <motion.div
        className="absolute inset-0 opacity-30 dark:opacity-50"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.1), transparent 50%)`,
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

      {/* Floating Icons */}
      {floatingIcons.map(({ Icon, delay, position }, index) => (
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

      <div className="relative max-w-6xl mx-auto text-center space-y-12 z-10">
        {/* Enhanced Badge */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center gap-4 px-8 py-4 rounded-full border border-gray-200/80 dark:border-gray-700/80 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl shadow-blue-500/10 dark:shadow-purple-500/20"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Search className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </motion.div>
            <span className="font-semibold text-lg bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Sua jornada de descoberta começa aqui
            </span>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Atom className="h-7 w-7 text-purple-600 dark:text-purple-400" />
            </motion.div>
          </motion.div>

          {/* Enhanced Main Title */}
          <motion.h1 
            className="text-6xl md:text-7xl lg:text-9xl font-black tracking-tight leading-[0.9] mb-8"
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

          {/* Enhanced Description */}
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <p className="text-xl md:text-3xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
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
            <p className="text-lg md:text-xl leading-relaxed text-gray-500 dark:text-gray-400">
              Cada projeto esconde uma história, uma solução elegante, uma técnica revolucionária. Sua próxima inspiração está esperando{' '}
              <strong className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                descoberta
              </strong>.
            </p>
          </motion.div>
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div
          className="flex flex-col sm:flex-row gap-8 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <Link to="/projects">
            <motion.button
              className="relative overflow-hidden text-xl px-12 py-5 rounded-2xl group flex items-center gap-4 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 dark:from-purple-400 dark:via-blue-500 dark:to-cyan-400 text-white shadow-2xl shadow-purple-500/25 dark:shadow-purple-400/30 border border-white/20"
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
              <span className="relative z-10 flex items-center gap-4 font-bold">
                <motion.div
                  animate={{ rotate: isHoveringCTA ? 360 : 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Compass className="h-7 w-7" />
                </motion.div>
                Começar a Explorar
                <motion.div
                  animate={{ x: isHoveringCTA ? 5 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight className="h-7 w-7" />
                </motion.div>
              </span>
            </motion.button>
          </Link>

          {/* Enhanced Stats */}
          <motion.div 
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
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
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              <span className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400 bg-clip-text text-transparent">
                {stats.total}
              </span>{' '}
              projetos aguardando descoberta
            </span>
          </motion.div>
        </motion.div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          className="flex flex-col items-center gap-3 mt-20 cursor-pointer group"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
            Descubra mais
          </span>
          <motion.div
            className="p-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg group-hover:shadow-xl transition-shadow"
            whileHover={{ y: -2 }}
          >
            <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200" />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};
