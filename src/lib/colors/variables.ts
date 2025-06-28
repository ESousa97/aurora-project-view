// src/lib/colors/variables.ts
export const COLOR_VARIABLES = {
  // ===== CORES BASE SHADCN =====
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
    color: 'var(--accent-color)',
    hover: 'var(--accent-hover)',
    light: 'var(--accent-light)',
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

  // ===== CORES MODERNAS DE BACKGROUND =====
  bg: {
    primary: 'var(--bg-primary)',
    secondary: 'var(--bg-secondary)',
    tertiary: 'var(--bg-tertiary)',
  },

  // ===== CORES MODERNAS DE TEXTO =====
  text: {
    primary: 'var(--text-primary)',
    secondary: 'var(--text-secondary)',
    tertiary: 'var(--text-tertiary)',
  },

  // ===== CORES DE SUPERFÍCIE =====
  surface: {
    primary: 'var(--surface-primary)',
    secondary: 'var(--surface-secondary)',
    tertiary: 'var(--surface-tertiary)',
  },

  // ===== CORES DE BORDA =====
  border: {
    primary: 'var(--border-primary)',
    secondary: 'var(--border-secondary)',
  },

  // ===== CORES DE SOMBRA =====
  shadow: {
    light: 'var(--shadow-light)',
    medium: 'var(--shadow-medium)',
    heavy: 'var(--shadow-heavy)',
  },

  // ===== CORES DE ESTADO =====
  state: {
    success: 'var(--success-color)',
    'success-light': 'var(--success-light)',
    warning: 'var(--warning-color)',
    'warning-light': 'var(--warning-light)',
    error: 'var(--error-color)',
    'error-light': 'var(--error-light)',
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

  // ===== CORES DE TECNOLOGIA (MANTIDAS PARA COMPATIBILIDADE) =====
  technology: {
    blue: '234 89% 60%',
    green: '142 76% 36%',
    purple: '262 83% 58%',
    yellow: '38 92% 50%',
    red: '0 84% 60%',
  },
} as const;
