
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Target, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/sonner';
import { EnhancedProjectCard as EnhancedProjectCardType } from '@/types/enhanced';
import { LanguageColor, LANGUAGE_COLORS } from '@/lib/languageColors';
import { ProjectCardContent } from './ProjectCardContent';
import { ProjectCardImage } from './ProjectCardImage';
import { ProjectCardFooter } from './ProjectCardFooter';
import { useProjectEngagement } from '@/hooks/useProjectEngagement';

interface EnhancedProjectCardProps {
  project: EnhancedProjectCardType | null | undefined;
  variant?: 'default' | 'compact' | 'mystery' | 'featured';
  index?: number;
  onDiscover?: (id: number) => void;
  isDiscovered?: boolean;
}

export const EnhancedProjectCard: React.FC<EnhancedProjectCardProps> = ({ 
  project, 
  variant = 'default',
  index = 0,
  onDiscover,
  isDiscovered = false
}) => {
  const [isRevealed, setIsRevealed] = React.useState(variant !== 'mystery');
  const [isHovered, setIsHovered] = React.useState(false);
  const [viewProgress, setViewProgress] = React.useState(0);

  const engagement = useProjectEngagement(project);

  // Usar a linguagem já detectada do projeto com fallback seguro
  const languageConfig: LanguageColor = React.useMemo(() => {
    if (!project?.detectedLanguage) {
      return LANGUAGE_COLORS.default;
    }
    
    // Garantir que o objeto tem todas as propriedades necessárias
    const detectedLang = project.detectedLanguage;
    return {
      name: detectedLang.name || 'default',
      displayName: detectedLang.displayName || 'Unknown',
      color: detectedLang.color || '#64748b',
      bgColor: detectedLang.bgColor || '#f1f5f9',
      textColor: detectedLang.textColor || 'text-slate-700',
      gradient: detectedLang.gradient || 'from-slate-500 to-slate-600',
      icon: detectedLang.icon || LANGUAGE_COLORS.default.icon,
      category: detectedLang.category as any || 'other',
      difficulty: detectedLang.difficulty || 1,
      popularity: detectedLang.popularity || 50,
      trending: detectedLang.trending || false,
      description: detectedLang.description || 'Tecnologia de desenvolvimento',
      keywords: detectedLang.keywords || []
    };
  }, [project]);

  // Ícone da tecnologia baseado na linguagem detectada
  const ProjectIcon = languageConfig.icon;

  // Renderização para projeto não disponível
  if (!project?.id) {
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
          description: `Você descobriu ${project.titulo}! Linguagem: ${languageConfig.displayName}`,
          duration: 3000,
        });
      }
    }
  };

  // Renderização da variante compact
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
          
          {/* Background gradient sutil */}
          <div className={`absolute inset-0 bg-gradient-to-r ${languageConfig.gradient} opacity-5`} />
          
          <CardContent className="p-4 flex items-center gap-4 relative z-10">
            {/* Ícone do projeto e indicadores */}
            <div className="flex flex-col items-center gap-2 shrink-0">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${languageConfig.gradient} shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <ProjectIcon className="w-6 h-6 text-white" />
              </div>
              
              {/* Indicador de confiança na detecção */}
              {project.languageMetadata && project.languageMetadata.confidence === 100 && (
                <div className="flex gap-0.5">
                  {[...Array(Math.min(languageConfig.difficulty, 3))].map((_, i) => (
                    <div 
                      key={`difficulty-${i}`}
                      className="w-1 h-1 rounded-full bg-current"
                      style={{ color: languageConfig.color }}
                    />
                  ))}
                </div>
              )}
            </div>
            
            {/* Conteúdo do projeto */}
            <div className="flex-1">
              <ProjectCardContent 
                project={project} 
                isRevealed={isRevealed} 
                variant="compact"
                enhancedLanguage={languageConfig}
              />
            </div>

            {/* Ícone de navegação */}
            <div className="flex items-center">
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
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

  // Renderização da variante default
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
        {/* Overlay para projetos não revelados */}
        {!isRevealed && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/20 to-primary/5 z-10" />
        )}

        {/* Imagem do projeto */}
        <div className="aspect-video relative overflow-hidden">
          <ProjectCardImage 
            project={project}
            isRevealed={isRevealed}
            viewProgress={viewProgress}
            enhancedLanguage={languageConfig}
          />
          
          {/* Ícone da tecnologia sobreposto na imagem */}
          <div className="absolute top-4 left-4 z-20">
            <div 
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${languageConfig.gradient} shadow-lg flex items-center justify-center backdrop-blur-sm`}
              style={{ backgroundColor: `${languageConfig.color}90` }}
              title={`${languageConfig.displayName} - Confiança: ${project.languageMetadata?.confidence || 100}%`}
            >
              <ProjectIcon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Conteúdo do projeto */}
        <CardContent className="flex-1 flex flex-col p-4">
          <ProjectCardContent 
            project={project} 
            isRevealed={isRevealed} 
            variant="default"
            enhancedLanguage={languageConfig}
          />
        </CardContent>

        {/* Footer do projeto */}
        <CardFooter className="p-0">
          <ProjectCardFooter 
            project={project} 
            isRevealed={isRevealed}
            enhancedLanguage={languageConfig}
          />
        </CardFooter>
      </Card>
    </motion.div>
  );
};
