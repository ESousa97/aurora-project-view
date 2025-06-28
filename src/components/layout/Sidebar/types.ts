// src/components/layout/Sidebar/types.ts
export interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}

export interface Category {
  name: string;
  count: number;
}
