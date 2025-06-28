// src/stores/uiStore.ts
/* ----------------------------------------------------------------
   GLOBAL UI STORE  – Zustand + persist
   • A sidebar agora é controlada por um booleano `collapsed`
     (true  ⇢  64 px ;  false ⇢ 320 px).
   • Mantido `sidebarMode` ("push" | "overlay") para desktop / mobile.
   • `sidebarState` e `sidebarOpen` continuam disponíveis **somente
     para retro-compatibilidade** (mapeiam para o novo modelo).
----------------------------------------------------------------- */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Theme, ViewMode } from '@/types';

/* ----------------------------------------------------------------
   Types
----------------------------------------------------------------- */
export type SidebarMode = 'push' | 'overlay';

export interface UIStore {
  /* ---- Visual ---- */
  theme: Theme;
  viewMode: ViewMode;

  /* ---- Navegação / filtro ---- */
  selectedCategory: string;
  searchQuery: string;

  /* ---- Descoberta gamificada ---- */
  discoveryMode: boolean;
  revealedProjects: Set<number>;
  explorationProgress: number;

  /* ---- Sidebar ---- */
  collapsed: boolean;          // NOVO – true = 64 px
  sidebarMode: SidebarMode;    // push → ocupa espaço | overlay → flutua

  /* ---- Meta ---- */
  isLoading: boolean;

  /* ---- Mutators ---- */
  setTheme: (theme: Theme) => void;
  setViewMode: (mode: ViewMode) => void;
  setSelectedCategory: (category: string) => void;
  setLoading: (b: boolean) => void;
  setSearchQuery: (q: string) => void;

  /* Descoberta */
  setDiscoveryMode: (b: boolean) => void;
  revealProject: (id: number) => void;
  resetDiscovery: () => void;
  setExplorationProgress: (p: number) => void;

  /* Sidebar – novo fluxo */
  toggleSidebar: () => void;
  collapseSidebar: () => void;
  expandSidebar: () => void;
  hideSidebarOverlay: () => void; // só se sidebarMode === 'overlay'
  setSidebarMode: (m: SidebarMode) => void;

  /* ---- Back-compat getters ---- */
  /** open | minimized | hidden (overlay only) */
  get sidebarState(): 'open' | 'minimized' | 'hidden';
  /** true se não está escondida em overlay */
  get sidebarOpen(): boolean;
  /** manter API antiga */
  setSidebarOpen: (open: boolean) => void;
}

/* ----------------------------------------------------------------
   Dados que serão persistidos
----------------------------------------------------------------- */
type PersistedUI = Partial<{
  theme: Theme;
  viewMode: ViewMode;
  selectedCategory: string;
  searchQuery: string;
  discoveryMode: boolean;
  revealedProjects: number[];
  explorationProgress: number;
  collapsed: boolean;
  sidebarMode: SidebarMode;
}>;

