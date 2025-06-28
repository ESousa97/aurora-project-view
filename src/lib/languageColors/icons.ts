// src/lib/languageColors/icons.ts
import React from 'react';

// Simple Icons para tecnologias (apenas os que existem)
import { 
  SiJavascript, SiTypescript, SiReact, SiVuedotjs, SiAngular, SiNodedotjs, SiNextdotjs,
  SiNuxtdotjs, SiSvelte, SiSolid, SiHtml5, SiCss3, SiSass, SiTailwindcss,
  SiPython, SiDjango, SiFastapi, SiSharp, SiDotnet, SiPhp, SiLaravel,
  SiGo, SiRust, SiSwift, SiKotlin, SiFlutter, SiDart, SiPostgresql,
  SiMysql, SiMongodb, SiRedis, SiFirebase, SiSupabase, SiDocker,
  SiKubernetes, SiAmazonwebservices, SiGooglecloud, SiJest, SiCypress,
  SiSolidity, SiEthereum, SiTensorflow, SiPytorch
} from 'react-icons/si';

// Font Awesome Icons para UI e categorias (apenas os que existem)
import { 
  FaDatabase, FaServer, FaCode, FaMobile, FaDesktop, FaCloud, 
  FaCogs, FaShieldAlt, FaRocket, FaLightbulb, FaGem, FaBolt,
  FaLayerGroup, FaNetworkWired, FaChartBar, FaSearch, FaPalette,
  FaBrain, FaRobot, FaInfinity, FaAtom, FaProjectDiagram,
  FaTools, FaFlask, FaMagic, FaCubes, FaGamepad, FaVrCardboard,
  FaLink, FaCoins, FaLock, FaEye, FaFingerprint, FaUserShield,
  FaJava, FaCoffee, FaTerminal, FaCodeBranch, FaFileCode,
  // Ícones específicos para navegação e UI
  FaHome, FaCompass, FaChartLine, FaGlobe, FaFolder,
  // Ícones que realmente existem no FA
  FaBullseye, FaCrown
} from 'react-icons/fa';

// Definir aliases para ícones usando os que realmente existem
const SiRocket = FaRocket; // Usar FA para rocket
const SiCompass = FaCompass; // Usar FA ao invés de SI que não existe
const SiBarChart = FaChartBar; // Usar FA ao invés de SI que não existe
const SiGlobe = FaGlobe; // Usar FA ao invés de SI que não existe  
const FaTrendingUp = FaChartLine; // Alias para ícone similar que existe
const FaTarget = FaBullseye; // Alias para ícone similar que existe

// Export all technology icons
export {
  // JavaScript Ecosystem
  SiJavascript, SiTypescript, SiReact, SiVuedotjs, SiAngular, SiNodedotjs, SiNextdotjs,
  SiNuxtdotjs, SiSvelte, SiSolid,
  
  // Web Technologies
  SiHtml5, SiCss3, SiSass, SiTailwindcss,
  
  // Backend Languages & Frameworks
  SiPython, SiDjango, SiFastapi, SiSharp, SiDotnet, SiPhp, SiLaravel,
  SiGo, SiRust, SiSwift, SiKotlin,
  
  // Mobile
  SiFlutter, SiDart,
  
  // Databases
  SiPostgresql, SiMysql, SiMongodb, SiRedis,
  
  // Cloud & Services
  SiFirebase, SiSupabase, SiAmazonwebservices, SiGooglecloud,
  
  // DevOps
  SiDocker, SiKubernetes,
  
  // Testing
  SiJest, SiCypress,
  
  // Blockchain
  SiSolidity, SiEthereum,
  
  // AI/ML
  SiTensorflow, SiPytorch,
  
  // UI Navigation Icons (usando aliases corretos)
  SiRocket, SiCompass, SiBarChart, SiGlobe,
  
  // Font Awesome Icons for categories and general use
  FaDatabase, FaServer, FaCode, FaMobile, FaDesktop, FaCloud, 
  FaCogs, FaShieldAlt, FaRocket, FaLightbulb, FaGem, FaBolt,
  FaLayerGroup, FaNetworkWired, FaChartBar, FaSearch, FaPalette,
  FaBrain, FaRobot, FaInfinity, FaAtom, FaProjectDiagram,
  FaTools, FaFlask, FaMagic, FaCubes, FaGamepad, FaVrCardboard,
  FaLink, FaCoins, FaLock, FaEye, FaFingerprint, FaUserShield,
  FaJava, FaCoffee, FaTerminal, FaCodeBranch, FaFileCode,
  FaHome, FaCompass, FaChartLine, FaGlobe, FaFolder,
  // Ícones com aliases corretos
  FaTrendingUp, FaTarget, FaCrown, FaBullseye
};

// Mapeamento de categorias para ícones específicos
export const CATEGORY_ICON_MAP = {
  // Frontend
  'frontend': SiReact,
  'web': SiHtml5,
  'ui': FaPalette,
  'design': FaPalette,
  
  // Backend
  'backend': FaServer,
  'api': FaNetworkWired,
  'server': FaServer,
  'microservices': FaLayerGroup,
  
  // Mobile
  'mobile': FaMobile,
  'ios': SiSwift,
  'android': SiKotlin,
  'flutter': SiFlutter,
  
  // Database
  'database': FaDatabase,
  'sql': SiPostgresql,
  'nosql': SiMongodb,
  'cache': SiRedis,
  
  // DevOps & Cloud
  'devops': SiDocker,
  'cloud': FaCloud,
  'aws': SiAmazonwebservices,
  'containerization': SiDocker,
  'kubernetes': SiKubernetes,
  
  // AI & ML
  'ai': FaBrain,
  'ml': SiTensorflow,
  'machine learning': SiPytorch,
  'artificial intelligence': FaRobot,
  'deep learning': FaBrain,
  
  // Blockchain & Web3
  'blockchain': SiEthereum,
  'web3': SiSolidity,
  'crypto': FaCoins,
  'nft': FaGem,
  
  // Testing & Quality
  'testing': SiJest,
  'qa': FaShieldAlt,
  'automation': FaCogs,
  
  // Tools & Utilities
  'tools': FaTools,
  'utilities': FaCogs,
  'productivity': FaLightbulb,
  'development': FaCode,
  
  // Gaming
  'game': FaGamepad,
  'gaming': FaGamepad,
  'vr': FaVrCardboard,
  
  // Security
  'security': FaLock,
  'authentication': FaFingerprint,
  'authorization': FaUserShield,
  
  // Data & Analytics
  'data': FaChartBar,
  'analytics': FaChartLine,
  'visualization': FaChartBar,
  'big data': FaDatabase,
  
  // Default fallbacks
  'default': FaCode,
  'other': FaProjectDiagram,
  'misc': FaAtom
};

// Função helper para obter ícone de categoria
export const getCategoryIcon = (categoryName: string) => {
  const normalizedName = categoryName.toLowerCase().trim();
  
  // Busca exata primeiro
  if (CATEGORY_ICON_MAP[normalizedName]) {
    return CATEGORY_ICON_MAP[normalizedName];
  }
  
  // Busca por palavras-chave
  for (const [key, icon] of Object.entries(CATEGORY_ICON_MAP)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return icon;
    }
  }
  
  // Fallback para default
  return CATEGORY_ICON_MAP.default;
};
