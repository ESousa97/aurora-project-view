// src/components/project/ProjectCardImage.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Sparkles, HelpCircle } from 'lucide-react';
import { ProjectCard as ProjectCardType } from '@/types';
import { EnhancedProjectCard } from '@/types/enhanced';
import { LanguageColor, detectLanguage } from '@/lib/languageColors';

interface ProjectCardImageProps {
  project: ProjectCardType | EnhancedProjectCard;
  isRevealed: boolean;
  viewProgress: number;
  enhancedLanguage?: LanguageColor;
}

export const ProjectCardImage: React.FC<ProjectCardImageProps> = ({
  project,
  isRevealed,
  viewProgress,
  enhancedLanguage
}) => {
  // SINCRONIZAÇÃO: Usar a linguagem passada ou detectar de forma consistente
  const detectedLanguage = React.useMemo(() => {
    if (enhancedLanguage) {
      return enhancedLanguage;
    }

    // Se é um EnhancedProjectCard, usar a linguagem já detectada
    if ('detectedLanguage' in project && project.detectedLanguage) {
      return project.detectedLanguage;
    }

    // Senão, detectar usando a função padrão
    return detectLanguage(project);
  }, [project, enhancedLanguage]);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-muted/50 to-muted/80">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className={`absolute inset-0 bg-gradient-to-br ${
          isRevealed 
            ? `${detectedLanguage.gradient} opacity-30` 
            : 'from-primary/20 via-purple-500/20 to-primary/10'
        }`} />
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 h-full flex items-center justify-center p-8">
        {isRevealed ? (
          <div className="text-center space-y-4">
            {/* SINCRONIZAÇÃO: Usar o ícone da linguagem detectada */}
            <div className="text-6xl opacity-30">
              {React.createElement(detectedLanguage.icon, { 
                className: "w-16 h-16 mx-auto",
                style: { color: detectedLanguage.color }
              })}
            </div>
            <p className="text-sm text-muted-foreground font-medium">
              {project.titulo || 'Projeto'}
            </p>
            {/* Indicador da tecnologia */}
            <div 
              className="text-xs font-medium px-2 py-1 rounded-full inline-block"
              style={{ 
                backgroundColor: `${detectedLanguage.color}20`,
                color: detectedLanguage.color 
              }}
            >
              {detectedLanguage.displayName}
            </div>
          </div>
        ) : (
          <motion.div
            className="text-center space-y-4"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="text-4xl">🔍</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Eye className="h-3 w-3" />
              <span>Clique para revelar</span>
            </div>
            {/* Indicador de mistério */}
            <div className="flex items-center justify-center gap-1">
              <HelpCircle className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Tecnologia oculta</span>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Progress indicator */}
      {viewProgress > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
          <div 
            className={`h-full transition-all duration-300 ${
              isRevealed 
                ? 'bg-gradient-to-r ' + detectedLanguage.gradient
                : 'bg-primary'
            }`}
            style={{ width: `${viewProgress}%` }}
          />
        </div>
      )}
    </div>
  );
};
