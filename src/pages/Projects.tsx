// src/pages/Projects.tsx
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ProjectCard } from '@/components/project/ProjectCard';
import { useProjects } from '@/hooks/useProjects';
import { useUIStore } from '@/stores/uiStore';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Shuffle, Grid3X3, List, Clock, Compass, Star, Gem, MapPin, Filter, Eye, Zap, Sparkles } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Projects = () => {
  const { data: projects, isLoading } = useProjects();
  const { viewMode, setViewMode, selectedCategory, setSelectedCategory } = useUIStore();
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = React.useState<'date' | 'title' | 'category' | 'random'>('date');
  const [revealMode, setRevealMode] = React.useState<'all' | 'progressive'>('all');
  const [revealedCount, setRevealedCount] = React.useState(9);

  // Sincronizar com URL params
  React.useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && categoryParam !== selectedCategory) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams, selectedCategory, setSelectedCategory]);

  // Categorias únicas dos projetos
  const categories = React.useMemo(() => {
    if (!projects) return [];
    // LINHA MODIFICADA ABAIXO
    const uniqueCategories = [...new Set(
      projects
        .map(p => p.categoria ? p.categoria.trim() : null) // Mapeia com segurança
        .filter(Boolean) as string[] // Filtra valores nulos ou vazios
    )];
    return uniqueCategories.sort();
  }, [projects]);

  // Filtrar e ordenar projetos
  const processedProjects = React.useMemo(() => {
    if (!projects) return [];

    let filtered = [...projects];

    if (selectedCategory) {
      filtered = filtered.filter(project => 
        project.categoria?.trim() === selectedCategory
      );
    }

    // Ordenação
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.data_modificacao).getTime() - new Date(a.data_modificacao).getTime();
        case 'title':
          return a.titulo.localeCompare(b.titulo, 'pt-BR');
        case 'category':
          // Adicionando verificação para evitar erro na ordenação
          return (a.categoria || '').localeCompare(b.categoria || '', 'pt-BR');
        case 'random':
          return Math.random() - 0.5;
        default:
          return 0;
      }
    });

    return filtered;
  }, [projects, selectedCategory, sortBy]);

  // O restante do arquivo continua idêntico
  const displayProjects = React.useMemo(() => {
    if (revealMode === 'all') return processedProjects;
    return processedProjects.slice(0, revealedCount);
  }, [processedProjects, revealMode, revealedCount]);

  const shuffleProjects = () => {
    setSortBy('random');
  };

  const revealMore = () => {
    setRevealedCount(prev => Math.min(prev + 6, processedProjects.length));
  };

  const clearCategory = () => {
    setSelectedCategory('');
  };

  const getCardVariant = (index: number) => {
    if (viewMode === 'list') return 'compact';
    if (index < 3 && !selectedCategory) return 'featured';
    return 'default';
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header with Exploration Theme */}
        <motion.div 
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-bold">Território de Exploração</h1>
                {selectedCategory && (
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    <MapPin className="h-3 w-3 mr-1" />
                    {selectedCategory}
                  </Badge>
                )}
              </div>
              
              <p className="text-muted-foreground text-lg">
                {isLoading ? (
                  'Mapeando territórios...'
                ) : selectedCategory ? (
                  <>
                    {processedProjects.length} projeto{processedProjects.length !== 1 ? 's' : ''} neste território
                    {processedProjects.length !== displayProjects.length && revealMode === 'progressive' && (
                      <span className="text-primary"> • {processedProjects.length - displayProjects.length} ainda ocultos</span>
                    )}
                  </>
                ) : (
                  <>
                    {(projects?.length || 0)} projeto{(projects?.length || 0) !== 1 ? 's' : ''} aguardando descoberta
                    {processedProjects.length !== displayProjects.length && revealMode === 'progressive' && (
                      <span className="text-primary"> • {processedProjects.length - displayProjects.length} ainda por revelar</span>
                    )}
                  </>
                )}
              </p>
            </div>

            {/* Controls */}
            <div className="flex gap-3 flex-wrap">
              <Select value={sortBy} onValueChange={(value: 'date' | 'title' | 'category' | 'random') => setSortBy(value)}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">
                    <Clock className="h-4 w-4 mr-2 inline" />
                    Por Data
                  </SelectItem>
                  <SelectItem value="title">Alfabética</SelectItem>
                  <SelectItem value="category">Por Categoria</SelectItem>
                  <SelectItem value="random">
                    <Zap className="h-4 w-4 mr-2 inline" />
                    Surpresa
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select value={viewMode} onValueChange={setViewMode}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grid">
                    <Grid3X3 className="h-4 w-4 mr-2 inline" />
                    Grade
                  </SelectItem>
                  <SelectItem value="list">
                    <List className="h-4 w-4 mr-2 inline" />
                    Lista
                  </SelectItem>
                  <SelectItem value="timeline">
                    <Clock className="h-4 w-4 mr-2 inline" />
                    Timeline
                  </SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={shuffleProjects} className="gap-2">
                <Shuffle className="h-4 w-4" />
                Misturar
              </Button>
            </div>
          </div>

          {/* Category Filter */}
          {!selectedCategory && categories.length > 0 && (
            <Card className="bg-gradient-to-r from-muted/30 to-muted/10">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Compass className="h-5 w-5 text-primary" />
                  <span className="font-medium">Explorar por Território</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.slice(0, 8).map((category) => (
                    <Button
                      key={category}
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {category}
                    </Button>
                  ))}
                  {categories.length > 8 && (
                    <Badge variant="secondary" className="px-3 py-1">
                      +{categories.length - 8} mais
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Active Filters */}
          {selectedCategory && (
            <div className="flex gap-2 items-center">
              <span className="text-sm text-muted-foreground font-medium">Explorando:</span>
              <Badge variant="secondary" className="gap-2">
                <Filter className="h-3 w-3" />
                {selectedCategory}
                <button 
                  onClick={clearCategory}
                  className="ml-1 hover:bg-muted-foreground/20 rounded p-0.5 transition-colors"
                  aria-label="Limpar filtro"
                >
                  ×
                </button>
              </Badge>
            </div>
          )}
        </motion.div>

        {/* Projects Grid/List */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(9)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className={`bg-muted rounded-lg ${viewMode === 'list' ? 'h-24' : 'h-80'}`} />
                </div>
              ))}
            </motion.div>
          ) : processedProjects.length === 0 ? (
            <motion.div 
              className="text-center py-16 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="text-6xl">🗺️</div>
              <h3 className="text-2xl font-bold">Território Inexplorado</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                {selectedCategory 
                  ? `Ainda não há projetos mapeados no território "${selectedCategory}". Que tal explorar outros territórios?`
                  : 'Este território ainda está sendo mapeado. Volte em breve para novas descobertas!'
                }
              </p>
              {selectedCategory && (
                <Button variant="outline" onClick={clearCategory} className="gap-2">
                  <Compass className="h-4 w-4" />
                  Explorar Outros Territórios
                </Button>
              )}
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}
            >
              {displayProjects.map((project, index) => (
                <motion.div key={project.id} variants={itemVariants}>
                  <ProjectCard 
                    project={project}
                    variant={getCardVariant(index)}
                    index={index}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progressive Reveal Button */}
        {revealMode === 'progressive' && displayProjects.length < processedProjects.length && (
          <motion.div 
            className="text-center py-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="inline-block bg-gradient-to-r from-primary/5 to-purple-500/5 border-primary/20">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 justify-center">
                    <Gem className="h-6 w-6 text-primary" />
                    <span className="text-lg font-semibold">Mais Tesouros Aguardam</span>
                  </div>
                  <p className="text-muted-foreground">
                    {processedProjects.length - displayProjects.length} projetos ainda estão ocultos neste território
                  </p>
                  <Button onClick={revealMore} className="gap-2" size="lg">
                    <Eye className="h-4 w-4" />
                    Revelar Mais Projetos
                    <Sparkles className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Exploration Stats */}
        {displayProjects.length > 0 && (
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-6 text-sm text-muted-foreground bg-muted/30 px-6 py-3 rounded-full">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                <span>{displayProjects.length} projetos descobertos</span>
              </div>
              {selectedCategory && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Território: {selectedCategory}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>Modo: {viewMode === 'grid' ? 'Exploração' : 'Lista'}</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
};

export default Projects;
