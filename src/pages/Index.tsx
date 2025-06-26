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
  MousePointer
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getCategoryColor, detectLanguage } from '@/lib/languageColors';
import { isWithinInterval, subDays } from 'date-fns';

// Usar ícones do sistema languageColors
import { 
  FaCompass, FaRocket, FaEye, FaBolt, FaTarget, FaTrendingUp,
  FaSearch, FaGem, FaCrown, FaAtom
} from '@/lib/languageColors/icons';

const Index = () => {
  // Usar o hook atualizado para ter projetos com linguagem detectada
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
      .slice(0, 6);
  }, [projects]);

  // Projetos mistério para descoberta
  const mysteryProjects = React.useMemo(() => {
    if (!projects) return [];
    return projects
      .filter(p => !featuredProjects.some(fp => fp.id === p.id))
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);
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
      // Usar a linguagem já detectada do projeto
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
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-20">
        {/* Seção Hero - Narrativa */}
        <motion.section 
          className="relative py-24 px-4 overflow-hidden"
          style={{ opacity: heroOpacity, y: heroY }}
        >
          {/* Elementos de fundo animados */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-surface-secondary/20 to-surface-primary/20" />
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full blur-3xl animate-pulse bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000 bg-gradient-to-r from-emerald-600/20 to-blue-600/20" />
          
          <div className="relative max-w-5xl mx-auto text-center space-y-8">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-border glass-card">
                <FaSearch className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">Sua jornada de descoberta começa aqui</span>
                <FaAtom className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              
              <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent">
                  Cada Projeto
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  Uma Descoberta
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed text-muted-foreground">
                Não procure. <strong className="text-foreground">Explore.</strong> Cada projeto esconde uma história, 
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
              <ModernButton variant="primary" size="lg" asChild>
                <Link to="/projects" className="text-lg px-10 py-8 rounded-2xl group bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-500 dark:hover:to-purple-500 text-white">
                  <FaCompass className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                  Começar a Explorar
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </ModernButton>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
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
              <span className="text-sm text-muted-foreground">Descubra mais</span>
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
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
                icon: FaTarget,
                value: stats.total,
                label: "Projetos Únicos",
                gradient: "from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
              },
              {
                icon: FaCompass,
                value: stats.categories,
                label: "Territórios",
                gradient: "from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400"
              },
              {
                icon: FaBolt,
                value: stats.languages,
                label: "Linguagens",
                gradient: "from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400"
              },
              {
                icon: FaTrendingUp,
                value: stats.recent,
                label: "Novos (7 dias)",
                gradient: "from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400"
              }
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }} 
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ModernCard className="text-center border-0 shadow-xl overflow-hidden group hover:scale-105 transition-transform">
                  <div className="pt-6 pb-4 relative">
                    <div className={`absolute top-0 right-0 w-20 h-20 rounded-full blur-xl bg-gradient-to-r ${stat.gradient} opacity-20`} />
                    <div className={`h-8 w-8 mx-auto mb-3 flex items-center justify-center rounded-lg bg-gradient-to-r ${stat.gradient}`}>
                      <stat.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-3xl font-bold mb-1 text-foreground">
                      {stat.value}
                    </div>
                    <p className="font-medium text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                </ModernCard>
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card">
              <FaGem className="h-4 w-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent" />
              <span className="font-medium text-sm bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">Descobertas Recentes</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Projetos que Merecem Sua Atenção</h2>
            <p className="text-lg max-w-3xl mx-auto text-muted-foreground">
              Nossa curadoria especial revela projetos únicos que podem mudar sua perspectiva. 
              Cada um foi escolhido por sua inovação, elegância ou impacto.
            </p>
          </motion.div>
          
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <ProjectCard 
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
        <section className="space-y-12 py-20 rounded-3xl mx-4 glass-card">
          <motion.div 
            className="text-center space-y-6"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card">
              <FaCrown className="h-4 w-4 bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent" />
              <span className="font-medium text-sm bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent">Câmara dos Mistérios</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">O que Está Escondido?</h2>
            <p className="text-lg max-w-3xl mx-auto text-muted-foreground">
              Alguns projetos preferem manter seus segredos até o momento certo. 
              Clique para revelar e descobrir o que cada um tem a oferecer.
            </p>
          </motion.div>
          
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mysteryProjects.map((project, index) => (
                <ProjectCard 
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card">
              <FaCompass className="h-4 w-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent" />
              <span className="font-medium text-sm bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">Caminhos de Exploração</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Escolha Sua Aventura</h2>
            <p className="text-lg max-w-3xl mx-auto text-muted-foreground">
              Cada categoria é uma jornada diferente. Algumas são terrenos conhecidos, 
              outras são fronteiras inexploradas. Qual desperta sua curiosidade?
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {categories?.slice(0, 9).map((category, index) => {
              const sampleProject = category.projects[0];
              const colorConfig = sampleProject?.detectedLanguage || getCategoryColor(category.name);
              
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
                    <ModernCard className="group hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 overflow-hidden relative h-full">
                      <div className={`h-3 bg-gradient-to-r ${colorConfig.gradient}`} />
                      <div className="p-6 relative">
                        <div 
                          className="absolute top-2 right-2 w-8 h-8 rounded-lg flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity"
                          style={{ backgroundColor: `${colorConfig.color}20` }}
                        >
                          {React.createElement(colorConfig.icon, { 
                            className: "w-5 h-5",
                            style: { color: colorConfig.color }
                          })}
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <h3 className="font-bold text-xl group-hover:text-primary transition-colors leading-tight text-foreground">
                              {category.name}
                            </h3>
                            <ThemeBadge 
                              status="info"
                              className="shrink-0 ml-2"
                            >
                              {category.count}
                            </ThemeBadge>
                          </div>
                          
                          <p className="text-sm text-muted-foreground">
                            {category.count} projeto{category.count !== 1 ? 's' : ''} esperando 
                            {category.count > 10 ? ' para serem explorados' : ' por você'}
                          </p>

                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <MousePointer className="h-3 w-3" />
                            <span>Clique para explorar este território</span>
                          </div>
                        </div>
                      </div>
                    </ModernCard>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Chamada para a Aventura */}
        <section className="relative py-20 px-4">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-surface-secondary/30 to-surface-primary/30" />
          <motion.div 
            className="relative max-w-4xl mx-auto text-center space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                A Jornada Nunca Acaba
              </h2>
              <p className="text-xl leading-relaxed text-muted-foreground">
                Cada projeto visitado revela novos caminhos. Cada código lido desperta novas ideias. 
                Cada solução descoberta abre portas para outros mundos. 
                <strong className="text-foreground"> Sua próxima grande descoberta está a um clique de distância.</strong>
              </p>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ModernButton 
                variant="primary"
                size="lg" 
                className="text-xl px-12 py-8 rounded-2xl group" 
                asChild
              >
                <Link to="/projects">
                  <FaBolt className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                  Iniciar Minha Jornada
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </ModernButton>
            </motion.div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <FaEye className="h-4 w-4" />
                <span>Sem necessidade de busca</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCompass className="h-4 w-4" />
                <span>Navegação intuitiva</span>
              </div>
              <div className="flex items-center gap-2">
                <FaAtom className="h-4 w-4" />
                <span>Surpresas garantidas</span>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </AppLayout>
  );
};

export default Index;
