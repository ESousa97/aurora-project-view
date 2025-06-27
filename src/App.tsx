// src/App.tsx - Com correção de background
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import { Dashboard } from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { useBackgroundFix } from "./hooks/useBackgroundFix";
import { useSidebarFix } from "./hooks/useSidebarFix";
import { useEffect } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Componente interno que usa os hooks
const AppWithBackgroundFix = () => {
  const { checkAndFixBackground } = useBackgroundFix();
  const { checkAndFixSidebar } = useSidebarFix();

  // Verificação adicional a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      checkAndFixBackground();
      checkAndFixSidebar();
    }, 5000);

    return () => clearInterval(interval);
  }, [checkAndFixBackground, checkAndFixSidebar]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppWithBackgroundFix />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
