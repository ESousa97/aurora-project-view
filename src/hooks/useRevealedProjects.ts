// src/hooks/useRevealedProjects.ts
import { useState, useCallback, useEffect, useMemo } from 'react';

const STORAGE_KEY = 'revealed-projects';
const STORAGE_VERSION_KEY = 'revealed-projects-version';
const CURRENT_VERSION = '1.0';
const MAX_STORAGE_ITEMS = 1000; // Limite para evitar overflow do localStorage

// Sistema de eventos para sincronização entre componentes
const createEventSystem = () => {
  const listeners = new Set<() => void>();
  
  return {
    subscribe: (callback: () => void) => {
      listeners.add(callback);
      return () => listeners.delete(callback);
    },
    notify: () => {
      listeners.forEach(callback => callback());
    }
  };
};

const revealEventSystem = createEventSystem();

export const useRevealedProjects = () => {
  const [revealedProjects, setRevealedProjects] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  // Fallback para localStorage indisponível
  const isLocalStorageAvailable = useMemo(() => {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, 'test');
      localStorage.removeItem(test);
      return true;
    } catch {
      console.warn('⚠️ localStorage não disponível, usando estado em memória');
      return false;
    }
  }, []);

  // Carregar projetos revelados do localStorage na inicialização
  useEffect(() => {
    const loadRevealedProjects = async () => {
      try {
        if (!isLocalStorageAvailable) {
          setIsLoading(false);
          return;
        }

        const stored = localStorage.getItem(STORAGE_KEY);
        const version = localStorage.getItem(STORAGE_VERSION_KEY);
        
        if (stored && version === CURRENT_VERSION) {
          const parsedIds = JSON.parse(stored) as number[];
          
          // Limitar o número de itens para evitar problemas de performance
          const limitedIds = parsedIds.slice(-MAX_STORAGE_ITEMS);
          
          setRevealedProjects(new Set(limitedIds));
          console.log('💾 Loaded revealed projects from localStorage:', limitedIds.length, 'projects');
          
          // Se limitamos os itens, salvar a versão reduzida
          if (limitedIds.length !== parsedIds.length) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedIds));
            console.log('🧹 Cleaned up localStorage, kept last', MAX_STORAGE_ITEMS, 'projects');
          }
        } else if (version !== CURRENT_VERSION) {
          // Versão desatualizada, limpar e começar fresh
          localStorage.removeItem(STORAGE_KEY);
          localStorage.setItem(STORAGE_VERSION_KEY, CURRENT_VERSION);
          console.log('🔄 Updated localStorage version, starting fresh');
        }
      } catch (error) {
        console.error('❌ Error loading revealed projects from localStorage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRevealedProjects();
  }, [isLocalStorageAvailable]);

  // Sincronização em tempo real entre componentes
  useEffect(() => {
    const unsubscribe = revealEventSystem.subscribe(() => {
      // Recarregar dados quando outro componente fizer mudanças
      if (isLocalStorageAvailable) {
        try {
          const stored = localStorage.getItem(STORAGE_KEY);
          if (stored) {
            const parsedIds = JSON.parse(stored) as number[];
            setRevealedProjects(new Set(parsedIds));
            console.log('🔄 Synchronized revealed projects from event:', parsedIds.length);
          }
        } catch (error) {
          console.error('❌ Error synchronizing revealed projects:', error);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [isLocalStorageAvailable]);

  // Revelar um projeto específico com sincronização
  const revealProject = useCallback((projectId: number) => {
    setRevealedProjects(prev => {
      // Evitar duplicatas
      if (prev.has(projectId)) {
        console.log('💾 Project already revealed:', projectId);
        return prev;
      }

      const newSet = new Set(prev);
      newSet.add(projectId);
      
      // Salvar no localStorage com fallback
      if (isLocalStorageAvailable) {
        try {
          const arrayData = Array.from(newSet);
          
          // Limitar tamanho para evitar overflow
          const limitedData = arrayData.slice(-MAX_STORAGE_ITEMS);
          
          localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedData));
          localStorage.setItem(STORAGE_VERSION_KEY, CURRENT_VERSION);
          
          console.log('💾 Saved revealed project to localStorage:', projectId, 'Total:', limitedData.length);
          
          // Notificar outros componentes sobre a mudança
          setTimeout(() => revealEventSystem.notify(), 0);
          
        } catch (error) {
          console.error('❌ Error saving to localStorage:', error);
          // Continuar funcionando mesmo se localStorage falhar
        }
      }
      
      return newSet;
    });
  }, [isLocalStorageAvailable]);

  // Verificar se um projeto foi revelado (com cache otimizado)
  const isProjectRevealed = useCallback((projectId: number) => {
    return revealedProjects.has(projectId);
  }, [revealedProjects]);

  // Obter estatísticas dos projetos revelados
  const getRevealedStats = useCallback(() => {
    return {
      total: revealedProjects.size,
      isLocalStorageAvailable,
      storageUsed: isLocalStorageAvailable ? 
        (localStorage.getItem(STORAGE_KEY)?.length || 0) : 0
    };
  }, [revealedProjects.size, isLocalStorageAvailable]);

  // Limpar todos os projetos revelados (para debug/reset)
  const clearRevealedProjects = useCallback(() => {
    setRevealedProjects(new Set());
    
    if (isLocalStorageAvailable) {
      try {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STORAGE_VERSION_KEY);
        console.log('💾 Cleared all revealed projects from localStorage');
        
        // Notificar outros componentes
        setTimeout(() => revealEventSystem.notify(), 0);
      } catch (error) {
        console.error('❌ Error clearing localStorage:', error);
      }
    }
  }, [isLocalStorageAvailable]);

  return {
    revealedProjects,
    revealProject,
    isProjectRevealed,
    clearRevealedProjects,
    getRevealedStats,
    isLoading,
    isLocalStorageAvailable
  };
};