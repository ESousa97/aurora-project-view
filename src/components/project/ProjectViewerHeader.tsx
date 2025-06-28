import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Code2 } from 'lucide-react';
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
  isLoading?: boolean;
}

export const ProjectViewerHeader: React.FC<ProjectViewerHeaderProps> = ({
  project,
  onBack,
  isLoading = false
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
      className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/40 shadow-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left section - Navigation */}
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="shrink-0 hover:bg-accent/80 transition-colors"
              disabled={isLoading}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Projetos</span>
            </Button>
            
            {/* Breadcrumb - Hidden on mobile */}
            <div className="hidden lg:flex items-center gap-3 text-sm text-muted-foreground min-w-0">
              <Link 
                to="/projects" 
                className="hover:text-foreground transition-colors font-medium shrink-0"
              >
                Portfólio
              </Link>
              <span className="text-border shrink-0">•</span>
              <span className="text-foreground font-medium truncate">
                {project.titulo}
              </span>
            </div>
          </div>

          {/* Right section - Project metadata */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language indicator */}
            <motion.div 
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 hover:scale-105"
              style={{ 
                backgroundColor: `${languageConfig.color}08`,
                borderColor: `${languageConfig.color}20`,
                color: languageConfig.color
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <LanguageIcon className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline font-semibold whitespace-nowrap">
                {languageConfig.displayName}
              </span>
            </motion.div>

            {/* Date badge */}
            <Badge 
              variant="secondary" 
              className="text-xs font-medium bg-muted/50 hover:bg-muted/70 transition-colors hidden sm:flex items-center gap-1"
            >
              <Clock className="h-3 w-3" />
              {formatDistanceToNow(new Date(project.data_modificacao), {
                addSuffix: true,
                locale: ptBR
              })}
            </Badge>
          </div>
        </div>

        {/* Mobile project title */}
        <div className="lg:hidden pb-3 pt-1">
          <h1 className="text-lg font-semibold text-foreground truncate">
            {project.titulo}
          </h1>
        </div>
      </div>
    </motion.header>
  );
};
