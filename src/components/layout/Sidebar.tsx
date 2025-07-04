// src/components/layout/Sidebar/Sidebar.tsx – enterprise-grade look & feel
import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';

import { useUIStore } from '@/stores/uiStore';
import { useCategories } from '@/hooks/useProjects';
import { navItems } from './Sidebar/constants';

import { SiRocket } from '@/lib/languageColors/icons';
import { getCategoryColor } from '@/lib/languageColors';
import { GradientIcon } from '@/components/GradientIcon';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------
   Tokens & metrics
------------------------------------------------------------------- */
const SIZE_MIN   = 64;   // px – collapsed
const SIZE_FULL  = 280;  // px – expanded
const ICON_ZONE  = 64;   // px – fixed area for icons

/* ------------------------------------------------------------------
   Button component
------------------------------------------------------------------- */
interface SideBtnProps {
  icon: ReactNode;
  label: string;
  title: string;
  qty?: number;           // opcional – badge do lado direito
  active?: boolean;
  onClick?: () => void;
  small?: boolean;        // tipografia menor (categorias)
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
      {/* left accent bar */}
      <span
        className={cn(
          'absolute left-0 top-0 h-full w-1 rounded-r',
          active ? 'bg-primary' : 'group-hover:bg-muted/40'
        )}
      />

      {/* icon zone */}
      <div className="relative z-10 shrink-0 flex items-center justify-center w-16">
        {icon}
      </div>

      {/* label & qty */}
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
  const { collapsed, sidebarMode, toggleSidebar, selectedCategory, setSelectedCategory } = useUIStore();
  const { data: rawCats = [] } = useCategories();
  const location = useLocation();
  const navigate = useNavigate();

  /* ---------- lists ---------- */
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
      {/* Navigation */}
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

      {/* Categories */}
      <section className="space-y-1">
        {categories.map(c => {
          const cfg = getCategoryColor(c.name);
          const iconEl = (cfg.name === 'combined' || c.name.includes('+') || cfg.name === 'python')
            ? <GradientIcon icon={cfg.icon} gradient={cfg.gradient} className="h-4 w-4" />
            : <cfg.icon className="h-4 w-4" style={{ color: cfg.color }} />;

          return (
            <SideBtn
              key={c.name}
              small
              qty={c.count}
              icon={iconEl}
              label={c.name}
              title={`${c.name} (${c.count})`}
              active={selectedCategory === c.name && location.pathname === '/projects'}
              onClick={() => go('/projects', c.name)}
            />
          );
        })}
      </section>
    </ScrollArea>
  );

  /* ---------- overlay ---------- */
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
              className="absolute top-16 left-0 h-[calc(100vh-4rem)] w-[280px] bg-background/95 backdrop-blur-xl shadow-xl border-r border-border/30"
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

  /* ---------- push ---------- */
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
