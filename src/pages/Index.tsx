import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProjectCard } from '@/components/project/ProjectCard';
import { useProjects, useCategories } from '@/hooks/useProjects';
import { 
  ArrowRight, 
  Compass, 
  Star, 
  Zap, 
  Eye, 
  Sparkles, 
  Target, 
  Telescope, 
  Crown, 
  MousePointer, 
  ChevronDown, 
  TrendingUp 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getCategoryColor, detectLanguage } from '@/lib/languageColors';
import { isWithinInterval, subDays } from 'date-fns';

const Index = () => {
  const { data: projects, isLoading: projectsLoading } = useProjects();
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

  // Estatísticas dinâmicas
  const stats = React.useMemo(() => {
    if (!projects || !categories) {
      return { total: 0, categories: 0, languages: 0, recent: 0 };
    }

    const uniqueLanguages = new Set();
    let recentCount = 0;

    projects.forEach(project => {
      const language = detectLanguage(project);
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
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/10 to-transparent rounded-3xl" />
          <div className="absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          
          <div className="relative max-w-5xl mx-auto text-center space-y-8">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full border border-primary/30">
                <Telescope className="h-5 w-5 text-primary" />
                <span className="text-primary font-semibold">Sua jornada de descoberta começa aqui</span>
                <Sparkles className="h-4 w-4 text-purple-500" />
              </div>
              
              <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
                  Cada Projeto
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-600 via-primary to-purple-600 bg-clip-text text-transparent">
                  Uma Descoberta
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Não procure. <strong className="text-foreground">Explore.</strong> Cada projeto esconde uma história, 
                uma solução elegante, uma técnica revolucionária. Sua próxima inspiração está esperando 
                para ser <strong className="text-primary">descoberta</strong>.
              </p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Button asChild size="lg" className="text-lg px-10 py-8 rounded-2xl group bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
                <Link to="/projects">
                  <Compass className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                  Começar a Explorar
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
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
                icon: Target,
                value: stats.total,
                label: "Projetos Únicos",
                gradient: "from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900",
                iconColor: "text-blue-600",
                textColor: "text-blue-700 dark:text-blue-300",
                labelColor: "text-blue-600 dark:text-blue-400",
                bgAccent: "bg-blue-500/20"
              },
              {
                icon: Compass,
                value: stats.categories,
                label: "Territórios",
                gradient: "from-green-50 to-green-100 dark:from-green-950 dark:to-green-900",
                iconColor: "text-green-600",
                textColor: "text-green-700 dark:text-green-300",
                labelColor: "text-green-600 dark:text-green-400",
                bgAccent: "bg-green-500/20"
              },
              {
                icon: Zap,
                value: stats.languages,
                label: "Linguagens",
                gradient: "from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900",
                iconColor: "text-purple-600",
                textColor: "text-purple-700 dark:text-purple-300",
                labelColor: "text-purple-600 dark:text-purple-400",
                bgAccent: "bg-purple-500/20"
              },
              {
                icon: TrendingUp,
                value: stats.recent,
                label: "Novos (7 dias)",
                gradient: "from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900",
                iconColor: "text-orange-600",
                textColor: "text-orange-700 dark:text-orange-300",
                labelColor: "text-orange-600 dark:text-orange-400",
                bgAccent: "bg-orange-500/20"
              }
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }} 
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`text-center border-0 shadow-xl bg-gradient-to-br ${stat.gradient} overflow-hidden group hover:scale-105 transition-transform`}>
                  <CardContent className="pt-6 pb-4 relative">
                    <div className={`absolute top-0 right-0 w-20 h-20 ${stat.bgAccent} rounded-full blur-xl`} />
                    <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.iconColor}`} />
                    <div className={`text-3xl font-bold ${stat.textColor} mb-1`}>
                      {stat.value}
                    </div>
                    <p className={`${stat.labelColor} font-medium text-sm`}>
                      {stat.label}
                    </p>
                  </CardContent>
                </Card>
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900 dark:to-orange-800 rounded-full">
              <Star className="h-4 w-4 text-orange-600" />
              <span className="text-orange-600 dark:text-orange-400 font-medium text-sm">Descobertas Recentes</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">Projetos que Merecem Sua Atenção</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
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
        <section className="space-y-12 bg-gradient-to-r from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-20 rounded-3xl mx-4">
          <motion.div 
            className="text-center space-y-6"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 rounded-full">
              <Crown className="h-4 w-4 text-purple-600" />
              <span className="text-purple-600 dark:text-purple-400 font-medium text-sm">Câmara dos Mistérios</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">O que Está Escondido?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-full">
              <Compass className="h-4 w-4 text-blue-600" />
              <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">Caminhos de Exploração</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">Escolha Sua Aventura</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Cada categoria é uma jornada diferente. Algumas são terrenos conhecidos, 
              outras são fronteiras inexploradas. Qual desperta sua curiosidade?
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {categories?.slice(0, 9).map((category, index) => {
              const colorConfig = getCategoryColor(category.name);
              
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
                    <Card className="group hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 overflow-hidden bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 relative h-full">
                      <div className={`h-3 bg-gradient-to-r ${colorConfig.gradient}`} />
                      <CardContent className="p-6 relative">
                        <div className="absolute top-2 right-2 text-3xl opacity-20 group-hover:opacity-40 transition-opacity">
                          {React.createElement(colorConfig.icon)}
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <h3 className="font-bold text-xl group-hover:text-primary transition-colors leading-tight">
                              {category.name}
                            </h3>
                            <Badge 
                              variant="secondary" 
                              className="shrink-0 ml-2"
                              style={{ 
                                backgroundColor: `${colorConfig.color}20`, 
                                color: colorConfig.color 
                              }}
                            >
                              {category.count}
                            </Badge>
                          </div>
                          
                          <p className="text-muted-foreground text-sm">
                            {category.count} projeto{category.count !== 1 ? 's' : ''} esperando 
                            {category.count > 10 ? ' para serem explorados' : ' por você'}
                          </p>

                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <MousePointer className="h-3 w-3" />
                            <span>Clique para explorar este território</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Chamada para a Aventura */}
        <section className="relative py-20 px-4">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/20 to-primary/10 rounded-3xl" />
          <motion.div 
            className="relative max-w-4xl mx-auto text-center space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">
                A Jornada Nunca Acaba
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Cada projeto visitado revela novos caminhos. Cada código lido desperta novas ideias. 
                Cada solução descoberta abre portas para outros mundos. 
                <strong className="text-foreground"> Sua próxima grande descoberta está a um clique de distância.</strong>
              </p>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="text-xl px-12 py-8 rounded-2xl bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 group" 
                asChild
              >
                <Link to="/projects">
                  <Zap className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                  Iniciar Minha Jornada
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>Sem necessidade de busca</span>
              </div>
              <div className="flex items-center gap-2">
                <Compass className="h-4 w-4" />
                <span>Navegação intuitiva</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
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
