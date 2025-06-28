// src/lib/colors/utilities.ts
import { COLOR_VARIABLES } from './variables';

/**
 * Gera uma string HSL com base na variável CSS
 */
export const hsl = (colorVar: string): string => {
  return `hsl(${colorVar})`;
};

/**
 * Gera uma string HSL com opacidade
 */
export const hslWithOpacity = (colorVar: string, opacity: number): string => {
  return `hsl(${colorVar} / ${opacity})`;
};

/**
 * Pega uma cor do sistema centralizado
 */
export const getColor = (path: string): string => {
  const keys = path.split('.');
  let current: any = COLOR_VARIABLES;
  
  for (const key of keys) {
    current = current[key];
    if (!current) {
      console.warn(`Cor não encontrada: ${path}`);
      return COLOR_VARIABLES.text.tertiary;
    }
  }
  
  return current;
};

/**
 * Gera um gradiente baseado em cores do sistema
 */
export const createGradient = (
  direction: string,
  colors: Array<{ color: string; stop?: string }>
): string => {
  const colorStops = colors
    .map(({ color, stop }) => 
      `hsl(${color})${stop ? ` ${stop}` : ''}`
    )
    .join(', ');
  
  return `linear-gradient(${direction}, ${colorStops})`;
};

/**
 * Cria uma sombra customizada usando as novas variáveis
 */
export const createShadow = (
  type: 'light' | 'medium' | 'heavy' = 'medium'
): string => {
  switch (type) {
    case 'light':
      return `0 2px 8px hsl(${COLOR_VARIABLES.shadow.light})`;
    case 'medium':
      return `0 4px 16px hsl(${COLOR_VARIABLES.shadow.medium})`;
    case 'heavy':
      return `0 8px 32px hsl(${COLOR_VARIABLES.shadow.heavy})`;
  }
};

/**
 * Utilitários para cores de status atualizados
 */
export const statusColors = {
  success: {
    bg: hsl(COLOR_VARIABLES.state.success),
    lightBg: hsl(COLOR_VARIABLES.state['success-light']),
    text: 'text-white',
    className: 'success-bg',
  },
  warning: {
    bg: hsl(COLOR_VARIABLES.state.warning),
    lightBg: hsl(COLOR_VARIABLES.state['warning-light']),
    text: 'text-black',
    className: 'warning-bg',
  },
  error: {
    bg: hsl(COLOR_VARIABLES.state.error),
    lightBg: hsl(COLOR_VARIABLES.state['error-light']),
    text: 'text-white',
    className: 'error-bg',
  },
  info: {
    bg: hsl(COLOR_VARIABLES.accent.color),
    lightBg: hsl(COLOR_VARIABLES.accent.light),
    text: 'text-white',
    className: 'accent-bg',
  },
} as const;

/**
 * Utilitários para cores de estado
 */
export const stateColors = {
  success: {
    bg: hsl(COLOR_VARIABLES.state.success),
    lightBg: hsl(COLOR_VARIABLES.state['success-light']),
    text: 'text-white',
    className: 'success-bg',
  },
  warning: {
    bg: hsl(COLOR_VARIABLES.state.warning),
    lightBg: hsl(COLOR_VARIABLES.state['warning-light']),
    text: 'text-black',
    className: 'warning-bg',
  },
  error: {
    bg: hsl(COLOR_VARIABLES.state.error),
    lightBg: hsl(COLOR_VARIABLES.state['error-light']),
    text: 'text-white',
    className: 'error-bg',
  },
  info: {
    bg: hsl(COLOR_VARIABLES.accent.color),
    lightBg: hsl(COLOR_VARIABLES.accent.light),
    text: 'text-white',
    className: 'accent-bg',
  },
} as const;

/**
 * Utilitários para superfícies
 */
export const surfaceColors = {
  primary: {
    bg: hsl(COLOR_VARIABLES.surface.primary),
    className: 'surface-primary',
  },
  secondary: {
    bg: hsl(COLOR_VARIABLES.surface.secondary),
    className: 'surface-secondary',
  },
  tertiary: {
    bg: hsl(COLOR_VARIABLES.surface.tertiary),
    className: 'surface-tertiary',
  },
} as const;

/**
 * Utilitários para texto
 */
export const textColors = {
  primary: {
    color: hsl(COLOR_VARIABLES.text.primary),
    className: 'text-primary',
  },
  secondary: {
    color: hsl(COLOR_VARIABLES.text.secondary),
    className: 'text-secondary',
  },
  tertiary: {
    color: hsl(COLOR_VARIABLES.text.tertiary),
    className: 'text-tertiary',
  },
} as const;
