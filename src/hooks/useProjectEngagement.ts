
import React from 'react';
import { ProjectCard as ProjectCardType } from '@/types';
import { detectLanguage } from '@/lib/languageColors';

export const useProjectEngagement = (project: ProjectCardType | null | undefined) => {
  return React.useMemo(() => {
    if (!project?.titulo && !project?.descricao) {
      return {
        difficulty: 1,
        trending: false,
        viewCount: 0
      };
    }
    
    const baseScore = (project.titulo?.length || 0) + (project.descricao?.length || 0);
    const languageConfig = detectLanguage(project);
    
    return {
      difficulty: languageConfig.difficulty || 1,
      trending: languageConfig.trending || false,
      viewCount: Math.floor((baseScore % 50) + 10)
    };
  }, [project]);
};
