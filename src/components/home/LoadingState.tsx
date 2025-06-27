
// src/components/home/LoadingState.tsx
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';

export const LoadingState: React.FC = () => {
  return (
    <AppLayout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-6">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400 mx-auto"></div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">
              Preparando sua jornada...
            </h3>
            <p className="text-muted-foreground">
              Carregando projetos e descobertas incríveis
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
