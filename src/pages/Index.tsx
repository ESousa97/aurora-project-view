import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ModernButton } from '@/components/ui/modern-button';
import { ModernCard } from '@/components/ui/modern-card';
import { ThemeBadge } from '@/components/ui/theme-badge';
import { ProjectCard } from '@/components/project/ProjectCard';
import { useProjectsWithLanguage, useCategories } from '@/hooks/useCategories';
import { 
  ArrowRight, 
  ChevronDown, 
  Eye,
  MousePointer,
  Target,
  Compass,
  Zap,
  TrendingUp,
  Search,
  Gem,
  Crown,
  Atom
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getCategoryColor } from '@/lib/languageColors';
import { isWithinInterval, subDays } from 'date-fns';

// Definição de tipos
interface ProjectType {
  id: number;
  titulo?: string;
  nome?: string;
  descricao?: string;
  data_modificacao: string;
  data_criacao: string;
  detectedLanguage: {
    name: string;
    gradient: string;
    color: string;
    icon?: React.ComponentType<{ className?: string }>;
  };
  categoria?: string;
  conteudo?: string;
  imageurl?: string;
}

interface EnhancedProjectCardProps {
  project: ProjectType;
  variant?: 'featured' | 'mystery';
  index?: number;
  onDiscover?: (id: number) => void;
  isDiscovered?: boolean;
}

