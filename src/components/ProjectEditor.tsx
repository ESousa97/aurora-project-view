// src/components/ProjectEditor.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AppLayout } from '@/components/layout/AppLayout';
import { useToast } from '@/components/ui/use-toast';
import { apiService } from '@/services/staticApi';
import { ProjectCard } from '@/types';
import { Save, X, FileText, Eye, EyeOff, Download, Upload } from 'lucide-react';
import matter from 'gray-matter';

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

export const ProjectEditor: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const isEditing = !!id;

  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    categoria: 'REACT',
    imageurl: '',
    conteudo: ''
  });

  // Carregar projeto se estiver editando
  useEffect(() => {
    if (isEditing) {
      loadProject();
    }
  }, [id]);

  const loadProject = async () => {
    try {
      setLoading(true);
      const project = await apiService.getProjectDetails(id!);
      setFormData({
        titulo: project.titulo,
        descricao: project.descricao,
        categoria: project.categoria,
        imageurl: project.imageurl || '',
        conteudo: project.conteudo || ''
      });
    } catch (error) {
      toast({
        title: 'Erro ao carregar projeto',
        description: 'Não foi possível carregar os dados do projeto',
        variant: 'destructive'
      });
      navigate('/projects');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.titulo || !formData.descricao) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Título e descrição são obrigatórios',
        variant: 'destructive'
      });
      return;
    }

    try {
      setLoading(true);
      
      if (isEditing) {
        await apiService.updateProject(id!, formData);
        toast({
          title: 'Projeto atualizado!',
          description: 'As alterações foram salvas com sucesso'
        });
      } else {
        const newProject = await apiService.createProject(formData);
        toast({
          title: 'Projeto criado!',
          description: 'Seu novo projeto foi criado com sucesso'
        });
        navigate(`/projects/${newProject.id}`);
      }
    } catch (error) {
      toast({
        title: 'Erro ao salvar',
        description: 'Não foi possível salvar o projeto',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExportMarkdown = () => {
    const frontmatter = {
      id: id || Date.now(),
      titulo: formData.titulo,
      descricao: formData.descricao,
      categoria: formData.categoria,
      imageurl: formData.imageurl,
      data_criacao: new Date().toISOString(),
      data_modificacao: new Date().toISOString()
    };

    const markdown = matter.stringify(formData.conteudo, frontmatter);
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.titulo.toLowerCase().replace(/\s+/g, '-')}.md`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: 'Projeto exportado!',
      description: 'O arquivo markdown foi baixado'
    });
  };

  const handleImportMarkdown = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const { data, content: markdownContent } = matter(content);
        
        setFormData({
          titulo: data.titulo || '',
          descricao: data.descricao || '',
          categoria: data.categoria || 'OUTROS',
          imageurl: data.imageurl || '',
          conteudo: markdownContent || ''
        });

        toast({
          title: 'Projeto importado!',
          description: 'Os dados foram carregados do arquivo'
        });
      } catch (error) {
        toast({
          title: 'Erro ao importar',
          description: 'O arquivo não pôde ser lido',
          variant: 'destructive'
        });
      }
    };
    reader.readAsText(file);
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              {isEditing ? 'Editar Projeto' : 'Novo Projeto'}
            </h1>
            <p className="text-muted-foreground">
              {isEditing ? 'Atualize as informações do seu projeto' : 'Crie um novo projeto para seu portfólio'}
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowPreview(!showPreview)}
            >
              {showPreview ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
              {showPreview ? 'Editar' : 'Preview'}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => navigate('/projects')}
            >
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
          </div>
        </div>

        {/* Form ou Preview */}
        {showPreview ? (
          <Card>
            <CardHeader>
              <CardTitle>{formData.titulo || 'Sem título'}</CardTitle>
              <CardDescription>{formData.descricao || 'Sem descrição'}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none dark:prose-invert">
                <div dangerouslySetInnerHTML={{ 
                  __html: formData.conteudo.replace(/\n/g, '<br>') 
                }} />
              </div>
            </CardContent>
          </Card>
        ) : (
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
                    <Label htmlFor="imageurl">URL da Imagem</Label>
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
                <CardTitle>Conteúdo</CardTitle>
                <CardDescription>
                  Use Markdown para formatar o conteúdo do seu projeto
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.conteudo}
                  onChange={(e) => setFormData({ ...formData, conteudo: e.target.value })}
                  placeholder="# Sobre o projeto

## Tecnologias utilizadas

- React
- TypeScript
- Tailwind CSS

## Como executar

```bash
npm install
npm run dev
```"
                  rows={20}
                  className="font-mono text-sm"
                />
              </CardContent>
            </Card>

            {/* Ações */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleExportMarkdown}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Exportar .md
                </Button>
                
                <div>
                  <input
                    type="file"
                    accept=".md,.markdown"
                    onChange={handleImportMarkdown}
                    className="hidden"
                    id="import-file"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('import-file')?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Importar .md
                  </Button>
                </div>
              </div>

              <Button type="submit" disabled={loading}>
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Salvando...' : 'Salvar Projeto'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </AppLayout>
  );
};

export default ProjectEditor;
