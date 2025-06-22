import React from 'react';
import { ProjectCard } from './ProjectCard';
import { ProjectTimeline } from './ProjectTimeline';
import { ProjectCard as ProjectCardType } from '@/types';
import { useUIStore } from '@/stores/uiStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Compass, 
  Star, 
  Sparkles, 
  Eye,
  ArrowRight,
  Shuffle,
  Grid3X3,
  List,
  Clock,
  Trophy,
  Target,
  Zap,
  Crown,
  Gift,
  Rocket
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { detectLanguage, getCategoryColor } from '@/lib/languageColors';
import { toast } from '@/components/ui/sonner';

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
  const [currentLayout, setCurrentLayout] = React.useState<'masonry' | 'grid' | 'stories'>('grid');
  const [discoveryStreak, setDiscoveryStreak] = React.useState(0);
  const [showCelebration, setShowCelebration] = React.useState(false);

  const handleProjectDiscover = (id: number) => {
    if (!discoveredProjects.has(id)) {
      setDiscoveredProjects(prev => new Set([...prev, id]));
      setDiscoveryStreak(prev => prev + 1);
      onProjectDiscover?.(id);

      // Celebração com toast
      const achievements = [
        { threshold: 1, title: "Primeira Descoberta!", message: "Sua jornada começou! 🎉", icon: "🌟" },
        { threshold: 5, title: "Explorador Iniciante", message: "5 projetos descobertos! 🚀", icon: "🎯" },
        { threshold: 10, title: "Caçador de Tesouros", message: "10 descobertas! Você está pegando o jeito! 💎", icon: "💎" },
        { threshold: 20, title: "Mestre Explorador", message: "20 projetos! Você é um verdadeiro aventureiro! 👑", icon: "👑" },
        { threshold: 50, title: "Lenda Viva", message: "50 descobertas! Você é uma lenda! 🏆", icon: "🏆" },
      ];

      const achievement = achievements.find(a => a.threshold === discoveredProjects.size + 1);
      if (achievement) {
        setShowCelebration(true);
        toast.success(achievement.title, {
          description: achievement.message,
          duration: 4000,
        });
        setTimeout(() => setShowCelebration(false), 3000);
      }
    }
  };

  const layoutVariants = {
    masonry: 'columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6',
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6',
    stories: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        {/* Loading Hero with pulsing animation */}
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 3, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity }
            }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-2xl"
          >
            <Compass className="h-10 w-10 text-white" />
          </motion.div>
          
          <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Mapeando novos territórios...
          </h3>
          <p className="text-muted-foreground text-lg">Preparando suas próximas aventuras épicas</p>
          
          <div className="mt-6 max-w-md mx-auto">
            <Progress value={65} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">Carregando descobertas incríveis...</p>
          </div>
        </motion.div>

        {/* Loading Skeletons with stagger */}
        <div className={layoutVariants[currentLayout]}>
          {[...Array(currentLayout === 'stories' ? 6 : 8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={currentLayout === 'masonry' ? 'break-inside-avoid mb-6' : ''}
            >
              <Card className="overflow-hidden">
                <div className={`bg-gradient-to-br from-muted to-muted/50 rounded-t-lg animate-pulse ${
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
        className="text-center py-24 space-y-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-9xl filter drop-shadow-2xl"
        >
          🗺️
        </motion.div>
        
        <div className="space-y-6">
          <h3 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Território Inexplorado
          </h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Parece que você chegou em território virgem. Mas não se preocupe, 
            grandes aventuras sempre começam nos lugares mais inesperados!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
            <Link to="/projects">
              <Compass className="mr-2 h-5 w-5" />
              Explorar Outros Mundos
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="group">
            <Shuffle className="mr-2 h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
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
    rate: projects.length > 0 ? (discoveredProjects.size / projects.length) * 100 : 0,
    streak: discoveryStreak
  };

  // Gamification levels
  const getExplorerLevel = (discoveries: number) => {
    if (discoveries >= 50) return { level: "Lenda Viva", icon: "👑", color: "from-yellow-400 to-orange-500" };
    if (discoveries >= 20) return { level: "Mestre Explorador", icon: "🏆", color: "from-purple-500 to-pink-500" };
    if (discoveries >= 10) return { level: "Caçador de Tesouros", icon: "💎", color: "from-blue-500 to-cyan-500" };
    if (discoveries >= 5) return { level: "Explorador Iniciante", icon: "🎯", color: "from-green-500 to-emerald-500" };
    if (discoveries >= 1) return { level: "Primeiro Passo", icon: "🌟", color: "from-orange-500 to-red-500" };
    return { level: "Novato", icon: "🚀", color: "from-gray-500 to-gray-600" };
  };

  const explorerLevel = getExplorerLevel(discoveryStats.discovered);

  return (
    <div className="space-y-8">
      {/* Enhanced Discovery Header with Gamification */}
      <motion.div 
        className="relative p-8 bg-gradient-to-br from-primary/10 via-purple-500/10 to-primary/5 rounded-3xl border border-primary/20 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Celebration Animation */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-2xl"
                  initial={{ 
                    x: Math.random() * 100 + "%", 
                    y: "100%",
                    scale: 0,
                    rotate: 0
                  }}
                  animate={{ 
                    y: "-20%",
                    scale: [0, 1, 0],
                    rotate: 360
                  }}
                  transition={{ 
                    duration: 3,
                    delay: i * 0.1
                  }}
                >
                  ✨
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Discovery Progress */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${explorerLevel.color} shadow-lg`}>
                <span className="text-2xl">{explorerLevel.icon}</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">
                  {discoveryStats.discovered} de {discoveryStats.total} Descobertas
                </h3>
                <p className="text-muted-foreground">
                  Nível: <span className="font-semibold text-primary">{explorerLevel.level}</span>
                  {discoveryStats.streak > 0 && (
                    <span className="ml-2">• Sequência: {discoveryStats.streak} 🔥</span>
                  )}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Progresso da Expedição</span>
                <span className="font-semibold">{Math.round(discoveryStats.rate)}% completo</span>
              </div>
              <Progress value={discoveryStats.rate} className="h-3 bg-muted/50" />
              <p className="text-sm text-muted-foreground">
                Sua jornada de descoberta está {Math.round(discoveryStats.rate)}% completa
              </p>
            </div>
          </div>

          {/* Layout Controls & Quick Actions */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Layout:</span>
              <div className="flex bg-muted rounded-lg p-1">
                {[
                  { id: 'grid', icon: Grid3X3, label: 'Grade' },
                  { id: 'masonry', icon: Target, label: 'Masonry' },
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

            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1 group"
                onClick={() => {
                  const randomProject = projects[Math.floor(Math.random() * projects.length)];
                  const element = document.getElementById(`project-${randomProject.id}`);
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Shuffle className="h-4 w-4 mr-1 group-hover:rotate-180 transition-transform duration-300" />
                Aleatório
              </Button>
              <Button size="sm" variant="outline" className="flex-1" asChild>
                <Link to="/projects">
                  <Rocket className="h-4 w-4 mr-1" />
                  Ver Todos
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Projects Grid with Enhanced Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentLayout}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className={layoutVariants[currentLayout]}
        >
          {projects.map((project, index) => (
            <motion.div
              key={`${currentLayout}-${project.id}`}
              id={`project-${project.id}`}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ 
                delay: index * 0.05,
                duration: 0.4,
                ease: "easeOut"
              }}
              className={currentLayout === 'masonry' ? 'break-inside-avoid mb-6' : ''}
            >
              <ProjectCard
                project={project}
                variant={currentLayout === 'stories' ? 'featured' : 'default'}
                onDiscover={handleProjectDiscover}
                isDiscovered={discoveredProjects.has(project.id)}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Discovery Achievement Celebration */}
      <AnimatePresence>
        {discoveryStats.rate === 100 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="text-center py-16 space-y-8"
          >
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.3, 1]
              }}
              transition={{ 
                rotate: { duration: 2, ease: "easeInOut" },
                scale: { duration: 1.5, repeat: 3 }
              }}
              className="text-8xl filter drop-shadow-2xl"
            >
              🏆
            </motion.div>
            
            <div className="space-y-4">
              <h3 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                EXPLORADOR LENDÁRIO!
              </h3>
              <p className="text-2xl text-muted-foreground max-w-2xl mx-auto">
                Parabéns! Você descobriu todos os projetos desta expedição. 
                Sua sede de conhecimento é verdadeiramente inspiradora!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" className="bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-300">
                <Trophy className="mr-2 h-5 w-5 text-yellow-600" />
                Compartilhar Conquista
              </Button>
              <Button size="lg" asChild className="bg-gradient-to-r from-primary to-purple-600">
                <Link to="/projects">
                  <Crown className="mr-2 h-5 w-5" />
                  Nova Expedição
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue Exploring with Progress Motivation */}
      {projects.length > 0 && discoveryStats.rate < 100 && (
        <motion.div 
          className="text-center py-12 space-y-6 bg-gradient-to-r from-muted/30 to-muted/10 rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h4 className="text-2xl font-bold">Continue sua jornada épica!</h4>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ainda há <span className="font-bold text-primary">{discoveryStats.total - discoveryStats.discovered}</span> tesouros 
            esperando para serem descobertos. Cada projeto é uma nova aventura!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              className="group"
              onClick={() => {
                const randomProject = projects[Math.floor(Math.random() * projects.length)];
                const element = document.getElementById(`project-${randomProject.id}`);
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Eye className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              Descobrir Próximo
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/projects">
                <Zap className="mr-2 h-4 w-4" />
                Ver Todos os Territórios
              </Link>
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
