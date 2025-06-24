import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Eye, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProjectCard as ProjectCardType } from '@/types';
import { formatProjectDate } from '@/utils/projectHelpers';
import { detectLanguage } from '@/lib/languageColors';

interface ProjectCardFooterProps {
  project: ProjectCardType;
  isRevealed: boolean;
}

export const ProjectCardFooter: React.FC<ProjectCardFooterProps> = ({
  project,
  isRevealed
}) => {
  const languageConfig = detectLanguage(project);

  return (
    <div className="p-4 pt-0 space-y-3">
      {/* Linha superior com informações */}
      <div className="flex items-center justify-between text-xs">
        {/* Data */}
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          <span>{isRevealed ? formatProjectDate(project.data_modificacao) : '???'}</span>
        </div>
      </div>
      
      {/* Botão de ação */}
      <Button 
        asChild 
        size="sm" 
        className="w-full group/btn transition-all"
        style={isRevealed ? { 
          backgroundColor: languageConfig.color,
          color: languageConfig.textColor.includes('yellow-900') ? '#000' : '#fff'
        } : undefined}
        disabled={!isRevealed}
      >
        <Link to={`/projects/${project.id}`} className="flex items-center justify-center gap-2">
          <Eye className="h-4 w-4" />
          <span className="font-medium">
            {isRevealed ? 'Ver Projeto' : 'Revelar'}
          </span>
          <ArrowRight className="h-4 w-4 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 transition-all duration-200" />
        </Link>
      </Button>
    </div>
  );
};
