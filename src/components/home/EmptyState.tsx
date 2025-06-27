
// src/components/home/EmptyState.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';

export const EmptyState: React.FC = () => {
  return (
    <AppLayout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
            <Search className="h-12 w-12 text-white" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">
              Nenhum projeto encontrado
            </h3>
            <p className="text-muted-foreground">
              Que tal criar seu primeiro projeto e começar a jornada?
            </p>
          </div>
          <Link to="/projects/new">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-lg font-medium hover:scale-105 transition-transform">
              Criar Primeiro Projeto
            </button>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
};
