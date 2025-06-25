import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Sparkles } from 'lucide-react';
import { ProjectCard as ProjectCardType } from '@/types';
import { LanguageColor } from '@/lib/languageColors';

interface ProjectCardImageProps {
  project: ProjectCardType;
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
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-muted/50 to-muted/80">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/20 to-primary/10" />
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 h-full flex items-center justify-center p-8">
        {isRevealed ? (
          <div className="text-center space-y-4">
            <div className="text-6xl opacity-30">
              {enhancedLanguage && <enhancedLanguage.icon />}
            </div>
            <p className="text-sm text-muted-foreground font-medium">
              {project.titulo || 'Projeto'}
            </p>
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
          </motion.div>
        )}
      </div>
      
      {/* Progress indicator */}
      {viewProgress > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${viewProgress}%` }}
          />
        </div>
      )}
    </div>
  );
};
