
// src/hooks/useColors.ts - Hook atualizado para a nova paleta
import { useMemo } from 'react';
import { 
  COLOR_VARIABLES, 
  getColor, 
  hsl, 
  hslWithOpacity, 
  statusColors,
  stateColors,
  surfaceColors,
  textColors,
  colorClasses,
  contextColors,
  createShadow
} from '@/lib/colors';

export const useColors = () => {
  const colors = useMemo(() => ({
    // Variáveis base
    variables: COLOR_VARIABLES,
    
    // Utilitários
    get: getColor,
    hsl,
    hslWithOpacity,
    createShadow,
    
    // Cores por contexto
    status: statusColors,
    state: stateColors,
    surface: surfaceColors,
    text: textColors,
    context: contextColors,
    
    // Classes CSS
    classes: colorClasses,
    
    // Helpers para componentes comuns
    getStatusColor: (status: keyof typeof statusColors) => statusColors[status],
    getStateColor: (state: keyof typeof stateColors) => stateColors[state],
    getSurfaceColor: (surface: keyof typeof surfaceColors) => surfaceColors[surface],
    getTextColor: (text: keyof typeof textColors) => textColors[text],
    getTechnologyColor: (tech: keyof typeof contextColors.technology) => contextColors.technology[tech],
    
  }), []);

  return colors;
};

/**
 * Hook específico para cores de tema
 */
export const useThemeColors = () => {
  const colors = useColors();
  
  return useMemo(() => ({
    // Cores base
    primary: hsl(colors.variables.primary.DEFAULT),
    secondary: hsl(colors.variables.secondary.DEFAULT),
    background: hsl(colors.variables.base.background),
    foreground: hsl(colors.variables.base.foreground),
    
    // Cores modernas
    bgPrimary: hsl(colors.variables.bg.primary),
    bgSecondary: hsl(colors.variables.bg.secondary),
    textPrimary: hsl(colors.variables.text.primary),
    textSecondary: hsl(colors.variables.text.secondary),
    
    // Cores de superfície
    surfacePrimary: hsl(colors.variables.surface.primary),
    surfaceSecondary: hsl(colors.variables.surface.secondary),
    
    // Cores de acento
    accent: hsl(colors.variables.accent.color),
    accentHover: hsl(colors.variables.accent.hover),
    accentLight: hsl(colors.variables.accent.light),
    
    // Bordas
    borderPrimary: hsl(colors.variables.border.primary),
    borderSecondary: hsl(colors.variables.border.secondary),
  }), [colors]);
};

/**
 * Hook para cores de status específicas
 */
export const useStatusColors = () => {
  const colors = useColors();
  
  return useMemo(() => ({
    success: colors.getStatusColor('success'),
    warning: colors.getStatusColor('warning'),
    error: colors.getStatusColor('error'),
    info: colors.getStatusColor('info'),
  }), [colors]);
};

/**
 * Hook para cores de superfície
 */
export const useSurfaceColors = () => {
  const colors = useColors();
  
  return useMemo(() => ({
    primary: colors.getSurfaceColor('primary'),
    secondary: colors.getSurfaceColor('secondary'),
    tertiary: colors.getSurfaceColor('tertiary'),
  }), [colors]);
};

/**
 * Hook para cores de texto
 */
export const useTextColors = () => {
  const colors = useColors();
  
  return useMemo(() => ({
    primary: colors.getTextColor('primary'),
    secondary: colors.getTextColor('secondary'),
    tertiary: colors.getTextColor('tertiary'),
  }), [colors]);
};
