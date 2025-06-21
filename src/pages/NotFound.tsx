// src/pages/NotFound.tsx
import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Compass } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-8xl mb-6">🗺️</div>
        <h1 className="text-5xl font-bold mb-4">404 - Território Desconhecido</h1>
        <p className="text-xl text-muted-foreground max-w-lg mx-auto mb-8">
          Oops! Parece que você se aventurou por um caminho que não existe. Vamos voltar para a base.
        </p>
        <Button asChild size="lg">
          <Link to="/">
            <Compass className="mr-2 h-5 w-5" />
            Retornar à Base de Operações
          </Link>
        </Button>
      </div>
    </AppLayout>
  );
};

export default NotFound;
