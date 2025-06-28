import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Theme, ViewMode } from '@/types';

export type SidebarState = 'open' | 'minimized' | 'hidden';
export type SidebarMode = 'push' | 'overlay';

interface UIStore {
  // Existing properties
  theme: Theme;
  viewMode: ViewMode;
  selectedCategory: string;
  isLoading: boolean;
  searchQuery: string;
  discoveryMode: boolean;
  revealedProjects: Set<number>;
  explorationProgress: number;

  // New sidebar properties
  sidebarState: SidebarState;
  sidebarMode: SidebarMode;

  // Existing methods
  setTheme: (theme: Theme) => void;
  setViewMode: (mode: ViewMode) => void;
  setSelectedCategory: (category: string) => void;
  setLoading: (loading: boolean) => void;
  setSearchQuery: (query: string) => void;
  setDiscoveryMode: (enabled: boolean) => void;
  revealProject: (projectId: number) => void;
  resetDiscovery: () => void;
  setExplorationProgress: (progress: number) => void;

  // New sidebar methods
  setSidebarState: (state: SidebarState) => void;
  setSidebarMode: (mode: SidebarMode) => void;
  toggleSidebar: () => void;
  minimizeSidebar: () => void;
  expandSidebar: () => void;
  hideSidebar: () => void;

  // Legacy compatibility
  setSidebarOpen: (open: boolean) => void;
  sidebarOpen: boolean; // Computed property for backward compatibility
}

// Tipo para o estado persistido (conversão de Set para Array)
type PersistedUI = Partial<{
  theme: Theme;
  viewMode: ViewMode;
  selectedCategory: string;
  searchQuery: string;
  discoveryMode: boolean;
  revealedProjects: number[];
  explorationProgress: number;
  sidebarState: SidebarState;
  sidebarMode: SidebarMode;
}>;

export const useUIStore = create<UIStore>()(
  persist(
    (set, get) => ({
      // Existing state
      theme: 'system',
      viewMode: 'grid',
      selectedCategory: '',
      isLoading: false,
      searchQuery: '',
      discoveryMode: false,
      revealedProjects: new Set<number>(),
      explorationProgress: 0,

      // New sidebar state
      sidebarState: 'open',
      sidebarMode: 'push',

      // Computed property for backward compatibility
      get sidebarOpen() {
        return get().sidebarState !== 'hidden';
      },

      // Existing methods
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

      setViewMode: (mode) => set({ viewMode: mode }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      setLoading: (loading) => set({ isLoading: loading }),
      setSearchQuery: (query) => set({ searchQuery: query }),

      setDiscoveryMode: (enabled) => set({ discoveryMode: enabled }),
      revealProject: (projectId) =>
        set((state) => ({ 
          revealedProjects: new Set(state.revealedProjects).add(projectId) 
        })),
      resetDiscovery: () =>
        set({ revealedProjects: new Set<number>(), explorationProgress: 0 }),
      setExplorationProgress: (progress) => set({ explorationProgress: progress }),

      // New sidebar methods
      setSidebarState: (state) => set({ sidebarState: state }),
      setSidebarMode: (mode) => set({ sidebarMode: mode }),

      toggleSidebar: () => {
        const { sidebarState } = get();
        if (sidebarState === 'open') {
          set({ sidebarState: 'minimized' });
        } else if (sidebarState === 'minimized') {
          set({ sidebarState: 'open' });
        } else {
          set({ sidebarState: 'open' });
        }
      },

      minimizeSidebar: () => set({ sidebarState: 'minimized' }),
      expandSidebar: () => set({ sidebarState: 'open' }),
      hideSidebar: () => set({ sidebarState: 'hidden' }),

      // Legacy compatibility method
      setSidebarOpen: (open) => {
        if (open) {
          set({ sidebarState: 'open' });
        } else {
          const { sidebarMode } = get();
          // Em modo overlay (mobile), esconder. Em modo push (desktop), minimizar
          set({ sidebarState: sidebarMode === 'overlay' ? 'hidden' : 'minimized' });
        }
      },
    }),
    {
      name: 'projportfolio-ui',
      partialize: (state): PersistedUI => ({
        theme: state.theme,
        viewMode: state.viewMode,
        selectedCategory: state.selectedCategory,
        searchQuery: state.searchQuery,
        discoveryMode: state.discoveryMode,
        revealedProjects: Array.from(state.revealedProjects),
        explorationProgress: state.explorationProgress,
        sidebarState: state.sidebarState,
        sidebarMode: state.sidebarMode,
      }),
      merge: (persistedState: PersistedUI, currentState) => ({
        ...currentState,
        ...persistedState,
        revealedProjects: new Set(persistedState.revealedProjects ?? []),
        // Ensure valid default values
        sidebarState: persistedState.sidebarState ?? 'open',
        sidebarMode: persistedState.sidebarMode ?? 'push',
      }),
    }
  )
);

// Hook personalizado para detectar responsividade
import { useEffect } from 'react';

export const useResponsiveSidebar = () => {
  const { setSidebarMode, sidebarState, sidebarMode } = useUIStore();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      // Mobile: sempre overlay
      if (width < 768) {
        setSidebarMode('overlay');
        return;
      }
      
      // Desktop: verificar se há espaço suficiente
      const sidebarWidth = sidebarState === 'minimized' ? 64 : 320;
      const availableSpace = width - sidebarWidth;
      
      // Se há espaço suficiente para o conteúdo (mínimo 600px), usar push
      if (availableSpace >= 600) {
        setSidebarMode('push');
      } else {
        setSidebarMode('overlay');
      }
    };

    // Executar na inicialização
    handleResize();
    
    // Escutar mudanças de tamanho
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setSidebarMode, sidebarState]);

  return { 
    sidebarState, 
    sidebarMode,
    isMobile: window.innerWidth < 768,
    isDesktop: window.innerWidth >= 768,
  };
};

// Hooks de conveniência para usar nos componentes
export const useSidebar = () => {
  const store = useUIStore();
  
  return {
    // Estado
    sidebarState: store.sidebarState,
    sidebarMode: store.sidebarMode,
    sidebarOpen: store.sidebarOpen, // Para compatibilidade
    isOpen: store.sidebarState === 'open',
    isMinimized: store.sidebarState === 'minimized',
    isHidden: store.sidebarState === 'hidden',
    isPushMode: store.sidebarMode === 'push',
    isOverlayMode: store.sidebarMode === 'overlay',
    
    // Ações
    toggle: store.toggleSidebar,
    minimize: store.minimizeSidebar,
    expand: store.expandSidebar,
    hide: store.hideSidebar,
    setSidebarOpen: store.setSidebarOpen, // Para compatibilidade
  };
};

export const useDiscovery = () => {
  const store = useUIStore();
  
  return {
    // Estado
    discoveryMode: store.discoveryMode,
    revealedProjects: store.revealedProjects,
    explorationProgress: store.explorationProgress,
    
    // Ações
    setDiscoveryMode: store.setDiscoveryMode,
    revealProject: store.revealProject,
    resetDiscovery: store.resetDiscovery,
    setExplorationProgress: store.setExplorationProgress,
    
    // Helpers
    isProjectRevealed: (projectId: number) => store.revealedProjects.has(projectId),
    totalRevealed: store.revealedProjects.size,
  };
};
