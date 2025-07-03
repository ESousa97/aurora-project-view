// constants/hero.ts
import { Code, Palette, Atom, Zap, Eye, Sparkles } from 'lucide-react';
import { FloatingIconData } from '../types/hero';

export const INSPIRATION_WORDS = ['Inovação', 'Criatividade', 'Solução', 'Revolução', 'Descoberta'];

export const FLOATING_ICONS: FloatingIconData[] = [
  { Icon: Code, delay: 0, position: { top: '15%', left: '10%' } },
  { Icon: Palette, delay: 0.5, position: { top: '25%', right: '15%' } },
  { Icon: Atom, delay: 1, position: { bottom: '30%', left: '8%' } },
  { Icon: Zap, delay: 1.5, position: { bottom: '20%', right: '12%' } },
  { Icon: Eye, delay: 2, position: { top: '45%', left: '5%' } },
  { Icon: Sparkles, delay: 2.5, position: { top: '35%', right: '8%' } },
];

export const SPRING_CONFIG = { stiffness: 100, damping: 30, restDelta: 0.001 };
