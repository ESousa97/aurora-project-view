// src/hooks/useMDXProjects.ts
import { useState, useEffect } from 'react';
import { ProjectCard } from '@/types';
import { detectLanguage, LanguageColor } from '@/lib/languageColors';
import { getAllMDXProjects, getMDXProjectById, getFeaturedMDXProjects } from '@/utils/mdxProjectLoader';
import type { EnhancedProjectCard } from '@/types/enhanced';

// Hook para carregar todos os projetos MDX com detecção de linguagem
export const useMDXProjects = () => {
  const [projects, setProjects] = useState<EnhancedProjectCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const mdxProjects = await getAllMDXProjects();
        
        // Enriquecer projetos com detecção de linguagem
        const enhancedProjects: EnhancedProjectCard[] = mdxProjects.map(project => ({
          ...project,
          detectedLanguage: detectLanguage(project),
          languageMetadata: {
            detectedAt: new Date().toISOString(),
            confidence: 100
          }
        }));
        
        setProjects(enhancedProjects);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar projetos MDX');
        console.error('Erro ao carregar projetos MDX:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  return { 
    data: projects, 
    isLoading, 
    error,
    refetch: () => {
      setIsLoading(true);
      // Re-executar o useEffect
    }
  };
};

// Hook para projeto MDX individual
export const useMDXProject = (id: number) => {
  const [project, setProject] = useState<EnhancedProjectCard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProject = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const mdxProject = await getMDXProjectById(id);
        
        if (mdxProject) {
          const enhancedProject: EnhancedProjectCard = {
            ...mdxProject,
            detectedLanguage: detectLanguage(mdxProject),
            languageMetadata: {
              detectedAt: new Date().toISOString(),
              confidence: 100
            }
          };
          setProject(enhancedProject);
        } else {
          setProject(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar projeto MDX');
        console.error('Erro ao carregar projeto MDX:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadProject();
    }
  }, [id]);

  return { data: project, isLoading, error };
};

// Hook para projetos em destaque
export const useFeaturedMDXProjects = () => {
  const [projects, setProjects] = useState<EnhancedProjectCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFeaturedProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const featuredProjects = await getFeaturedMDXProjects();
        
        const enhancedProjects: EnhancedProjectCard[] = featuredProjects.map(project => ({
          ...project,
          detectedLanguage: detectLanguage(project),
          languageMetadata: {
            detectedAt: new Date().toISOString(),
            confidence: 100
          }
        }));
        
        setProjects(enhancedProjects);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar projetos em destaque');
        console.error('Erro ao carregar projetos em destaque:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeaturedProjects();
  }, []);

  return { data: projects, isLoading, error };
};
