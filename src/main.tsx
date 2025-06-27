// src/main.tsx - Com ferramentas de diagnóstico
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Import diagnostics for development
import './utils/backgroundDiagnostic';
import './utils/sidebarDiagnostic';

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
