import React, { memo } from 'react';
import { motion, Variants } from 'framer-motion';
import { Crown } from 'lucide-react';
import { ProjectType } from '../types';
import { EnhancedProjectCard } from './EnhancedProjectCard';

// Section container animations with stagger
const sectionVariant: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.07 },
  },
};

// Individual card animations
const cardVariant: Variants = {
  offscreen: { opacity: 0, y: 30 },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 200, damping: 20 },
  },
  hover: {
    scale: 1.03,
    transition: { type: 'spring', stiffness: 300, damping: 25 },
  },
};

interface MysteryProjectsSectionProps {
  projects: ProjectType[];
  discoveredProjects: Set<number>;
  onProjectReveal: (projectId: number) => void;
}

export const MysteryProjectsSection: React.FC<MysteryProjectsSectionProps> = memo(
  ({ projects, discoveredProjects, onProjectReveal }) => {
    return (
      <motion.section
        className="space-y-12 py-20 rounded-3xl mx-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariant}
        style={{ willChange: 'transform' }}
      >
        <motion.div className="text-center space-y-6" variants={sectionVariant}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg border border-gray-200 dark:border-gray-700">
            <Crown className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span className="font-medium text-sm bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent">
              Câmara dos Mistérios
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            O que Está Escondido?
          </h2>

          <p className="text-lg max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
            Alguns projetos preferem manter seus segredos até o momento certo.
            Clique para revelar e descobrir o que cada um tem a oferecer.
          </p>
        </motion.div>

        <motion.div
          className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariant}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="transform-gpu"
              style={{ willChange: 'transform' }}
              variants={cardVariant}
              initial="offscreen"
              whileInView="onscreen"
              whileHover="hover"
              viewport={{ once: true, amount: 0.3 }}
              custom={index}
            >
              <EnhancedProjectCard
                project={project}
                variant="mystery"
                index={index}
                onDiscover={onProjectReveal}
                isDiscovered={discoveredProjects.has(project.id)}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    );
  }
);
