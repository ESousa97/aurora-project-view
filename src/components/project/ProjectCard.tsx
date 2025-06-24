
// src/components/project/ProjectCard.tsx - Sistema de Linguagens Melhorado
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, Eye, Lock, ArrowRight, Clock, TrendingUp, 
  Award, Zap, Target, ChevronRight, Users, Activity, 
  Brain, Sparkles, Monitor, Database, Server, Globe,
  Code2, FileCode, Terminal, Cpu, Settings, Layers
} from 'lucide-react';
import { ProjectCard as ProjectCardType } from '@/types';
import { Link } from 'react-router-dom';
import { format, isWithinInterval, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';
import { detectLanguage, getCategoryColor, LANGUAGE_COLORS } from '@/lib/languageColors';
import { toast } from '@/components/ui/sonner';

interface ProjectCardProps {
  project: ProjectCardType | null | undefined;
  variant?: 'default' | 'compact' | 'mystery' | 'featured';
  index?: number;
  onDiscover?: (id: number) => void;
  isDiscovered?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  variant = 'default',
  index = 0,
  onDiscover,
  isDiscovered = false
}) => {
  const [isRevealed, setIsRevealed] = React.useState(variant !== 'mystery');
  const [isHovered, setIsHovered] = React.useState(false);
  const [viewProgress, setViewProgress] = React.useState(0);

  // Sistema de detecção de linguagens aprimorado
  const languageConfig = React.useMemo(() => {
    if (!project) return LANGUAGE_COLORS.default;
    return detectLanguage(project);
  }, [project]);

  const categoryConfig = React.useMemo(() => {
    if (!project?.categoria) return null;
    return getCategoryColor(project.categoria);
  }, [project?.categoria]);

  // Detectar múltiplas tecnologias no projeto
  const detectedTechnologies = React.useMemo(() => {
    if (!project) return [];
    
    const content = [
      project.titulo || '',
      project.descricao || '',
      project.categoria || '',
      project.conteudo || ''
    ].join(' ').toLowerCase();

    const technologies = [];
    
    // Detectar tecnologias comuns
    const techPatterns = [
      { pattern: /react/i, tech: 'react' },
      { pattern: /typescript|ts\b/i, tech: 'typescript' },
      { pattern: /javascript|js\b/i, tech: 'javascript' },
      { pattern: /python/i, tech: 'python' },
      { pattern: /java\b/i, tech: 'java' },
      { pattern: /node\.?js|nodejs/i, tech: 'node' },
      { pattern: /vue\.?js|vue\b/i, tech: 'vue' },
      { pattern: /angular/i, tech: 'angular' },
      { pattern: /next\.?js/i, tech: 'nextjs' },
      { pattern: /php/i, tech: 'php' },
      { pattern: /laravel/i, tech: 'laravel' },
      { pattern: /django/i, tech: 'django' },
      { pattern: /flask/i, tech: 'flask' },
      { pattern: /fastapi/i, tech: 'fastapi' },
      { pattern: /spring/i, tech: 'spring' },
      { pattern: /\.net|dotnet/i, tech: 'dotnet' },
      { pattern: /flutter/i, tech: 'flutter' },
      { pattern: /react.native/i, tech: 'react-native' },
      { pattern: /mongodb/i, tech: 'mongodb' },
      { pattern: /mysql/i, tech: 'mysql' },
      { pattern: /postgresql|postgres/i, tech: 'postgresql' },
      { pattern: /redis/i, tech: 'redis' },
      { pattern: /docker/i, tech: 'docker' },
      { pattern: /kubernetes|k8s/i, tech: 'kubernetes' },
      { pattern: /aws/i, tech: 'aws' },
      { pattern: /firebase/i, tech: 'firebase' }
    ];

    techPatterns.forEach(({ pattern, tech }) => {
      if (pattern.test(content) && LANGUAGE_COLORS[tech]) {
        technologies.push(LANGUAGE_COLORS[tech]);
      }
    });

    // Remover duplicatas e limitar a 3
    const uniqueTechs = technologies.filter((tech, index, self) => 
      index === self.findIndex(t => t.name === tech.name)
    ).slice(0, 3);

    return uniqueTechs;
  }, [project]);

  // Simular engajamento - versão simplificada
  const simulateEngagement = React.useMemo(() => {
    if (!project?.titulo && !project?.descricao) {
      return {
        difficulty: 1,
        trending: false,
        viewCount: 0
      };
    }
    
    const baseScore = (project.titulo?.length || 0) + (project.descricao?.length || 0);
    return {
      difficulty: languageConfig.difficulty || 1,
      trending: languageConfig.trending || false,
      viewCount: Math.floor((baseScore % 50) + 10)
    };
  }, [project, languageConfig]);

  // Verificação de segurança para projeto
  if (!project || !project.id) {
    return (
      <div className="border rounded-xl p-6 bg-muted/30 text-center">
        <div className="space-y-3">
          <div className="w-12 h-12 mx-auto bg-muted rounded-xl flex items-center justify-center">
            <Target className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground font-medium">Projeto não disponível</p>
          <p className="text-xs text-muted-foreground">Este território ainda está sendo mapeado</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Data não disponível';
    
    try {
      return format(new Date(dateString), 'dd/MM/yyyy', { locale: ptBR });
    } catch {
      return 'Data inválida';
    }
  };

  // Verifica se é recente (últimos 7 dias)
  const isRecent = project.data_modificacao ? 
    isWithinInterval(new Date(project.data_modificacao), {
      start: subDays(new Date(), 7),
      end: new Date()
    }) : false;

  // Verifica se é muito recente (últimos 2 dias) para mostrar "Novo"
  const isNew = project.data_modificacao ? 
    isWithinInterval(new Date(project.data_modificacao), {
      start: subDays(new Date(), 2),
      end: new Date()
    }) : false;

  const handleReveal = () => {
    if (!isRevealed) {
      setIsRevealed(true);
      setViewProgress(100);
      if (onDiscover && project.id) {
        onDiscover(project.id);
        toast.success("Descoberta realizada!", {
          description: `Você descobriu ${project.titulo}! +10 XP de exploração`,
          duration: 3000,
        });
      }
    }
  };

  // Determinar se é um projeto com múltiplas tecnologias
  const isMultiTech = detectedTechnologies.length > 1;

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        whileHover={{ x: 4, scale: 1.01 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <Card className="group cursor-pointer border-l-4 relative overflow-hidden transition-all duration-300 hover:shadow-lg"
              style={{ borderLeftColor: languageConfig.color }}>
          
          {/* Technology indicator gradient */}
          {isMultiTech && (
            <div className={`absolute inset-0 bg-gradient-to-r ${languageConfig.gradient} opacity-5`} />
          )}
          
          {/* Trending indicator */}
          {simulateEngagement.trending && (
            <div className="absolute top-2 right-2 z-10">
              <Badge className="bg-orange-500 text-white border-0 text-xs animate-pulse">
                <TrendingUp className="h-3 w-3 mr-1" />
                Trending
              </Badge>
            </div>
          )}
          
          <CardContent className="p-4 flex items-center gap-4 relative z-10">
            {/* Enhanced language indicator - removed icon */}
            <div className="flex flex-col items-center gap-2 shrink-0">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${languageConfig.gradient} shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                {/* Removed icon - just gradient background */}
              </div>
              
              {/* Multiple technologies indicator */}
              {isMultiTech && (
                <div className="flex gap-0.5">
                  {detectedTechnologies.slice(0, 3).map((tech, i) => (
                    <div 
                      key={tech.name}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: tech.color }}
                      title={tech.displayName}
                    />
                  ))}
                </div>
              )}
              
              {/* Complexity indicator */}
              {languageConfig.difficulty && (
                <div className="flex gap-0.5">
                  {[...Array(Math.min(languageConfig.difficulty, 3))].map((_, i) => (
                    <div 
                      key={i}
                      className="w-1 h-1 rounded-full bg-current"
                      style={{ color: languageConfig.color }}
                    />
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <Link to={`/projects/${project.id}`} className="block group">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-semibold text-sm group-hover:text-primary transition-colors truncate">
                        {project.titulo || 'Projeto sem título'}
                      </h3>
                      {isNew && (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 border-green-200 animate-pulse">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Novo
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {project.descricao && project.descricao.length > 80 
                        ? `${project.descricao.substring(0, 80)}...` 
                        : project.descricao || 'Sem descrição disponível'}
                    </p>
                  </div>
                </div>
                
                {/* Enhanced metadata with technologies */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{simulateEngagement.viewCount}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(project.data_modificacao)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    {/* Technology badges - removed icons */}
                    {isMultiTech ? (
                      <Badge 
                        variant="outline" 
                        className="text-xs border-current max-w-[100px] truncate"
                        style={{ color: languageConfig.color }}
                        title={detectedTechnologies.map(t => t.displayName).join(', ')}
                      >
                        Multi-Tech
                      </Badge>
                    ) : (
                      <Badge 
                        variant="outline" 
                        className="text-xs border-current max-w-[120px] truncate"
                        style={{ color: languageConfig.color }}
                        title={languageConfig.displayName}
                      >
                        {languageConfig.displayName}
                      </Badge>
                    )}
                    
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Technology stack preview for multi-tech - removed icons */}
                {isMultiTech && detectedTechnologies.length > 1 && (
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {detectedTechnologies.slice(0, 3).map((tech) => (
                      <Badge 
                        key={tech.name}
                        variant="outline"
                        className="text-xs px-1.5 py-0.5"
                        style={{ 
                          color: tech.color, 
                          borderColor: tech.color + '40',
                          backgroundColor: tech.color + '10'
                        }}
                        title={tech.description}
                      >
                        {tech.displayName}
                      </Badge>
                    ))}
                  </div>
                )}
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="h-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card 
        className="group hover:shadow-2xl transition-all duration-500 cursor-pointer h-full flex flex-col relative overflow-hidden border-0 shadow-lg" 
        onClick={handleReveal}
        style={{
          background: isRevealed 
            ? `linear-gradient(135deg, ${languageConfig.color}05 0%, transparent 50%)`
            : 'linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--background)) 100%)'
        }}
      >
        {/* Mystery overlay */}
        {!isRevealed && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/20 to-primary/5 z-10" />
        )}

        {/* Trending ribbon */}
        {isRevealed && simulateEngagement.trending && (
          <div className="absolute top-0 right-0 z-20">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 transform rotate-12 translate-x-2 -translate-y-2 shadow-lg">
              <TrendingUp className="h-3 w-3 mr-1 inline" />
              HOT
            </div>
          </div>
        )}

        {/* Enhanced project image/tech visualization */}
        <div className="aspect-video relative overflow-hidden">
          {isRevealed ? (
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
                  
                  {/* Tech overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${languageConfig.gradient} opacity-20`} />
                </div>
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${languageConfig.gradient} flex items-center justify-center relative overflow-hidden`}>
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_25%_25%,_white_2px,_transparent_2px)] bg-[length:24px_24px] animate-pulse" />
                  </div>
                  
                  <div className="text-center z-10">
                    {/* Removed main technology icon */}
                    <div className="w-16 h-16 bg-white/20 rounded-2xl mb-4 mx-auto flex items-center justify-center">
                      <Code2 className="w-8 h-8 text-white/90" />
                    </div>
                    {isMultiTech && (
                      <div className="flex justify-center gap-1 mb-2">
                        {/* Removed individual tech icons */}
                        {detectedTechnologies.slice(0, 3).map((tech, i) => (
                          <div 
                            key={tech.name}
                            className="w-6 h-6 bg-white/40 rounded-lg"
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
              
              {/* Enhanced badges */}
              <div className="absolute top-3 left-3 flex gap-2">
                {isNew && (
                  <Badge className="bg-green-500 text-white border-0 shadow-lg animate-pulse">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Novo
                  </Badge>
                )}
                
                {languageConfig.difficulty >= 4 && (
                  <Badge className="bg-red-500 text-white border-0 shadow-lg">
                    <Brain className="h-3 w-3 mr-1" />
                    Expert
                  </Badge>
                )}
              </div>

              {/* Main tech badge - removed icon */}
              <div className="absolute top-3 right-3">
                <Badge 
                  className="shadow-lg border-0 max-w-[140px] truncate backdrop-blur-sm"
                  style={{ 
                    backgroundColor: `${languageConfig.color}E6`,
                    color: languageConfig.textColor.includes('yellow-900') ? '#000' : '#fff'
                  }}
                  title={isMultiTech ? detectedTechnologies.map(t => t.displayName).join(', ') : languageConfig.displayName}
                >
                  {isMultiTech ? 'Multi-Tech' : project.categoria}
                </Badge>
              </div>

              {/* Technologies indicator - removed icons */}
              <div className="absolute bottom-3 left-3 flex items-center gap-2">                
                <Badge className="text-xs bg-black/30 text-white border-0 flex items-center gap-1">
                  <Code2 className="h-3 w-3" />
                  {isMultiTech ? `${detectedTechnologies.length} Techs` : languageConfig.category}
                </Badge>
                
                {/* Additional tech indicators - removed icons */}
                {isMultiTech && detectedTechnologies.length > 0 && (
                  <div className="flex gap-1">
                    {detectedTechnologies.slice(0, 3).map((tech) => (
                      <div
                        key={tech.name}
                        className="w-4 h-4 rounded-full shadow-sm"
                        style={{ backgroundColor: tech.color }}
                        title={tech.displayName}
                      />
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center cursor-pointer relative overflow-hidden">
              {/* Mystery pattern */}
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
                
                {/* Mystery progress */}
                <div className="w-24 mx-auto">
                  <Progress value={viewProgress} className="h-1" />
                </div>
              </div>
            </div>
          )}
        </div>

        <CardContent className="p-6 flex-1 flex flex-col relative z-10">
          <Link to={`/projects/${project.id}`} className="block group flex-1">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                {isRevealed ? (project.titulo || 'Projeto sem título') : 'Projeto Misterioso'}
              </h3>
              
              {isRevealed && (
                <div className="flex items-center gap-1 ml-2 shrink-0">
                  <div className="text-xs text-muted-foreground">{simulateEngagement.viewCount}</div>
                  <Eye className="h-3 w-3 text-muted-foreground" />
                </div>
              )}
            </div>
            
            <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed mb-4">
              {isRevealed 
                ? (project.descricao || 'Sem descrição disponível')
                : 'Este projeto esconde tecnologias interessantes esperando para serem descobertas. Clique para revelar as linguagens, frameworks e ferramentas utilizadas.'
              }
            </p>

            {/* Enhanced engagement metrics */}
            {isRevealed && (
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>Visualizações: {simulateEngagement.viewCount}</span>
                </div>
                {isRecent && (
                  <Badge variant="outline" className="text-xs border-green-500 text-green-600">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Atualizado
                  </Badge>
                )}
                {languageConfig.trending && (
                  <Badge variant="outline" className="text-xs border-orange-500 text-orange-600">
                    <Zap className="h-3 w-3 mr-1" />
                    Trending
                  </Badge>
                )}
              </div>
            )}
          </Link>

          {/* Technology tags for multi-tech projects - removed icons */}
          {isRevealed && isMultiTech && detectedTechnologies.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-1">
              {detectedTechnologies.slice(0, 4).map((tech) => (
                <Badge 
                  key={tech.name}
                  variant="outline"
                  className="text-xs px-2 py-1 border-current"
                  style={{ color: tech.color }}
                  title={tech.description}
                >
                  {tech.displayName}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>

        <CardFooter className="p-6 pt-0 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{isRevealed ? formatDate(project.data_modificacao) : '???'}</span>
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
        </CardFooter>
      </Card>
    </motion.div>
  );
};
