// src/pages/components/HeroSection.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, 
  ChevronDown, 
  Search,
  Compass,
  Atom
} from 'lucide-react';
import { StatsType } from '../types';

interface HeroSectionProps {
  stats: StatsType;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ stats }) => {
  const { scrollYProgress } = useScroll();
  
  // Animações baseadas no scroll
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

  return (
    <motion.section 
      className="relative py-16 md:py-24 px-4 overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950"
      style={{ opacity: heroOpacity, y: heroY }}
    >
      {/* Elementos de fundo animados */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-400/10 dark:to-purple-400/10" />
      <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-emerald-600/20 to-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="relative max-w-5xl mx-auto text-center space-y-8">
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg">
            <Search className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Sua jornada de descoberta começa aqui
            </span>
            <Atom className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent">
              Cada Projeto
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Uma Descoberta
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed text-gray-600 dark:text-gray-300">
            Não procure. <strong className="text-gray-900 dark:text-white">Explore.</strong> Cada projeto esconde uma história, 
            uma solução elegante, uma técnica revolucionária. Sua próxima inspiração está esperando 
            para ser <strong className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">descoberta</strong>.
          </p>
        </motion.div>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Link to="/projects">
            <button className="text-lg px-10 py-4 rounded-2xl group bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 hover:from-blue-600 hover:to-purple-600 dark:hover:from-blue-400 dark:hover:to-purple-400 text-white shadow-lg transition-all hover:scale-105 flex items-center gap-3">
              <Compass className="h-6 w-6 group-hover:rotate-12 transition-transform" />
              Começar a Explorar
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <div className="w-2 h-2 rounded-full animate-pulse bg-emerald-500" />
            <span className="text-sm">
              {stats.total} projetos aguardando descoberta
            </span>
          </div>
        </motion.div>

        {/* Indicador de scroll */}
        <motion.div 
          className="flex flex-col items-center gap-2 mt-16"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Descubra mais
          </span>
          <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </motion.div>
      </div>
    </motion.section>
  );
};
