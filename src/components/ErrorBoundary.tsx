
// src/components/ErrorBoundary.tsx - Boundary para erros de lazy loading
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ComponentType<{ error?: Error; retry?: () => void }> },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return (
        <FallbackComponent 
          error={this.state.error} 
          retry={() => this.setState({ hasError: false, error: undefined })}
        />
      );
    }

    return this.props.children;
  }
}

const DefaultErrorFallback: React.FC<{ error?: Error; retry?: () => void }> = ({ error, retry }) => (
  <Card className="w-full max-w-md mx-auto mt-8">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-destructive">
        <AlertTriangle className="h-5 w-5" />
        Erro no Componente
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Ocorreu um erro ao carregar este componente.
      </p>
      {error && (
        <details className="text-xs bg-muted p-2 rounded">
          <summary>Detalhes técnicos</summary>
          <pre className="mt-2 whitespace-pre-wrap">{error.message}</pre>
        </details>
      )}
      {retry && (
        <Button onClick={retry} variant="outline" className="w-full">
          <RefreshCw className="h-4 w-4 mr-2" />
          Tentar Novamente
        </Button>
      )}
    </CardContent>
  </Card>
);
