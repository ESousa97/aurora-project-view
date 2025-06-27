// src/pages/Index.tsx - Página principal com design moderno
import React, { useState, useMemo, useCallback } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ProjectType } from '@/components/home/EnhancedProjectCard';
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

interface Project {
  id: number;
  name: string;
  category: string;
  language: string;
}

type ProjectVariant = 'featured' | 'mystery';

interface Category {
  name: string;
  count: number;
}

const Index = () => {
  const [discoveredProjects, setDiscoveredProjects] = useState(new Set());

  // Mock data para demonstração
  const projects: Project[] = [
    { id: 1, name: "Sistema de Automação", category: "Backend", language: "Python" },
    { id: 2, name: "Dashboard Analytics", category: "Frontend", language: "React" },
    { id: 3, name: "API REST", category: "Backend", language: "Node.js" },
    { id: 4, name: "Mobile App", category: "Mobile", language: "React Native" },
    { id: 5, name: "Machine Learning", category: "IA", language: "Python" },
    { id: 6, name: "E-commerce", category: "Fullstack", language: "Next.js" }
  ];

  const categories: Category[] = [
    { name: "Backend", count: 12 },
    { name: "Frontend", count: 8 },
    { name: "Mobile", count: 5 },
    { name: "IA & Machine Learning", count: 7 },
    { name: "DevOps", count: 4 },
    { name: "Fullstack", count: 9 }
  ];

  const featuredProjects = projects.slice(0, 3);
  const mysteryProjects = projects.slice(3, 6);

  const stats = {
    total: projects.length,
    categories: categories.length,
    languages: new Set(projects.map(p => p.language)).size,
    recent: 3
  };

  const handleProjectReveal = useCallback((projectId) => {
    setDiscoveredProjects(prev => new Set([...prev, projectId]));
  }, []);

  interface ProjectCardProps {
    project: Project;
    variant: ProjectVariant;
    index: number;
    onDiscover?: (projectId: number) => void;
    isDiscovered?: boolean;
  }

  const ProjectCard = ({ project, variant, index, onDiscover, isDiscovered }: ProjectCardProps) => {
    const [revealed, setRevealed] = useState(variant !== 'mystery');

    const handleReveal = () => {
      if (variant === 'mystery' && !revealed) {
        setRevealed(true);
        onDiscover?.(project.id);
      }
    };

    return (
      <div 
        className="group bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 overflow-hidden relative"
        onClick={handleReveal}
        style={{
          transform: revealed ? 'scale(1)' : 'scale(0.95)',
          opacity: revealed ? 1 : 0.7
        }}
      >
        {variant === 'mystery' && !revealed && (
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="text-center text-white">
              <Eye className="h-8 w-8 mx-auto mb-2" />
              <p className="font-semibold">Clique para Revelar</p>
            </div>
          </div>
        )}
        
        <div className="h-2 bg-gradient-to-r from-blue-600 to-purple-600" />
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">
              {project.name}
            </h3>
            <span className="px-2 py-1 text-xs bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 rounded-full">
              {project.language}
            </span>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            Categoria: {project.category}
          </p>
          
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <MousePointer className="h-3 w-3" />
            <span>Clique para explorar</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <AppLayout>
      <div className="min-h-screen">
        <div className="space-y-20">
          {/* Hero Section */}
          <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-400/10 dark:to-purple-400/10" />
            <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-emerald-600/20 to-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            
            <div className="relative max-w-5xl mx-auto text-center space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg">
                  <Search className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">Sua jornada de descoberta começa aqui</span>
                  <Atom className="h-4 w-4 text-blue-600 dark:text-blue-400" />
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
                
                <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed text-gray-600 dark:text-gray-300">
                  Não procure. <strong className="text-gray-900 dark:text-white">Explore.</strong> Cada projeto esconde uma história, 
                  uma solução elegante, uma técnica revolucionária. Sua próxima inspiração está esperando 
                  para ser <strong className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">descoberta</strong>.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button className="text-lg px-10 py-4 rounded-2xl group bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 hover:from-blue-600 hover:to-purple-600 dark:hover:from-blue-400 dark:hover:to-purple-400 text-white shadow-lg transition-all hover:scale-105 flex items-center gap-3">
                  <Compass className="h-6 w-6 group-hover:rotate-12 transition-transform" />
                  Começar a Explorar
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  <div className="w-2 h-2 rounded-full animate-pulse bg-emerald-500" />
                  <span className="text-sm">
                    {stats.total} projetos aguardando descoberta
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 mt-16">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Descubra mais
                </span>
                <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400 animate-bounce" />
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
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
                <div key={stat.label} className="text-center bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden group hover:scale-105 transition-transform border border-gray-200 dark:border-gray-700">
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
                </div>
              ))}
            </div>
          </section>

          {/* Featured Projects */}
          <section className="space-y-12 px-4">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg border border-gray-200 dark:border-gray-700">
                <Gem className="h-4 w-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent" />
                <span className="font-medium text-sm bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">Descobertas Recentes</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">Projetos que Merecem Sua Atenção</h2>
              <p className="text-lg max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
                Nossa curadoria especial revela projetos únicos que podem mudar sua perspectiva. 
                Cada um foi escolhido por sua inovação, elegância ou impacto.
              </p>
            </div>
            
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

          {/* Mystery Projects */}
          <section className="space-y-12 py-20 rounded-3xl mx-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg border border-gray-200 dark:border-gray-700">
                <Crown className="h-4 w-4 bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent" />
                <span className="font-medium text-sm bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent">Câmara dos Mistérios</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">O que Está Escondido?</h2>
              <p className="text-lg max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
                Alguns projetos preferem manter seus segredos até o momento certo. 
                Clique para revelar e descobrir o que cada um tem a oferecer.
              </p>
            </div>
            
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

          {/* Categories */}
          <section className="space-y-12 px-4">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg border border-gray-200 dark:border-gray-700">
                <Compass className="h-4 w-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent" />
                <span className="font-medium text-sm bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">Caminhos de Exploração</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">Escolha Sua Aventura</h2>
              <p className="text-lg max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
                Cada categoria é uma jornada diferente. Algumas são terrenos conhecidos, 
                outras são fronteiras inexploradas. Qual desperta sua curiosidade?
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {categories.map((category, index) => (
                <div key={category.name} className="group shadow-lg transition-all duration-500 cursor-pointer overflow-hidden relative h-full bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:scale-105 hover:-translate-y-1">
                  <div className="h-3 bg-gradient-to-r from-blue-600 to-purple-600" />
                  <div className="p-6 relative">
                    <div className="absolute top-2 right-2 w-8 h-8 rounded-lg flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity bg-gradient-to-r from-blue-600/20 to-purple-600/20">
                      <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
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
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="relative py-20 px-4">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-50/30 via-blue-50/30 to-purple-50/30 dark:from-emerald-950/30 dark:via-blue-950/30 dark:to-purple-950/30 shadow-xl" />
            <div className="relative max-w-4xl mx-auto text-center space-y-8">
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
              
              <div className="inline-block hover:scale-105 transition-transform">
                <button className="text-xl px-12 py-4 rounded-2xl group shadow-xl bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 dark:from-emerald-400 dark:to-blue-400 dark:hover:from-emerald-300 dark:hover:to-blue-300 text-white flex items-center gap-3">
                  <Zap className="h-6 w-6 group-hover:rotate-12 transition-transform" />
                  Iniciar Minha Jornada
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

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
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
