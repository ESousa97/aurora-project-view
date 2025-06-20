import axios from 'axios';
import { ProjectCard, ProjectDetails, Category } from '@/types';

const API_BASE_URL = 'https://serverdatabase.onrender.com/api/v1';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`Response received from ${response.config.url}:`, response.status);
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
    } else if (!error.response) {
      console.error('Network error - server might be sleeping');
    }
    
    return Promise.reject(error);
  }
);

// API functions
export const apiService = {
  // Get all project cards
  getCards: async (): Promise<ProjectCard[]> => {
    const response = await api.get('/cards');
    return response.data;
  },

  // Search projects
  searchProjects: async (query: string): Promise<ProjectCard[]> => {
    const response = await api.get(`/search?query=${encodeURIComponent(query)}`);
    return response.data;
  },

  // Get categories with projects
  getCategories: async (): Promise<Category[]> => {
    const response = await api.get('/categories');
    return response.data;
  },

  // Get project details
  getProjectDetails: async (id: string): Promise<ProjectDetails> => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  // Keep-alive ping
  ping: async (): Promise<boolean> => {
    try {
      const response = await api.get('/ping');
      return response.status === 200;
    } catch (error) {
      return false;
    }
  },
};

// Keep-alive service
export const keepAliveService = {
  start: () => {
    console.log('Starting keep-alive service...');
    
    // Initial ping
    apiService.ping();
    
    // Ping every 5 minutes when user is active
    const pingInterval = setInterval(async () => {
      if (document.visibilityState === 'visible') {
        const isAlive = await apiService.ping();
        console.log('Keep-alive ping:', isAlive ? 'Success' : 'Failed');
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(pingInterval);
  },
};
