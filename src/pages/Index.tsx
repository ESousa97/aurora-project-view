// src/pages/Index.tsx - Página principal refatorada
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { HeroSection } from '@/components/home/HeroSection';
import { StatsSection } from '@/components/home/StatsSection';
import { EnhancedProjectCard, ProjectType } from '@/components/home/EnhancedProjectCard';
import { useProjectsWithLanguage, useCategories } from '@/hooks/useCategories';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCategoryColor } from '@/lib/languageColors';
import { isWithinInterval, subDays } from 'date-fns';
import { 
  ArrowRight, 
  Search,
  Gem,
  Crown,
  Compass,
  Target,
  MousePointer,
  Zap,
  Eye,
  Atom,
  FolderOpen
} from 'lucide-react';

const Index = () => {
  const { data: projects, isLoading: projectsLoading } = useProjectsWithLanguage();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const [discoveredProjects, setDiscoveredProjects] = React.useState<Set<number>>(new Set());

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

  if (projectsLoading || categoriesLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center space-y-6">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400 mx-auto"></div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-white">
                Preparando sua jornada...
              </h3>
              <p className="text-gray-400">
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
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
              <Search className="h-12 w-12 text-white" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-white">
                Nenhum projeto encontrado
              </h3>
              <p className="text-gray-400">
                Que tal criar seu primeiro projeto e começar a jornada?
              </p>
            </div>
            <Link to="/projects/new">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-lg font-medium hover:scale-105 transition-transform">
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
      <div className="min-h-screen">
        <div className="space-y-20">
          <HeroSection totalProjects={stats.total} />
          <StatsSection stats={stats} />

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
