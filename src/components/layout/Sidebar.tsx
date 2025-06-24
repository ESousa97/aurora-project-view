// src/components/layout/Sidebar.tsx - Enhanced Professional Sidebar
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Home, FolderOpen, Compass, BarChart3, Settings, 
  Grid3X3, List, Clock, ChevronRight, Sparkles,
  Target, Award, TrendingUp, Activity, Brain,
  Rocket, Shield, Crown, Star, Zap, Globe,
  Code2, Database, Palette, Cpu, Layers,
  Search, BookOpen, Heart, Eye, Users,
  BrainCircuit, Flame, Diamond, Trophy,
  LucideIcon
} from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';
import { useCategories, useProjects } from '@/hooks/useProjects';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getCategoryColor, detectLanguage, getTechnologyStats } from '@/lib/languageColors';
import { motion, AnimatePresence } from 'framer-motion';
import { isWithinInterval, subDays } from 'date-fns';

const navigationItems = [
  { 
    name: 'Base de Operações', 
    href: '/', 
    icon: Rocket,
    description: 'Central de comando',
    color: 'text-blue-600'
  },
  { 
    name: 'Explorar Territórios', 
    href: '/projects', 
    icon: Compass,
    description: 'Descobrir projetos',
    color: 'text-green-600'
  },
  { 
    name: 'Centro de Comando', 
    href: '/dashboard', 
    icon: BarChart3,
    description: 'Analytics e métricas',
    color: 'text-purple-600'
  },
  { 
    name: 'Configurações', 
    href: '/settings', 
    icon: Settings,
    description: 'Personalizar experiência',
    color: 'text-gray-600'
  },
];

const viewModes = [
  { id: 'grid', name: 'Grade', icon: Grid3X3, description: 'Visualização em cartões' },
  { id: 'list', name: 'Lista', icon: List, description: 'Visualização compacta' },
  { id: 'timeline', name: 'Timeline', icon: Clock, description: 'Cronologia de projetos' }, 
] as const;

