
// src/lib/colors/components.ts - Componentes de cor reutilizáveis
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
 * Estilos para diferentes tipos de card
 */
export const cardStyles = {
  modern: {
    backgroundColor: hslWithOpacity(COLOR_VARIABLES.overlay.light, 1),
    border: `1px solid ${hsl(COLOR_VARIABLES.border.card)}`,
    borderRadius: '0.75rem',
    backdropFilter: 'blur(12px)',
  },
  
  modernHover: {
    backgroundColor: hsl(COLOR_VARIABLES.hover.card),
    borderColor: hsl(COLOR_VARIABLES.hover.border),
  },
  
  gradient: {
    background: `linear-gradient(135deg, ${hslWithOpacity(COLOR_VARIABLES.gradient.start, 0.02)} 0%, ${hslWithOpacity(COLOR_VARIABLES.gradient.middle, 0.05)} 50%, ${hslWithOpacity(COLOR_VARIABLES.gradient.end, 0.02)} 100%)`,
  },
} as const;

/**
 * Estilos para botões
 */
export const buttonStyles = {
  vercel: {
    primary: {
      backgroundColor: hsl(COLOR_VARIABLES.primary.DEFAULT),
      color: hsl(COLOR_VARIABLES.primary.foreground),
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        backgroundColor: hsl(COLOR_VARIABLES.hover.button),
      },
    },
    
    secondary: {
      backgroundColor: 'transparent',
      color: hsl(COLOR_VARIABLES.text.white),
      border: `1px solid ${hsl(COLOR_VARIABLES.border.input)}`,
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        borderColor: hsl(COLOR_VARIABLES.border.focus),
        backgroundColor: hsl(COLOR_VARIABLES.overlay.medium),
      },
    },
  },
} as const;

/**
 * Estilos para inputs
 */
export const inputStyles = {
  custom: {
    backgroundColor: hsl(COLOR_VARIABLES.bg.input),
    border: `1px solid ${hsl(COLOR_VARIABLES.border.input)}`,
    color: hsl(COLOR_VARIABLES.text.white),
    '&:focus': {
      borderColor: hsl(COLOR_VARIABLES.border.focus),
      outline: 'none',
    },
    '&::placeholder': {
      color: hsl(COLOR_VARIABLES.text['gray-500']),
    },
  },
} as const;

/**
 * Classes CSS reutilizáveis
 */
export const colorClasses = {
  // Texto
  text: {
    primary: 'text-white-primary',
    secondary: 'text-gray-light',
    muted: 'text-gray-medium',
    success: 'success-color',
    warning: 'warning-color',
    error: 'error-color',
    info: 'info-color',
  },
  
  // Backgrounds
  bg: {
    dark: 'bg-dark-primary',
    black: 'bg-black-pure',
    card: 'modern-card',
  },
  
  // Gradientes
  gradient: {
    vercel: 'vercel-gradient',
    subtle: 'vercel-gradient-subtle',
  },
  
  // Efeitos
  effects: {
    glow: 'glow-effect',
    transition: 'smooth-transition',
  },
  
  // Botões
  button: {
    vercel: 'vercel-button',
    secondary: 'vercel-button-secondary',
  },
  
  // Inputs
  input: {
    custom: 'custom-input',
  },
  
  // Ícones por categoria
  icon: {
    blue: 'icon-blue',
    green: 'icon-green',
    purple: 'icon-purple',
    yellow: 'icon-yellow',
    red: 'icon-red',
  },
  
  // Status
  status: {
    active: 'status-active',
    completed: 'status-completed',
    draft: 'status-draft',
    paused: 'status-paused',
  },
} as const;

/**
 * Mapeamento de cores para diferentes contextos
 */
export const contextColors = {
  technology: {
    frontend: { color: COLOR_VARIABLES.icon.blue, gradient: 'from-blue-500 to-blue-600' },
    backend: { color: COLOR_VARIABLES.icon.green, gradient: 'from-green-500 to-green-600' },
    mobile: { color: COLOR_VARIABLES.icon.purple, gradient: 'from-purple-500 to-purple-600' },
    database: { color: COLOR_VARIABLES.icon.yellow, gradient: 'from-yellow-500 to-yellow-600' },
    devops: { color: COLOR_VARIABLES.icon.red, gradient: 'from-red-500 to-red-600' },
  },
  
  priority: {
    high: { color: COLOR_VARIABLES.state.error, className: 'error-color' },
    medium: { color: COLOR_VARIABLES.state.warning, className: 'warning-color' },
    low: { color: COLOR_VARIABLES.state.info, className: 'info-color' },
  },
  
  completion: {
    completed: { color: COLOR_VARIABLES.status.completed, className: 'status-completed' },
    active: { color: COLOR_VARIABLES.status.active, className: 'status-active' },
    draft: { color: COLOR_VARIABLES.status.draft, className: 'status-draft' },
    paused: { color: COLOR_VARIABLES.status.paused, className: 'status-paused' },
  },
} as const;
