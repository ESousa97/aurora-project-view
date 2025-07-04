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
    (set, get) => ({
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
      toggleSidebar: () => set(state => ({ collapsed: !state.collapsed })),
      setSidebarMode: (sidebarMode) => set({ sidebarMode }),
    }),
    {
      name: 'ui-store',
    }
  )
);
