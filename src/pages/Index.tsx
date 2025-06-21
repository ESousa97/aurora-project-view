import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle }  from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProjectCard } from '@/components/project/ProjectCard';
import { useProjects, useCategories } from '@/hooks/useProjects';
import { ArrowRight, Compass, MapPin, Star, Zap, Eye, Lock, Sparkles, Target, Telescope, Map, Gem, Crown, Gift, MousePointer, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const Index = () => {
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { scrollYProgress } = useScroll();
  const [discoveredProjects, setDiscoveredProjects] = React.useState<Set<number>>(new Set());

  // Scroll animations
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

  // Get featured projects in different categories for discovery journey
  const discoveryProjects = React.useMemo(() => {
    if (!projects) return [];
    
    // Separar projetos por categoria para criar uma jornada diversificada
    const projectsByCategory = projects.reduce((acc, project) => {
      if (!acc[project.categoria]) acc[project.categoria] = [];
      acc[project.categoria].push(project);
      return acc;
    }, {} as Record<string, typeof projects>);

    // Pegar alguns projetos interessantes de cada categoria
    const featured = [];
    Object.entries(projectsByCategory).forEach(([category, categoryProjects]) => {
      // Ordenar por data e pegar os mais recentes
      const sorted = categoryProjects.sort((a, b) => 
        new Date(b.data_modificacao).getTime() - new Date(a.data_modificacao).getTime()
      );
      featured.push(...sorted.slice(0, 2)); // 2 por categoria
    });

    return featured.slice(0, 9); // Máximo 9 projetos featured
  }, [projects]);

  const mysteryProjects = React.useMemo(() => {
    if (!projects) return [];
    return projects
      .filter(p => !discoveryProjects.includes(p))
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);
  }, [projects, discoveryProjects]);

  const handleProjectReveal = (projectId: number) => {
    setDiscoveredProjects(prev => new Set([...prev, projectId]));
  };

  return (
    <AppLayout>
      <div className="space-y-20">
        {/* Hero Section - Story Driven */}
        <motion.section 
          className="relative py-24 px-4 overflow-hidden"
          style={{ opacity: heroOpacity, y: heroY }}
        >
          {/* Animated background elements */}
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
                  {projects?.length || 0} projetos aguardando descoberta
                </span>
              </div>
            </motion.div>

            {/* Scroll indicator */}
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

        {/* Discovery Stats with Mystery */}
        <section className="max-w-6xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, staggerChildren: 0.2 }}
          >
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}>
              <Card className="text-center border-0 shadow-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/20 rounded-full blur-xl" />
                <CardContent className="pt-8 pb-6 relative">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Gem className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-blue-700 dark:text-blue-300 mb-2">
                    {projects?.length || '???'}
                  </div>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                    Tesouros Técnicos
                  </p>
                  <p className="text-xs text-blue-500 dark:text-blue-400">
                    Cada um com seus próprios segredos
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}>
              <Card className="text-center border-0 shadow-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-20 h-20 bg-purple-500/20 rounded-full blur-xl" />
                <CardContent className="pt-8 pb-6 relative">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Map className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-purple-700 dark:text-purple-300 mb-2">
                    {categories?.length || '??'}
                  </div>
                  <p className="text-purple-600 dark:text-purple-400 font-medium mb-2">
                    Territórios Inexplorados
                  </p>
                  <p className="text-xs text-purple-500 dark:text-purple-400">
                    Cada categoria, um mundo novo
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}>
              <Card className="text-center border-0 shadow-xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-green-500/20 rounded-full blur-xl" />
                <CardContent className="pt-8 pb-6 relative">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Crown className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-green-700 dark:text-green-300 mb-2">
                    {discoveredProjects.size}
                  </div>
                  <p className="text-green-600 dark:text-green-400 font-medium mb-2">
                    Seus Achados
                  </p>
                  <p className="text-xs text-green-500 dark:text-green-400">
                    A coleção está crescendo!
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </section>

        {/* Featured Discoveries */}
        <section className="space-y-12">
          <motion.div 
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900 dark:to-orange-800 rounded-full">
              <Star className="h-4 w-4 text-orange-600" />
              <span className="text-orange-600 dark:text-orange-400 font-medium text-sm">Descobertas em Destaque</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">Projetos que Merecem Sua Atenção</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Nossa curadoria especial revela projetos únicos que podem mudar sua perspectiva. 
              Cada um foi escolhido por sua inovação, elegância ou impacto.
            </p>
          </motion.div>
          
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {discoveryProjects.slice(0, 6).map((project, index) => (
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

        {/* Mystery Box Section */}
        <section className="space-y-12 bg-gradient-to-r from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-20 rounded-3xl">
          <motion.div 
            className="text-center space-y-6"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 rounded-full">
              <Gift className="h-4 w-4 text-purple-600" />
              <span className="text-purple-600 dark:text-purple-400 font-medium text-sm">Câmara dos Mistérios</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">O que Está Escondido?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Alguns projetos preferem manter seus segredos até o momento certo. 
              Clique para revelar e descobrir o que cada um tem a oferecer.
            </p>
          </motion.div>
          
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mysteryProjects.map((project, index) => (
                <div key={project.id} onClick={() => handleProjectReveal(project.id)}>
                  <ProjectCard 
                    project={project}
                    variant="mystery"
                    index={index}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories as Exploration Paths */}
        <section className="space-y-12">
          <motion.div 
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-full">
              <MapPin className="h-4 w-4 text-blue-600" />
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
              const colors = [
                { bg: 'from-red-500 to-pink-500', icon: '🔥' },
                { bg: 'from-blue-500 to-cyan-500', icon: '🌊' },
                { bg: 'from-green-500 to-emerald-500', icon: '🌿' },
                { bg: 'from-purple-500 to-pink-500', icon: '✨' },
                { bg: 'from-orange-500 to-red-500', icon: '⚡' },
                { bg: 'from-indigo-500 to-purple-500', icon: '🔮' },
                { bg: 'from-teal-500 to-blue-500', icon: '🎯' },
                { bg: 'from-yellow-500 to-orange-500', icon: '☀️' },
                { bg: 'from-pink-500 to-rose-500', icon: '🚀' },
              ];
              const color = colors[index % colors.length];
              
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
                    <Card className="group hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 overflow-hidden bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 relative">
                      <div className={`h-3 bg-gradient-to-r ${color.bg}`} />
                      <CardContent className="p-6 relative">
                        <div className="absolute top-2 right-2 text-2xl opacity-20 group-hover:opacity-40 transition-opacity">
                          {color.icon}
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <h3 className="font-bold text-xl group-hover:text-primary transition-colors leading-tight">
                              {category.name}
                            </h3>
                            <Badge variant="secondary" className="bg-primary/10 text-primary shrink-0 ml-2">
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

        {/* Call to Adventure */}
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
              <Button size="lg" className="text-xl px-12 py-8 rounded-2xl bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 group" asChild>
                <Link to="/projects">
                  <Zap className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                  Iniciar Minha Jornada
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
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
