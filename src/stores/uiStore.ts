import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Theme, ViewMode } from '@/types';

interface UIStore {
  theme: Theme;
  sidebarOpen: boolean;
  viewMode: ViewMode;
  selectedCategory: string;
  isLoading: boolean;
  // Exploration specific states
  discoveryMode: boolean;
  revealedProjects: Set<number>;
  explorationProgress: number;
  
  setTheme: (theme: Theme) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setViewMode: (mode: ViewMode) => void;
  setSelectedCategory: (category: string) => void;
  setLoading: (loading: boolean) => void;
  
  // Exploration actions
  setDiscoveryMode: (enabled: boolean) => void;
  revealProject: (projectId: number) => void;
  resetDiscovery: () => void;
  setExplorationProgress: (progress: number) => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set, get) => ({
      theme: 'system',
      sidebarOpen: true,
      viewMode: 'grid',
      selectedCategory: '',
      isLoading: false,
      discoveryMode: false,
      revealedProjects: new Set(),
      explorationProgress: 0,

      setTheme: (theme) => {
        set({ theme });
        
        // Apply theme to document
        const root = document.documentElement;
        if (theme === 'dark') {
          root.classList.add('dark');
        } else if (theme === 'light') {
          root.classList.remove('dark');
        } else {
          // System theme
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          if (prefersDark) {
            root.classList.add('dark');
          } else {
            root.classList.remove('dark');
          }
        }
      },

      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setViewMode: (mode) => set({ viewMode: mode }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      setLoading: (loading) => set({ isLoading: loading }),

      // Exploration actions
      setDiscoveryMode: (enabled) => set({ discoveryMode: enabled }),
      
      revealProject: (projectId) => set((state) => ({
        revealedProjects: new Set([...state.revealedProjects, projectId])
      })),
      
      resetDiscovery: () => set({ 
        revealedProjects: new Set(),
        explorationProgress: 0 
      }),
      
      setExplorationProgress: (progress) => set({ explorationProgress: progress }),
    }),
    {
      name: 'projportfolio-ui',
      partialize: (state) => ({
        theme: state.theme,
        viewMode: state.viewMode,
        sidebarOpen: state.sidebarOpen,
        discoveryMode: state.discoveryMode,
        revealedProjects: Array.from(state.revealedProjects), // Convert Set to Array for persistence
        explorationProgress: state.explorationProgress,
      }),
      // Custom merge function to handle Set conversion
      merge: (persistedState: any, currentState) => ({
        ...currentState,
        ...persistedState,
        revealedProjects: new Set(persistedState?.revealedProjects || []),
      }),
    }
  )
);
