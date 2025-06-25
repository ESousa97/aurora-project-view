
// src/lib/colors/themes.ts - Definições de temas
import { COLOR_VARIABLES } from './variables';
import { hsl, createGradient } from './utilities';

/**
 * Tema Vercel (atual)
 */
export const vercelTheme = {
  name: 'vercel',
  colors: COLOR_VARIABLES,
  gradients: {
    primary: createGradient('to right', [
      { color: COLOR_VARIABLES.gradient.start },
      { color: COLOR_VARIABLES.gradient.middle }
    ]),
    subtle: createGradient('135deg', [
      { color: COLOR_VARIABLES.gradient.start, stop: '0%' },
      { color: COLOR_VARIABLES.gradient.middle, stop: '50%' },
      { color: COLOR_VARIABLES.gradient.end, stop: '100%' }
    ]),
    card: createGradient('135deg', [
      { color: COLOR_VARIABLES.overlay.light, stop: '0%' },
      { color: 'transparent', stop: '50%' }
    ]),
  },
} as const;

/**
 * Configurações de tema para diferentes contextos
 */
export const themeConfigs = {
  card: {
    background: hsl(COLOR_VARIABLES.base.card),
    border: hsl(COLOR_VARIABLES.border.card),
    hoverBackground: hsl(COLOR_VARIABLES.hover.card),
    hoverBorder: hsl(COLOR_VARIABLES.hover.border),
  },
  
  button: {
    primary: {
      background: hsl(COLOR_VARIABLES.primary.DEFAULT),
      foreground: hsl(COLOR_VARIABLES.primary.foreground),
      hover: hsl(COLOR_VARIABLES.hover.button),
    },
    secondary: {
      background: 'transparent',
      foreground: hsl(COLOR_VARIABLES.text.white),
      border: hsl(COLOR_VARIABLES.border.input),
      hoverBorder: hsl(COLOR_VARIABLES.border.focus),
      hoverBackground: hsl(COLOR_VARIABLES.overlay.medium),
    },
  },
  
  input: {
    background: hsl(COLOR_VARIABLES.bg.input),
    border: hsl(COLOR_VARIABLES.border.input),
    focusBorder: hsl(COLOR_VARIABLES.border.focus),
    placeholder: hsl(COLOR_VARIABLES.text['gray-500']),
    text: hsl(COLOR_VARIABLES.text.white),
  },
} as const;
