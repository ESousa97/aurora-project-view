// src/hooks/useProjectViewer.ts
import { useState, useEffect } from 'react';
import { ProjectCard as ProjectCardType } from '@/types';

interface UseProjectViewerResult {
  content: string | null;
  isLoading: boolean;
  error: string | null;
}

export function useProjectViewer(project: ProjectCardType): UseProjectViewerResult {
  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(`/api/projects/${project.id}`);
        if (!res.ok) throw new Error('Falha ao carregar projeto');
        const data = await res.json() as { conteudo?: string };
        setContent(data.conteudo ?? null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, [project.id]);

  return { content, isLoading, error };
}
