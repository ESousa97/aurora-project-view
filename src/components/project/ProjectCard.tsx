
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Target, ChevronRight } from 'lucide-react';
import { ProjectCard as ProjectCardType } from '@/types';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { detectLanguage } from '@/lib/languageColors';
import { toast } from '@/components/ui/sonner';
import { ProjectCardContent } from './ProjectCardContent';
import { ProjectCardImage } from './ProjectCardImage';
import { ProjectCardFooter } from './ProjectCardFooter';
import { ProjectCardBadges } from './ProjectCardBadges';
import { useProjectEngagement } from '@/hooks/useProjectEngagement';
import { detectProjectTechnologies } from '@/utils/projectHelpers';

interface ProjectCardProps {
  project: ProjectCardType | null | undefined;
  variant?: 'default' | 'compact' | 'mystery' | 'featured';
  index?: number;
  onDiscover?: (id: number) => void;
  isDiscovered?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  variant = 'default',
  index = 0,
  onDiscover,
  isDiscovered = false
}) => {
  const [isRevealed, setIsRevealed] = React.useState(variant !== 'mystery');
  const [isHovered, setIsHovered] = React.useState(false);
  const [viewProgress, setViewProgress] = React.useState(0);

  const languageConfig = React.useMemo(() => {
    if (!project) return { 
      color: '#6B7280', 
      gradient: 'from-gray-400 to-gray-600', 
      textColor: 'text-white',
      category: 'Unknown',
      difficulty: 1
    };
    const config = detectLanguage(project);
    return {
      ...config,
      category: (config as any).category || project.categoria || 'Web',
      difficulty: (config as any).difficulty || 1
    };
  }, [project]);

  const detectedTechnologies = detectProjectTechnologies(project);
  const engagement = useProjectEngagement(project);
  const isMultiTech = detectedTechnologies.length > 1;

  if (!project || !project.id) {
    return (
      <div className="border rounded-xl p-6 bg-muted/30 text-center">
        <div className="space-y-3">
          <div className="w-12 h-12 mx-auto bg-muted rounded-xl flex items-center justify-center">
            <Target className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground font-medium">Projeto não disponível</p>
          <p className="text-xs text-muted-foreground">Este território ainda está sendo mapeado</p>
        </div>
      </div>
    );
  }

  const handleReveal = () => {
    if (!isRevealed) {
      setIsRevealed(true);
      setViewProgress(100);
      if (onDiscover && project.id) {
        onDiscover(project.id);
        toast.success("Descoberta realizada!", {
          description: `Você descobriu ${project.titulo}! +10 XP de exploração`,
          duration: 3000,
        });
      }
    }
  };

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        whileHover={{ x: 4, scale: 1.01 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <Card className="group cursor-pointer border-l-4 relative overflow-hidden transition-all duration-300 hover:shadow-lg"
              style={{ borderLeftColor: languageConfig.color }}>
          
          {isMultiTech && (
            <div className={`absolute inset-0 bg-gradient-to-r ${languageConfig.gradient} opacity-5`} />
          )}
          
          {engagement.trending && (
            <div className="absolute top-2 right-2 z-10">
              <ProjectCardBadges 
                project={project} 
                isRevealed={isRevealed} 
                variant="compact"
                trending={engagement.trending}
              />
            </div>
          )}
          
          <CardContent className="p-4 flex items-center gap-4 relative z-10">
            <div className="flex flex-col items-center gap-2 shrink-0">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${languageConfig.gradient} shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <span className="text-2xl">{languageConfig.category === 'Frontend' ? '🎨' : languageConfig.category === 'Backend' ? '⚙️' : '💻'}</span>
              </div>
              
              {isMultiTech && (
                <div className="flex gap-0.5">
                  {detectedTechnologies.slice(0, 3).map((tech, i) => (
                    <div 
                      key={tech.name}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: tech.color }}
                      title={tech.displayName}
                    />
                  ))}
                </div>
              )}
              
              {languageConfig.difficulty && (
                <div className="flex gap-0.5">
                  {[...Array(Math.min(languageConfig.difficulty, 3))].map((_, i) => (
                    <div 
                      key={i}
                      className="w-1 h-1 rounded-full bg-current"
                      style={{ color: languageConfig.color }}
                    />
                  ))}
                </div>
              )}
            </div>
            
            <ProjectCardContent 
              project={project} 
              isRevealed={isRevealed} 
              variant="compact" 
            />

            <div className="flex items-center gap-1">
              <ProjectCardBadges 
                project={project} 
                isRevealed={isRevealed} 
                variant="compact"
              />
              
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="h-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card 
        className="group hover:shadow-2xl transition-all duration-500 cursor-pointer h-full flex flex-col relative overflow-hidden border-0 shadow-lg" 
        onClick={handleReveal}
        style={{
          background: isRevealed 
            ? `linear-gradient(135deg, ${languageConfig.color}05 0%, transparent 50%)`
            : 'linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--background)) 100%)'
        }}
      >
        {!isRevealed && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/20 to-primary/5 z-10" />
        )}

        {isRevealed && engagement.trending && (
          <div className="absolute top-0 right-0 z-20">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 transform rotate-12 translate-x-2 -translate-y-2 shadow-lg">
              <span className="mr-1">🔥</span>
              HOT
            </div>
          </div>
        )}

        <div className="aspect-video relative overflow-hidden">
          <ProjectCardImage 
            project={project}
            isRevealed={isRevealed}
            viewProgress={viewProgress}
            trending={engagement.trending}
          />
        </div>

        <CardContent className="flex-1 flex flex-col">
          <ProjectCardContent 
            project={project} 
            isRevealed={isRevealed} 
            variant="default" 
          />
        </CardContent>

        <CardFooter className="p-0">
          <ProjectCardFooter 
            project={project} 
            isRevealed={isRevealed} 
          />
        </CardFooter>
      </Card>
    </motion.div>
  );
};
