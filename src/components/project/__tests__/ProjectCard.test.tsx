
// src/components/project/__tests__/ProjectCard.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test-utils';
import { ProjectCard } from '../ProjectCard';
import { ProjectCard as ProjectCardType } from '@/types';

const mockProject: ProjectCardType = {
  id: '1',
  titulo: 'Test Project',
  descricao: 'Test description',
  categoria: 'Frontend',
  data_modificacao: '2024-01-01T00:00:00Z',
  imageurl: null,
};

describe('ProjectCard', () => {
  it('renders project title and description', () => {
    render(<ProjectCard project={mockProject} />);
    
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders in compact variant', () => {
    render(<ProjectCard project={mockProject} variant="compact" />);
    
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('Frontend')).toBeInTheDocument();
  });

  it('displays default message when no description', () => {
    const projectWithoutDesc = { ...mockProject, descricao: null };
    render(<ProjectCard project={projectWithoutDesc} />);
    
    expect(screen.getByText('Este projeto ainda não possui uma descrição.')).toBeInTheDocument();
  });
});
