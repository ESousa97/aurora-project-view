
// src/hooks/useColors.ts - Hook para gerenciar cores de forma reativa
import { useMemo } from 'react';
import { 
  COLOR_VARIABLES, 
  getColor, 
  hsl, 
  hslWithOpacity, 
  statusColors,
  stateColors,
  colorClasses,
  contextColors 
} from '@/lib/colors';

export const useColors = () => {
  const colors = useMemo(() => ({
    // Variáveis base
    variables: COLOR_VARIABLES,
    
    // Utilitários
    get: getColor,
    hsl,
    hslWithOpacity,
    
    // Cores por contexto
    status: statusColors,
    state: stateColors,
    context: contextColors,
    
    // Classes CSS
    classes: colorClasses,
    
    // Helpers para componentes comuns
    getStatusColor: (status: keyof typeof statusColors) => statusColors[status],
    getStateColor: (state: keyof typeof stateColors) => stateColors[state],
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
    primary: hsl(colors.variables.primary.DEFAULT),
    secondary: hsl(colors.variables.secondary.DEFAULT),
    background: hsl(colors.variables.base.background),
    foreground: hsl(colors.variables.base.foreground),
    card: hsl(colors.variables.base.card),
    border: hsl(colors.variables.interface.border),
    muted: hsl(colors.variables.muted.DEFAULT),
    accent: hsl(colors.variables.accent.DEFAULT),
  }), [colors]);
};

/**
 * Hook para cores de status específicas
 */
export const useStatusColors = () => {
  const colors = useColors();
  
  return useMemo(() => ({
    active: colors.getStatusColor('active'),
    completed: colors.getStatusColor('completed'),
    draft: colors.getStatusColor('draft'),
    paused: colors.getStatusColor('paused'),
  }), [colors]);
};
