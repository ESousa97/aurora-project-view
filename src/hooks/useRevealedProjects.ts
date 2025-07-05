// src/hooks/useRevealedProjects.ts
import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'revealed-projects';

export const useRevealedProjects = () => {
  const [revealedProjects, setRevealedProjects] = useState<Set<number>>(new Set());

  // Carregar projetos revelados do localStorage na inicialização
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedIds = JSON.parse(stored) as number[];
        setRevealedProjects(new Set(parsedIds));
        console.log('💾 Loaded revealed projects from localStorage:', parsedIds);
      }
    } catch (error) {
      console.error('❌ Error loading revealed projects from localStorage:', error);
    }
  }, []);

  // Revelar um projeto específico
  const revealProject = useCallback((projectId: number) => {
    setRevealedProjects(prev => {
      const newSet = new Set(prev);
      newSet.add(projectId);
      
      // Salvar no localStorage
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(newSet)));
        console.log('💾 Saved revealed project to localStorage:', projectId);
      } catch (error) {
        console.error('❌ Error saving to localStorage:', error);
      }
      
      return newSet;
    });
  }, []);

  // Verificar se um projeto foi revelado
  const isProjectRevealed = useCallback((projectId: number) => {
    return revealedProjects.has(projectId);
  }, [revealedProjects]);

  // Limpar todos os projetos revelados (para debug/reset)
  const clearRevealedProjects = useCallback(() => {
    setRevealedProjects(new Set());
    try {
      localStorage.removeItem(STORAGE_KEY);
      console.log('💾 Cleared all revealed projects from localStorage');
    } catch (error) {
      console.error('❌ Error clearing localStorage:', error);
    }
  }, []);

  return {
    revealedProjects,
    revealProject,
    isProjectRevealed,
    clearRevealedProjects
  };
};