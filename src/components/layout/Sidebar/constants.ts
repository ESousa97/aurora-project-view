// src/components/layout/Sidebar/constants.ts
import { SiRocket, SiCompass, SiBarChart } from '@/lib/languageColors/icons';
import { NavItem } from './types';

export const navItems: NavItem[] = [
  { name: 'Base de Operações', href: '/', icon: SiRocket, gradient: 'from-blue-600 to-purple-600' },
  { name: 'Explorar Territórios', href: '/projects', icon: SiCompass, gradient: 'from-emerald-600 to-blue-600' },
  { name: 'Centro de Comando', href: '/dashboard', icon: SiBarChart, gradient: 'from-purple-600 to-pink-600' },
];
