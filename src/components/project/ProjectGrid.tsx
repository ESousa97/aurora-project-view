// src/components/project/ProjectGrid.tsx - Versão Exploração
import React from 'react';
import { ProjectCard } from './ProjectCard';
import { ProjectTimeline } from './ProjectTimeline';
import { ProjectCard as ProjectCardType } from '@/types';
import { useUIStore } from '@/stores/uiStore';
import { motion } from 'framer-motion';
import { Compass, Sparkles, Map } from 'lucide-react';

interface ProjectGridProps {
  projects: ProjectCardType[];
  isLoading?: boolean;
  variant?: 'discovery' | 'exploration' | 'showcase';
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ 
  projects, 
  isLoading = false,
  variant = 'exploration'
}) => {
  const { viewMode } = useUIStore();

  if (isLoading) {
    return (
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : viewMode === 'list'
          ? 'grid-cols-1'
          : 'grid-cols-1' // timeline loading
      }`}>
        {[...Array(6)].map((_, i) => (
          <motion.div 
            key={i} 
            className="animate-pulse"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className={`bg-gradient-to-br from-muted to-muted/50 rounded-lg ${
              viewMode === 'timeline' ? 'h-24' : 'h-64'
            }`}>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-muted-foreground/20 rounded animate-pulse" />
                <div className="h-3 bg-muted-foreground/20 rounded w-3/4 animate-pulse" />
                <div className="h-3 bg-muted-foreground/20 rounded w-1/2 animate-pulse" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <motion.div 
        className="text-center py-16 space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div 
          className="text-6xl"
          animate={{ 
            rotate: [0, 10, -10, 0],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        >
          🗺️
        </motion.div>
        
        <div className="space-y-3">
          <h3 className="text-2xl font-bold flex items-center gap-2 justify-center">
            <Map className="h-6 w-6 text-primary" />
            Território Inexplorado
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
            Este território ainda não foi mapeado pelos nossos exploradores. 
            Novos projetos podem aparecer a qualquer momento durante sua jornada de descoberta.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-4 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <Compass className="h-4 w-4" />
            <span>Continue explorando</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span>Novas descobertas em breve</span>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // Timeline view
  if (viewMode === 'timeline') {
    return <ProjectTimeline projects={projects} isLoading={isLoading} />;
  }

  // Determinar a variante dos cards baseado no contexto
  const getCardVariant = (index: number): 'default' | 'compact' => {
    if (viewMode === 'list') return 'compact';
    return 'default'; // Sempre retorna um tipo válido
  };

  // Container variants para animação staggered
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Grid and List views
  return (
    <motion.div 
      className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1'
      }`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          variants={itemVariants}
          layout
        >
          <ProjectCard 
            project={project}
            variant={getCardVariant(index)}
            index={index}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};
