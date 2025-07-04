import React, { useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';

import { useUIStore } from '@/stores/uiStore';
import { useCategories } from '@/hooks/useProjects';
import { navItems } from './Sidebar/constants';

import { CategoryItem } from './Sidebar/CategoryItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------
   Tokens & metrics
------------------------------------------------------------------- */
const SIZE_MIN   = 64;   // px – collapsed
const SIZE_FULL  = 250;  // px – expanded

/* ------------------------------------------------------------------
   Button component
------------------------------------------------------------------- */
interface SideBtnProps {
  icon: ReactNode;
  label: string;
  title: string;
  qty?: number;
  active?: boolean;
  onClick?: () => void;
  small?: boolean;
}

const SideBtn: React.FC<SideBtnProps> = ({ icon, label, title, qty, active, onClick, small }) => {
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
            className="flex grow items-center justify-between pr-4 gap-2"
          >
            <span className={cn(small ? 'text-xs font-medium' : 'text-sm font-semibold', 'truncate')}>{label}</span>
            {qty !== undefined && (
              <span className="text-[10px] font-bold bg-muted/30 text-muted-foreground rounded px-1.5 py-0.5">
                {qty}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

/* ------------------------------------------------------------------
   Sidebar
------------------------------------------------------------------- */
export const Sidebar: React.FC = () => {
  const {
    collapsed,
    sidebarMode,
    toggleSidebar,
    setSidebarOpen,
    selectedCategory,
    setSelectedCategory
  } = useUIStore();

  // Carrega sempre minimizado (sidebar fechado)
  useEffect(() => {
    setSidebarOpen(false);
  }, [setSidebarOpen]);

  const { data: rawCats = [] } = useCategories();
  const location = useLocation();
  const navigate = useNavigate();

  const navList = useMemo(() => navItems.filter(n => n.href !== '/'), []);
  const categories = useMemo(() => {
    const map = new Map<string, (typeof rawCats)[0]>();
    rawCats.forEach(c => !map.has(c.name) && map.set(c.name, c));
    return Array.from(map.values()).slice(0, 12);
  }, [rawCats]);

  const go = (href: string, cat = '') => {
    setSelectedCategory(cat);
    navigate(href);
    if (sidebarMode === 'overlay') toggleSidebar();
  };

  const ScrollContent = (
    <ScrollArea className="flex-1 py-4">
      <section className="space-y-1">
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

      <div className="my-5 border-t border-border/40" />

      <section className="space-y-1">
        {categories.map((category, i) => (
          <CategoryItem
            key={category.name}
            category={category}
            isActive={selectedCategory === category.name && location.pathname === '/projects'}
            index={i}
            onClick={() => go('/projects', category.name)}
          />
        ))}
      </section>
    </ScrollArea>
  );

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
              className="absolute top-16 left-0 h-[calc(100vh-4rem)] w-[280px] backdrop-blur-xl shadow-xl border-r border-border/30"
              style={{ background: 'linear-gradient(180deg, rgba(5,10,23,1) 0%, rgba(24,21,52,1) 100%)' }}
            >
              {ScrollContent}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <motion.aside
      layout
      initial={false}
      animate={{ width: collapsed ? SIZE_MIN : SIZE_FULL }}
      transition={{ type: 'spring', stiffness: 260, damping: 28 }}
      className="fixed top-16 left-0 h-[calc(100vh-4rem)] backdrop-blur-lg border-r border-border/25 shadow-lg z-30 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, rgba(5,10,23,1) 0%, rgba(24,21,52,1) 100%)' }}
    >
      {ScrollContent}
    </motion.aside>
  );
};
