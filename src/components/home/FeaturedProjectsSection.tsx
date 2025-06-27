
// src/components/home/FeaturedProjectsSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Gem } from 'lucide-react';
import { EnhancedProjectCard, ProjectType } from './EnhancedProjectCard';

interface FeaturedProjectsSectionProps {
  projects: ProjectType[];
}

export const FeaturedProjectsSection: React.FC<FeaturedProjectsSectionProps> = ({ projects }) => {
  return (
    <section className="space-y-12 px-4">
      <motion.div 
        className="text-center space-y-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg border border-gray-200 dark:border-gray-700">
          <Gem className="h-4 w-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent" />
          <span className="font-medium text-sm bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">Descobertas Recentes</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">Projetos que Merecem Sua Atenção</h2>
        <p className="text-lg max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
          Nossa curadoria especial revela projetos únicos que podem mudar sua perspectiva. 
          Cada um foi escolhido por sua inovação, elegância ou impacto.
        </p>
      </motion.div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <EnhancedProjectCard 
              key={project.id} 
              project={project}
              variant="featured"
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
