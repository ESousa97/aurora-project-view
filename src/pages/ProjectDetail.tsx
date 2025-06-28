
import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProjectsWithLanguage } from '@/hooks/useCategories';
import { ProjectViewer } from '@/components/project/ProjectViewer';
import { AppLayout } from '@/components/layout/AppLayout';
import { Link } from 'react-router-dom';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: projects, isLoading } = useProjectsWithLanguage();
  
  const project = projects?.find(p => p.id === parseInt(id || '0'));

  if (isLoading) {
    return (
      <AppLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse space-y-8 max-w-4xl w-full mx-auto p-8">
            <div className="h-16 bg-muted rounded-lg" />
            <div className="space-y-4">
              <div className="h-8 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-5/6" />
            </div>
            <div className="h-64 bg-muted rounded-lg" />
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-4/5" />
              <div className="h-4 bg-muted rounded w-3/4" />
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!project) {
    return (
      <AppLayout>
        <div className="min-h-screen flex items-center justify-center">
          <motion.div 
            className="text-center space-y-6 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <h1 className="text-3xl font-bold text-foreground">
              Projeto não encontrado
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              O projeto que você procura não existe ou foi removido do nosso portfólio.
            </p>
            <Button asChild size="lg" className="mt-6">
              <Link to="/projects">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Voltar aos projetos
              </Link>
            </Button>
          </motion.div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <ProjectViewer project={project} />
    </AppLayout>
  );
};

export default ProjectDetail;