const Index = () => {
  const { data: projects, isLoading: projectsLoading } = useProjectsWithLanguage();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { scrollYProgress } = useScroll();
  const [discoveredProjects, setDiscoveredProjects] = React.useState<Set<number>>(new Set());

  // Animações baseadas no scroll
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

  // Projetos em destaque (mais recentes e interessantes)
  const featuredProjects = React.useMemo(() => {
    if (!projects) return [];
    
    const recentProjects = projects.filter(project => 
      project.data_modificacao && isWithinInterval(new Date(project.data_modificacao), {
        start: subDays(new Date(), 14),
        end: new Date()
      })
    );

    const sourceProjects = recentProjects.length > 0 ? recentProjects : projects;

    return sourceProjects
      .sort((a, b) => new Date(b.data_modificacao).getTime() - new Date(a.data_modificacao).getTime())
      .slice(0, 3) as ProjectType[];
  }, [projects]);

  // Projetos mistério para descoberta
  const mysteryProjects = React.useMemo(() => {
    if (!projects) return [];
    return projects
      .filter(p => !featuredProjects.some(fp => fp.id === p.id))
      .sort(() => Math.random() - 0.5)
      .slice(0, 3) as ProjectType[];
  }, [projects, featuredProjects]);

  const handleProjectReveal = React.useCallback((projectId: number) => {
    setDiscoveredProjects(prev => new Set([...prev, projectId]));
  }, []);

  // Estatísticas dinâmicas baseadas nos projetos com linguagem detectada
  const stats = React.useMemo(() => {
    if (!projects || !categories) {
      return { total: 0, categories: 0, languages: 0, recent: 0 };
    }

    const uniqueLanguages = new Set();
    let recentCount = 0;

    projects.forEach(project => {
      const language = project.detectedLanguage;
      uniqueLanguages.add(language.name);
      
      if (project.data_modificacao && isWithinInterval(new Date(project.data_modificacao), {
        start: subDays(new Date(), 7),
        end: new Date()
      })) {
        recentCount++;
      }
    });

    return {
      total: projects.length,
      categories: categories.length,
      languages: uniqueLanguages.size,
      recent: recentCount
    };
  }, [projects, categories]);

  // Componente de Card de Projeto Aprimorado
  const EnhancedProjectCard: React.FC<EnhancedProjectCardProps> = ({ 
    project, 
    variant = 'featured', 
    index = 0, 
    onDiscover, 
    isDiscovered 
  }) => {
    const [revealed, setRevealed] = React.useState(variant !== 'mystery');

    const handleReveal = (e: React.MouseEvent) => {
      if (variant === 'mystery' && !revealed) {
        e.preventDefault();
        setRevealed(true);
        onDiscover?.(project.id);
      }
    };

    const gradientClass = project.detectedLanguage?.gradient || 'from-blue-600 to-purple-600';

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ scale: 1.02, y: -5 }}
        className="group h-full"
        style={{
          transform: revealed ? 'scale(1)' : 'scale(0.95)',
          opacity: revealed ? 1 : 0.7,
          transition: 'all 0.3s ease'
        }}
      >
        {variant === 'mystery' && !revealed ? (
          <div 
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 overflow-hidden relative h-full"
            onClick={handleReveal}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm flex items-center justify-center z-10">
              <div className="text-center text-white">
                <Eye className="h-8 w-8 mx-auto mb-2" />
                <p className="font-semibold">Clique para Revelar</p>
              </div>
            </div>
            
            <div className={`h-2 bg-gradient-to-r ${gradientClass}`} />
            
            <div className="p-6 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                    ???
                  </h3>
                  <span className="px-2 py-1 text-xs bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                    ?
                  </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  Projeto misterioso esperando para ser descoberto...
                </p>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <MousePointer className="h-3 w-3" />
                <span>Clique para revelar</span>
              </div>
            </div>
          </div>
        ) : (
          <Link to={`/projects/${project.id}`} className="block h-full">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 overflow-hidden relative h-full">
              <div className={`h-2 bg-gradient-to-r ${gradientClass}`} />
              
              <div className="p-6 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                      {project.titulo || project.nome || 'Projeto sem título'}
                    </h3>
                    <span className="px-2 py-1 text-xs bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                      {project.detectedLanguage?.name || 'Unknown'}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {project.descricao || 'Projeto em desenvolvimento'}
                  </p>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <MousePointer className="h-3 w-3" />
                  <span>Clique para explorar</span>
                </div>
              </div>
            </div>
          </Link>
        )}
      </motion.div>
    );
  };

  if (projectsLoading || categoriesLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950">
          <div className="text-center space-y-6">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Preparando sua jornada...
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Carregando projetos e descobertas incríveis
              </p>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!projects || !categories || projects.length === 0) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center space-y-6 max-w-md">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <Search className="h-12 w-12 text-white" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Nenhum projeto encontrado
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Que tal criar seu primeiro projeto e começar a jornada?
              </p>
            </div>
            <Link to="/projects/new">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:scale-105 transition-transform">
                Criar Primeiro Projeto
              </button>
            </Link>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <div className="space-y-20">
          {/* Seção Hero */}
          <motion.section 
            className="relative py-16 md:py-24 px-4 overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950"
            style={{ opacity: heroOpacity, y: heroY }}
          >
            {/* Elementos de fundo animados */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-400/10 dark:to-purple-400/10" />
            <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-emerald-600/20 to-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            
            <div className="relative max-w-5xl mx-auto text-center space-y-8">
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg">
                  <Search className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">Sua jornada de descoberta começa aqui</span>
                  <Atom className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight leading-tight">
                  <span className="bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent">
                    Cada Projeto
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                    Uma Descoberta
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed text-gray-600 dark:text-gray-300">
                  Não procure. <strong className="text-gray-900 dark:text-white">Explore.</strong> Cada projeto esconde uma história, 
                  uma solução elegante, uma técnica revolucionária. Sua próxima inspiração está esperando 
                  para ser <strong className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">descoberta</strong>.
                </p>
              </motion.div>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <Link to="/projects">
                  <button className="text-lg px-10 py-4 rounded-2xl group bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 hover:from-blue-600 hover:to-purple-600 dark:hover:from-blue-400 dark:hover:to-purple-400 text-white shadow-lg transition-all hover:scale-105 flex items-center gap-3">
                    <Compass className="h-6 w-6 group-hover:rotate-12 transition-transform" />
                    Começar a Explorar
                    <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  <div className="w-2 h-2 rounded-full animate-pulse bg-emerald-500" />
                  <span className="text-sm">
                    {stats.total} projetos aguardando descoberta
                  </span>
                </div>
              </motion.div>

              {/* Indicador de scroll */}
              <motion.div 
                className="flex flex-col items-center gap-2 mt-16"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Descubra mais
                </span>
                <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </motion.div>
            </div>
          </motion.section>

          {/* Estatísticas de Descoberta */}
          <section className="max-w-6xl mx-auto px-4">
            <motion.div 
              className="grid grid-cols-2 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, staggerChildren: 0.1 }}
            >
              {[
                {
                  icon: Target,
                  value: stats.total,
                  label: "Projetos Únicos",
                  gradient: "from-blue-600 to-purple-600"
                },
                {
                  icon: Compass,
                  value: stats.categories,
                  label: "Territórios",
                  gradient: "from-emerald-600 to-blue-600"
                },
                {
                  icon: Zap,
                  value: stats.languages,
                  label: "Linguagens",
                  gradient: "from-purple-600 to-pink-600"
                },
                {
                  icon: TrendingUp,
                  value: stats.recent,
                  label: "Novos (7 dias)",
                  gradient: "from-emerald-600 to-blue-600"
                }
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  className="text-center bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden group hover:scale-105 transition-transform border border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0, scale: 0.8 }} 
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="pt-6 pb-4 relative">
                    <div className={`absolute top-0 right-0 w-20 h-20 rounded-full blur-xl bg-gradient-to-r ${stat.gradient} opacity-20`} />
                    <div className={`h-8 w-8 mx-auto mb-3 flex items-center justify-center rounded-lg bg-gradient-to-r ${stat.gradient}`}>
                      <stat.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-3xl font-bold mb-1 text-gray-900 dark:text-white">
                      {stat.value}
                    </div>
                    <p className="font-medium text-sm text-gray-500 dark:text-gray-400">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Descobertas em Destaque */}
          <section className="space-y-12 px-4">
            <motion.div 
              className="text-center space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg border border-gray-200 dark:border-gray-700">
                <Gem className="h-4 w-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent" />
                <span className="font-medium text-sm bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">Descobertas Recentes</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">Projetos que Merecem Sua Atenção</h2>
              <p className="text-lg max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
                Nossa curadoria especial revela projetos únicos que podem mudar sua perspectiva. 
                Cada um foi escolhido por sua inovação, elegância ou impacto.
              </p>
            </motion.div>
            
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProjects.map((project, index) => (
                  <EnhancedProjectCard 
                    key={project.id} 
                    project={project}
                    variant="featured"
                    index={index}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Seção Câmara dos Mistérios */}
          <section className="space-y-12 py-20 rounded-3xl mx-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700">
            <motion.div 
              className="text-center space-y-6"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg border border-gray-200 dark:border-gray-700">
                <Crown className="h-4 w-4 bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent" />
                <span className="font-medium text-sm bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent">Câmara dos Mistérios</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">O que Está Escondido?</h2>
              <p className="text-lg max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
                Alguns projetos preferem manter seus segredos até o momento certo. 
                Clique para revelar e descobrir o que cada um tem a oferecer.
              </p>
            </motion.div>
            
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mysteryProjects.map((project, index) => (
                  <EnhancedProjectCard 
                    key={project.id} 
                    project={project}
                    variant="mystery"
                    index={index}
                    onDiscover={handleProjectReveal}
                    isDiscovered={discoveredProjects.has(project.id)}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Categorias como Caminhos de Exploração */}
          <section className="space-y-12 px-4">
            <motion.div 
              className="text-center space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg border border-gray-200 dark:border-gray-700">
                <Compass className="h-4 w-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent" />
                <span className="font-medium text-sm bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">Caminhos de Exploração</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">Escolha Sua Aventura</h2>
              <p className="text-lg max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
                Cada categoria é uma jornada diferente. Algumas são terrenos conhecidos, 
                outras são fronteiras inexploradas. Qual desperta sua curiosidade?
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {categories?.slice(0, 9).map((category, index) => {
                const sampleProject = category.projects?.[0] as ProjectType | undefined;
                const colorConfig = sampleProject?.detectedLanguage || getCategoryColor(category.name);
                const gradientClass = colorConfig.gradient || 'from-blue-600 to-purple-600';
                
                return (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <Link to={`/projects?category=${encodeURIComponent(category.name)}`}>
                      <div className="group shadow-lg transition-all duration-500 cursor-pointer overflow-hidden relative h-full bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
                        <div className={`h-3 bg-gradient-to-r ${gradientClass}`} />
                        <div className="p-6 relative">
                          <div className="absolute top-2 right-2 w-8 h-8 rounded-lg flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity bg-gradient-to-r from-blue-600/20 to-purple-600/20">
                            {colorConfig.icon ? (
                              React.createElement(colorConfig.icon, { 
                                className: "w-5 h-5 text-blue-600 dark:text-blue-400"
                              })
                            ) : (
                              <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            )}
                          </div>
                          
                          <div className="space-y-4">
                            <div className="flex items-start justify-between">
                              <h3 className="font-bold text-xl group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all leading-tight text-gray-900 dark:text-white">
                                {category.name}
                              </h3>
                              <span className="shrink-0 ml-2 px-2 py-1 text-xs bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 rounded-full">
                                {category.count}
                              </span>
                            </div>
                            
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {category.count} projeto{category.count !== 1 ? 's' : ''} esperando 
                              {category.count > 10 ? ' para serem explorados' : ' por você'}
                            </p>

                            <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                              <MousePointer className="h-3 w-3" />
                              <span>Clique para explorar este território</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Chamada para a Aventura */}
          <section className="relative py-20 px-4">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-50/30 via-blue-50/30 to-purple-50/30 dark:from-emerald-950/30 dark:via-blue-950/30 dark:to-purple-950/30 shadow-xl" />
            <motion.div 
              className="relative max-w-4xl mx-auto text-center space-y-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                  A Jornada Nunca Acaba
                </h2>
                <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300">
                  Cada projeto visitado revela novos caminhos. Cada código lido desperta novas ideias. 
                  Cada solução descoberta abre portas para outros mundos. 
                  <strong className="text-gray-900 dark:text-white"> Sua próxima grande descoberta está a um clique de distância.</strong>
                </p>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/projects">
                  <button className="text-xl px-12 py-4 rounded-2xl group shadow-xl bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 dark:from-emerald-400 dark:to-blue-400 dark:hover:from-emerald-300 dark:hover:to-blue-300 text-white flex items-center gap-3">
                    <Zap className="h-6 w-6 group-hover:rotate-12 transition-transform" />
                    Iniciar Minha Jornada
                    <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </motion.div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>Sem necessidade de busca</span>
                </div>
                <div className="flex items-center gap-2">
                  <Compass className="h-4 w-4" />
                  <span>Navegação intuitiva</span>
                </div>
                <div className="flex items-center gap-2">
                  <Atom className="h-4 w-4" />
                  <span>Surpresas garantidas</span>
                </div>
              </div>
            </motion.div>
          </section>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
