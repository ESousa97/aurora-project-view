// src/components/layout/Sidebar/Sidebar.tsx
import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FolderOpen } from 'lucide-react';

import { useUIStore } from '@/stores/uiStore';
import { useCategories } from '@/hooks/useProjects';
import { navItems } from './Sidebar/constants';

import { SiRocket } from '@/lib/languageColors/icons';
import { getCategoryColor } from '@/lib/languageColors';
import { GradientIcon } from '@/components/GradientIcon';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

const W_MIN = 64;
const W_FULL = 320;

/* ---------- Botão base ---------- */
interface BtnProps {
  title: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  small?: boolean;            // font-size para categorias
}

const Btn: React.FC<BtnProps> = ({
  title,
  icon,
  label,
  active,
  onClick,
  small,
}) => {
  const { collapsed } = useUIStore();
  return (
    <button
      onClick={onClick}
      title={title}
      className={cn(
        'relative flex items-center h-10 w-full my-0.5 rounded-md transition-colors',
        active ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/20'
      )}
    >
      {/* Bloco fixo de 64 px com ícone centralizado */}
      <div className="w-16 flex justify-center">{icon}</div>

      {/* Texto flutuante */}
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.span
            key="lbl"
            initial={{ x: 8, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 8, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'absolute left-16 pr-3 whitespace-nowrap pointer-events-none',
              small ? 'text-xs' : 'text-sm'
            )}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};

export const Sidebar: React.FC = () => {
  /* ---------- Estado ---------- */
  const {
    collapsed,
    sidebarMode,
    toggleSidebar,
    selectedCategory,
    setSelectedCategory,
  } = useUIStore();

  const { data: rawCategories = [] } = useCategories();
  const location = useLocation();
  const navigate = useNavigate();

  /* ---------- Listas ---------- */
  const navList = useMemo(() => {
    const m = new Map<string, typeof navItems[0]>();
    navItems.forEach(i => i.href !== '/' && !m.has(i.href) && m.set(i.href, i));
    return Array.from(m.values());
  }, []);

  const categories = useMemo(() => {
    const m = new Map<string, typeof rawCategories[0]>();
    rawCategories.forEach(c => !m.has(c.name) && m.set(c.name, c));
    return Array.from(m.values()).slice(0, 8);
  }, [rawCategories]);

  const go = (href: string, cat = '') => {
    setSelectedCategory(cat);
    navigate(href);
    if (sidebarMode === 'overlay') toggleSidebar();
  };

  /* ---------- Scrollable Content ---------- */
  const Content = (
    <ScrollArea className="flex-1">
      {/* Navegação */}
      <nav className="pt-2 pb-3">
        {navList.map(item => (
          <Btn
            key={item.href}
            title={item.name}
            label={item.name}
            icon={<item.icon className="h-5 w-5 text-primary" />}
            active={location.pathname === item.href}
            onClick={() => go(item.href)}
          />
        ))}
      </nav>

      <div className="h-px bg-muted/30 mx-1 my-2" />

      {/* Categorias */}
      <nav>
        {categories.map(c => {
          const cfg = getCategoryColor(c.name);
          const multi =
            cfg.name === 'combined' || c.name.includes('+') || cfg.name === 'python';
          const iconNode = multi ? (
            <GradientIcon icon={cfg.icon} gradient={cfg.gradient} className="h-4 w-4" />
          ) : (
            <cfg.icon className="h-4 w-4" style={{ color: cfg.color }} />
          );

          return (
            <Btn
              key={c.name}
              small
              title={`${c.name} (${c.count})`}
              label={`${c.name} — ${c.count}`}
              icon={iconNode}
              active={
                selectedCategory === c.name && location.pathname === '/projects'
              }
              onClick={() => go('/projects', c.name)}
            />
          );
        })}
      </nav>
    </ScrollArea>
  );

  /* ---------- Overlay ---------- */
  if (sidebarMode === 'overlay') {
    return (
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/40"
              onClick={toggleSidebar}
            />
            <motion.aside
              initial={{ x: -W_FULL }}
              animate={{ x: 0 }}
              exit={{ x: -W_FULL }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              className="absolute top-16 left-0 h-[calc(100vh-4rem)] w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl border-r border-muted/30"
            >
              <div className="h-12 flex items-center justify-center">
                <Link to="/" className="p-2 rounded hover:bg-muted/20">
                  <SiRocket className="h-6 w-6 text-primary" />
                </Link>
              </div>
              {Content}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  /* ---------- Push (desktop) ---------- */
  return (
    <motion.aside
      layout
      initial={false}
      animate={{ width: collapsed ? W_MIN : W_FULL }}
      transition={{ type: 'spring', stiffness: 220, damping: 30 }}
      className="fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg border-r border-muted/30 z-30 overflow-hidden"
    >
      <div className="h-12 flex items-center justify-center">
        <Link to="/" className="p-2 rounded hover:bg-muted/20">
          <SiRocket className="h-6 w-6 text-primary" />
        </Link>
      </div>
      {Content}
    </motion.aside>
  );
};
