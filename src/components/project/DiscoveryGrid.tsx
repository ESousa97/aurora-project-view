// src/components/project/DiscoveryGrid.tsx - LAYOUT IMERSIVO
import React from 'react';
import { ProjectCard } from './ProjectCard';
import { ProjectTimeline } from './ProjectTimeline';
import { ProjectCard as ProjectCardType } from '@/types';
import { useUIStore } from '@/stores/uiStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Compass, 
  Star, 
  Sparkles, 
  Eye,
  ArrowRight,
  Shuffle,
  Grid3X3,
  List,
  Layers,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface DiscoveryGridProps {
  projects: ProjectCardType[];
  isLoading?: boolean;
  mode?: 'discovery' | 'exploration' | 'story' | 'timeline';
  onProjectDiscover?: (id: number) => void;
}

export const DiscoveryGrid: React.FC<DiscoveryGridProps> = ({ 
  projects, 
  isLoading = false,
  mode = 'discovery',
  onProjectDiscover
}) => {
  const { viewMode } = useUIStore();
  const [discoveredProjects, setDiscoveredProjects] = React.useState<Set<number>>(new Set());
  const [currentLayout, setCurrentLayout] = React.useState<'masonry' | 'grid' | 'stories'>('masonry');

  const handleProjectDiscover = (id: number) => {
    setDiscoveredProjects(prev => new Set([...prev, id]));
    onProjectDiscover?.(id);
  };

  const layoutVariants = {
    masonry: 'columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6',
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6',
    stories: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        {/* Loading Hero */}
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 3, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity }
            }}
            className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center"
          >
            <Compass className="h-8 w-8 text-white" />
          </motion.div>
          
          <h3 className="text-2xl font-bold mb-2">Explorando novos mundos...</h3>
          <p className="text-muted-foreground">Preparando suas próximas aventuras</p>
        </motion.div>

        {/* Loading Skeletons */}
        <div className={layoutVariants[currentLayout]}>
          {[...Array(currentLayout === 'stories' ? 6 : 8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={currentLayout === 'masonry' ? 'break-inside-avoid mb-6' : ''}
            >
              <Card className="overflow-hidden">
                <div className={`bg-muted rounded-t-lg animate-pulse ${
                  currentLayout === 'stories' ? 'h-64' : 'h-48'
                }`} />
                <CardContent className="p-4 space-y-3">
                  <div className="h-4 bg-muted rounded animate-pulse" />
                  <div className="h-3 bg-muted rounded animate-pulse w-2/3" />
                  <div className="flex gap-2">
                    <div className="h-6 bg-muted rounded-full animate-pulse w-16" />
                    <div className="h-6 bg-muted rounded-full animate-pulse w-12" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <motion.div 
        className="text-center py-20 space-y-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-8xl"
        >
          🗺️
        </motion.div>
        
        <div className="space-y-4">
          <h3 className="text-3xl font-bold">Nenhuma aventura encontrada</h3>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Parece que você chegou em território inexplorado. Que tal começar uma nova expedição?
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link to="/projects">
              <Compass className="mr-2 h-5 w-5" />
              Explorar Outros Mundos
            </Link>
          </Button>
          <Button size="lg" variant="outline">
            <Shuffle className="mr-2 h-5 w-5" />
            Aventura Aleatória
          </Button>
        </div>
      </motion.div>
    );
  }

  // Timeline view
  if (viewMode === 'timeline' || mode === 'timeline') {
    return <ProjectTimeline projects={projects} isLoading={isLoading} />;
  }

  // Discovery Stats
  const discoveryStats = {
    total: projects.length,
    discovered: discoveredProjects.size,
    rate: projects.length > 0 ? (discoveredProjects.size / projects.length) * 100 : 0
  };

  return (
    <div className="space-y-8">
      {/* Discovery Header */}
      <motion.div 
        className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between p-6 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-2xl border border-primary/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-bold">
              {discoveryStats.discovered} de {discoveryStats.total} Projetos Descobertos
            </h3>
          </div>
          <div className="w-full lg:w-80 bg-muted rounded-full h-2">
            <motion.div 
              className="bg-gradient-to-r from-primary to-purple-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${discoveryStats.rate}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Sua jornada de descoberta está {Math.round(discoveryStats.rate)}% completa
          </p>
        </div>

        {/* Layout Controls */}
        <div className="flex items-center gap-2">
          <div className="flex bg-muted rounded-lg p-1">
            {[
              { id: 'masonry', icon: Layers, label: 'Masonry' },
              { id: 'grid', icon: Grid3X3, label: 'Grade' },
              { id: 'stories', icon: Star, label: 'Histórias' }
            ].map((layout) => (
              <Button
                key={layout.id}
                size="sm"
                variant={currentLayout === layout.id ? 'default' : 'ghost'}
                onClick={() => setCurrentLayout(layout.id as any)}
                className="gap-1"
              >
                <layout.icon className="h-3 w-3" />
                <span className="hidden sm:inline">{layout.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Projects Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentLayout}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={layoutVariants[currentLayout]}
        >
          {projects.map((project, index) => (
            <motion.div
              key={`${currentLayout}-${project.id}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.05,
                duration: 0.4,
                ease: "easeOut"
              }}
              className={currentLayout === 'masonry' ? 'break-inside-avoid mb-6' : ''}
            >
              <ProjectCard
                project={project}
                variant={currentLayout === 'stories' ? 'story' : 'default'}
                onDiscover={handleProjectDiscover}
                isDiscovered={discoveredProjects.has(project.id)}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Discovery Achievement */}
      <AnimatePresence>
        {discoveryStats.rate === 100 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="text-center py-12 space-y-6"
          >
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                rotate: { duration: 2, ease: "easeInOut" },
                scale: { duration: 1, repeat: 2 }
              }}
              className="text-6xl"
            >
              🏆
            </motion.div>
            
            <div className="space-y-2">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                Explorador Master!
              </h3>
              <p className="text-lg text-muted-foreground">
                Parabéns! Você descobriu todos os projetos desta expedição.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline">
                <Star className="mr-2 h-5 w-5" />
                Compartilhar Conquista
              </Button>
              <Button size="lg" asChild>
                <Link to="/projects">
                  <Compass className="mr-2 h-5 w-5" />
                  Nova Expedição
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue Exploring */}
      {projects.length > 0 && discoveryStats.rate < 100 && (
        <motion.div 
          className="text-center py-8 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h4 className="text-lg font-semibold">Continue sua jornada de descoberta</h4>
          <p className="text-muted-foreground">
            Ainda há {discoveryStats.total - discoveryStats.discovered} projetos esperando para serem explorados
          </p>
          <Button variant="outline" onClick={() => {
            const randomProject = projects[Math.floor(Math.random() * projects.length)];
            const element = document.getElementById(`project-${randomProject.id}`);
            element?.scrollIntoView({ behavior: 'smooth' });
          }}>
            <Eye className="mr-2 h-4 w-4" />
            Descobrir Próximo
          </Button>
        </motion.div>
      )}
    </div>
  );
};