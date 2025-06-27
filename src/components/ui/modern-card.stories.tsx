
// src/components/ui/modern-card.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ModernCard } from './modern-card';

const meta = {
  title: 'UI/ModernCard',
  component: ModernCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'glass', 'gradient'],
    },
    hover: {
      control: { type: 'boolean' },
    },
    shadow: {
      control: { type: 'select' },
      options: ['light', 'medium', 'heavy'],
    },
  },
} satisfies Meta<typeof ModernCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">Card Title</h3>
        <p className="text-muted-foreground">
          This is a modern card component with hover effects and customizable variants.
        </p>
      </div>
    ),
  },
};

export const Glass: Story = {
  args: {
    variant: 'glass',
    children: (
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">Glass Card</h3>
        <p className="text-muted-foreground">
          A glassmorphism-styled card with backdrop blur effects.
        </p>
      </div>
    ),
  },
};

export const Gradient: Story = {
  args: {
    variant: 'gradient',
    children: (
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">Gradient Card</h3>
        <p className="text-muted-foreground">
          A card with gradient background styling.
        </p>
      </div>
    ),
  },
};
