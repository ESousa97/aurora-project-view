// src/pages/Settings.tsx
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useUIStore } from '@/stores/uiStore';
import { Settings as SettingsIcon, Palette, Layout, Bell, Database } from 'lucide-react';

export const Settings = () => {
  const { theme, setTheme, viewMode, setViewMode } = useUIStore();

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Configurações</h1>
          <p className="text-muted-foreground">
            Personalize sua experiência na plataforma
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Appearance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Aparência
              </CardTitle>
              <CardDescription>
                Configure o tema e modo de visualização
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Tema</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Claro</SelectItem>
                    <SelectItem value="dark">Escuro</SelectItem>
                    <SelectItem value="system">Sistema</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="viewMode">Modo de Visualização Padrão</Label>
                <Select value={viewMode} onValueChange={setViewMode}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grid">Grade</SelectItem>
                    <SelectItem value="list">Lista</SelectItem>
                    <SelectItem value="timeline">Timeline (Em Breve)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                Preferências
              </CardTitle>
              <CardDescription>
                Configurações gerais da aplicação
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Sidebar Aberta por Padrão</Label>
                  <p className="text-sm text-muted-foreground">
                    Manter sidebar visível ao carregar
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Animações</Label>
                  <p className="text-sm text-muted-foreground">
                    Habilitar transições e animações
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Data */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Dados
              </CardTitle>
              <CardDescription>
                Informações sobre o banco de dados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm space-y-2">
                <p><strong>Servidor:</strong> Render.com</p>
                <p><strong>Banco:</strong> PostgreSQL</p>
                <p><strong>API:</strong> v1.0.0</p>
                <p><strong>Status:</strong> <span className="text-green-600">Conectado</span></p>
              </div>
              
              <Button variant="outline" className="w-full">
                <Database className="mr-2 h-4 w-4" />
                Testar Conexão
              </Button>
            </CardContent>
          </Card>

          {/* About */}
          <Card>
            <CardHeader>
              <CardTitle>Sobre</CardTitle>
              <CardDescription>
                Informações da aplicação
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><strong>ProjPortfólio</strong> v1.0.0</p>
              <p>Plataforma de projetos técnicos</p>
              <p>Desenvolvido com React + TypeScript</p>
              <p className="text-muted-foreground">
                Uma plataforma moderna para descobrir e explorar projetos técnicos
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};
