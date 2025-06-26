
// src/lib/colors/themes.ts - Temas atualizados para a nova paleta
import { COLOR_VARIABLES } from './variables';
import { hsl, createGradient } from './utilities';

/**
 * Tema moderno com suporte a light/dark
 */
export const modernTheme = {
  name: 'modern',
  colors: COLOR_VARIABLES,
  
  // Gradientes para o tema moderno
  gradients: {
    primary: createGradient('135deg', [
      { color: COLOR_VARIABLES.accent.color, stop: '0%' },
      { color: COLOR_VARIABLES.accent.hover, stop: '100%' }
    ]),
    
    background: createGradient('135deg', [
      { color: COLOR_VARIABLES.bg.primary, stop: '0%' },
      { color: COLOR_VARIABLES.bg.secondary, stop: '100%' }
    ]),
    
    surface: createGradient('135deg', [
      { color: COLOR_VARIABLES.surface.primary, stop: '0%' },
      { color: COLOR_VARIABLES.surface.secondary, stop: '100%' }
    ]),
    
    text: createGradient('135deg', [
      { color: COLOR_VARIABLES.text.primary, stop: '0%' },
      { color: COLOR_VARIABLES.text.secondary, stop: '100%' }
    ]),
  },
} as const;

/**
 * Configurações de tema para diferentes contextos
 */
export const themeConfigs = {
  // Configurações para cards
  card: {
    background: hsl(COLOR_VARIABLES.surface.primary),
    secondaryBackground: hsl(COLOR_VARIABLES.surface.secondary),
    border: hsl(COLOR_VARIABLES.border.secondary),
    hoverBorder: hsl(COLOR_VARIABLES.border.primary),
    shadow: `0 2px 8px hsl(${COLOR_VARIABLES.shadow.light})`,
    hoverShadow: `0 8px 32px hsl(${COLOR_VARIABLES.shadow.medium})`,
  },
  
  // Configurações para botões
  button: {
    primary: {
      background: `linear-gradient(135deg, hsl(${COLOR_VARIABLES.accent.color}) 0%, hsl(${COLOR_VARIABLES.accent.hover}) 100%)`,
      foreground: 'white',
      shadow: `0 4px 16px hsl(${COLOR_VARIABLES.accent.color} / 0.3)`,
      hoverShadow: `0 8px 32px hsl(${COLOR_VARIABLES.accent.color} / 0.4)`,
    },
    secondary: {
      background: hsl(COLOR_VARIABLES.surface.secondary),
      foreground: hsl(COLOR_VARIABLES.text.primary),
      border: hsl(COLOR_VARIABLES.border.secondary),
      hoverBorder: hsl(COLOR_VARIABLES.border.primary),
    },
    ghost: {
      background: 'transparent',
      foreground: hsl(COLOR_VARIABLES.text.secondary),
      hoverBackground: hsl(COLOR_VARIABLES.surface.secondary),
      hoverForeground: hsl(COLOR_VARIABLES.text.primary),
    },
  },
  
  // Configurações para inputs
  input: {
    background: hsl(COLOR_VARIABLES.surface.primary),
    border: hsl(COLOR_VARIABLES.border.secondary),
    focusBorder: hsl(COLOR_VARIABLES.accent.color),
    placeholder: hsl(COLOR_VARIABLES.text.tertiary),
    text: hsl(COLOR_VARIABLES.text.primary),
  },
  
  // Configurações para navegação
  navigation: {
    background: hsl(COLOR_VARIABLES.surface.secondary),
    border: hsl(COLOR_VARIABLES.border.secondary),
    link: hsl(COLOR_VARIABLES.text.secondary),
    activeLinkBg: hsl(COLOR_VARIABLES.accent.light),
    activeLinkText: hsl(COLOR_VARIABLES.accent.color),
  },
  
  // Configurações para status
  status: {
    success: {
      bg: hsl(COLOR_VARIABLES.state.success),
      lightBg: hsl(COLOR_VARIABLES.state['success-light']),
      text: 'white',
    },
    warning: {
      bg: hsl(COLOR_VARIABLES.state.warning),
      lightBg: hsl(COLOR_VARIABLES.state['warning-light']),
      text: 'black',
    },
    error: {
      bg: hsl(COLOR_VARIABLES.state.error),
      lightBg: hsl(COLOR_VARIABLES.state['error-light']),
      text: 'white',
    },
    info: {
      bg: hsl(COLOR_VARIABLES.accent.color),
      lightBg: hsl(COLOR_VARIABLES.accent.light),
      text: 'white',
    },
  },
} as const;

/**
 * Configurações específicas para modo claro e escuro
 */
export const themeVariants = {
  light: {
    name: 'light',
    glassMorphism: {
      background: `hsl(${COLOR_VARIABLES.surface.secondary} / 0.9)`,
      border: `1px solid hsl(${COLOR_VARIABLES.border.secondary})`,
      backdropFilter: 'blur(12px)',
      boxShadow: `
        0 2px 16px hsl(${COLOR_VARIABLES.shadow.light}),
        0 1px 4px hsl(${COLOR_VARIABLES.shadow.medium}),
        inset 0 1px 0 hsl(${COLOR_VARIABLES.surface.primary} / 0.8)
      `,
    },
    hover: {
      background: `hsl(${COLOR_VARIABLES.surface.primary})`,
      border: `1px solid hsl(${COLOR_VARIABLES.border.primary})`,
      boxShadow: `
        0 6px 32px hsl(${COLOR_VARIABLES.shadow.medium}),
        0 2px 8px hsl(${COLOR_VARIABLES.shadow.light}),
        inset 0 1px 0 hsl(${COLOR_VARIABLES.surface.primary})
      `,
    },
  },
  
  dark: {
    name: 'dark',
    glassMorphism: {
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(12px) saturate(150%)',
      boxShadow: `
        0 4px 24px rgba(0, 0, 0, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.05)
      `,
    },
    hover: {
      background: 'rgba(255, 255, 255, 0.08)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      boxShadow: `
        0 8px 40px rgba(0, 0, 0, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.1)
      `,
    },
  },
} as const;
