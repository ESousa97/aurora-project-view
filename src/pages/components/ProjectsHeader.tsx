import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, Clock, Target, TrendingUp, Zap } from 'lucide-react';
import { getCategoryColor } from '@/lib/languageColors';
import { StatsType } from '../types';

interface ProjectsHeaderProps {
  stats: StatsType;
  sortBy: 'date' | 'title';
  setSortBy: (value: 'date' | 'title') => void;
  viewMode: 'grid' | 'list';
  setViewMode: (value: 'grid' | 'list') => void;
  selectedCategory: string;
  clearCategory: () => void;
}

export const ProjectsHeader: React.FC<ProjectsHeaderProps> = ({
  stats,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  selectedCategory,
  clearCategory,
}) => {
  const categoryColor = selectedCategory ? getCategoryColor(selectedCategory) : null;

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="relative">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold">
                {selectedCategory ? `Território: ${selectedCategory}` : 'Exploração Completa'}
              </h1>
              {selectedCategory && (
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${categoryColor?.gradient}`}></div>
                  <Badge
                    className="border-0"
                    style={{ backgroundColor: `${categoryColor?.color}20`, color: categoryColor?.color }}
                  >
                    {selectedCategory}
                  </Badge>
                </div>
              )}
            </div>

            <div className="flex items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                <span>{stats.total} projeto{stats.total !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span>{stats.languages} linguagen{stats.languages !== 1 ? 's' : ''}</span>
              </div>
              {stats.recent > 0 && (
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-green-600">{stats.recent} recente{stats.recent !== 1 ? 's' : ''}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3 flex-wrap">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">
                  <Clock className="h-4 w-4 mr-2 inline" />
                  Por Data
                </SelectItem>
                <SelectItem value="title">Alfabética</SelectItem>
              </SelectContent>
            </Select>

            <Select value={viewMode} onValueChange={setViewMode}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grid">Grade</SelectItem>
                <SelectItem value="list">Lista</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {selectedCategory && (
          <motion.div
            className="flex gap-2 items-center mt-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="text-sm text-muted-foreground font-medium">Explorando:</span>
            <Badge
              variant="secondary"
              className="gap-2 cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors"
              onClick={clearCategory}
            >
              <Filter className="h-3 w-3" />
              {selectedCategory}
              <span className="ml-1 hover:bg-muted-foreground/20 rounded p-0.5 transition-colors">×</span>
            </Badge>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
