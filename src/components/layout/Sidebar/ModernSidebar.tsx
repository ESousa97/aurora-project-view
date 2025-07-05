// src/components/layout/Sidebar/ModernSidebar.tsx
import React, { useMemo, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';

import { useUIStore } from '@/stores/uiStore';
import { navItems } from './constants';
import { getStackCategories, type StackCategory } from '@/utils/stackCategorization';

import { SiRocket } from '@/lib/languageColors/icons';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TechStackItem } from './TechStackItem';
import { cn } from '@/lib/utils';

const SIZE_MIN = 64;   
const SIZE_FULL = 320; // Aumentado para acomodar as tech tags

interface SideBtnProps {
  icon: ReactNode;
  label: string;
  title: string;
  active?: boolean;
  onClick?: () => void;
}

const SideBtn: React.FC<SideBtnProps> = ({ icon, label, title, active, onClick }) => {
  const { collapsed } = useUIStore();

  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={cn(
        'group relative flex w-full items-center h-11 rounded-md overflow-hidden',
        'transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60',
        active
          ? 'bg-primary/20 text-primary shadow-sm'
          : 'hover:bg-muted/10 text-foreground/80',
      )}
    >
      <span
        className={cn(
          'absolute left-0 top-0 h-full w-1 rounded-r',
          active ? 'bg-primary' : 'group-hover:bg-muted/40'
        )}
      />

      <div className="relative z-10 shrink-0 flex items-center justify-center w-16">
        {icon}
      </div>

      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            key="content"
            initial={{ x: -8, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -8, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="flex grow items-center pr-4"
          >
            <span className="text-sm font-semibold truncate">{label}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export const ModernSidebar: React.FC = () => {
  const { collapsed, sidebarMode, toggleSidebar, selectedCategory, setSelectedCategory } = useUIStore();
  const [stackCategories, setStackCategories] = useState<StackCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Load stack categories
  useEffect(() => {
    const loadStackCategories = async () => {
      try {
        console.log('🔄 Loading stack categories for sidebar...');
        setLoading(true);
        const categories = await getStackCategories();
        console.log('✅ Stack categories loaded:', categories);
        setStackCategories(categories);
      } catch (error) {
        console.error('❌ Error loading stack categories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStackCategories();
  }, []);

  const navList = useMemo(() => navItems.filter(n => n.href !== '/'), []);

  const go = (href: string, category = '') => {
    setSelectedCategory(category);
    navigate(href);
    if (sidebarMode === 'overlay') toggleSidebar();
  };

  const handleStackCategoryClick = (stackCategory: StackCategory) => {
    // Para stack categories, vamos usar o nome como filtro
    go('/projects', stackCategory.name);
  };

  const ScrollContent = (
    <ScrollArea className="flex-1 py-4">
      {/* Navigation */}
      <section className="px-3 space-y-1">
        <h3 className="text-xs font-semibold uppercase text-muted-foreground mb-3 px-2">
          Navegação
        </h3>
        {navList.map(item => (
          <SideBtn
            key={item.href}
            icon={<item.icon className="h-5 w-5 text-primary" />}
            label={item.name}
            title={item.name}
            active={location.pathname === item.href}
            onClick={() => go(item.href)}
          />
        ))}
      </section>

      <div className="my-6 mx-3 border-t border-border/40" />

      {/* Stack Categories */}
      <section className="px-3">
        <h3 className="text-xs font-semibold uppercase text-muted-foreground mb-4 px-2 flex items-center justify-between">
          <span>Tech Stacks</span>
          {!collapsed && !loading && (
            <span className="text-[10px] bg-muted/30 text-muted-foreground rounded px-1.5 py-0.5">
              {stackCategories.length}
            </span>
          )}
        </h3>

        {loading && !collapsed ? (
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 bg-muted/20 rounded animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            {stackCategories.map((stackCategory, index) => (
              <TechStackItem
                key={stackCategory.name}
                stackCategory={stackCategory}
                isActive={selectedCategory === stackCategory.name && location.pathname === '/projects'}
                index={index}
                collapsed={collapsed}
                onClick={() => handleStackCategoryClick(stackCategory)}
              />
            ))}
          </div>
        )}

        {!loading && stackCategories.length === 0 && !collapsed && (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">
              Nenhuma stack encontrada
            </p>
          </div>
        )}
      </section>
    </ScrollArea>
  );

  /* Overlay mode */
  if (sidebarMode === 'overlay') {
    return (
      <AnimatePresence>
        {!collapsed && (
          <motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="absolute inset-0 bg-black/65 backdrop-blur-sm" onClick={toggleSidebar} />
            <motion.aside
              initial={{ x: -SIZE_FULL }}
              animate={{ x: 0 }}
              exit={{ x: -SIZE_FULL }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              className="absolute top-16 left-0 h-[calc(100vh-4rem)] w-[320px] bg-background/95 backdrop-blur-xl shadow-xl border-r border-border/30"
            >
              <div className="h-12 flex items-center justify-center border-b border-border/30">
                <Link to="/" className="p-2 rounded hover:bg-muted/10">
                  <SiRocket className="h-6 w-6 text-primary" />
                </Link>
              </div>
              {ScrollContent}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  /* Push mode */
  return (
    <motion.aside
      layout
      initial={false}
      animate={{ width: collapsed ? SIZE_MIN : SIZE_FULL }}
      transition={{ type: 'spring', stiffness: 260, damping: 28 }}
      className="fixed top-16 left-0 h-[calc(100vh-4rem)] bg-background/90 backdrop-blur-lg border-r border-border/25 shadow-lg z-30 overflow-hidden"
    >
      <div className="h-12 flex items-center justify-center border-b border-border/30">
        <Link to="/" className="p-2 rounded hover:bg-muted/10">
          <SiRocket className="h-6 w-6 text-primary" />
        </Link>
      </div>
      {ScrollContent}
    </motion.aside>
  );
};