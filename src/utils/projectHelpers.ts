
import { format, isWithinInterval, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ProjectCard as ProjectCardType } from '@/types';
import { detectLanguage, LANGUAGE_COLORS } from '@/lib/languageColors';

export const formatProjectDate = (dateString?: string) => {
  if (!dateString) return 'Data não disponível';
  
  try {
    return format(new Date(dateString), 'dd/MM/yyyy', { locale: ptBR });
  } catch {
    return 'Data inválida';
  }
};

export const isProjectRecent = (dateString?: string, days: number = 7) => {
  if (!dateString) return false;
  
  try {
    return isWithinInterval(new Date(dateString), {
      start: subDays(new Date(), days),
      end: new Date()
    });
  } catch {
    return false;
  }
};

export const isProjectNew = (dateString?: string) => {
  return isProjectRecent(dateString, 2);
};

export const detectProjectTechnologies = (project: ProjectCardType | null | undefined) => {
  if (!project) return [];
  
  const content = [
    project.titulo || '',
    project.descricao || '',
    project.categoria || '',
    project.conteudo || ''
  ].join(' ').toLowerCase();

  const technologies = [];
  
  const techPatterns = [
    { pattern: /react/i, tech: 'react' },
    { pattern: /typescript|ts\b/i, tech: 'typescript' },
    { pattern: /javascript|js\b/i, tech: 'javascript' },
    { pattern: /python/i, tech: 'python' },
    { pattern: /java\b/i, tech: 'java' },
    { pattern: /node\.?js|nodejs/i, tech: 'node' },
    { pattern: /vue\.?js|vue\b/i, tech: 'vue' },
    { pattern: /angular/i, tech: 'angular' },
    { pattern: /next\.?js/i, tech: 'nextjs' },
    { pattern: /php/i, tech: 'php' },
    { pattern: /laravel/i, tech: 'laravel' },
    { pattern: /django/i, tech: 'django' },
    { pattern: /flask/i, tech: 'flask' },
    { pattern: /fastapi/i, tech: 'fastapi' },
    { pattern: /spring/i, tech: 'spring' },
    { pattern: /\.net|dotnet/i, tech: 'dotnet' },
    { pattern: /flutter/i, tech: 'flutter' },
    { pattern: /react.native/i, tech: 'react-native' },
    { pattern: /mongodb/i, tech: 'mongodb' },
    { pattern: /mysql/i, tech: 'mysql' },
    { pattern: /postgresql|postgres/i, tech: 'postgresql' },
    { pattern: /redis/i, tech: 'redis' },
    { pattern: /docker/i, tech: 'docker' },
    { pattern: /kubernetes|k8s/i, tech: 'kubernetes' },
    { pattern: /aws/i, tech: 'aws' },
    { pattern: /firebase/i, tech: 'firebase' }
  ];

  techPatterns.forEach(({ pattern, tech }) => {
    if (pattern.test(content) && LANGUAGE_COLORS[tech]) {
      technologies.push(LANGUAGE_COLORS[tech]);
    }
  });

  return technologies.filter((tech, index, self) => 
    index === self.findIndex(t => t.name === tech.name)
  ).slice(0, 3);
};