// Icons for different technology categories
const categoryIcons: Record<string, LucideIcon> = {
  'frontend': Palette,
  'backend': Database,
  'mobile': Cpu,
  'database': Database,
  'devops': Shield,
  'ai': Brain,
  'design': Palette,
  'other': Code2,
  'fullstack': Layers,
  'web': Globe
};

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    sidebarOpen, 
    viewMode, 
    selectedCategory, 
    setViewMode, 
    setSelectedCategory 
  } = useUIStore();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: projects } = useProjects();

  // Calculate user progression and stats
  const userStats = React.useMemo(() => {
    if (!projects || !categories) {
      return {
        explorationLevel: 1,
        explorationProgress: 0,
        totalDiscovered: 0,
        categoriesExplored: 0,
        recentActivity: 0,
        achievements: []
      };
    }

    const totalProjects = projects.length;
    const totalCategories = categories.length;
    const recentProjects = projects.filter(p => 
      p.data_modificacao && isWithinInterval(new Date(p.data_modificacao), {
        start: subDays(new Date(), 7),
        end: new Date()
      })
    ).length;

    // Simulate exploration progress
    const explorationProgress = Math.min((totalProjects / 100) * 100, 100);
    const explorationLevel = Math.floor(explorationProgress / 20) + 1;
    
    const achievements = [
      { id: 'first_discovery', name: 'Primeira Descoberta', icon: Star, unlocked: totalProjects > 0 },
      { id: 'explorer', name: 'Explorador', icon: Compass, unlocked: totalProjects >= 10 },
      { id: 'tech_hunter', name: 'Caçador de Tecnologias', icon: Target, unlocked: totalCategories >= 5 },
      { id: 'master_explorer', name: 'Mestre Explorador', icon: Crown, unlocked: totalProjects >= 50 },
      { id: 'legend', name: 'Lenda Viva', icon: Trophy, unlocked: totalProjects >= 100 }
    ];

    return {
      explorationLevel,
      explorationProgress,
      totalDiscovered: totalProjects,
      categoriesExplored: totalCategories,
      recentActivity: recentProjects,
      achievements: achievements.filter(a => a.unlocked)
    };
  }, [projects, categories]);

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    if (location.pathname !== '/projects') {
      navigate('/projects');
    }
  };

  const handleAllCategories = () => {
    setSelectedCategory('');
    if (location.pathname !== '/projects') {
      navigate('/projects');
    }
  };

  return (
    <div
      className={cn(
        "fixed inset-y-0 z-30 flex h-full w-80 flex-col border-r bg-background/95 backdrop-blur-lg transition-transform duration-300 ease-in-out lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <ScrollArea className="flex-1 px-4 py-6">
        {/* User Progress Section */}
        <motion.div 
          className="mb-8 p-4 bg-gradient-to-br from-primary/10 via-purple-500/10 to-primary/5 rounded-2xl border border-primary/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg">
              <BrainCircuit className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Explorador Nível {userStats.explorationLevel}</h3>
              <p className="text-sm text-muted-foreground">
                {userStats.totalDiscovered} descobertas realizadas
              </p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Progresso de Exploração</span>
              <span className="text-primary font-bold">{Math.round(userStats.explorationProgress)}%</span>
            </div>
            <Progress value={userStats.explorationProgress} className="h-2" />
            
            {/* Recent achievements */}
            {userStats.achievements.length > 0 && (
              <div className="flex items-center gap-2 pt-2">
                <span className="text-xs text-muted-foreground">Conquistas:</span>
                <div className="flex gap-1">
                  {userStats.achievements.slice(0, 3).map((achievement) => (
                    <div 
                      key={achievement.id}
                      className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-sm"
                      title={achievement.name}
                    >
                      <achievement.icon className="h-3 w-3 text-white" />
                    </div>
                  ))}
                  {userStats.achievements.length > 3 && (
                    <Badge variant="secondary" className="text-xs h-6">
                      +{userStats.achievements.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="space-y-2 mb-8">
          <h2 className="mb-4 px-4 text-sm font-semibold tracking-tight text-muted-foreground uppercase flex items-center gap-2">
            <Rocket className="h-4 w-4" />
            Navegação
          </h2>
          <div className="space-y-1">
            {navigationItems.map((item, index) => {
              const isActive = location.pathname === item.href;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    variant={isActive ? 'secondary' : 'ghost'}
                    className={cn(
                      "w-full justify-start h-12 group relative overflow-hidden",
                      isActive && "bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20"
                    )}
                    asChild
                  >
                    <Link to={item.href}>
                      <div className="flex items-center gap-3 w-full">
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                          isActive 
                            ? "bg-gradient-to-br from-primary to-purple-600 text-white shadow-lg" 
                            : "bg-muted group-hover:bg-primary/20"
                        )}>
                          <item.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs text-muted-foreground">{item.description}</div>
                        </div>
                        {isActive && (
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        )}
                      </div>
                    </Link>
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* View Modes - Only show on projects page */}
        {location.pathname === '/projects' && (
          <div className="space-y-2 mb-8">
            <h3 className="mb-4 px-4 text-sm font-semibold tracking-tight text-muted-foreground uppercase flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Visualização
            </h3>
            <div className="space-y-1">
              {viewModes.map((mode) => (
                <Button
                  key={mode.id}
                  variant={viewMode === mode.id ? 'secondary' : 'ghost'}
                  size="sm"
                  className="w-full justify-start h-10 group"
                  onClick={() => setViewMode(mode.id)}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className={cn(
                      "w-7 h-7 rounded-lg flex items-center justify-center transition-colors",
                      viewMode === mode.id 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted group-hover:bg-primary/20"
                    )}>
                      <mode.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-sm font-medium">{mode.name}</div>
                      <div className="text-xs text-muted-foreground">{mode.description}</div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-4 mb-4">
            <h3 className="text-sm font-semibold tracking-tight text-muted-foreground uppercase flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Territórios
              <Badge variant="outline" className="text-xs">
                {categories?.length || 0}
              </Badge>
            </h3>
            {selectedCategory && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleAllCategories}
                className="h-6 px-2 text-xs"
              >
                <span>Limpar</span>
              </Button>
            )}
          </div>
          
          <div className="space-y-1">
            <Button
              variant={selectedCategory === '' ? 'secondary' : 'ghost'}
              size="sm"
              className="w-full justify-start h-10 group"
              onClick={handleAllCategories}
            >
              <div className="flex items-center gap-3 w-full">
                <div className={cn(
                  "w-7 h-7 rounded-lg flex items-center justify-center transition-colors",
                  selectedCategory === '' 
                    ? "bg-gradient-to-br from-primary to-purple-600 text-white shadow-lg" 
                    : "bg-muted group-hover:bg-primary/20"
                )}>
                  <FolderOpen className="h-4 w-4" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium">Todos os Projetos</div>
                  <div className="text-xs text-muted-foreground">
                    {categories ? categories.reduce((total, cat) => total + cat.count, 0) : 0} projetos
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {categories ? categories.reduce((total, cat) => total + cat.count, 0) : 0}
                </Badge>
              </div>
            </Button>
            
            {categoriesLoading ? (
              <div className="space-y-2 px-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-10 bg-muted/50 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : categories && categories.length > 0 ? (
              <AnimatePresence>
                {categories.slice(0, 12).map((category, index) => {
                  const colorConfig = getCategoryColor(category.name);
                  const CategoryIcon = categoryIcons[colorConfig.category] || Code2;
                  const isSelected = selectedCategory === category.name;
                  
                  return (
                    <motion.div
                      key={category.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Button
                        variant={isSelected ? 'secondary' : 'ghost'}
                        size="sm"
                        className="w-full justify-between h-12 group relative overflow-hidden"
                        onClick={() => handleCategorySelect(category.name)}
                      >
                        {/* Background gradient effect */}
                        <div 
                          className={`absolute inset-0 bg-gradient-to-r ${colorConfig.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}
                        />
                        
                        <div className="flex items-center gap-3 flex-1 text-left min-w-0 relative z-10">
                          <div 
                            className={cn(
                              "w-8 h-8 rounded-xl flex items-center justify-center transition-all group-hover:scale-110",
                              isSelected 
                                ? "text-white shadow-lg" 
                                : "text-white"
                            )}
                            style={{ 
                              background: isSelected 
                                ? `linear-gradient(135deg, ${colorConfig.color}, ${colorConfig.color}CC)`
                                : `linear-gradient(135deg, ${colorConfig.color}CC, ${colorConfig.color}AA)`
                            }}
                          >
                            <CategoryIcon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate text-sm">{category.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {category.count} projeto{category.count !== 1 ? 's' : ''}
                              {colorConfig.trending && (
                                <span className="ml-1">🔥</span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 shrink-0 relative z-10">
                          <Badge 
                            variant="outline" 
                            className="text-xs border-current"
                            style={{ color: colorConfig.color }}
                          >
                            {category.count}
                          </Badge>
                          {!isSelected && (
                            <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
                          )}
                        </div>
                      </Button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            ) : (
              <div className="px-4 py-6 text-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Explorando Territórios</h4>
                    <p className="text-xs text-muted-foreground">
                      Mapeamento em andamento...
                    </p>
                  </div>
                </div>
              </div>
            )}

            {categories && categories.length > 12 && (
              <div className="px-4 py-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-xs text-muted-foreground hover:text-foreground justify-center"
                  onClick={() => navigate('/projects')}
                >
                  <span>+{categories.length - 12} territórios adicionais</span>
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        {userStats.recentActivity > 0 && (
          <motion.div 
            className="mt-8 p-4 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900 rounded-xl border border-green-200 dark:border-green-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">
                Atividade Recente
              </span>
            </div>
            <div className="text-xs text-green-600 dark:text-green-400">
              {userStats.recentActivity} projeto{userStats.recentActivity !== 1 ? 's' : ''} atualizado{userStats.recentActivity !== 1 ? 's' : ''} esta semana
            </div>
          </motion.div>
        )}
      </ScrollArea>
    </div>
  );
};
