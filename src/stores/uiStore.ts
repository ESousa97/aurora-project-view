import React from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UIStore {
  theme: 'light' | 'dark' | 'system';
  viewMode: 'grid' | 'list';
  selectedCategory: string;
  searchQuery: string;
  collapsed: boolean;
  sidebarMode: 'push' | 'overlay';

  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  setSelectedCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  toggleSidebar: () => void;
  setSidebarMode: (mode: 'push' | 'overlay') => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      theme: 'system',
      viewMode: 'grid',
      selectedCategory: '',
      searchQuery: '',
      collapsed: false,
      sidebarMode: 'push',

      setTheme: (theme) => set({ theme }),
      setViewMode: (viewMode) => set({ viewMode }),
      setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      toggleSidebar: () => set((state) => ({ collapsed: !state.collapsed })),
      setSidebarMode: (sidebarMode) => set({ sidebarMode }),
    }),
    {
      name: 'ui-store',
    }
  )
);

export const useSidebar = () => {
  const store = useUIStore();
  return {
    collapsed: store.collapsed,
    sidebarMode: store.sidebarMode,
    isOpen: !store.collapsed && store.sidebarMode === 'push',
    isMinimized: store.collapsed && store.sidebarMode === 'push',
    isHidden: store.collapsed && store.sidebarMode === 'overlay',
    isOverlayMode: store.sidebarMode === 'overlay',
    toggle: store.toggleSidebar,
    expand: () => {
      if (store.collapsed) {
        store.toggleSidebar();
      }
    },
    collapse: () => {
      if (!store.collapsed) {
        store.toggleSidebar();
      }
    },
    hideOverlay: () => {
      if (store.sidebarMode === 'overlay' && !store.collapsed) {
        store.toggleSidebar();
      }
    },
  };
};

export const useResponsiveSidebar = () => {
  const { setSidebarMode } = useUIStore();

  React.useEffect(() => {
    const handle = () => {
      const w = window.innerWidth;
      setSidebarMode(w < 768 ? 'overlay' : 'push');
    };

    handle();
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, [setSidebarMode]);
};
