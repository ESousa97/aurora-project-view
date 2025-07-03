// src/pages/NewProject.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { apiService } from '@/services/staticApi';
import { Save, X, Download } from 'lucide-react';

const CATEGORIAS = [
  'REACT', 'VUE', 'ANGULAR', 'JAVASCRIPT', 'TYPESCRIPT',
  'PYTHON', 'JAVA', 'PHP', 'GO', 'RUST',
  'NODE', 'DJANGO', 'LARAVEL', 'SPRING',
  'FLUTTER', 'REACT NATIVE', 'SWIFT', 'KOTLIN',
  'HTML/CSS', 'SASS', 'TAILWIND',
  'POSTGRESQL', 'MYSQL', 'MONGODB', 'REDIS',
  'DOCKER', 'KUBERNETES', 'AWS', 'FIREBASE',
  'AI/ML', 'BLOCKCHAIN', 'GAMING', 'OUTROS'
];

const NewProject: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    categoria: 'REACT',
    imageurl: '',
    conteudo: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.titulo || !formData.descricao) {
      toast.error('Título e descrição são obrigatórios');
      return;
    }

    try {
      setLoading(true);
      const newProject = await apiService.createProject(formData);
      toast.success('Projeto criado com sucesso!');
      navigate(`/projects/${newProject.id}`);
    } catch (error) {
      toast.error('Erro ao criar projeto');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportTemplate = () => {
    const template = `---
id: ${Date.now()}
titulo: "${formData.titulo || 'Título do Projeto'}"
descricao: "${formData.descricao || 'Descrição do projeto'}"
categoria: "${formData.categoria}"
imageurl: "${formData.imageurl}"
data_criacao: "${new Date().toISOString()}"
data_modificacao: "${new Date().toISOString()}"
tags: []
destaque: false
---

${formData.conteudo || '# Título do Projeto\n\n## Descrição\n\nDescrição detalhada...\n\n## Tecnologias\n\n- React\n- TypeScript\n\n## Como usar\n\n```bash\nnpm install\nnpm run dev\n```'}`;

    const blob = new Blob([template], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `projeto-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('Template exportado!');
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Novo Projeto</h1>
            <p className="text-muted-foreground">
              Crie um novo projeto para seu portfólio
            </p>
          </div>
          
          <Button
            variant="outline"
            onClick={() => navigate('/projects')}
          >
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="titulo">Título *</Label>
                <Input
                  id="titulo"
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  placeholder="Nome do seu projeto"
                  required
                />
              </div>

              <div>
                <Label htmlFor="descricao">Descrição *</Label>
                <Textarea
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  placeholder="Breve descrição do projeto"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="categoria">Categoria</Label>
                  <Select
                    value={formData.categoria}
                    onValueChange={(value) => setFormData({ ...formData, categoria: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIAS.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="imageurl">URL da Imagem (opcional)</Label>
                  <Input
                    id="imageurl"
                    type="url"
                    value={formData.imageurl}
                    onChange={(e) => setFormData({ ...formData, imageurl: e.target.value })}
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conteúdo (Markdown)</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.conteudo}
                onChange={(e) => setFormData({ ...formData, conteudo: e.target.value })}
                placeholder={`# Sobre o projeto

## Tecnologias utilizadas

- React
- TypeScript
- Tailwind CSS

## Como executar

\`\`\`bash
npm install
npm run dev
\`\`\`

## Features

- Feature 1
- Feature 2
- Feature 3`}
                rows={15}
                className="font-mono text-sm"
              />
            </CardContent>
          </Card>

          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handleExportTemplate}
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar Template
            </Button>

            <Button type="submit" disabled={loading}>
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'Criando...' : 'Criar Projeto'}
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};

export default NewProject;
