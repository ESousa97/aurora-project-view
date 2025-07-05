// src/pages/components/MysteryCompletedSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Sparkles, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MysteryCompletedSectionProps {
  onReset: () => void;
  totalProjects: number;
}

export const MysteryCompletedSection: React.FC<MysteryCompletedSectionProps> = ({ 
  onReset, 
  totalProjects 
}) => {
  return (
    <section className="space-y-12 py-20 rounded-3xl mx-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 backdrop-blur-sm shadow-xl border border-amber-200 dark:border-amber-700">
      <motion.div 
        className="text-center space-y-8"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        {/* Ícone de conquista */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg"
        >
          <Trophy className="h-12 w-12 text-white" />
        </motion.div>

        {/* Badge de conquista */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg border border-amber-200 dark:border-amber-700">
          <Sparkles className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <span className="font-medium text-sm text-amber-700 dark:text-amber-300">
            Explorador Completo
          </span>
        </div>
        
        {/* Título principal */}
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          Parabéns, Explorador!
        </h2>
        
        {/* Descrição */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Você descobriu todos os <strong>{totalProjects} projetos</strong> disponíveis na plataforma! 
          </p>
          <p className="text-base text-gray-600 dark:text-gray-400">
            Sua curiosidade e dedicação para explorar cada detalhe foram impressionantes. 
            Continue acompanhando para novos projetos que serão adicionados em breve.
          </p>
        </div>

        {/* Estatísticas */}
        <motion.div 
          className="flex justify-center gap-8 mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
              {totalProjects}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Projetos Descobertos
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              100%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Exploração Completa
            </div>
          </div>
        </motion.div>

        {/* Botão de reset (opcional) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="pt-6"
        >
          <Button
            onClick={onReset}
            variant="outline"
            className="group border-amber-300 hover:bg-amber-50 dark:border-amber-600 dark:hover:bg-amber-900/20"
          >
            <RotateCcw className="h-4 w-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
            Reiniciar Descobertas
          </Button>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Experimente redescobrir todos os projetos novamente
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};