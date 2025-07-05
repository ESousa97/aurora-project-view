// src/hooks/useRevealedProjects.ts
import { useState, useCallback, useEffect, useMemo } from 'react';

const STORAGE_KEY = 'revealed-projects';
const STORAGE_VERSION_KEY = 'revealed-projects-version';
const CURRENT_VERSION = '1.1'; // Aumentado para nova estrutura com timestamps
const MAX_STORAGE_ITEMS = 1000;
const REVEAL_DURATION = 1 * 60 * 1000; // 5 minutos em millisegundos

// Nova interface para projetos revelados com timestamp
interface RevealedProject {
  id: number;
  revealedAt: number; // timestamp
}

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
  const [revealedProjects, setRevealedProjects] = useState<Map<number, RevealedProject>>(new Map());
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

  // Função para limpar projetos expirados
  const cleanExpiredProjects = useCallback((projectsMap: Map<number, RevealedProject>) => {
    const now = Date.now();
    const cleaned = new Map<number, RevealedProject>();
    
    projectsMap.forEach((project, id) => {
      if (now - project.revealedAt < REVEAL_DURATION) {
        cleaned.set(id, project);
      } else {
        console.log('⏰ Expired mystery project:', id, 'revealed', Math.round((now - project.revealedAt) / 1000 / 60), 'minutes ago');
      }
    });
    
    return cleaned;
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
          try {
            const parsedData = JSON.parse(stored) as RevealedProject[];
            const projectsMap = new Map<number, RevealedProject>();
            
            parsedData.forEach(project => {
              projectsMap.set(project.id, project);
            });
            
            // Limpar projetos expirados
            const cleanedMap = cleanExpiredProjects(projectsMap);
            
            setRevealedProjects(cleanedMap);
            console.log('💾 Loaded revealed projects from localStorage:', cleanedMap.size, 'projects');
            
            // Salvar versão limpa se necessário
            if (cleanedMap.size !== projectsMap.size) {
              const cleanedArray = Array.from(cleanedMap.values());
              localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanedArray));
              console.log('🧹 Cleaned expired projects from localStorage');
            }
          } catch (parseError) {
            console.error('❌ Error parsing revealed projects:', parseError);
            localStorage.removeItem(STORAGE_KEY);
            localStorage.setItem(STORAGE_VERSION_KEY, CURRENT_VERSION);
          }
        } else if (version !== CURRENT_VERSION) {
          // Versão desatualizada, limpar e começar fresh
          localStorage.removeItem(STORAGE_KEY);
          localStorage.setItem(STORAGE_VERSION_KEY, CURRENT_VERSION);
          console.log('🔄 Updated localStorage version to v1.1 with timestamps');
        }
      } catch (error) {
        console.error('❌ Error loading revealed projects from localStorage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRevealedProjects();
  }, [isLocalStorageAvailable, cleanExpiredProjects]);

  // Timer para limpeza automática dos projetos expirados
  useEffect(() => {
    const interval = setInterval(() => {
      setRevealedProjects(current => {
        const cleaned = cleanExpiredProjects(current);
        
        if (cleaned.size !== current.size) {
          console.log('⏰ Auto-cleaned expired projects:', current.size - cleaned.size, 'removed');
          
          // Atualizar localStorage
          if (isLocalStorageAvailable) {
            try {
              const cleanedArray = Array.from(cleaned.values());
              localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanedArray));
              // Notificar outros componentes
              setTimeout(() => revealEventSystem.notify(), 0);
            } catch (error) {
              console.error('❌ Error updating localStorage during cleanup:', error);
            }
          }
          
          return cleaned;
        }
        
        return current;
      });
    }, 30000); // Verificar a cada 30 segundos

    return () => clearInterval(interval);
  }, [cleanExpiredProjects, isLocalStorageAvailable]);

  // Sincronização em tempo real entre componentes
  useEffect(() => {
    const unsubscribe = revealEventSystem.subscribe(() => {
      if (isLocalStorageAvailable) {
        try {
          const stored = localStorage.getItem(STORAGE_KEY);
          if (stored) {
            const parsedData = JSON.parse(stored) as RevealedProject[];
            const projectsMap = new Map<number, RevealedProject>();
            
            parsedData.forEach(project => {
              projectsMap.set(project.id, project);
            });
            
            const cleanedMap = cleanExpiredProjects(projectsMap);
            setRevealedProjects(cleanedMap);
            console.log('🔄 Synchronized revealed projects from event:', cleanedMap.size);
          }
        } catch (error) {
          console.error('❌ Error synchronizing revealed projects:', error);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [isLocalStorageAvailable, cleanExpiredProjects]);

  // Revelar um projeto específico com timestamp
  const revealProject = useCallback((projectId: number) => {
    const now = Date.now();
    
    setRevealedProjects(prev => {
      // Verificar se já está revelado e ainda válido
      const existing = prev.get(projectId);
      if (existing && (now - existing.revealedAt) < REVEAL_DURATION) {
        console.log('💾 Project already revealed and still valid:', projectId);
        return prev;
      }

      const newMap = new Map(prev);
      const revealedProject: RevealedProject = {
        id: projectId,
        revealedAt: now
      };
      
      newMap.set(projectId, revealedProject);
      
      // Salvar no localStorage
      if (isLocalStorageAvailable) {
        try {
          const arrayData = Array.from(newMap.values());
          const limitedData = arrayData.slice(-MAX_STORAGE_ITEMS);
          
          localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedData));
          localStorage.setItem(STORAGE_VERSION_KEY, CURRENT_VERSION);
          
          console.log('💾 Saved revealed project with timestamp:', {
            projectId,
            revealedAt: new Date(now).toISOString(),
            expiresAt: new Date(now + REVEAL_DURATION).toISOString(),
            total: limitedData.length
          });
          
          // Notificar outros componentes
          setTimeout(() => revealEventSystem.notify(), 0);
          
        } catch (error) {
          console.error('❌ Error saving to localStorage:', error);
        }
      }
      
      return newMap;
    });
  }, [isLocalStorageAvailable]);

  // Verificar se um projeto foi revelado E ainda está dentro do tempo
  const isProjectRevealed = useCallback((projectId: number) => {
    const revealed = revealedProjects.get(projectId);
    if (!revealed) return false;
    
    const now = Date.now();
    const isValid = (now - revealed.revealedAt) < REVEAL_DURATION;
    
    if (!isValid) {
      // Projeto expirado, remover na próxima limpeza
      console.log('⏰ Project expired:', projectId);
    }
    
    return isValid;
  }, [revealedProjects]);

  // Verificar se um projeto foi revelado PERMANENTEMENTE (para navegação)
  const isProjectPermanentlyRevealed = useCallback((projectId: number) => {
    return revealedProjects.has(projectId);
  }, [revealedProjects]);

  // Obter tempo restante para um projeto revelado
  const getProjectTimeRemaining = useCallback((projectId: number): number => {
    const revealed = revealedProjects.get(projectId);
    if (!revealed) return 0;
    
    const now = Date.now();
    const elapsed = now - revealed.revealedAt;
    const remaining = REVEAL_DURATION - elapsed;
    
    return Math.max(0, remaining);
  }, [revealedProjects]);

  // Obter estatísticas dos projetos revelados
  const getRevealedStats = useCallback(() => {
    const now = Date.now();
    const active = Array.from(revealedProjects.values()).filter(
      project => (now - project.revealedAt) < REVEAL_DURATION
    );
    
    return {
      total: revealedProjects.size,
      active: active.length,
      expired: revealedProjects.size - active.length,
      isLocalStorageAvailable,
      storageUsed: isLocalStorageAvailable ? 
        (localStorage.getItem(STORAGE_KEY)?.length || 0) : 0
    };
  }, [revealedProjects, isLocalStorageAvailable]);

  // Limpar todos os projetos revelados
  const clearRevealedProjects = useCallback(() => {
    setRevealedProjects(new Map());
    
    if (isLocalStorageAvailable) {
      try {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STORAGE_VERSION_KEY);
        console.log('💾 Cleared all revealed projects from localStorage');
        
        setTimeout(() => revealEventSystem.notify(), 0);
      } catch (error) {
        console.error('❌ Error clearing localStorage:', error);
      }
    }
  }, [isLocalStorageAvailable]);

  // Forçar expiração de um projeto específico
  const expireProject = useCallback((projectId: number) => {
    setRevealedProjects(prev => {
      const newMap = new Map(prev);
      newMap.delete(projectId);
      
      if (isLocalStorageAvailable) {
        try {
          const arrayData = Array.from(newMap.values());
          localStorage.setItem(STORAGE_KEY, JSON.stringify(arrayData));
          setTimeout(() => revealEventSystem.notify(), 0);
        } catch (error) {
          console.error('❌ Error updating localStorage after expire:', error);
        }
      }
      
      return newMap;
    });
  }, [isLocalStorageAvailable]);

  return {
    revealedProjects: new Set(Array.from(revealedProjects.keys())), // Compatibilidade com código existente
    revealProject,
    isProjectRevealed,
    isProjectPermanentlyRevealed,
    getProjectTimeRemaining,
    clearRevealedProjects,
    expireProject,
    getRevealedStats,
    isLoading,
    isLocalStorageAvailable,
    // Constantes úteis
    REVEAL_DURATION
  };
};
