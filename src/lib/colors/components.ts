
// src/lib/colors/components.ts - Componentes de cor (refatorado)
import React from 'react';
import { buttonStyles } from './button-styles';
import { cardStyles } from './card-styles';
import { contextColors } from './context-colors';

export interface ColorComponentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// Re-export dos estilos
export { buttonStyles, cardStyles, contextColors };

// Classes CSS reutilizáveis
export const colorClasses = {
  text: {
    primary: 'text-primary',
    secondary: 'text-secondary',
    tertiary: 'text-tertiary',
    gradient: 'text-gradient',
  },
  
  bg: {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    tertiary: 'bg-tertiary',
    gradient: 'bg-gradient-primary',
  },
  
  surface: {
    primary: 'surface-primary',
    secondary: 'surface-secondary',
    tertiary: 'surface-tertiary',
  },
  
  button: {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
  },
  
  card: {
    glass: 'glass-card',
    shadow: 'shadow-elegant',
  },
  
  nav: {
    link: 'nav-link',
  },
  
  badge: {
    skill: 'skill-badge',
  },
  
  status: {
    success: 'success-bg',
    warning: 'warning-bg',
    error: 'error-bg',
    info: 'accent-bg',
  },
  
  effects: {
    hover: 'hover-scale',
    fadeIn: 'animate-fade-in',
    slideUp: 'animate-slide-up',
    float: 'animate-float',
  },
} as const;
