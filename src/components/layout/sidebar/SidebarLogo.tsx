
// src/components/layout/sidebar/SidebarLogo.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { SiRocket } from '@/lib/languageColors/icons';

export const SidebarLogo: React.FC = () => {
  return (
    <div className="mb-8">
      <Link to="/" className="flex items-center space-x-3 group">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
          <SiRocket className="h-5 w-5 text-white" />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
          Portfolio
        </span>
      </Link>
    </div>
  );
};
