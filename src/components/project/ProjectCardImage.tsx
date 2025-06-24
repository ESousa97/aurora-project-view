
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Lock, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { ProjectCard as ProjectCardType } from '@/types';
import { ProjectCardBadges } from './ProjectCardBadges';
import { detectLanguage } from '@/lib/languageColors';
import { detectProjectTechnologies } from '@/utils/projectHelpers';
import { useProjectEngagement } from '@/hooks/useProjectEngagement';

interface ProjectCardImageProps {
  project: ProjectCardType;
  isRevealed: boolean;
  viewProgress: number;
  trending?: boolean;
}

export const ProjectCardImage: React.FC<ProjectCardImageProps> = ({
  project,
  isRevealed,
  viewProgress,
  trending = false
}) => {
  const languageConfig = detectLanguage(project);
  const detectedTechnologies = detectProjectTechnologies(project);
  const engagement = useProjectEngagement(project);
  const isMultiTech = detectedTechnologies.length > 1;

  if (!isRevealed) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center cursor-pointer relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_hsl(var(--primary))_1px,_transparent_1px)] bg-[length:20px_20px] animate-pulse" />
        </div>
        
        <div className="text-center space-y-4 z-10">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Lock className="h-12 w-12 mx-auto text-primary/70" />
          </motion.div>
          <div>
            <p className="text-sm font-medium text-primary/70 mb-1">Território Misterioso</p>
            <p className="text-xs text-primary/50">Clique para revelar as tecnologias</p>
          </div>
          
          <div className="w-24 mx-auto">
            <Progress value={viewProgress} className="h-1" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {project.imageurl ? (
        <div className="relative w-full h-full">
          <img 
            src={project.imageurl} 
            alt={project.titulo || 'Projeto'} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            onError={(e) => { 
              (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop&crop=entropy&auto=format&q=60`; 
            }}
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${languageConfig.gradient} opacity-20`} />
        </div>
      ) : (
        <div className={`w-full h-full bg-gradient-to-br ${languageConfig.gradient} flex items-center justify-center relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_25%_25%,_white_2px,_transparent_2px)] bg-[length:24px_24px] animate-pulse" />
          </div>
          
          <div className="text-center z-10">
            <Code2 className="w-16 h-16 text-white/90 mb-4 mx-auto" />
            {isMultiTech && (
              <div className="flex justify-center gap-1 mb-2">
                {detectedTechnologies.slice(0, 3).map((tech, i) => (
                  <tech.icon 
                    key={tech.name}
                    className="w-6 h-6 text-white/60"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            )}
            <span className="text-xs text-white/80 font-medium bg-black/20 px-3 py-1 rounded-full">
              {isMultiTech ? `${detectedTechnologies.length} Tecnologias` : languageConfig.displayName}
            </span>
          </div>
        </div>
      )}
      
      {/* Badges positioned over image */}
      <div className="absolute top-3 left-3 flex gap-2">
        <ProjectCardBadges 
          project={project} 
          isRevealed={isRevealed} 
          trending={trending}
        />
      </div>

      <div className="absolute top-3 right-3">
        <ProjectCardBadges 
          project={project} 
          isRevealed={isRevealed} 
          variant="compact"
        />
      </div>

      <div className="absolute bottom-3 left-3 flex items-center gap-2">                
        <Badge className="text-xs bg-black/30 text-white border-0 flex items-center gap-1">
          <Code2 className="h-3 w-3" />
          {isMultiTech ? `${detectedTechnologies.length} Techs` : languageConfig.category}
        </Badge>
        
        {isMultiTech && detectedTechnologies.length > 0 && (
          <div className="flex gap-1">
            {detectedTechnologies.slice(0, 3).map((tech) => (
              <div
                key={tech.name}
                className="w-4 h-4 rounded-full shadow-sm flex items-center justify-center"
                style={{ backgroundColor: tech.color }}
                title={tech.displayName}
              >
                <tech.icon className="h-2.5 w-2.5 text-white" />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
