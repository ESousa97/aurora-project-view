
// src/components/LazyComponents.tsx - Componentes lazy para code splitting
import { lazy } from 'react';

// Páginas
export const LazyDashboard = lazy(() => import('@/pages/Dashboard').then(m => ({ default: m.Dashboard })));
export const LazyProjects = lazy(() => import('@/pages/Projects'));
export const LazyProjectDetail = lazy(() => import('@/pages/ProjectDetail'));

// Componentes grandes
export const LazyProjectGrid = lazy(() => import('@/components/project/ProjectGrid'));
export const LazyProjectTimeline = lazy(() => import('@/components/project/ProjectTimeline'));
export const LazyEnhancedProjectCard = lazy(() => import('@/components/project/EnhancedProjectCard'));
