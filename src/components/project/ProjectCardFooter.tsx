// src/components/project/ProjectCardFooter.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Eye, ArrowRight, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProjectCard as ProjectCardType } from '@/types';
import { EnhancedProjectCard } from '@/types/enhanced';
import { LanguageColor, detectLanguage } from '@/lib/languageColors';
import { formatProjectDate } from '@/utils/projectHelpers';

interface ProjectCardFooterProps {
  project: ProjectCardType | EnhancedProjectCard;
  isRevealed: boolean;
  enhancedLanguage?: LanguageColor;
}

export const ProjectCardFooter: React.FC<ProjectCardFooterProps> = ({
  project,
  isRevealed,
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
    <div className="p-4 pt-0 space-y-3">
      {/* Linha superior com informações */}
      <div className="flex items-center justify-between text-xs">
        {/* Data */}
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          <span>{isRevealed ? formatProjectDate(project.data_modificacao) : '???'}</span>
        </div>
        
        {/* Indicador de tecnologia (só se revelado) */}
        {isRevealed && (
          <div className="flex items-center gap-1.5 text-xs">
            <detectedLanguage.icon className="h-3 w-3" style={{ color: detectedLanguage.color }} />
            <span style={{ color: detectedLanguage.color }} className="font-medium">
              {detectedLanguage.displayName}
            </span>
          </div>
        )}
      </div>
      
      {/* Botão de ação */}
      <Button 
        asChild={isRevealed}
        size="sm" 
        className="w-full group/btn transition-all"
        style={isRevealed ? { 
          backgroundColor: detectedLanguage.color,
          color: detectedLanguage.textColor.includes('yellow-900') ? '#000' : '#fff',
          borderColor: detectedLanguage.color
        } : {
          backgroundColor: 'hsl(var(--muted))',
          color: 'hsl(var(--muted-foreground))',
          cursor: 'pointer'
        }}
        disabled={!isRevealed}
        onClick={!isRevealed ? undefined : undefined}
      >
        {isRevealed ? (
          <Link to={`/projects/${project.id}`} className="flex items-center justify-center gap-2">
            <detectedLanguage.icon className="h-4 w-4" />
            <span className="font-medium">Ver Projeto</span>
            <ArrowRight className="h-4 w-4 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 transition-all duration-200" />
          </Link>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <HelpCircle className="h-4 w-4" />
            <span className="font-medium">Revelar</span>
          </div>
        )}
      </Button>
    </div>
  );
};
