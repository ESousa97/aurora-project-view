// src/components/LoadingState.tsx
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';

export const LoadingState: React.FC = () => {
  return (
    <AppLayout>
      <div
        className="
          flex items-center justify-center
          w-full
          min-h-[calc(100vh-4rem)]
          bg-gradient-to-br
            from-gray-50 via-blue-50 to-purple-50
          dark:from-gray-900 dark:via-blue-950 dark:to-purple-950
        "
      >
        <div className="text-center space-y-6">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto" />
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Preparando sua jornada...
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Carregando projetos e descobertas incríveis
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
