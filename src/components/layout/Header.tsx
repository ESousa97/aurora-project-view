// src/components/layout/Header.tsx - Professional Header with Enhanced UX
import React from 'react';
import { 
  Menu, Sun, Moon, Search, Bell, Settings, User, 
  Code2, Compass, Star, TrendingUp, Activity, 
  BrainCircuit, Rocket, Sparkles, Target, Award,
  Globe, Shield, Zap, Crown, Diamond
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useUIStore } from '@/stores/uiStore';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useProjects } from '@/hooks/useProjects';
import { isWithinInterval, subDays } from 'date-fns';

export const Header = () => {
  const { theme, toggleSidebar, setTheme } = useUIStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: projects } = useProjects();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showSearch, setShowSearch] = React.useState(false);
  const [notifications, setNotifications] = React.useState(3);

  // Keyboard shortcuts listener - movido para o corpo do componente
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(true);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Estatísticas em tempo real
  const liveStats = React.useMemo(() => {
    if (!projects) return { total: 0, recent: 0, trending: 0 };
    
    const recentCount = projects.filter(project => 
      project.data_modificacao && isWithinInterval(new Date(project.data_modificacao), {
        start: subDays(new Date(), 7),
        end: new Date()
      })
    ).length;

    return {
      total: projects.length,
      recent: recentCount,
      trending: Math.floor(recentCount * 0.6)
    };
  }, [projects]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/projects?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowSearch(false);
    }
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'Base de Operações';
      case '/projects': return 'Exploração Ativa';
      case '/dashboard': return 'Centro de Comando';
      case '/settings': return 'Configurações';
      default: 
        if (location.pathname.startsWith('/projects/')) return 'Análise de Projeto';
        return 'Navegação';
    }
  };

  const getPageIcon = () => {
    switch (location.pathname) {
      case '/': return <Rocket className="h-5 w-5" />;
      case '/projects': return <Compass className="h-5 w-5" />;
      case '/dashboard': return <Activity className="h-5 w-5" />;
      case '/settings': return <Settings className="h-5 w-5" />;
      default: 
        if (location.pathname.startsWith('/projects/')) return <Target className="h-5 w-5" />;
        return <Globe className="h-5 w-5" />;
    }
  };

  const isDashboard = location.pathname === '/dashboard';
  const isHomePage = location.pathname === '/';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      {/* Progress indicator for exploration */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-purple-500/40 to-primary/20" />
      
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Left section */}
        <div className="flex items-center gap-4">
          {/* Mobile menu trigger */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          {/* Logo and brand */}
          <motion.div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary via-purple-600 to-primary shadow-lg flex items-center justify-center group-hover:shadow-xl transition-shadow">
                <BrainCircuit className="h-5 w-5 text-white" />
              </div>
              {/* Notification dot */}
              {liveStats.recent > 0 && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background animate-pulse" />
              )}
            </div>
            
            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
                  ProjPortfólio
                </span>
                <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
                  PRO
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground">
                {liveStats.total} projetos • {liveStats.recent} novos
              </div>
            </div>
          </motion.div>

          {/* Page context indicator */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-full">
            {getPageIcon()}
            <span className="text-sm font-medium">{getPageTitle()}</span>
          </div>
        </div>

        {/* Center section - Search */}
        <div className="flex-1 max-w-xl mx-4">
          <AnimatePresence>
            {showSearch ? (
              <motion.form
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={handleSearch}
                className="relative"
              >
                <Input
                  placeholder="Buscar projetos, tecnologias..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10 bg-background/50 backdrop-blur-sm"
                  autoFocus
                  onBlur={() => !searchQuery && setShowSearch(false)}
                />
                <Button 
                  type="submit" 
                  size="sm" 
                  variant="ghost" 
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </motion.form>
            ) : (
              <Button
                variant="outline"
                className="w-full max-w-sm justify-start text-muted-foreground bg-background/50 backdrop-blur-sm"
                onClick={() => setShowSearch(true)}
              >
                <Search className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Buscar projetos...</span>
                <span className="sm:hidden">Buscar...</span>
                <Badge variant="secondary" className="ml-auto text-xs">⌘K</Badge>
              </Button>
            )}
          </AnimatePresence>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          {/* Live stats - Only on dashboard */}
          {isDashboard && (
            <div className="hidden lg:flex items-center gap-4 mr-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-muted-foreground">
                  {liveStats.recent} atualizações
                </span>
              </div>
            </div>
          )}

          {/* Discovery mode indicator - Only on home */}
          {isHomePage && (
            <motion.div 
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-full border border-primary/20"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium text-primary">Modo Descoberta</span>
              <Sparkles className="h-4 w-4 text-primary" />
            </motion.div>
          )}

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs p-0 flex items-center justify-center bg-red-500 border-background">
                    {notifications}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notificações
                <Badge variant="secondary" className="ml-auto">
                  {notifications}
                </Badge>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <DropdownMenuItem className="flex items-start gap-3 p-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 animate-pulse" />
                <div className="flex-1">
                  <div className="font-medium">Novos projetos descobertos</div>
                  <div className="text-sm text-muted-foreground">
                    {liveStats.recent} projetos foram adicionados esta semana
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">há 2 minutos</div>
                </div>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="flex items-start gap-3 p-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                <div className="flex-1">
                  <div className="font-medium">Atualização do sistema</div>
                  <div className="text-sm text-muted-foreground">
                    Novas funcionalidades de descoberta disponíveis
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">há 1 hora</div>
                </div>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="flex items-start gap-3 p-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                <div className="flex-1">
                  <div className="font-medium">Meta de exploração</div>
                  <div className="text-sm text-muted-foreground">
                    Você está próximo de completar 50 descobertas!
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">há 3 horas</div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="hidden md:inline text-sm font-medium">Explorador</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="flex items-center gap-2">
                <Award className="h-4 w-4 text-primary" />
                Explorador Nível 5
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <DropdownMenuItem className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                Projetos Favoritos
                <Badge variant="secondary" className="ml-auto">12</Badge>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Estatísticas
              </DropdownMenuItem>
              
              <DropdownMenuItem className="flex items-center gap-2">
                <Crown className="h-4 w-4" />
                Conquistas
                <Badge className="ml-auto bg-yellow-500 text-yellow-900">8</Badge>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem asChild>
                <Link to="/settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Configurações
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme toggle */}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleTheme} 
            className="relative group"
          >
            <div className="relative w-5 h-5">
              <Sun className={`h-5 w-5 absolute transition-all duration-300 ${
                theme === 'light' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'
              }`} />
              <Moon className={`h-5 w-5 absolute transition-all duration-300 ${
                theme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'
              }`} />
            </div>
          </Button>

          {/* Quick actions */}
          <div className="hidden xl:flex items-center gap-1 ml-2 pl-2 border-l">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/projects">
                <Compass className="h-4 w-4 mr-1" />
                Explorar
              </Link>
            </Button>
            
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard">
                <Activity className="h-4 w-4 mr-1" />
                Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
