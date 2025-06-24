// src/components/project/ProjectCard.tsx
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Target, ChevronRight } from 'lucide-react';
import { ProjectCard as ProjectCardType } from '@/types';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { detectLanguage } from '@/lib/languageColors';
import { toast } from '@/components/ui/sonner';
import { ProjectCardContent } from './ProjectCardContent';
import { ProjectCardImage } from './ProjectCardImage';
import { ProjectCardFooter } from './ProjectCardFooter';
import { useProjectEngagement } from '@/hooks/useProjectEngagement';
import { detectProjectTechnologies } from '@/utils/projectHelpers';

// Simple Icons imports
import { 
  SiJavascript, SiTypescript, SiReact, SiVuedotjs, SiAngular, SiNodedotjs, SiNextdotjs,
  SiNuxtdotjs, SiSvelte, SiSolid, SiHtml5, SiCss3, SiSass, SiTailwindcss,
  SiPython, SiDjango, SiFastapi, SiSharp, SiDotnet, SiPhp, SiLaravel,
  SiGo, SiRust, SiSwift, SiKotlin, SiFlutter, SiDart, SiPostgresql,
  SiMysql, SiMongodb, SiRedis, SiFirebase, SiSupabase, SiDocker,
  SiKubernetes, SiAmazonwebservices, SiGooglecloud, SiJest, SiCypress,
  SiSolidity, SiEthereum, SiTensorflow, SiPytorch
} from 'react-icons/si';

import { 
  FaDatabase, FaServer, FaCode, FaMobile, FaDesktop, FaCloud, 
  FaCogs, FaShieldAlt, FaRocket, FaLightbulb, FaGem, FaBolt,
  FaLayerGroup, FaNetworkWired, FaChartBar, FaSearch, FaPalette,
  FaBrain, FaRobot, FaInfinity, FaAtom, FaProjectDiagram,
  FaTools, FaFlask, FaMagic, FaCubes, FaGamepad, FaVrCardboard,
  FaLink, FaCoins, FaLock, FaEye, FaFingerprint, FaUserShield,
  FaJava, FaCoffee, FaTerminal, FaCodeBranch, FaFileCode
} from 'react-icons/fa';

interface ProjectCardProps {
  project: ProjectCardType | null | undefined;
  variant?: 'default' | 'compact' | 'mystery' | 'featured';
  index?: number;
  onDiscover?: (id: number) => void;
  isDiscovered?: boolean;
}

