
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ProjectCard as ProjectCardType } from '@/types';
import { detectLanguage } from '@/lib/languageColors';
import { Link, useNavigate } from 'react-router-dom';

interface ProjectViewerHeaderProps {
  project: ProjectCardType;
  onBack?: () => void;
}

export const ProjectViewerHeader: React.FC<ProjectViewerHeaderProps> = ({
  project,
  onBack
}) => {
  const navigate = useNavigate();
  const languageConfig = detectLanguage(project);
  const LanguageIcon = languageConfig.icon;

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/projects');
    }
  };

  return (
    <motion.header 
      className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left section - Back button */}
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="hover:bg-accent/80 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Projetos
            </Button>
            
            <div className="hidden md:flex items-center gap-3 text-sm text-muted-foreground">
              <Link to="/projects" className="hover:text-foreground transition-colors font-medium">
                Portfólio
              </Link>
              <span className="text-border">•</span>
              <span className="text-foreground font-medium truncate max-w-64">
                {project.titulo}
              </span>
            </div>
          </div>

          {/* Right section - Project info */}
          <div className="flex items-center gap-4">
            {/* Language indicator */}
            <div 
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-200"
              style={{ 
                backgroundColor: `${languageConfig.color}08`,
                borderColor: `${languageConfig.color}20`,
                color: languageConfig.color
              }}
            >
              <LanguageIcon className="h-4 w-4" />
              <span className="hidden sm:inline font-semibold">{languageConfig.displayName}</span>
            </div>

            {/* Date */}
            <Badge variant="secondary" className="text-xs font-medium bg-muted/50">
              {formatDistanceToNow(new Date(project.data_modificacao), {
                addSuffix: true,
                locale: ptBR
              })}
            </Badge>
          </div>
        </div>
      </div>
    </motion.header>
  );
};
