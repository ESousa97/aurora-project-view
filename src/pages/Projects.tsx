import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { EnhancedProjectCard } from '@/components/project/EnhancedProjectCard';
import { ProjectCardSkeleton, StatsLoading } from '@/components/ui/loading';
import { useProjectsWithLanguage, useCategories } from '@/hooks/useCategories';
import { useUIStore } from '@/stores/uiStore';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Compass, MapPin, Filter, Sparkles, Target, TrendingUp, Zap } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getCategoryColor, detectLanguage } from '@/lib/languageColors';
import { isWithinInterval, subDays } from 'date-fns';

const Projects = () => {
  const { data: allProjects, isLoading: projectsLoading } = useProjectsWithLanguage();
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

  // Estatísticas melhoradas com informações de linguagem
  const stats = React.useMemo(() => {
    if (!processedProjects) return { total: 0, recent: 0, languages: 0, highConfidence: 0 };

    const uniqueLanguages = new Set();
    let recentCount = 0;
    let highConfidenceCount = 0;

    processedProjects.forEach(project => {
      if (!project) return;
      
      const language = project.detectedLanguage;
      uniqueLanguages.add(language.name);
      
      if (project.languageMetadata?.confidence >= 80) {
        highConfidenceCount++;
      }
      
      if (project.data_modificacao && isWithinInterval(new Date(project.data_modificacao), {
        start: subDays(new Date(), 7),
        end: new Date()
      })) {
        recentCount++;
      }
    });

    return {
      total: processedProjects.length,
      recent: recentCount, 
      languages: uniqueLanguages.size,
      highConfidence: highConfidenceCount
    };
  }, [processedProjects]);

  // Cor da categoria selecionada
  const categoryColor = selectedCategory ? getCategoryColor(selectedCategory) : null;

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header Enhanced com informações de linguagem */}
        <motion.div 
          className="space-y-6" 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Hero Section */}
          <div className="relative">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl font-bold">
                    {selectedCategory ? `Território: ${selectedCategory}` : 'Exploração Completa'}
                  </h1>
                  {selectedCategory && (
                    <div className="flex items-center gap-2">
                      <div 
                        className={`w-4 h-4 rounded-full bg-gradient-to-r ${categoryColor?.gradient}`} 
                      />
                      <Badge 
                        className="border-0"
                        style={{ backgroundColor: `${categoryColor?.color}20`, color: categoryColor?.color }}
                      >
                        {categoryColor?.icon} {selectedCategory}
                      </Badge>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    <span>{stats.total} projeto{stats.total !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    <span>{stats.languages} linguagen{stats.languages !== 1 ? 's' : ''}</span>
                  </div>
                  {stats.recent > 0 && (
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-green-600">{stats.recent} recente{stats.recent !== 1 ? 's' : ''}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-3 flex-wrap">
                <Select value={sortBy} onValueChange={(value: 'date' | 'title') => setSortBy(value)}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">
                      <Clock className="h-4 w-4 mr-2 inline" />
                      Por Data
                    </SelectItem>
                    <SelectItem value="title">Alfabética</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={viewMode} onValueChange={setViewMode}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grid">Grade</SelectItem>
                    <SelectItem value="list">Lista</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filters */}
            {selectedCategory && (
              <motion.div 
                className="flex gap-2 items-center mt-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <span className="text-sm text-muted-foreground font-medium">Explorando:</span>
                <Badge 
                  variant="secondary" 
                  className="gap-2 cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors"
                  onClick={clearCategory}
                >
                  <Filter className="h-3 w-3" /> 
                  {selectedCategory}
                  <span className="ml-1 hover:bg-muted-foreground/20 rounded p-0.5 transition-colors">×</span>
                </Badge>
              </motion.div>
            )}
          </div>

          {/* Quick Stats com métricas de linguagem */}
          {!isLoading && processedProjects.length > 0 && (
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-5 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="text-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-0">
                <CardContent className="pt-4 pb-3">
                  <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                    {stats.total}
                  </div>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                    Total de Projetos
                  </p>
                </CardContent>
              </Card>

              {stats.recent > 0 && (
                <Card className="text-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-0">
                  <CardContent className="pt-4 pb-3">
                    <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                      {stats.recent}
                    </div>
                    <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                      Recentes (7 dias)
                    </p>
                  </CardContent>
                </Card>
              )}

              <Card className="text-center bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950 dark:to-indigo-900 border-0">
                <CardContent className="pt-4 pb-3">
                  <div className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">
                    {stats.highConfidence}
                  </div>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                    Alta Confiança
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-0">
                <CardContent className="pt-4 pb-3">
                  <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                    {categories?.length || 0}
                  </div>
                  <p className="text-xs text-orange-600 dark:text-orange-400 font-medium">
                    Territórios
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>

        {/* Projects Grid com Enhanced Cards */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`} 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
            >
              {[...Array(6)].map((_, i) => (
                <ProjectCardSkeleton 
                  key={i} 
                  variant={viewMode === 'list' ? 'compact' : 'default'} 
                />
              ))}
            </motion.div>
          ) : processedProjects.length === 0 ? (
            <motion.div 
              className="text-center py-20 space-y-8" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-8xl"
              >
                🗺️
              </motion.div>
              
              <div className="space-y-4">
                <h3 className="text-3xl font-bold">Território Inexplorado</h3>
                <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                  {selectedCategory 
                    ? `Ainda não há projetos mapeados no território "${selectedCategory}". Que tal explorar outros territórios?`
                    : 'Nenhum projeto foi encontrado. Verifique os filtros ou tente uma nova busca.'
                  }
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" onClick={clearCategory} className="gap-2">
                  <Compass className="h-4 w-4" /> 
                  {selectedCategory ? 'Explorar Outros Territórios' : 'Ver Todos os Projetos'}
                </Button>
                {selectedCategory && (
                  <Button variant="ghost" onClick={() => window.location.reload()} className="gap-2">
                    <Sparkles className="h-4 w-4" />
                    Atualizar Dados
                  </Button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              variants={containerVariants} 
              initial="hidden" 
              animate="visible"
              className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}
            >
              {processedProjects.map((project, index) => (
                <motion.div key={project.id} variants={itemVariants}>
                  <EnhancedProjectCard 
                    project={project} 
                    variant={getCardVariant(index)} 
                    index={index} 
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination hint for future */}
        {!isLoading && processedProjects.length > 20 && (
          <motion.div 
            className="text-center py-8 space-y-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h4 className="text-lg font-semibold">Muitas descobertas!</h4>
            <p className="text-muted-foreground">
              Encontramos {processedProjects.length} projetos. Use os filtros para refinar sua busca.
            </p>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
};

export default Projects;
