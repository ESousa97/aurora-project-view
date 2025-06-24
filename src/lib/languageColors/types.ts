
import { ReactComponentElement } from 'react';

export interface LanguageColor {
  name: string;
  displayName: string;
  color: string;
  bgColor: string;
  textColor: string;
  gradient: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  category: 'frontend' | 'backend' | 'mobile' | 'database' | 'devops' | 'design' | 'ai' | 'game' | 'blockchain' | 'testing' | 'other';
  difficulty: 1 | 2 | 3 | 4 | 5;
  trending: boolean;
  popularity: number; // 1-10 scale
  description: string;
  keywords: string[];
}

export type TechnologyCategory = LanguageColor['category'];
