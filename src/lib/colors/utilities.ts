
// src/lib/colors/utilities.ts - Utilitários para trabalhar com cores
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
      return COLOR_VARIABLES.text['gray-400'];
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
 * Cria uma sombra customizada
 */
export const createShadow = (
  offsetX: number,
  offsetY: number,
  blur: number,
  spread: number,
  colorVar: string,
  opacity: number = 1
): string => {
  return `${offsetX}px ${offsetY}px ${blur}px ${spread}px hsl(${colorVar} / ${opacity})`;
};

/**
 * Utilitários para cores de status
 */
export const statusColors = {
  active: {
    bg: hsl(COLOR_VARIABLES.status.active),
    text: 'text-white',
    border: `border-[${hsl(COLOR_VARIABLES.status.active)}]`,
  },
  completed: {
    bg: hsl(COLOR_VARIABLES.status.completed),
    text: 'text-white',
    border: `border-[${hsl(COLOR_VARIABLES.status.completed)}]`,
  },
  draft: {
    bg: hsl(COLOR_VARIABLES.status.draft),
    text: 'text-black',
    border: `border-[${hsl(COLOR_VARIABLES.status.draft)}]`,
  },
  paused: {
    bg: hsl(COLOR_VARIABLES.status.paused),
    text: 'text-white',
    border: `border-[${hsl(COLOR_VARIABLES.status.paused)}]`,
  },
} as const;

/**
 * Utilitários para cores de estado
 */
export const stateColors = {
  success: {
    bg: hsl(COLOR_VARIABLES.state.success),
    text: 'text-white',
    icon: COLOR_VARIABLES.icon.green,
  },
  warning: {
    bg: hsl(COLOR_VARIABLES.state.warning),
    text: 'text-black',
    icon: COLOR_VARIABLES.icon.yellow,
  },
  error: {
    bg: hsl(COLOR_VARIABLES.state.error),
    text: 'text-white',
    icon: COLOR_VARIABLES.icon.red,
  },
  info: {
    bg: hsl(COLOR_VARIABLES.state.info),
    text: 'text-white',
    icon: COLOR_VARIABLES.icon.blue,
  },
} as const;
