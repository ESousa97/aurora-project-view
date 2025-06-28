import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Theme, ViewMode } from '@/types';

interface UIStore {
  theme: Theme;
  sidebarOpen: boolean;
  viewMode: ViewMode;
  selectedCategory: string;
  isLoading: boolean;
  searchQuery: string;
  discoveryMode: boolean;
  revealedProjects: Set<number>;
  explorationProgress: number;

  setTheme: (theme: Theme) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setViewMode: (mode: ViewMode) => void;
  setSelectedCategory: (category: string) => void;
  setLoading: (loading: boolean) => void;
  setSearchQuery: (query: string) => void;

  setDiscoveryMode: (enabled: boolean) => void;
  revealProject: (projectId: number) => void;
  resetDiscovery: () => void;
  setExplorationProgress: (progress: number) => void;
}

// Tipo para o estado persistido (conversão de Set para Array)
type PersistedUI = Partial<{
  theme: Theme;
  viewMode: ViewMode;
  sidebarOpen: boolean;
  searchQuery: string;
  discoveryMode: boolean;
  revealedProjects: number[];
  explorationProgress: number;
}>;

export const useUIStore = create<UIStore>()(
  persist(
    (set, get) => ({
      theme: 'system',
      sidebarOpen: true,
      viewMode: 'grid',
      selectedCategory: '',
      isLoading: false,
      searchQuery: '',
      discoveryMode: false,
      revealedProjects: new Set<number>(),
      explorationProgress: 0,

      setTheme: (theme) => {
        set({ theme });
        const root = document.documentElement;
        if (theme === 'dark') {
          root.classList.add('dark');
        } else if (theme === 'light') {
          root.classList.remove('dark');
        } else {
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          root.classList.toggle('dark', prefersDark);
        }
      },
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setViewMode: (mode) => set({ viewMode: mode }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      setLoading: (loading) => set({ isLoading: loading }),
      setSearchQuery: (query) => set({ searchQuery: query }),

      setDiscoveryMode: (enabled) => set({ discoveryMode: enabled }),
      revealProject: (projectId) =>
        set((state) => ({ revealedProjects: new Set(state.revealedProjects).add(projectId) })),
      resetDiscovery: () =>
        set({ revealedProjects: new Set<number>(), explorationProgress: 0 }),
      setExplorationProgress: (progress) => set({ explorationProgress: progress }),
    }),
    {
      name: 'projportfolio-ui',
      partialize: (state): PersistedUI => ({
        theme: state.theme,
        viewMode: state.viewMode,
        sidebarOpen: state.sidebarOpen,
        searchQuery: state.searchQuery,
        discoveryMode: state.discoveryMode,
        revealedProjects: Array.from(state.revealedProjects),
        explorationProgress: state.explorationProgress,
      }),
      merge: (persistedState: PersistedUI, currentState) => ({
        ...currentState,
        ...persistedState,
        revealedProjects: new Set(persistedState.revealedProjects ?? []),
      }),
    }
  )
);
