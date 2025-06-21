// src/pages/Projects.tsx
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ProjectCard } from '@/components/project/ProjectCard';
import { useProjects, useCategories } from '@/hooks/useProjects';
import { useUIStore } from '@/stores/uiStore';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Shuffle, Grid3X3, List, Clock, Compass, MapPin, Filter } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Projects = () => {
  const { data: allProjects, isLoading: projectsLoading } = useProjects();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { viewMode, setViewMode, selectedCategory, setSelectedCategory } = useUIStore();
  
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [sortBy, setSortBy] = React.useState<'date' | 'title'>('date');

  const isLoading = projectsLoading || categoriesLoading;

  React.useEffect(() => {
    if (categoryParam && categoryParam !== selectedCategory) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam, selectedCategory, setSelectedCategory]);

  const processedProjects = React.useMemo(() => {
    if (!allProjects || !categories) return [];

    let projectsToDisplay = [];

    if (selectedCategory) {
      const categoryData = categories.find(cat => cat.name.toLowerCase() === selectedCategory.toLowerCase());
      
      if (categoryData) {
        // CORREÇÃO: "Hidratar" os projetos resumidos com os dados completos
        const projectIds = new Set(categoryData.projects.map(p => p.id));
        projectsToDisplay = allProjects.filter(p => projectIds.has(p.id));
      } else {
        projectsToDisplay = [];
      }

    } else {
      projectsToDisplay = allProjects;
    }

    return [...projectsToDisplay].sort((a, b) => {
      if (sortBy === 'date') {
        const dateA = a.data_modificacao ? new Date(a.data_modificacao).getTime() : 0;
        const dateB = b.data_modificacao ? new Date(b.data_modificacao).getTime() : 0;
        return dateB - dateA;
      }
      if (sortBy === 'title') {
        return (a.titulo || '').localeCompare(b.titulo || '', 'pt-BR');
      }
      return 0;
    });
  }, [allProjects, categories, selectedCategory, sortBy]);

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
    visible: { transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div className="flex flex-col gap-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-bold">Território de Exploração</h1>
                {selectedCategory && (
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    <MapPin className="h-3 w-3 mr-1" />{selectedCategory}
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground text-lg">
                {isLoading ? 'Mapeando territórios...' : `${processedProjects.length} projeto${processedProjects.length !== 1 ? 's' : ''} encontrado${processedProjects.length !== 1 ? 's' : ''}`}
              </p>
            </div>
            {/* Controles */}
            <div className="flex gap-3 flex-wrap">
              <Select value={sortBy} onValueChange={(value: 'date' | 'title') => setSortBy(value)}>
                <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="date"><Clock className="h-4 w-4 mr-2 inline" />Por Data</SelectItem>
                  <SelectItem value="title">Alfabética</SelectItem>
                </SelectContent>
              </Select>
              <Select value={viewMode} onValueChange={setViewMode}>
                <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="grid"><Grid3X3 className="h-4 w-4 mr-2 inline" />Grade</SelectItem>
                  <SelectItem value="list"><List className="h-4 w-4 mr-2 inline" />Lista</SelectItem>
                  <SelectItem value="timeline"><Clock className="h-4 w-4 mr-2 inline" />Timeline</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* Filtros Ativos */}
          {selectedCategory && (
            <div className="flex gap-2 items-center">
              <span className="text-sm text-muted-foreground font-medium">Explorando:</span>
              <Badge variant="secondary" className="gap-2">
                <Filter className="h-3 w-3" /> {selectedCategory}
                <button onClick={clearCategory} className="ml-1 hover:bg-muted-foreground/20 rounded p-0.5 transition-colors" aria-label="Limpar filtro">×</button>
              </Badge>
            </div>
          )}
        </motion.div>

        {/* Grade de Projetos */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse"><div className={`bg-muted rounded-lg ${viewMode === 'list' ? 'h-24' : 'h-80'}`} /></div>
              ))}
            </motion.div>
          ) : processedProjects.length === 0 ? (
            <motion.div className="text-center py-16 space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="text-6xl">🗺️</div>
              <h3 className="text-2xl font-bold">Território Inexplorado</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Ainda não há projetos mapeados no território "{selectedCategory}". Que tal explorar outros territórios?
              </p>
              <Button variant="outline" onClick={clearCategory} className="gap-2">
                <Compass className="h-4 w-4" /> Explorar Outros Territórios
              </Button>
            </motion.div>
          ) : (
            <motion.div variants={containerVariants} initial="hidden" animate="visible"
              className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {processedProjects.map((project, index) => (
                <motion.div key={project.id} variants={itemVariants}>
                  <ProjectCard project={project} variant={getCardVariant(index)} index={index} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  );
};

export default Projects;