// Mapping de tecnologias para ícones
const getTechnologyIcon = (technology: string, category?: string) => {
  const tech = technology.toLowerCase();
  const cat = category?.toLowerCase();

  // Mapeamento específico de tecnologias
  const techIconMap: Record<string, React.ComponentType> = {
    'javascript': SiJavascript,
    'typescript': SiTypescript,
    'react': SiReact,
    'vue': SiVuedotjs,
    'vuejs': SiVuedotjs,
    'angular': SiAngular,
    'node': SiNodedotjs,
    'nodejs': SiNodedotjs,
    'next': SiNextdotjs,
    'nextjs': SiNextdotjs,
    'nuxt': SiNuxtdotjs,
    'nuxtjs': SiNuxtdotjs,
    'svelte': SiSvelte,
    'solid': SiSolid,
    'html': SiHtml5,
    'html5': SiHtml5,
    'css': SiCss3,
    'css3': SiCss3,
    'sass': SiSass,
    'scss': SiSass,
    'tailwind': SiTailwindcss,
    'tailwindcss': SiTailwindcss,
    'python': SiPython,
    'django': SiDjango,
    'fastapi': SiFastapi,
    'csharp': SiSharp,
    'c#': SiSharp,
    'dotnet': SiDotnet,
    '.net': SiDotnet,
    'php': SiPhp,
    'laravel': SiLaravel,
    'go': SiGo,
    'golang': SiGo,
    'rust': SiRust,
    'swift': SiSwift,
    'kotlin': SiKotlin,
    'flutter': SiFlutter,
    'dart': SiDart,
    'postgresql': SiPostgresql,
    'postgres': SiPostgresql,
    'mysql': SiMysql,
    'mongodb': SiMongodb,
    'mongo': SiMongodb,
    'redis': SiRedis,
    'firebase': SiFirebase,
    'supabase': SiSupabase,
    'docker': SiDocker,
    'kubernetes': SiKubernetes,
    'k8s': SiKubernetes,
    'aws': SiAmazonwebservices,
    'amazon': SiAmazonwebservices,
    'gcp': SiGooglecloud,
    'google': SiGooglecloud,
    'jest': SiJest,
    'cypress': SiCypress,
    'solidity': SiSolidity,
    'ethereum': SiEthereum,
    'tensorflow': SiTensorflow,
    'pytorch': SiPytorch,
    'java': FaJava
  };

  // Mapeamento por categoria quando tecnologia específica não encontrada
  const categoryIconMap: Record<string, React.ComponentType> = {
    'frontend': FaPalette,
    'backend': FaServer,
    'fullstack': FaLayerGroup,
    'mobile': FaMobile,
    'desktop': FaDesktop,
    'web': FaCode,
    'api': FaNetworkWired,
    'database': FaDatabase,
    'cloud': FaCloud,
    'devops': FaCogs,
    'ai': FaBrain,
    'ml': FaRobot,
    'machine learning': FaRobot,
    'artificial intelligence': FaBrain,
    'blockchain': FaLink,
    'web3': FaCoins,
    'testing': FaFlask,
    'security': FaShieldAlt,
    'analytics': FaChartBar,
    'search': FaSearch,
    'tools': FaTools,
    'game': FaGamepad,
    'vr': FaVrCardboard,
    'iot': FaAtom,
    'embedded': FaAtom
  };

  // Busca por tecnologia específica primeiro
  if (techIconMap[tech]) {
    return techIconMap[tech];
  }

  // Busca por categoria se não encontrar tecnologia
  if (cat && categoryIconMap[cat]) {
    return categoryIconMap[cat];
  }

  // Fallback baseado em palavras-chave
  if (tech.includes('react') || tech.includes('component')) return SiReact;
  if (tech.includes('vue')) return SiVuedotjs;
  if (tech.includes('angular')) return SiAngular;
  if (tech.includes('node') || tech.includes('express')) return SiNodedotjs;
  if (tech.includes('python') || tech.includes('py')) return SiPython;
  if (tech.includes('java') && !tech.includes('javascript')) return FaJava;
  if (tech.includes('database') || tech.includes('db')) return FaDatabase;
  if (tech.includes('mobile') || tech.includes('app')) return FaMobile;
  if (tech.includes('web')) return FaCode;
  if (tech.includes('api')) return FaNetworkWired;
  if (tech.includes('cloud')) return FaCloud;
  if (tech.includes('ai') || tech.includes('ml')) return FaBrain;

  // Ícone padrão
  return FaCode;
};

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

  const languageConfig = React.useMemo(() => {
    if (!project) return { 
      color: '#6B7280', 
      gradient: 'from-gray-400 to-gray-600', 
      textColor: 'text-white',
      category: 'Unknown',
      difficulty: 1,
      name: 'default'
    };
    
    const config = detectLanguage(project);
    return {
      ...config,
      category: config.category || project.categoria || 'Web',
      difficulty: config.difficulty || 1
    };
  }, [project]);

  const detectedTechnologies = React.useMemo(() => {
    return project ? detectProjectTechnologies(project) : [];
  }, [project]);

  const engagement = useProjectEngagement(project);

  // Seleciona o ícone apropriado baseado na tecnologia principal
  const ProjectIcon = React.useMemo(() => {
    if (!project) return FaCode;
    
    // Prioriza tecnologias detectadas
    if (detectedTechnologies.length > 0) {
      return getTechnologyIcon(detectedTechnologies[0].name, detectedTechnologies[0].category);
    }
    
    // Usa a configuração de linguagem
    if (languageConfig.name && languageConfig.name !== 'default') {
      return getTechnologyIcon(languageConfig.name, languageConfig.category);
    }
    
    // Usa categoria do projeto
    if (project.categoria) {
      return getTechnologyIcon('', project.categoria);
    }
    
    return FaCode;
  }, [project, detectedTechnologies, languageConfig]);

  // Renderização para projeto não disponível
  if (!project?.id) {
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

  // Renderização da variante compact
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
          
          {/* Background gradient sutil */}
          <div className={`absolute inset-0 bg-gradient-to-r ${languageConfig.gradient} opacity-5`} />
          
          <CardContent className="p-4 flex items-center gap-4 relative z-10">
            {/* Ícone do projeto e indicadores */}
            <div className="flex flex-col items-center gap-2 shrink-0">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${languageConfig.gradient} shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <ProjectIcon 
                  className="w-6 h-6 text-white" 
                  style={{ color: 'white' }}
                />
              </div>
              
              {/* Indicador de dificuldade */}
              {languageConfig.difficulty && (
                <div className="flex gap-0.5">
                  {[...Array(Math.min(languageConfig.difficulty, 3))].map((_, i) => (
                    <div 
                      key={`difficulty-${i}`}
                      className="w-1 h-1 rounded-full bg-current"
                      style={{ color: languageConfig.color }}
                    />
                  ))}
                </div>
              )}
            </div>
            
            {/* Conteúdo do projeto */}
            <div className="flex-1">
              <ProjectCardContent 
                project={project} 
                isRevealed={isRevealed} 
                variant="compact"
              />
            </div>

            {/* Ícone de navegação */}
            <div className="flex items-center">
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // Renderização da variante default
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
        {/* Overlay para projetos não revelados */}
        {!isRevealed && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/20 to-primary/5 z-10" />
        )}

        {/* Imagem do projeto */}
        <div className="aspect-video relative overflow-hidden">
          <ProjectCardImage 
            project={project}
            isRevealed={isRevealed}
            viewProgress={viewProgress}
          />
          
          {/* Ícone da tecnologia sobreposto na imagem */}
          <div className="absolute top-4 left-4 z-20">
            <div 
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${languageConfig.gradient} shadow-lg flex items-center justify-center backdrop-blur-sm`}
              style={{ backgroundColor: `${languageConfig.color}90` }}
            >
              <ProjectIcon 
                className="w-6 h-6 text-white" 
                style={{ color: 'white' }}
              />
            </div>
          </div>
        </div>

        {/* Conteúdo do projeto */}
        <CardContent className="flex-1 flex flex-col p-4">
          <ProjectCardContent 
            project={project} 
            isRevealed={isRevealed} 
            variant="default"
          />
        </CardContent>

        {/* Footer do projeto */}
        <CardFooter className="p-0">
          <ProjectCardFooter 
            project={project} 
            isRevealed={isRevealed}
          />
        </CardFooter>
      </Card>
    </motion.div>
  );
};
