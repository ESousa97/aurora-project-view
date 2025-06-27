
// src/lib/colors/card-styles.ts - Estilos de cards
import { COLOR_VARIABLES } from './variables';
import { hsl } from './utilities';

export const cardStyles = {
  modern: {
    backgroundColor: hsl(COLOR_VARIABLES.surface.primary),
    border: `1px solid ${hsl(COLOR_VARIABLES.border.secondary)}`,
    borderRadius: '0.75rem',
    boxShadow: `0 2px 8px ${hsl(COLOR_VARIABLES.shadow.light)}`,
  },
  
  modernHover: {
    backgroundColor: hsl(COLOR_VARIABLES.surface.secondary),
    borderColor: hsl(COLOR_VARIABLES.border.primary),
    boxShadow: `0 8px 32px ${hsl(COLOR_VARIABLES.shadow.medium)}`,
  },
  
  glass: {
    backgroundColor: `${hsl(COLOR_VARIABLES.surface.secondary)} / 0.9`,
    border: `1px solid ${hsl(COLOR_VARIABLES.border.secondary)}`,
    backdropFilter: 'blur(12px)',
    borderRadius: '0.75rem',
    boxShadow: `
      0 2px 16px ${hsl(COLOR_VARIABLES.shadow.light)},
      0 1px 4px ${hsl(COLOR_VARIABLES.shadow.medium)},
      inset 0 1px 0 ${hsl(COLOR_VARIABLES.surface.primary)} / 0.8
    `,
  },
  
  gradient: {
    background: `linear-gradient(135deg, ${hsl(COLOR_VARIABLES.surface.primary)} 0%, ${hsl(COLOR_VARIABLES.surface.secondary)} 100%)`,
    border: `1px solid ${hsl(COLOR_VARIABLES.border.secondary)}`,
    borderRadius: '0.75rem',
  },
} as const;
