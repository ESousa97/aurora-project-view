// src/components/project/ProjectCard.tsx
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Eye, Lock, Sparkles, ArrowRight, Clock, Target } from 'lucide-react';
import { ProjectCard as ProjectCardType } from '@/types';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: ProjectCardType;
  variant?: 'default' | 'compact' | 'mystery' | 'featured';
  index?: number;
}

// INÍCIO DA NOVA LÓGICA DE CORES
const getCategoryStyle = (category?: string): string => {
  if (!category) return 'bg-slate-400'; // Cor padrão se a categoria não existir

  const colorMap: { [key: string]: string } = {
    'javascript': 'bg-yellow-400',
    'html': 'bg-orange-500',
    'css': 'bg-blue-600',
    'python': 'bg-sky-500',
    'typescript': 'bg-blue-500',
  };
  const defaultColor = 'bg-slate-400';
  
  const lowerCategory = category.toLowerCase().trim();

  // Se a categoria for combinada, cria um gradiente
  if (lowerCategory.includes('+')) {
    const parts = lowerCategory.split('+').map(p => p.trim());
    const fromColorKey = parts[0];
    const toColorKey = parts[1];

    const fromColor = colorMap[fromColorKey] ? colorMap[fromColorKey].replace('bg-', 'from-') : 'from-slate-400';
    const toColor = colorMap[toColorKey] ? colorMap[toColorKey].replace('bg-', 'to-') : 'to-slate-500';
    
    return `bg-gradient-to-r ${fromColor} ${toColor}`;
  }

  // Retorna a cor sólida para categorias únicas
  return colorMap[lowerCategory] || defaultColor;
};
// FIM DA NOVA LÓGICA DE CORES

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  variant = 'default',
  index = 0
}) => {
  const [isRevealed, setIsRevealed] = React.useState(variant !== 'mystery');
  const [isHovered, setIsHovered] = React.useState(false);

  // Chamando a nova função para obter o estilo da categoria
  const categoryStyle = getCategoryStyle(project.categoria);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy', { locale: ptBR });
    } catch {
      return 'Data inválida';
    }
  };

  const isRecent = project.data_modificacao ? new Date(project.data_modificacao) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) : false;

  if (variant === 'compact') {
    // A versão compacta não terá a bolinha, então permanece a mesma.
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <Card className="hover:shadow-md transition-all duration-300 group cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}>
          <CardContent className="p-4 flex items-center gap-3">
             {/* Adicionando a bolinha colorida também na versão compacta */}
            <div className={`w-2 h-10 rounded-full ${categoryStyle} shrink-0`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <Link to={`/projects/${project.id}`} className="block group">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm group-hover:text-primary transition-colors truncate">
                        {project.titulo}
                      </h3>
                      {isRecent && (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Novo
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {project.descricao.length > 80 
                        ? `${project.descricao.substring(0, 80)}...` 
                        : project.descricao}
                    </p>
                  </Link>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <Badge variant="outline" className="text-xs">
                    {project.categoria}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(project.data_modificacao)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }


  // O restante das variantes usarão a bolinha
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -2 }}
    >
      <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer" onClick={() => !isRevealed && setIsRevealed(true)}>
        <div className="aspect-video relative overflow-hidden rounded-t-lg">
          {isRevealed ? (
             project.imageurl ? (
              <img src={project.imageurl} alt={project.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => { (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop&crop=entropy&auto=format&q=60`; }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <div className="text-4xl font-bold text-primary/30">{project.titulo.charAt(0).toUpperCase()}</div>
              </div>
            )
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center cursor-pointer">
              <div className="text-center space-y-3">
                <Lock className="h-8 w-8 mx-auto text-primary/50" />
                <p className="text-sm font-medium text-primary/70">Clique para Revelar</p>
              </div>
            </div>
          )}
          
          <div className="absolute top-2 right-2 space-y-1">
            <Badge variant="secondary" className="bg-background/90">{project.categoria}</Badge>
            {isRecent && isRevealed && (
              <Badge className="bg-green-500 text-white border-0 block"><Sparkles className="h-3 w-3 mr-1" />Novo</Badge>
            )}
          </div>

          {/* APLICAÇÃO DA NOVA COR DA BOLINHA */}
          <div className="absolute top-2 left-2">
            <div className={`w-3 h-3 rounded-full ${categoryStyle} shadow-lg`} />
          </div>
        </div>

        <CardContent className="p-4">
          <Link to={`/projects/${project.id}`} className="block group">
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2">
              {project.titulo}
            </h3>
            <p className="text-muted-foreground mt-2 line-clamp-3">
              {project.descricao}
            </p>
          </Link>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{isRevealed ? formatDate(project.data_modificacao) : '...'}</span>
          </div>
          
          <Button asChild size="sm" variant="outline" disabled={!isRevealed}>
            <Link to={`/projects/${project.id}`}>
              <Eye className="h-4 w-4 mr-2" />
              Ver Projeto
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
