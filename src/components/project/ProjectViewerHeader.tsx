
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Share2 } from 'lucide-react';
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: project.titulo,
        text: project.descricao,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <motion.header 
      className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border shadow-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left section */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="hover:bg-accent"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/projects" className="hover:text-foreground transition-colors">
                Projetos
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium truncate max-w-48">
                {project.titulo}
              </span>
            </div>
          </div>

          {/* Center section */}
          <div className="flex items-center gap-3">
            {/* Language indicator */}
            <div 
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm"
              style={{ 
                backgroundColor: `${languageConfig.color}20`,
                color: languageConfig.color,
                border: `1px solid ${languageConfig.color}30`
              }}
            >
              <LanguageIcon className="h-4 w-4" />
              <span className="hidden sm:inline">{languageConfig.displayName}</span>
            </div>

            {/* Date */}
            <Badge variant="outline" className="text-xs">
              {formatDistanceToNow(new Date(project.data_modificacao), {
                addSuffix: true,
                locale: ptBR
              })}
            </Badge>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="hover:bg-accent"
            >
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline ml-2">Compartilhar</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="hover:bg-accent"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="hidden sm:inline ml-2">Abrir</span>
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};
