
// src/lib/colors/components.ts - Componentes de cor atualizados para a nova paleta
import React from 'react';
import { COLOR_VARIABLES } from './variables';
import { hsl, hslWithOpacity } from './utilities';

/**
 * Props para componentes de cor
 */
export interface ColorComponentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/**
 * Estilos para diferentes tipos de card usando a nova paleta
 */
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

/**
 * Estilos para botões usando a nova paleta
 */
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

/**
 * Estilos para inputs usando a nova paleta
 */
export const inputStyles = {
  modern: {
    backgroundColor: hsl(COLOR_VARIABLES.surface.primary),
    border: `1px solid ${hsl(COLOR_VARIABLES.border.secondary)}`,
    color: hsl(COLOR_VARIABLES.text.primary),
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '14px',
    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    '&:focus': {
      outline: 'none',
      borderColor: hsl(COLOR_VARIABLES.accent.color),
      boxShadow: `0 0 0 3px ${hsl(COLOR_VARIABLES.accent.color)} / 0.1`,
    },
    '&::placeholder': {
      color: hsl(COLOR_VARIABLES.text.tertiary),
    },
  },
} as const;

/**
 * Classes CSS reutilizáveis atualizadas
 */
export const colorClasses = {
  // Texto
  text: {
    primary: 'text-primary',
    secondary: 'text-secondary',
    tertiary: 'text-tertiary',
    gradient: 'text-gradient',
  },
  
  // Backgrounds
  bg: {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    tertiary: 'bg-tertiary',
    gradient: 'bg-gradient-primary',
  },
  
  // Superfícies
  surface: {
    primary: 'surface-primary',
    secondary: 'surface-secondary',
    tertiary: 'surface-tertiary',
  },
  
  // Botões
  button: {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
  },
  
  // Cards
  card: {
    glass: 'glass-card',
    shadow: 'shadow-elegant',
  },
  
  // Navegação
  nav: {
    link: 'nav-link',
  },
  
  // Badges e tags
  badge: {
    skill: 'skill-badge',
  },
  
  // Status
  status: {
    success: 'success-bg',
    warning: 'warning-bg',
    error: 'error-bg',
    info: 'accent-bg',
  },
  
  // Efeitos
  effects: {
    hover: 'hover-scale',
    fadeIn: 'animate-fade-in',
    slideUp: 'animate-slide-up',
    float: 'animate-float',
  },
} as const;

/**
 * Mapeamento de cores para diferentes contextos
 */
export const contextColors = {
  technology: {
    frontend: { 
      color: COLOR_VARIABLES.technology.blue, 
      gradient: 'from-blue-500 to-blue-600',
      lightBg: COLOR_VARIABLES.accent.light,
    },
    backend: { 
      color: COLOR_VARIABLES.technology.green, 
      gradient: 'from-green-500 to-green-600',
      lightBg: COLOR_VARIABLES.state['success-light'],
    },
    mobile: { 
      color: COLOR_VARIABLES.technology.purple, 
      gradient: 'from-purple-500 to-purple-600',
      lightBg: '262 83% 95%',
    },
    database: { 
      color: COLOR_VARIABLES.technology.yellow, 
      gradient: 'from-yellow-500 to-yellow-600',
      lightBg: COLOR_VARIABLES.state['warning-light'],
    },
    devops: { 
      color: COLOR_VARIABLES.technology.red, 
      gradient: 'from-red-500 to-red-600',
      lightBg: COLOR_VARIABLES.state['error-light'],
    },
  },
  
  priority: {
    high: { 
      color: COLOR_VARIABLES.state.error, 
      lightBg: COLOR_VARIABLES.state['error-light'],
      className: 'error-bg' 
    },
    medium: { 
      color: COLOR_VARIABLES.state.warning, 
      lightBg: COLOR_VARIABLES.state['warning-light'],
      className: 'warning-bg' 
    },
    low: { 
      color: COLOR_VARIABLES.accent.color, 
      lightBg: COLOR_VARIABLES.accent.light,
      className: 'accent-bg' 
    },
  },
  
  completion: {
    completed: { 
      color: COLOR_VARIABLES.state.success, 
      lightBg: COLOR_VARIABLES.state['success-light'],
      className: 'success-bg' 
    },
    active: { 
      color: COLOR_VARIABLES.accent.color, 
      lightBg: COLOR_VARIABLES.accent.light,
      className: 'accent-bg' 
    },
    draft: { 
      color: COLOR_VARIABLES.text.tertiary, 
      lightBg: COLOR_VARIABLES.surface.tertiary,
      className: 'surface-tertiary' 
    },
    paused: { 
      color: COLOR_VARIABLES.state.warning, 
      lightBg: COLOR_VARIABLES.state['warning-light'],
      className: 'warning-bg' 
    },
  },
} as const;
