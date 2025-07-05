import React from 'react';
import { Search } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';

export const EmptyState: React.FC = () => {
  return (
    <AppLayout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <Search className="h-12 w-12 text-white" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Nenhum projeto encontrado
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Os projetos MDX não foram encontrados ou ainda estão sendo carregados.
            </p>
          </div>
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            <p>Verificando arquivos em: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">public/projects/</code></p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
