// src/components/project/ProjectCardFooter.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ProjectCard as ProjectCardType } from '@/types';
import { EnhancedProjectCard } from '@/types/enhanced';
import { LanguageColor, detectLanguage } from '@/lib/languageColors';

interface ProjectCardFooterProps {
  project: ProjectCardType | EnhancedProjectCard;
  isRevealed: boolean;
  enhancedLanguage?: LanguageColor;
}

export const ProjectCardFooter: React.FC<ProjectCardFooterProps> = React.memo(({
  project,
  isRevealed,
  enhancedLanguage
}) => {
  // Detect language for button styling
  const detectedLanguage = React.useMemo(() => {
    if (enhancedLanguage) return enhancedLanguage;
    if ('detectedLanguage' in project && project.detectedLanguage) return project.detectedLanguage;
    return detectLanguage(project);
  }, [project, enhancedLanguage]);

  return (
    <div className="p-4 pt-0">
      <Button
        asChild={isRevealed}
        size="sm"
        className="w-full transition-transform transform hover:scale-102 hover:shadow-lg"
        style={isRevealed
          ? {
              backgroundColor: detectedLanguage.color,
              color: detectedLanguage.textColor.includes('yellow-900') ? '#000' : '#fff',
              borderColor: detectedLanguage.color
            }
          : undefined
        }
        disabled={!isRevealed}
      >
        {isRevealed ? (
          <Link
            to={`/projects/${project.id}`}
            className="flex items-center justify-center gap-2"
          >
            <detectedLanguage.icon className="h-4 w-4" />
            <span className="font-medium">
              Ver Projeto
            </span>
            <ArrowRight className="h-4 w-4" />
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
});
