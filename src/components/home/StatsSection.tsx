
// src/components/home/StatsSection.tsx  
import React from 'react';
import { motion } from 'framer-motion';
import { Target, Compass, Zap, TrendingUp } from 'lucide-react';

interface StatsSectionProps {
  stats: {
    total: number;
    categories: number;
    languages: number;
    recent: number;
  };
}

export const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  const statItems = [
    {
      icon: Target,
      value: stats.total,
      label: "Projetos Únicos",
      gradient: "from-blue-600 to-purple-600"
    },
    {
      icon: Compass,
      value: stats.categories,
      label: "Territórios",
      gradient: "from-emerald-600 to-blue-600"
    },
    {
      icon: Zap,
      value: stats.languages,
      label: "Linguagens",
      gradient: "from-purple-600 to-pink-600"
    },
    {
      icon: TrendingUp,
      value: stats.recent,
      label: "Novos (7 dias)",
      gradient: "from-emerald-600 to-blue-600"
    }
  ];

  return (
    <section className="max-w-6xl mx-auto px-4">
      <motion.div 
        className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, staggerChildren: 0.1 }}
      >
        {statItems.map((stat, index) => (
          <motion.div 
            key={stat.label}
            className="text-center bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden group hover:scale-105 transition-transform border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, scale: 0.8 }} 
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="pt-6 pb-4 relative">
              <div className={`absolute top-0 right-0 w-20 h-20 rounded-full blur-xl bg-gradient-to-r ${stat.gradient} opacity-20`} />
              <div className={`h-8 w-8 mx-auto mb-3 flex items-center justify-center rounded-lg bg-gradient-to-r ${stat.gradient}`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
              <div className="text-3xl font-bold mb-1 text-gray-900 dark:text-white">
                {stat.value}
              </div>
              <p className="font-medium text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
