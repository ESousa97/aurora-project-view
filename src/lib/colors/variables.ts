
// src/lib/colors/variables.ts - Variáveis de cores organizadas
export const COLOR_VARIABLES = {
  // ===== CORES BASE =====
  base: {
    background: 'var(--background)',
    foreground: 'var(--foreground)',
    card: 'var(--card)',
    'card-foreground': 'var(--card-foreground)',
    popover: 'var(--popover)',
    'popover-foreground': 'var(--popover-foreground)',
  },

  // ===== CORES PRIMÁRIAS =====
  primary: {
    DEFAULT: 'var(--primary)',
    foreground: 'var(--primary-foreground)',
  },

  // ===== CORES SECUNDÁRIAS =====
  secondary: {
    DEFAULT: 'var(--secondary)',
    foreground: 'var(--secondary-foreground)',
  },

  // ===== CORES SILENCIADAS =====
  muted: {
    DEFAULT: 'var(--muted)',
    foreground: 'var(--muted-foreground)',
  },

  // ===== CORES DE DESTAQUE =====
  accent: {
    DEFAULT: 'var(--accent)',
    foreground: 'var(--accent-foreground)',
  },

  // ===== CORES DESTRUTIVAS =====
  destructive: {
    DEFAULT: 'var(--destructive)',
    foreground: 'var(--destructive-foreground)',
  },

  // ===== CORES DE INTERFACE =====
  interface: {
    border: 'var(--border)',
    input: 'var(--input)',
    ring: 'var(--ring)',
  },

  // ===== CORES DE STATUS =====
  status: {
    active: 'var(--status-active)',
    completed: 'var(--status-completed)',
    draft: 'var(--status-draft)',
    paused: 'var(--status-paused)',
  },

  // ===== CORES DE ESTADO =====
  state: {
    success: 'var(--success)',
    warning: 'var(--warning)',
    error: 'var(--error)',
    info: 'var(--info)',
  },

  // ===== CORES DE GRADIENTE =====
  gradient: {
    start: 'var(--gradient-start)',
    middle: 'var(--gradient-middle)',
    end: 'var(--gradient-end)',
  },

  // ===== CORES DE OVERLAY =====
  overlay: {
    light: 'var(--overlay-light)',
    medium: 'var(--overlay-medium)',
    strong: 'var(--overlay-strong)',
  },

  // ===== CORES DE HOVER =====
  hover: {
    card: 'var(--hover-card)',
    border: 'var(--hover-border)',
    button: 'var(--hover-button)',
  },

  // ===== CORES DE TEXTO ESPECÍFICAS =====
  text: {
    white: 'var(--text-white)',
    'gray-100': 'var(--text-gray-100)',
    'gray-200': 'var(--text-gray-200)',
    'gray-300': 'var(--text-gray-300)',
    'gray-400': 'var(--text-gray-400)',
    'gray-500': 'var(--text-gray-500)',
  },

  // ===== CORES DE BACKGROUND ESPECÍFICAS =====
  bg: {
    black: 'var(--bg-black)',
    dark: 'var(--bg-dark)',
    input: 'var(--bg-input)',
    'card-hover': 'var(--bg-card-hover)',
  },

  // ===== CORES DE BORDAS ESPECÍFICAS =====
  border: {
    default: 'var(--border-default)',
    input: 'var(--border-input)',
    focus: 'var(--border-focus)',
    card: 'var(--border-card)',
  },

  // ===== CORES DE ÍCONES POR CATEGORIA =====
  icon: {
    blue: 'var(--icon-blue)',
    green: 'var(--icon-green)',
    purple: 'var(--icon-purple)',
    yellow: 'var(--icon-yellow)',
    red: 'var(--icon-red)',
  },

  // ===== CORES DE SIDEBAR =====
  sidebar: {
    background: 'var(--sidebar-background)',
    foreground: 'var(--sidebar-foreground)',
    primary: 'var(--sidebar-primary)',
    'primary-foreground': 'var(--sidebar-primary-foreground)',
    accent: 'var(--sidebar-accent)',
    'accent-foreground': 'var(--sidebar-accent-foreground)',
    border: 'var(--sidebar-border)',
    ring: 'var(--sidebar-ring)',
  },
} as const;
