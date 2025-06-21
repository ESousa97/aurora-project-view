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

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  variant = 'default',
  index = 0
}) => {
  const [isRevealed, setIsRevealed] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy', { locale: ptBR });
    } catch {
      return 'Data inválida';
    }
  };

  // Criar senso de raridade e exclusividade
  const getProjectRarity = () => {
    const rarities = [
      { label: 'Comum', color: 'bg-slate-500', chance: 60 },
      { label: 'Interessante', color: 'bg-blue-500', chance: 25 },
      { label: 'Raro', color: 'bg-purple-500', chance: 10 },
      { label: 'Épico', color: 'bg-orange-500', chance: 4 },
      { label: 'Lendário', color: 'bg-yellow-500', chance: 1 },
    ];
    
    const hash = project.id.toString().split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const rarityIndex = hash % 100;
    
    let accumulated = 0;
    for (const rarity of rarities) {
      accumulated += rarity.chance;
      if (rarityIndex < accumulated) return rarity;
    }
    return rarities[0];
  };

  const rarity = getProjectRarity();
  const isRecent = new Date(project.data_modificacao) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <Card className="hover:shadow-md transition-all duration-300 border-l-4 border-l-primary group cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <Link to={`/projects/${project.id}`} className="block group">
                  <div className="flex items-center gap-2 mb-2">
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
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${rarity.color}`} />
                  <Badge variant="outline" className="text-xs">
                    {project.categoria}
                  </Badge>
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatDate(project.data_modificacao)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (variant === 'mystery') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ scale: 1.02 }}
      >
        <Card className="group hover:shadow-xl transition-all duration-500 cursor-pointer relative overflow-hidden border-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800"
              onClick={() => setIsRevealed(!isRevealed)}>
          {/* Rarity glow effect */}
          <div className={`absolute inset-0 opacity-20 bg-gradient-to-r ${rarity.color.replace('bg-', 'from-')} to-transparent`} />
          
          <div className="aspect-video relative overflow-hidden">
            {!isRevealed ? (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                <div className="text-center space-y-3">
                  <Lock className="h-8 w-8 mx-auto text-primary/50" />
                  <p className="text-sm font-medium text-primary/70">Clique para Revelar</p>
                  <Badge className={`${rarity.color} text-white border-0`}>
                    {rarity.label}
                  </Badge>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                {project.imageurl ? (
                  <img
                    src={project.imageurl}
                    alt={project.titulo}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop&crop=entropy&auto=format&q=60`;
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <div className="text-4xl font-bold text-primary/30">
                      {project.titulo.charAt(0).toUpperCase()}
                    </div>
                  </div>
                )}
                
                <div className="absolute top-2 right-2 space-y-1">
                  <Badge className={`${rarity.color} text-white border-0`}>
                    {rarity.label}
                  </Badge>
                  {isRecent && (
                    <Badge className="bg-green-500 text-white border-0 block">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Novo
                    </Badge>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          <CardContent className="p-4">
            {isRevealed ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-2">
                  {project.titulo}
                </h3>
                <p className="text-muted-foreground mt-2 line-clamp-3">
                  {project.descricao}
                </p>
              </motion.div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-4 bg-muted rounded animate-pulse flex-1" />
                  <Badge variant="outline">{project.categoria}</Badge>
                </div>
                <div className="h-3 bg-muted rounded animate-pulse w-3/4" />
                <div className="h-3 bg-muted rounded animate-pulse w-1/2" />
              </div>
            )}
          </CardContent>

          {isRevealed && (
            <CardFooter className="p-4 pt-0 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(project.data_modificacao)}</span>
              </div>
              
              <Button asChild size="sm" variant="default">
                <Link to={`/projects/${project.id}`}>
                  <Eye className="h-4 w-4 mr-2" />
                  Explorar
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardFooter>
          )}
        </Card>
      </motion.div>
    );
  }

  if (variant === 'featured') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.15 }}
        whileHover={{ y: -5 }}
      >
        <Card className="group hover:shadow-2xl transition-all duration-500 cursor-pointer relative overflow-hidden border-0 bg-gradient-to-br from-white via-white to-primary/5 dark:from-slate-900 dark:via-slate-900 dark:to-primary/10"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}>
          
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="aspect-video relative overflow-hidden">
            {project.imageurl ? (
              <img
                src={project.imageurl}
                alt={project.titulo}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop&crop=entropy&auto=format&q=60`;
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <div className="text-4xl font-bold text-primary/30">
                  {project.titulo.charAt(0).toUpperCase()}
                </div>
              </div>
            )}
            
            {/* Overlay with mystery elements */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="absolute top-2 right-2 space-y-1">
              <motion.div
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <Badge className={`${rarity.color} text-white border-0 shadow-lg`}>
                  <Target className="h-3 w-3 mr-1" />
                  {rarity.label}
                </Badge>
              </motion.div>
              {isRecent && (
                <Badge className="bg-green-500 text-white border-0 block shadow-lg">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Novo
                </Badge>
              )}
            </div>

            {/* Teaser info on hover */}
            <motion.div 
              className="absolute bottom-2 left-2 right-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.3 }}
            >
              <Badge variant="secondary" className="bg-white/90 text-slate-800 backdrop-blur">
                <Clock className="h-3 w-3 mr-1" />
                {project.conteudo ? `${Math.ceil(project.conteudo.length / 200)} min de leitura` : 'Leitura rápida'}
              </Badge>
            </motion.div>
          </div>

          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-bold text-xl group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                  {project.titulo}
                </h3>
                <Badge variant="outline" className="shrink-0">
                  {project.categoria}
                </Badge>
              </div>
              
              <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                {project.descricao.length > 120 
                  ? `${project.descricao.substring(0, 120)}...` 
                  : project.descricao}
              </p>

              {/* Mystery indicators */}
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>Ativo</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  <span>{Math.floor(Math.random() * 500) + 50} visualizações</span>
                </div>
                <div className="flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  <span>{Math.floor(Math.random() * 20) + 5} recursos</span>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-6 pt-0 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(project.data_modificacao)}</span>
            </div>
            
            <Button asChild size="sm" variant="default" className="group/btn">
              <Link to={`/projects/${project.id}`}>
                <Eye className="h-4 w-4 mr-2" />
                Descobrir
                <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    );
  }

  // Default variant - também melhorado
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -2 }}
    >
      <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
        <div className="aspect-video relative overflow-hidden rounded-t-lg">
          {project.imageurl ? (
            <img
              src={project.imageurl}
              alt={project.titulo}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop&crop=entropy&auto=format&q=60`;
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <div className="text-4xl font-bold text-primary/30">
                {project.titulo.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
          
          <div className="absolute top-2 right-2 space-y-1">
            <Badge variant="secondary" className="bg-background/90">
              {project.categoria}
            </Badge>
            {isRecent && (
              <Badge className="bg-green-500 text-white border-0 block">
                <Sparkles className="h-3 w-3 mr-1" />
                Novo
              </Badge>
            )}
          </div>

          <div className="absolute top-2 left-2">
            <div className={`w-3 h-3 rounded-full ${rarity.color} shadow-lg`} />
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
            <span>{formatDate(project.data_modificacao)}</span>
          </div>
          
          <Button asChild size="sm" variant="outline">
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
