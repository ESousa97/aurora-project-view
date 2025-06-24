
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Eye, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProjectCard as ProjectCardType } from '@/types';
import { formatProjectDate, detectProjectTechnologies } from '@/utils/projectHelpers';
import { detectLanguage } from '@/lib/languageColors';

interface ProjectCardFooterProps {
  project: ProjectCardType;
  isRevealed: boolean;
}

export const ProjectCardFooter: React.FC<ProjectCardFooterProps> = ({
  project,
  isRevealed
}) => {
  const detectedTechnologies = detectProjectTechnologies(project);
  const languageConfig = detectLanguage(project);
  const isMultiTech = detectedTechnologies.length > 1;

  return (
    <div className="p-6 pt-0 flex items-center justify-between relative z-10">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Calendar className="h-4 w-4" />
        <span>{isRevealed ? formatProjectDate(project.data_modificacao) : '???'}</span>
      </div>
      
      <Button 
        asChild 
        size="sm" 
        className="group/btn"
        style={isRevealed ? { 
          backgroundColor: languageConfig.color,
          color: languageConfig.textColor.includes('yellow-900') ? '#000' : '#fff'
        } : undefined}
        disabled={!isRevealed}
      >
        <Link to={`/projects/${project.id}`}>
          <Eye className="h-4 w-4 mr-2" />
          {isRevealed ? (isMultiTech ? 'Explorar Tecnologias' : 'Ver Projeto') : 'Revelar'}
          <ArrowRight className="h-4 w-4 ml-1 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
        </Link>
      </Button>
    </div>
  );
};
