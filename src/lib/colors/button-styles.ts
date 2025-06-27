
// src/lib/colors/button-styles.ts - Estilos de botões
import { COLOR_VARIABLES } from './variables';
import { hsl } from './utilities';

export const buttonStyles = {
  primary: {
    background: `linear-gradient(135deg, ${hsl(COLOR_VARIABLES.accent.color)} 0%, ${hsl(COLOR_VARIABLES.accent.hover)} 100%)`,
    color: 'white',
    fontWeight: '600',
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    boxShadow: `0 4px 16px ${hsl(COLOR_VARIABLES.accent.color)} / 0.3`,
    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    '&:hover': {
      transform: 'translateY(-2px) scale(1.02)',
      boxShadow: `0 8px 32px ${hsl(COLOR_VARIABLES.accent.color)} / 0.4`,
    },
  },
  
  secondary: {
    backgroundColor: hsl(COLOR_VARIABLES.surface.secondary),
    color: hsl(COLOR_VARIABLES.text.primary),
    fontWeight: '500',
    padding: '12px 24px',
    borderRadius: '8px',
    border: `1px solid ${hsl(COLOR_VARIABLES.border.secondary)}`,
    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    '&:hover': {
      backgroundColor: hsl(COLOR_VARIABLES.surface.primary),
      borderColor: hsl(COLOR_VARIABLES.border.primary),
      transform: 'translateY(-2px) scale(1.02)',
    },
  },
  
  ghost: {
    backgroundColor: 'transparent',
    color: hsl(COLOR_VARIABLES.text.secondary),
    fontWeight: '500',
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    '&:hover': {
      backgroundColor: hsl(COLOR_VARIABLES.surface.secondary),
      color: hsl(COLOR_VARIABLES.text.primary),
    },
  },
} as const;
