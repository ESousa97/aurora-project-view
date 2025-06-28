// src/pages/components/CallToActionSection.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Eye,
  Compass,
  Atom,
  Zap
} from 'lucide-react';

export const CallToActionSection: React.FC = () => {
  return (
    <section className="relative py-20 px-4">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-50/30 via-blue-50/30 to-purple-50/30 dark:from-emerald-950/30 dark:via-blue-950/30 dark:to-purple-950/30 shadow-xl" />
      
      <motion.div 
        className="relative max-w-4xl mx-auto text-center space-y-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            A Jornada Nunca Acaba
          </h2>
          
          <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300">
            Cada projeto visitado revela novos caminhos. Cada código lido desperta novas ideias. 
            Cada solução descoberta abre portas para outros mundos. 
            <strong className="text-gray-900 dark:text-white"> Sua próxima grande descoberta está a um clique de distância.</strong>
          </p>
        </div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/projects">
            <button className="text-xl px-12 py-4 rounded-2xl group shadow-xl bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 dark:from-emerald-400 dark:to-blue-400 dark:hover:from-emerald-300 dark:hover:to-blue-300 text-white flex items-center gap-3">
              <Zap className="h-6 w-6 group-hover:rotate-12 transition-transform" />
              Iniciar Minha Jornada
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span>Sem necessidade de busca</span>
          </div>
          <div className="flex items-center gap-2">
            <Compass className="h-4 w-4" />
            <span>Navegação intuitiva</span>
          </div>
          <div className="flex items-center gap-2">
            <Atom className="h-4 w-4" />
            <span>Surpresas garantidas</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
