
// src/components/project/ProjectCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ProjectCard } from './ProjectCard';
import { ProjectCard as ProjectCardType } from '@/types';
import { BrowserRouter } from 'react-router-dom';

const mockProject: ProjectCardType = {
  id: '1',
  titulo: 'Sistema de Automação Inteligente',
  descricao: 'Um sistema completo de automação residencial usando IoT e IA para otimizar o consumo de energia.',
  categoria: 'IoT',
  data_modificacao: '2024-01-15T10:30:00Z',
  imageurl: null,
};

const meta = {
  title: 'Project/ProjectCard',
  component: ProjectCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div style={{ width: '320px' }}>
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'compact'],
    },
  },
} satisfies Meta<typeof ProjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    project: mockProject,
    variant: 'default',
  },
};

export const Compact: Story = {
  args: {
    project: mockProject,
    variant: 'compact',
  },
};

export const WithImage: Story = {
  args: {
    project: {
      ...mockProject,
      imageurl: 'https://picsum.photos/400/240?random=1',
    },
    variant: 'default',
  },
};
