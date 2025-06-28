import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { HelpCircle } from 'lucide-react';
import { EnhancedProjectCard } from '@/types/enhanced';
import type { ProjectCard as ProjectCardType } from '@/types';
import { detectLanguage, LanguageColor } from '@/lib/languageColors';
import { ProjectCardEngagement } from './ProjectCardEngagement';
import { useProjectEngagement } from '@/hooks/useProjectEngagement';
import { motion } from 'framer-motion';

interface ProjectCardContentProps {
  project: ProjectCardType | EnhancedProjectCard;
  isRevealed: boolean;
  variant?: 'default' | 'compact';
  enhancedLanguage?: LanguageColor;
}

// Tamanho padrão para todos os cards
const CARD_HEIGHT = 'h-48';

export const ProjectCardContent: React.FC<ProjectCardContentProps> = React.memo(
  ({ project, isRevealed, variant = 'default', enhancedLanguage }) => {
    // Language detection memoizado
    const detected = useMemo<LanguageColor>(() => {
      if (enhancedLanguage) return enhancedLanguage;
      if ('detectedLanguage' in project && project.detectedLanguage) return project.detectedLanguage;
      return detectLanguage(project);
    }, [project, enhancedLanguage]);

    // Hook de engajamento (prova social)
    useProjectEngagement(project);

    // Title e descrição
    const title = useMemo(
      () => (isRevealed ? project.titulo || 'Projeto sem título' : 'Projeto Misterioso'),
      [isRevealed, project.titulo]
    );

    const description = useMemo(() => {
      if (!isRevealed) {
        return variant === 'compact'
          ? 'Clique para descobrir tecnologias...'
          : 'Techs ocultas aguardam sua curiosidade. Clique para revelar!';
      }
      const desc = project.descricao || 'Sem descrição disponível';
      return variant === 'compact' && desc.length > 75 ? desc.slice(0, 75) + '...' : desc;
    }, [isRevealed, project.descricao, variant]);

    // Badge de linguagem MELHORADO com gradiente
    const languageBadge = useMemo(() => {
      const baseClasses = variant === 'compact' ? 'text-[10px] px-1 py-0.5 h-5' : 'text-xs px-2 py-1 h-7 font-medium';
      const isMultiLanguage = detected.name === 'combined' || detected.displayName.includes('+');

      if (!isRevealed) {
        return (
          <Badge variant="outline" className={`${baseClasses} border-dashed`}>
            <HelpCircle className="h-3 w-3 mr-1" />???
          </Badge>
        );
      }

      // NOVO: Badge com gradiente para múltiplas linguagens
      if (isMultiLanguage) {
        return (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`inline-flex items-center gap-1.5 ${baseClasses} rounded-full text-white bg-gradient-to-r ${detected.gradient} shadow-sm`}
            title={`${detected.description}${variant === 'compact' ? '' : ` | Categoria: ${detected.category} | Dificuldade: ${detected.difficulty}/5`}`}
          >
            <detected.icon className={`${variant === 'compact' ? 'h-3 w-3' : 'h-4 w-4'} flex-shrink-0`} />
            <span className="truncate">{detected.displayName}</span>
          </motion.div>
        );
      }

      // Badge normal para linguagem única
      return (
        <Badge
          variant="outline"
          className={baseClasses}
          style={{ 
            color: detected.color, 
            borderColor: detected.color + '40', 
            backgroundColor: detected.color + (variant === 'compact' ? '08' : '10') 
          }}
          title={`${detected.description}${variant === 'compact' ? '' : ` | Categoria: ${detected.category} | Dificuldade: ${detected.difficulty}/5`}`}
        >
          <detected.icon className={`mr-1 ${variant === 'compact' ? 'h-3 w-3' : 'h-4 w-4'}`} />
          {detected.displayName}
        </Badge>
      );
    }, [detected, isRevealed, variant]);

    // Motion variants
    const containerMotion = { hover: { scale: 1.01 } };

    // Conteúdo
    const Content = (
      <motion.div
        whileHover="hover"
        variants={containerMotion}
        className={`group flex flex-col justify-between p-2 ${CARD_HEIGHT}`}
      >
        <div>
          <h3 className={`font-semibold ${variant === 'compact' ? 'text-sm' : 'text-base'} truncate group-hover:text-primary transition-colors`}>
            {title}
          </h3>
          <p className={`${variant === 'compact' ? 'text-xs' : 'text-sm'} text-muted-foreground mt-1 line-clamp-${variant === 'compact' ? '2' : '3'}`}>
            {description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-wrap gap-1">{languageBadge}</div>
          {isRevealed && <ProjectCardEngagement project={project} variant={variant} />}
        </div>
      </motion.div>
    );

    // Render por variante, mantendo CARD_HEIGHT
    return variant === 'compact' ? (
      <Link to={`/projects/${project.id}`} className={`block ${CARD_HEIGHT}`}>
        {Content}
      </Link>
    ) : (
      <div className={`flex-1 relative z-10 ${CARD_HEIGHT}`}>        
        <Link to={`/projects/${project.id}`} className="block h-full">
          {Content}
        </Link>
      </div>
    );
  }
);
