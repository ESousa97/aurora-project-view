// src/components/layout/sidebar/SidebarCategories.tsx - Cores corrigidas
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCategories } from '@/hooks/useProjects';
import { useUIStore } from '@/stores/uiStore';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FolderOpen, Hash } from 'lucide-react';
import { cn } from '@/lib/utils';

// CORES SEGURAS - SEM AMARELO/LARANJA
const safeCategoryColors = [
  '#3B82F6', // blue-500
  '#10B981', // emerald-500
  '#8B5CF6', // violet-500
  '#06B6D4', // cyan-500
  '#F59E0B', // amber-500 (suave)
  '#EF4444', // red-500
  '#84CC16', // lime-500
  '#EC4899', // pink-500
  '#6366F1', // indigo-500
  '#14B8A6', // teal-500
  '#A855F7', // purple-500
  '#22C55E', // green-500
];

// Função para obter cor segura baseada no nome da categoria
const getSafeCategoryColor = (categoryName: string): string => {
  // Hash simples baseado no nome para consistência
  let hash = 0;
  for (let i = 0; i < categoryName.length; i++) {
    hash = ((hash << 5) - hash + categoryName.charCodeAt(i)) & 0xffffffff;
  }
  
  // Mapeamento especial para categorias conhecidas
  const specialMappings: Record<string, string> = {
    'frontend': '#3B82F6',     // blue-500
    'backend': '#10B981',      // emerald-500
    'fullstack': '#8B5CF6',    // violet-500
    'mobile': '#06B6D4',       // cyan-500
    'web': '#3B82F6',          // blue-500
    'api': '#10B981',          // emerald-500
    'database': '#6366F1',     // indigo-500
    'devops': '#84CC16',       // lime-500
    'ai': '#A855F7',           // purple-500
    'ml': '#A855F7',           // purple-500
    'machine learning': '#A855F7', // purple-500
    'blockchain': '#14B8A6',   // teal-500
    'javascript': '#3B82F6',   // blue-500 (não amarelo!)
    'typescript': '#3B82F6',   // blue-500
    'react': '#06B6D4',        // cyan-500
    'node': '#22C55E',         // green-500
    'python': '#3B82F6',       // blue-500
    'java': '#EF4444',         // red-500
    'php': '#8B5CF6',          // violet-500
  };
  
  const normalized = categoryName.toLowerCase().trim();
  if (specialMappings[normalized]) {
    return specialMappings[normalized];
  }
  
  // Fallback para hash
  const index = Math.abs(hash) % safeCategoryColors.length;
  return safeCategoryColors[index];
};

export const SidebarCategories: React.FC = () => {
  const { data: categories = [], isLoading } = useCategories();
  const { selectedCategory, setSelectedCategory } = useUIStore();
  const navigate = useNavigate();

  const onAllProjectsClick = () => {
    setSelectedCategory('');
    navigate('/projects');
  };

  const onCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    navigate('/projects');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
          Categorias
        </h3>
        <Badge variant="outline" className="text-xs">
          {categories.length}
        </Badge>
      </div>

      {/* Todos os projetos */}
      <Button
        variant={selectedCategory === '' ? 'secondary' : 'ghost'}
        className="w-full justify-between h-10 mb-3 font-medium"
        onClick={onAllProjectsClick}
      >
        <div className="flex items-center gap-3">
          <FolderOpen className="h-4 w-4 flex-shrink-0" />
          <span>Todos</span>
        </div>
        <Badge variant="outline" className="text-xs">
          {categories.reduce((sum, c) => sum + c.count, 0)}
        </Badge>
      </Button>

      {/* Lista de categorias */}
      <div className="space-y-1">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div 
              key={i} 
              className="h-10 rounded-lg animate-pulse"
              style={{ backgroundColor: 'hsl(var(--muted))' }}
            />
          ))
        ) : (
          categories.slice(0, 12).map((cat, i) => {
            const active = selectedCategory === cat.name;
            const safeColor = getSafeCategoryColor(cat.name);
            
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Button
                  variant={active ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-between h-10 font-medium transition-all duration-200',
                    active 
                      ? 'bg-secondary text-secondary-foreground border border-border'
                      : 'hover:bg-secondary/50 text-muted-foreground hover:text-foreground'
                  )}
                  onClick={() => onCategoryClick(cat.name)}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-sm flex items-center justify-center transition-all duration-200"
                      style={{ 
                        backgroundColor: `${safeColor}20`,
                        border: `1px solid ${safeColor}40`
                      }}
                    >
                      <Hash 
                        className="h-3 w-3" 
                        style={{ color: safeColor }}
                      />
                    </div>
                    <span className="truncate text-sm">{cat.name}</span>
                  </div>
                  <Badge 
                    variant="outline" 
                    className="text-xs"
                    style={{
                      borderColor: `${safeColor}40`,
                      color: safeColor
                    }}
                  >
                    {cat.count}
                  </Badge>
                </Button>
              </motion.div>
            );
          })
        )}

        {categories.length > 12 && (
          <Button
            variant="ghost"
            className="w-full justify-center h-10 text-sm text-muted-foreground mt-2 hover:bg-secondary/50"
            onClick={() => navigate('/projects')}
          >
            Ver mais categorias...
          </Button>
        )}
      </div>
    </div>
  );
};