/* ----------------------------------------------------------------
   Store
----------------------------------------------------------------- */
export const useUIStore = create<UIStore>()(
  persist(
    (set, get) => ({
      /* ---------- State ---------- */
      theme: 'system',
      viewMode: 'grid',
      selectedCategory: '',
      searchQuery: '',
      isLoading: false,

      discoveryMode: false,
      revealedProjects: new Set<number>(),
      explorationProgress: 0,

      /* Novo modelo da sidebar */
      collapsed: false,     // começa expandida
      sidebarMode: 'push',

      /* ---------- Getters de compatibilidade ---------- */
      get sidebarState() {
        /* overlay: hidden se collapsed=true e overlay */
        if (get().sidebarMode === 'overlay' && get().collapsed) return 'hidden';
        return get().collapsed ? 'minimized' : 'open';
      },
      get sidebarOpen() {
        return !(get().sidebarMode === 'overlay' && get().collapsed);
      },

      /* ---------- Mutators ---------- */
      setTheme: (theme) => {
        set({ theme });
        const root = document.documentElement;
        if (theme === 'dark') root.classList.add('dark');
        else if (theme === 'light') root.classList.remove('dark');
        else {
          const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
          root.classList.toggle('dark', prefers);
        }
      },
      setViewMode: (mode) => set({ viewMode: mode }),
      setSelectedCategory: (cat) => set({ selectedCategory: cat }),
      setLoading: (b) => set({ isLoading: b }),
      setSearchQuery: (q) => set({ searchQuery: q }),

      /* Descoberta */
      setDiscoveryMode: (b) => set({ discoveryMode: b }),
      revealProject: (id) =>
        set((s) => ({ revealedProjects: new Set(s.revealedProjects).add(id) })),
      resetDiscovery: () => set({ revealedProjects: new Set(), explorationProgress: 0 }),
      setExplorationProgress: (p) => set({ explorationProgress: p }),

      /* Sidebar */
      toggleSidebar: () => {
        const { sidebarMode, collapsed } = get();
        if (sidebarMode === 'overlay') {
          set({ collapsed: !collapsed }); // overlay: mostra ↔ esconde
        } else {
          set({ collapsed: !collapsed }); // push: expande ↔ minimiza
        }
      },
      collapseSidebar: () => set({ collapsed: true }),
      expandSidebar:   () => set({ collapsed: false }),
      hideSidebarOverlay: () => {
        if (get().sidebarMode === 'overlay') set({ collapsed: true });
      },
      setSidebarMode: (mode) => set({ sidebarMode: mode }),

      /* Compatibilidade */
      setSidebarOpen: (open) => {
        const { sidebarMode } = get();
        if (sidebarMode === 'overlay') {
          set({ collapsed: !open }); // overlay esconde/mostra
        } else {
          set({ collapsed: open ? false : true }); // push: minimiza
        }
      },
    }),
    {
      name: 'projportfolio-ui',
      partialize: (s): PersistedUI => ({
        theme: s.theme,
        viewMode: s.viewMode,
        selectedCategory: s.selectedCategory,
        searchQuery: s.searchQuery,
        discoveryMode: s.discoveryMode,
        revealedProjects: Array.from(s.revealedProjects),
        explorationProgress: s.explorationProgress,
        collapsed: s.collapsed,
        sidebarMode: s.sidebarMode,
      }),
      merge: (persisted: PersistedUI, curr) => ({
        ...curr,
        ...persisted,
        revealedProjects: new Set(persisted.revealedProjects ?? []),
        collapsed: persisted.collapsed ?? false,
        sidebarMode: persisted.sidebarMode ?? 'push',
      }),
    }
  )
);

/* ----------------------------------------------------------------
   Responsive hook – decide push/overlay e mantém fluid
----------------------------------------------------------------- */
import { useEffect } from 'react';

export const useResponsiveSidebar = () => {
  const { collapsed, sidebarMode, setSidebarMode } = useUIStore();

  useEffect(() => {
    const handle = () => {
      const w = window.innerWidth;

      /* Mobile < 768 → sempre overlay */
      if (w < 768) {
        setSidebarMode('overlay');
        return;
      }

      /* Desktop */
      const sidebarWidth = collapsed ? 64 : 320;
      setSidebarMode(w - sidebarWidth >= 600 ? 'push' : 'overlay');
    };

    handle();
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, [collapsed, setSidebarMode]);

  return {
    collapsed,
    sidebarMode,
    isMobile: window.innerWidth < 768,
    isDesktop: window.innerWidth >= 768,
  };
};

/* ----------------------------------------------------------------
   Hooks de conveniência
----------------------------------------------------------------- */
export const useSidebar = () => {
  const store = useUIStore();
  return {
    /* estado */
    collapsed: store.collapsed,
    sidebarMode: store.sidebarMode,
    sidebarOpen: store.sidebarOpen, // compat

    /* derived */
    isOpen: !store.collapsed && store.sidebarMode !== 'overlay',
    isMinimized: store.collapsed && store.sidebarMode === 'push',
    isHidden: store.collapsed && store.sidebarMode === 'overlay',
    isPushMode: store.sidebarMode === 'push',
    isOverlayMode: store.sidebarMode === 'overlay',

    /* ações */
    toggle: store.toggleSidebar,
    collapse: store.collapseSidebar,
    expand: store.expandSidebar,
    hideOverlay: store.hideSidebarOverlay,
    setSidebarOpen: store.setSidebarOpen, // compat
  };
};

export const useDiscovery = () => {
  const s = useUIStore();
  return {
    discoveryMode: s.discoveryMode,
    revealedProjects: s.revealedProjects,
    explorationProgress: s.explorationProgress,

    setDiscoveryMode: s.setDiscoveryMode,
    revealProject: s.revealProject,
    resetDiscovery: s.resetDiscovery,
    setExplorationProgress: s.setExplorationProgress,

    isProjectRevealed: (id: number) => s.revealedProjects.has(id),
    totalRevealed: s.revealedProjects.size,
  };
};
