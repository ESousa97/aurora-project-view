
// src/lib/colors/context-colors.ts - Cores por contexto
import { COLOR_VARIABLES } from './variables';

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
