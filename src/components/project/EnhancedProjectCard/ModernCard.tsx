// src/components/project/EnhancedProjectCard/ModernCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Eye, 
  ExternalLink, 
  Code2, 
  Heart, 
  Share,
  Clock,
  Zap
} from 'lucide-react';
import { ProjectCard as ProjectType } from '@/types';
import { getCategoryColor } from '@/lib/languageColors';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ModernCardProps {
  project: ProjectType;
  variant?: 'default' | 'featured' | 'compact' | 'grid';
  index?: number;
  onClick?: () => void;
}

export const ModernCard: React.FC<ModernCardProps> = ({ 
  project, 
  variant = 'default', 
  index = 0,
  onClick 
}) => {
  const categoryConfig = getCategoryColor(project.categoria || '');
  const timeAgo = project.data_modificacao 
    ? formatDistanceToNow(new Date(project.data_modificacao), { 
        addSuffix: true, 
        locale: ptBR 
      })
    : 'Data não disponível';

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.4, 
        delay: index * 0.1
      }
    },
    hover: { 
      y: -8, 
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  const getCardClasses = () => {
    const base = "group relative overflow-hidden border border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/30 transition-all duration-300";
    
    switch (variant) {
      case 'featured':
        return `${base} h-[400px] bg-gradient-to-br from-primary/5 to-accent/5`;
      case 'compact':
        return `${base} h-[200px]`;
      case 'grid':
        return `${base} h-[350px]`;
      default:
        return `${base} h-[320px]`;
    }
  };

  const CardWrapper = ({ children }: { children: React.ReactNode }) => (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      layout
    >
      <Card className={getCardClasses()}>
        {children}
      </Card>
    </motion.div>
  );

  if (variant === 'compact') {
    return (
      <CardWrapper>
        <CardContent className="p-6 h-full flex items-center">
          <div className="flex items-center space-x-4 w-full">
            {/* Indicador de linguagem */}
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${categoryConfig?.color}20` }}
            >
              {React.createElement(categoryConfig?.icon || Code2, {
                className: "h-6 w-6",
                style: { color: categoryConfig?.color }
              })}
            </div>
            
            {/* Conteúdo */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg mb-1 truncate group-hover:text-primary transition-colors">
                {project.titulo}
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-2">
                {project.descricao}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Badge 
                  variant="secondary" 
                  className="text-xs"
                  style={{ backgroundColor: `${categoryConfig?.color}20`, color: categoryConfig?.color }}
                >
                  {project.categoria}
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {timeAgo}
                </span>
              </div>
            </div>
            
            {/* Ações */}
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button asChild size="sm" variant="outline">
                <Link to={`/projects/${project.id}`}>
                  <Eye className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </CardWrapper>
    );
  }

  return (
    <CardWrapper>
      {/* Gradiente de fundo decorativo */}
      <div 
        className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity"
        style={{ 
          background: `linear-gradient(135deg, ${categoryConfig?.color}40, ${categoryConfig?.color}10)` 
        }}
      />
      
      {/* Badge da categoria flutuante */}
      <div className="absolute top-4 right-4 z-10">
        <Badge 
          className="shadow-lg border-0"
          style={{ backgroundColor: `${categoryConfig?.color}90`, color: 'white' }}
        >
          <span className="flex items-center gap-1">
            {React.createElement(categoryConfig?.icon || Code2, { className: "h-3 w-3" })}
            {project.categoria}
          </span>
        </Badge>
      </div>

      {/* Imagem placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center opacity-60"
            style={{ backgroundColor: categoryConfig?.color }}
          >
            {React.createElement(categoryConfig?.icon || Code2, {
              className: "h-8 w-8 text-white"
            })}
          </div>
        </div>
        
        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <CardContent className="p-6 relative">
        {/* Título e descrição */}
        <div className="space-y-3 mb-4">
          <h3 className="font-bold text-xl leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {project.titulo}
          </h3>
          
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
            {project.descricao}
          </p>
        </div>

        {/* Metadados */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{timeAgo}</span>
          </div>
          
          {variant === 'featured' && (
            <div className="flex items-center gap-1">
              <Zap className="h-3 w-3 text-yellow-500" />
              <span className="text-yellow-600 font-medium">Destaque</span>
            </div>
          )}
        </div>

        {/* Ações */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button 
              asChild 
              size="sm" 
              className="group-hover:scale-105 transition-transform"
            >
              <Link to={`/projects/${project.id}`}>
                <Eye className="h-4 w-4 mr-2" />
                Ver Projeto
              </Link>
            </Button>
          </div>
          
          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <Heart className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <Share className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </CardWrapper>
  );
};