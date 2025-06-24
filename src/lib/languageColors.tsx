// src/lib/languageColors.tsx - Sistema Profissional com React Icons (CORRIGIDO)
import React from 'react';

// Simple Icons - Apenas ícones que existem no react-icons/si
import { 
  SiJavascript, SiTypescript, SiReact, SiVuedotjs, SiAngular, SiNodedotjs, SiNextdotjs,
  SiNuxtdotjs, SiSvelte, SiSolid, SiQwik, SiLit, SiStencil,
  SiHtml5, SiCss3, SiSass, SiLess, SiStyledcomponents, SiTailwindcss, SiBootstrap,
  SiBulma, SiChakraui, SiMui, SiAntdesign, SiMantine, SiFramer,
  SiPython, SiDjango, SiFlask, SiFastapi, SiCelery, SiPydantic, SiNumpy, SiPandas,
  SiScikitlearn, SiTensorflow, SiPytorch, SiJupyter, SiStreamlit,
  SiSpringboot, SiApache, SiApachetomcat, SiGradle, SiHibernate,
  SiIntellijidea, SiEclipseide, SiOpenjdk, SiOracle,
  SiSharp, SiDotnet, SiBlazor,
  SiPhp, SiLaravel, SiSymfony, SiCodeigniter, SiCakephp, SiComposer,
  SiGo, SiGin, SiKubernetes, SiDocker, SiTerraform, SiConsul,
  SiRust, SiTauri, SiActix, SiWebassembly,
  SiSwift, SiXcode, SiIos, SiMacos,
  SiKotlin, SiAndroid, SiAndroidstudio, SiJetbrains,
  SiDart, SiFlutter, SiFirebase, SiGooglecloud,
  SiCplusplus, SiC, SiQt, SiCmake, SiConan, SiClion,
  SiRuby, SiRubyonrails, SiJekyll, SiRubygems, SiHeroku,
  SiErlang, SiElixir, SiPhoenixframework,
  SiScala, SiApachespark,
  SiHaskell, SiPurescript, SiElm, SiClojure,
  SiFsharp, SiOcaml, SiReason, SiRescript,
  SiLua, SiR, SiJulia, SiOctave,
  SiPerl, SiGnubash, SiZsh,
  // Databases
  SiMysql, SiPostgresql, SiMongodb, SiMariadb, SiSqlite,
  SiRedis, SiElasticsearch, SiInfluxdb, SiGraphql, SiPrisma,
  SiSupabase, SiPlanetscale, SiCockroachlabs, SiNeo4J, SiArangodb,
  SiAmazonrds, SiSnowflake, SiClickhouse,
  SiApachecouchdb, SiFauna,
  // DevOps & Cloud
  SiAmazonwebservices, SiCloudflare,
  SiVercel, SiNetlify, SiDigitalocean, SiVultr, SiHetzner,
  SiGithubactions, SiGitlab, SiJenkins, SiCircleci, SiTravisci, SiBitbucket,
  SiHelm, SiIstio, SiPrometheus,
  SiGrafana, SiJaeger, SiOpentelemetry, SiDatadog,
  SiNewrelic, SiSentry, SiBugsnag, SiLogstash, SiFluentd,
  SiAnsible, SiChef, SiPuppet, SiVagrant, SiPacker,
  SiPulumi,
  // Testing
  SiJest, SiMocha, SiChai, SiVitest, SiCypress, SiSelenium, SiTestinglibrary,
  SiPuppeteer, SiStorybook, SiChromatic, SiPercy,
  SiJunit5, SiPytest,
  // Message Queues & Event Streaming
  SiApachekafka, SiRabbitmq, SiApachepulsar,
  // Web Servers & Reverse Proxies
  SiNginx, SiCaddy,
  // IDEs & Editors
  SiWebstorm, SiPycharm, SiRubymine, SiPhpstorm, SiGoland, SiDatagrip, SiRider,
  SiVim, SiNeovim, SiSublimetext,
  // Operating Systems
  SiLinux, SiUbuntu, SiDebian, SiFedora, SiCentos, SiArchlinux, SiGentoo,
  SiOpensuse, SiRedhat, SiAlpinelinux, SiFreebsd, SiOpenbsd,
  SiMacos as SiMacosIcon, SiAndroid as SiAndroidIcon,
  // Blockchain & Web3
  SiSolidity, SiEthereum, SiBitcoin, SiCardano, SiPolkadot, SiChainlink,
  SiIpfs, SiWeb3Dotjs, SiOpenzeppelin,
  SiWalletconnect,
  // Design & UI/UX
  SiFigma, SiSketch, SiAdobexd, SiAdobeillustrator, SiAdobephotoshop,
  SiAdobeaftereffects, SiAdobepremierepro, SiCanva, SiBlender, SiInvision,
  SiMiro, SiNotion, SiSlack, SiDiscord,
  // Package Managers
  SiNpm, SiYarn, SiPnpm, SiBun, SiComposer as SiComposerPkg,
  SiCocoapods,
  // Version Control
  SiGit, SiGithub, SiSourcetree, SiGitkraken,
  SiMercurial, SiSubversion, SiPerforce,
  // CMS & E-commerce
  SiWordpress, SiDrupal, SiJoomla, SiStrapi, SiGhost, SiWix,
  SiShopify, SiMagento, SiWoocommerce, SiPrestashop,
  SiBigcommerce, SiSquarespace
} from 'react-icons/si';

// Font Awesome Icons para categorias genéricas e ícones não disponíveis
import { 
  FaDatabase, FaServer, FaCode, FaMobile, FaDesktop, FaCloud, 
  FaCogs, FaShieldAlt, FaRocket, FaLightbulb, FaGem, FaBolt,
  FaLayerGroup, FaNetworkWired, FaChartBar, FaSearch, FaPalette,
  FaBrain, FaRobot, FaInfinity, FaAtom, FaProjectDiagram,
  FaTools, FaFlask, FaMagic, FaCubes, FaGamepad, FaVrCardboard,
  FaLink, FaCoins, FaLock, FaEye, FaFingerprint, FaUserShield,
  FaJava, FaCoffee, FaTerminal, FaCodeBranch, FaFileCode
} from 'react-icons/fa';

export interface LanguageColor {
  name: string;
  displayName: string;
  color: string;
  bgColor: string;
  textColor: string;
  gradient: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  category: 'frontend' | 'backend' | 'mobile' | 'database' | 'devops' | 'design' | 'ai' | 'game' | 'blockchain' | 'testing' | 'other';
  difficulty: 1 | 2 | 3 | 4 | 5;
  trending: boolean;
  popularity: number; // 1-10 scale
  description: string;
  keywords: string[];
}

export const LANGUAGE_COLORS: Record<string, LanguageColor> = {
  // Frontend - JavaScript Ecosystem
  'javascript': {
    name: 'javascript',
    displayName: 'JavaScript',
    color: '#F7DF1E',
    bgColor: 'bg-yellow-400',
    textColor: 'text-yellow-900',
    gradient: 'from-yellow-400 to-yellow-500',
    icon: SiJavascript,
    category: 'frontend',
    difficulty: 2,
    trending: true,
    popularity: 10,
    description: 'Linguagem de programação versátil para web',
    keywords: ['js', 'javascript', 'ecmascript', 'es6', 'es2015', 'node', 'browser', 'web']
  },
  'typescript': {
    name: 'typescript',
    displayName: 'TypeScript',
    color: '#3178C6',
    bgColor: 'bg-blue-500',
    textColor: 'text-blue-100',
    gradient: 'from-blue-500 to-blue-600',
    icon: SiTypescript,
    category: 'frontend',
    difficulty: 3,
    trending: true,
    popularity: 9,
    description: 'JavaScript com tipagem estática',
    keywords: ['ts', 'typescript', 'types', 'static typing', 'microsoft']
  },
  'react': {
    name: 'react',
    displayName: 'React',
    color: '#61DAFB',
    bgColor: 'bg-cyan-400',
    textColor: 'text-cyan-900',
    gradient: 'from-cyan-400 to-cyan-500',
    icon: SiReact,
    category: 'frontend',
    difficulty: 3,
    trending: true,
    popularity: 10,
    description: 'Biblioteca para interfaces de usuário',
    keywords: ['react', 'reactjs', 'jsx', 'components', 'hooks', 'facebook', 'meta']
  },
  'nextjs': {
    name: 'nextjs',
    displayName: 'Next.js',
    color: '#000000',
    bgColor: 'bg-black',
    textColor: 'text-white',
    gradient: 'from-black to-gray-800',
    icon: SiNextdotjs,
    category: 'frontend',
    difficulty: 3,
    trending: true,
    popularity: 9,
    description: 'Framework React para produção',
    keywords: ['nextjs', 'next', 'ssr', 'static generation', 'vercel', 'fullstack']
  },
  'vue': {
    name: 'vue',
    displayName: 'Vue.js',
    color: '#4FC08D',
    bgColor: 'bg-green-500',
    textColor: 'text-green-100',
    gradient: 'from-green-500 to-green-600',
    icon: SiVuedotjs,
    category: 'frontend',
    difficulty: 2,
    trending: true,
    popularity: 8,
    description: 'Framework progressivo para interfaces',
    keywords: ['vue', 'vuejs', 'vue.js', 'composition api', 'evan you']
  },
  'nuxt': {
    name: 'nuxt',
    displayName: 'Nuxt.js',
    color: '#00DC82',
    bgColor: 'bg-emerald-500',
    textColor: 'text-emerald-100',
    gradient: 'from-emerald-500 to-green-500',
    icon: SiNuxtdotjs,
    category: 'frontend',
    difficulty: 3,
    trending: true,
    popularity: 7,
    description: 'Framework Vue.js para aplicações universais',
    keywords: ['nuxt', 'nuxtjs', 'vue framework', 'ssr', 'universal']
  },
  'angular': {
    name: 'angular',
    displayName: 'Angular',
    color: '#DD0031',
    bgColor: 'bg-red-600',
    textColor: 'text-red-100',
    gradient: 'from-red-600 to-red-700',
    icon: SiAngular,
    category: 'frontend',
    difficulty: 4,
    trending: true,
    popularity: 7,
    description: 'Framework TypeScript para aplicações web',
    keywords: ['angular', 'ng', 'typescript', 'google', 'spa', 'cli']
  },
  'svelte': {
    name: 'svelte',
    displayName: 'Svelte',
    color: '#FF3E00',
    bgColor: 'bg-orange-600',
    textColor: 'text-orange-100',
    gradient: 'from-orange-600 to-red-600',
    icon: SiSvelte,
    category: 'frontend',
    difficulty: 2,
    trending: true,
    popularity: 6,
    description: 'Framework compilado para interfaces modernas',
    keywords: ['svelte', 'sveltekit', 'compiler', 'reactive', 'rich harris']
  },
  'solid': {
    name: 'solid',
    displayName: 'SolidJS',
    color: '#2C4F7C',
    bgColor: 'bg-blue-800',
    textColor: 'text-blue-100',
    gradient: 'from-blue-800 to-indigo-800',
    icon: SiSolid,
    category: 'frontend',
    difficulty: 3,
    trending: true,
    popularity: 5,
    description: 'Framework reativo declarativo',
    keywords: ['solid', 'solidjs', 'reactive', 'fine-grained', 'signals']
  },

  // Backend Languages
  'node': {
    name: 'node',
    displayName: 'Node.js',
    color: '#339933',
    bgColor: 'bg-green-600',
    textColor: 'text-green-100',
    gradient: 'from-green-600 to-green-700',
    icon: SiNodedotjs,
    category: 'backend',
    difficulty: 3,
    trending: true,
    popularity: 9,
    description: 'Runtime JavaScript para servidor',
    keywords: ['nodejs', 'node', 'v8', 'server', 'backend', 'npm', 'express']
  },
  'python': {
    name: 'python',
    displayName: 'Python',
    color: '#3776AB',
    bgColor: 'bg-blue-500',
    textColor: 'text-blue-100',
    gradient: 'from-blue-500 to-yellow-400',
    icon: SiPython,
    category: 'backend',
    difficulty: 2,
    trending: true,
    popularity: 10,
    description: 'Linguagem versátil e legível',
    keywords: ['python', 'py', 'django', 'flask', 'fastapi', 'data science', 'ml', 'ai']
  },
  'django': {
    name: 'django',
    displayName: 'Django',
    color: '#092E20',
    bgColor: 'bg-green-800',
    textColor: 'text-green-100',
    gradient: 'from-green-800 to-green-900',
    icon: SiDjango,
    category: 'backend',
    difficulty: 3,
    trending: true,
    popularity: 8,
    description: 'Framework web Python de alto nível',
    keywords: ['django', 'python framework', 'orm', 'mvt', 'web framework']
  },
  'fastapi': {
    name: 'fastapi',
    displayName: 'FastAPI',
    color: '#009688',
    bgColor: 'bg-teal-600',
    textColor: 'text-teal-100',
    gradient: 'from-teal-600 to-green-600',
    icon: SiFastapi,
    category: 'backend',
    difficulty: 3,
    trending: true,
    popularity: 8,
    description: 'Framework Python moderno e rápido',
    keywords: ['fastapi', 'python', 'async', 'api', 'openapi', 'pydantic']
  },
  'java': {
    name: 'java',
    displayName: 'Java',
    color: '#ED8B00',
    bgColor: 'bg-orange-600',
    textColor: 'text-orange-100',
    gradient: 'from-orange-600 to-red-600',
    icon: FaJava,
    category: 'backend',
    difficulty: 4,
    trending: false,
    popularity: 8,
    description: 'Linguagem orientada a objetos enterprise',
    keywords: ['java', 'jvm', 'spring', 'hibernate', 'enterprise', 'oracle']
  },
  'spring': {
    name: 'spring',
    displayName: 'Spring Boot',
    color: '#6DB33F',
    bgColor: 'bg-green-600',
    textColor: 'text-green-100',
    gradient: 'from-green-600 to-green-700',
    icon: SiSpringboot,
    category: 'backend',
    difficulty: 4,
    trending: true,
    popularity: 7,
    description: 'Framework Java para aplicações enterprise',
    keywords: ['spring', 'spring boot', 'java', 'ioc', 'mvc', 'enterprise']
  },
  'csharp': {
    name: 'csharp',
    displayName: 'C#',
    color: '#239120',
    bgColor: 'bg-purple-600',
    textColor: 'text-purple-100',
    gradient: 'from-purple-600 to-purple-700',
    icon: SiSharp,
    category: 'backend',
    difficulty: 4,
    trending: true,
    popularity: 7,
    description: 'Linguagem Microsoft .NET',
    keywords: ['csharp', 'c#', 'dotnet', '.net', 'microsoft', 'asp.net']
  },
  'dotnet': {
    name: 'dotnet',
    displayName: '.NET',
    color: '#512BD4',
    bgColor: 'bg-purple-700',
    textColor: 'text-purple-100',
    gradient: 'from-purple-700 to-indigo-700',
    icon: SiDotnet,
    category: 'backend',
    difficulty: 4,
    trending: true,
    popularity: 7,
    description: 'Plataforma de desenvolvimento Microsoft',
    keywords: ['dotnet', '.net', 'core', 'framework', 'microsoft', 'cross-platform']
  },
  'php': {
    name: 'php',
    displayName: 'PHP',
    color: '#777BB4',
    bgColor: 'bg-indigo-500',
    textColor: 'text-indigo-100',
    gradient: 'from-indigo-500 to-indigo-600',
    icon: SiPhp,
    category: 'backend',
    difficulty: 2,
    trending: false,
    popularity: 6,
    description: 'Linguagem para desenvolvimento web',
    keywords: ['php', 'laravel', 'symfony', 'wordpress', 'web development']
  },
  'laravel': {
    name: 'laravel',
    displayName: 'Laravel',
    color: '#FF2D20',
    bgColor: 'bg-red-500',
    textColor: 'text-red-100',
    gradient: 'from-red-500 to-red-600',
    icon: SiLaravel,
    category: 'backend',
    difficulty: 3,
    trending: true,
    popularity: 7,
    description: 'Framework PHP elegante',
    keywords: ['laravel', 'php', 'eloquent', 'artisan', 'blade', 'mvc']
  },
  'go': {
    name: 'go',
    displayName: 'Go',
    color: '#00ADD8',
    bgColor: 'bg-cyan-500',
    textColor: 'text-cyan-900',
    gradient: 'from-cyan-500 to-blue-500',
    icon: SiGo,
    category: 'backend',
    difficulty: 3,
    trending: true,
    popularity: 8,
    description: 'Linguagem Google para sistemas distribuídos',
    keywords: ['go', 'golang', 'google', 'concurrent', 'microservices', 'cloud']
  },
  'rust': {
    name: 'rust',
    displayName: 'Rust',
    color: '#CE422B',
    bgColor: 'bg-orange-700',
    textColor: 'text-orange-100',
    gradient: 'from-orange-700 to-red-700',
    icon: SiRust,
    category: 'backend',
    difficulty: 5,
    trending: true,
    popularity: 7,
    description: 'Linguagem sistema segura e rápida',
    keywords: ['rust', 'memory safety', 'systems', 'performance', 'mozilla']
  },

  // Mobile Development
  'swift': {
    name: 'swift',
    displayName: 'Swift',
    color: '#FA7343',
    bgColor: 'bg-orange-500',
    textColor: 'text-orange-100',
    gradient: 'from-orange-500 to-red-500',
    icon: SiSwift,
    category: 'mobile',
    difficulty: 3,
    trending: true,
    popularity: 7,
    description: 'Linguagem Apple para iOS/macOS',
    keywords: ['swift', 'ios', 'macos', 'apple', 'xcode', 'swiftui']
  },
  'kotlin': {
    name: 'kotlin',
    displayName: 'Kotlin',
    color: '#7F52FF',
    bgColor: 'bg-purple-500',
    textColor: 'text-purple-100',
    gradient: 'from-purple-500 to-indigo-500',
    icon: SiKotlin,
    category: 'mobile',
    difficulty: 3,
    trending: true,
    popularity: 8,
    description: 'Linguagem moderna para Android e JVM',
    keywords: ['kotlin', 'android', 'jvm', 'jetbrains', 'multiplatform']
  },
  'flutter': {
    name: 'flutter',
    displayName: 'Flutter',
    color: '#02569B',
    bgColor: 'bg-blue-600',
    textColor: 'text-blue-100',
    gradient: 'from-blue-600 to-cyan-500',
    icon: SiFlutter,
    category: 'mobile',
    difficulty: 3,
    trending: true,
    popularity: 9,
    description: 'Framework Google multiplataforma',
    keywords: ['flutter', 'dart', 'google', 'cross-platform', 'mobile', 'web']
  },
  'dart': {
    name: 'dart',
    displayName: 'Dart',
    color: '#0175C2',
    bgColor: 'bg-blue-600',
    textColor: 'text-blue-100',
    gradient: 'from-blue-600 to-blue-700',
    icon: SiDart,
    category: 'mobile',
    difficulty: 2,
    trending: true,
    popularity: 6,
    description: 'Linguagem Google otimizada para UI',
    keywords: ['dart', 'flutter', 'google', 'ui', 'async']
  },
  'react-native': {
    name: 'react-native',
    displayName: 'React Native',
    color: '#61DAFB',
    bgColor: 'bg-cyan-400',
    textColor: 'text-cyan-900',
    gradient: 'from-cyan-400 to-blue-500',
    icon: SiReact,
    category: 'mobile',
    difficulty: 3,
    trending: true,
    popularity: 8,
    description: 'React para desenvolvimento mobile',
    keywords: ['react native', 'react-native', 'mobile', 'cross-platform', 'facebook']
  },

  // Databases
  'postgresql': {
    name: 'postgresql',
    displayName: 'PostgreSQL',
    color: '#336791',
    bgColor: 'bg-blue-700',
    textColor: 'text-blue-100',
    gradient: 'from-blue-700 to-blue-800',
    icon: SiPostgresql,
    category: 'database',
    difficulty: 3,
    trending: true,
    popularity: 9,
    description: 'Banco relacional avançado open-source',
    keywords: ['postgresql', 'postgres', 'sql', 'relational', 'acid', 'json']
  },
  'mysql': {
    name: 'mysql',
    displayName: 'MySQL',
    color: '#4479A1',
    bgColor: 'bg-blue-600',
    textColor: 'text-blue-100',
    gradient: 'from-blue-600 to-blue-700',
    icon: SiMysql,
    category: 'database',
    difficulty: 2,
    trending: false,
    popularity: 8,
    description: 'Sistema de gerenciamento de banco relacional',
    keywords: ['mysql', 'sql', 'relational', 'mariadb', 'oracle']
  },
  'mongodb': {
    name: 'mongodb',
    displayName: 'MongoDB',
    color: '#47A248',
    bgColor: 'bg-green-600',
    textColor: 'text-green-100',
    gradient: 'from-green-600 to-green-700',
    icon: SiMongodb,
    category: 'database',
    difficulty: 2,
    trending: true,
    popularity: 8,
    description: 'Banco de dados NoSQL orientado a documentos',
    keywords: ['mongodb', 'nosql', 'document', 'json', 'bson', 'atlas']
  },
  'redis': {
    name: 'redis',
    displayName: 'Redis',
    color: '#DC382D',
    bgColor: 'bg-red-600',
    textColor: 'text-red-100',
    gradient: 'from-red-600 to-red-700',
    icon: SiRedis,
    category: 'database',
    difficulty: 3,
    trending: true,
    popularity: 8,
    description: 'Estrutura de dados em memória',
    keywords: ['redis', 'cache', 'in-memory', 'key-value', 'session']
  },
  'firebase': {
    name: 'firebase',
    displayName: 'Firebase',
    color: '#FFCA28',
    bgColor: 'bg-yellow-400',
    textColor: 'text-yellow-900',
    gradient: 'from-yellow-400 to-orange-500',
    icon: SiFirebase,
    category: 'database',
    difficulty: 2,
    trending: true,
    popularity: 8,
    description: 'Plataforma Google para desenvolvimento de apps',
    keywords: ['firebase', 'google', 'realtime', 'nosql', 'hosting', 'auth']
  },
  'supabase': {
    name: 'supabase',
    displayName: 'Supabase',
    color: '#3ECF8E',
    bgColor: 'bg-emerald-500',
    textColor: 'text-emerald-100',
    gradient: 'from-emerald-500 to-green-500',
    icon: SiSupabase,
    category: 'database',
    difficulty: 2,
    trending: true,
    popularity: 7,
    description: 'Alternativa open-source ao Firebase',
    keywords: ['supabase', 'postgresql', 'realtime', 'auth', 'open source']
  },

  // DevOps & Cloud
  'docker': {
    name: 'docker',
    displayName: 'Docker',
    color: '#2496ED',
    bgColor: 'bg-blue-500',
    textColor: 'text-blue-100',
    gradient: 'from-blue-500 to-cyan-500',
    icon: SiDocker,
    category: 'devops',
    difficulty: 3,
    trending: true,
    popularity: 9,
    description: 'Plataforma de containerização',
    keywords: ['docker', 'container', 'virtualization', 'devops', 'microservices']
  },
  'kubernetes': {
    name: 'kubernetes',
    displayName: 'Kubernetes',
    color: '#326CE5',
    bgColor: 'bg-blue-600',
    textColor: 'text-blue-100',
    gradient: 'from-blue-600 to-indigo-600',
    icon: SiKubernetes,
    category: 'devops',
    difficulty: 5,
    trending: true,
    popularity: 8,
    description: 'Orquestração de containers',
    keywords: ['kubernetes', 'k8s', 'orchestration', 'containers', 'cluster']
  },
  'aws': {
    name: 'aws',
    displayName: 'AWS',
    color: '#FF9900',
    bgColor: 'bg-orange-500',
    textColor: 'text-orange-100',
    gradient: 'from-orange-500 to-orange-600',
    icon: SiAmazonwebservices,
    category: 'devops',
    difficulty: 4,
    trending: true,
    popularity: 10,
    description: 'Serviços de nuvem da Amazon',
    keywords: ['aws', 'amazon', 'cloud', 'ec2', 's3', 'lambda', 'serverless']
  },
  'azure': {
    name: 'azure',
    displayName: 'Microsoft Azure',
    color: '#0078D4',
    bgColor: 'bg-blue-600',
    textColor: 'text-blue-100',
    gradient: 'from-blue-600 to-blue-700',
    icon: FaCloud,
    category: 'devops',
    difficulty: 4,
    trending: true,
    popularity: 8,
    description: 'Plataforma de nuvem Microsoft',
    keywords: ['azure', 'microsoft', 'cloud', 'devops', 'enterprise']
  },
  'gcp': {
    name: 'gcp',
    displayName: 'Google Cloud',
    color: '#4285F4',
    bgColor: 'bg-blue-500',
    textColor: 'text-blue-100',
    gradient: 'from-blue-500 to-green-500',
    icon: SiGooglecloud,
    category: 'devops',
    difficulty: 4,
    trending: true,
    popularity: 7,
    description: 'Plataforma de nuvem Google',
    keywords: ['gcp', 'google cloud', 'cloud', 'ai', 'ml', 'bigquery']
  },

  // Testing
  'jest': {
    name: 'jest',
    displayName: 'Jest',
    color: '#C21325',
    bgColor: 'bg-red-600',
    textColor: 'text-red-100',
    gradient: 'from-red-600 to-red-700',
    icon: SiJest,
    category: 'testing',
    difficulty: 2,
    trending: true,
    popularity: 9,
    description: 'Framework de testes JavaScript',
    keywords: ['jest', 'testing', 'javascript', 'unit test', 'snapshot']
  },
  'cypress': {
    name: 'cypress',
    displayName: 'Cypress',
    color: '#17202C',
    bgColor: 'bg-gray-800',
    textColor: 'text-gray-100',
    gradient: 'from-gray-800 to-gray-900',
    icon: SiCypress,
    category: 'testing',
    difficulty: 3,
    trending: true,
    popularity: 8,
    description: 'Framework de testes end-to-end',
    keywords: ['cypress', 'e2e', 'testing', 'browser', 'automation']
  },
  'playwright': {
    name: 'playwright',
    displayName: 'Playwright',
    color: '#2EAD33',
    bgColor: 'bg-green-600',
    textColor: 'text-green-100',
    gradient: 'from-green-600 to-green-700',
    icon: FaRobot,
    category: 'testing',
    difficulty: 3,
    trending: true,
    popularity: 7,
    description: 'Automação web moderna e confiável',
    keywords: ['playwright', 'testing', 'automation', 'microsoft', 'browser']
  },

  // Blockchain & Web3
  'solidity': {
    name: 'solidity',
    displayName: 'Solidity',
    color: '#363636',
    bgColor: 'bg-gray-700',
    textColor: 'text-gray-100',
    gradient: 'from-gray-700 to-gray-800',
    icon: SiSolidity,
    category: 'blockchain',
    difficulty: 4,
    trending: true,
    popularity: 6,
    description: 'Linguagem para contratos inteligentes',
    keywords: ['solidity', 'ethereum', 'smart contracts', 'blockchain', 'web3']
  },
  'ethereum': {
    name: 'ethereum',
    displayName: 'Ethereum',
    color: '#3C3C3D',
    bgColor: 'bg-gray-700',
    textColor: 'text-gray-100',
    gradient: 'from-gray-700 to-purple-700',
    icon: SiEthereum,
    category: 'blockchain',
    difficulty: 4,
    trending: true,
    popularity: 8,
    description: 'Plataforma blockchain para contratos inteligentes',
    keywords: ['ethereum', 'eth', 'blockchain', 'smart contracts', 'defi']
  },

  // AI & Machine Learning
  'tensorflow': {
    name: 'tensorflow',
    displayName: 'TensorFlow',
    color: '#FF6F00',
    bgColor: 'bg-orange-500',
    textColor: 'text-orange-100',
    gradient: 'from-orange-500 to-red-500',
    icon: SiTensorflow,
    category: 'ai',
    difficulty: 4,
    trending: true,
    popularity: 9,
    description: 'Biblioteca de machine learning do Google',
    keywords: ['tensorflow', 'ml', 'ai', 'google', 'neural networks', 'deep learning']
  },
  'pytorch': {
    name: 'pytorch',
    displayName: 'PyTorch',
    color: '#EE4C2C',
    bgColor: 'bg-red-500',
    textColor: 'text-red-100',
    gradient: 'from-red-500 to-orange-500',
    icon: SiPytorch,
    category: 'ai',
    difficulty: 4,
    trending: true,
    popularity: 9,
    description: 'Framework de machine learning dinâmico',
    keywords: ['pytorch', 'ml', 'ai', 'facebook', 'neural networks', 'research']
  },

  // Web Technologies
  'html': {
    name: 'html',
    displayName: 'HTML5',
    color: '#E34F26',
    bgColor: 'bg-orange-500',
    textColor: 'text-orange-100',
    gradient: 'from-orange-500 to-orange-600',
    icon: SiHtml5,
    category: 'frontend',
    difficulty: 1,
    trending: false,
    popularity: 10,
    description: 'Linguagem de marcação para web',
    keywords: ['html', 'html5', 'markup', 'web', 'semantic', 'structure']
  },
  'css': {
    name: 'css',
    displayName: 'CSS3',
    color: '#1572B6',
    bgColor: 'bg-blue-600',
    textColor: 'text-blue-100',
    gradient: 'from-blue-600 to-blue-700',
    icon: SiCss3,
    category: 'frontend',
    difficulty: 2,
    trending: false,
    popularity: 10,
    description: 'Linguagem de estilos para web',
    keywords: ['css', 'css3', 'styles', 'web', 'responsive', 'animation']
  },
  'sass': {
    name: 'sass',
    displayName: 'Sass',
    color: '#CC6699',
    bgColor: 'bg-pink-500',
    textColor: 'text-pink-100',
    gradient: 'from-pink-500 to-pink-600',
    icon: SiSass,
    category: 'frontend',
    difficulty: 2,
    trending: false,
    popularity: 6,
    description: 'Pré-processador CSS poderoso',
    keywords: ['sass', 'scss', 'css preprocessor', 'variables', 'mixins']
  },
  'tailwind': {
    name: 'tailwind',
    displayName: 'Tailwind CSS',
    color: '#06B6D4',
    bgColor: 'bg-cyan-500',
    textColor: 'text-cyan-100',
    gradient: 'from-cyan-500 to-teal-500',
    icon: SiTailwindcss,
    category: 'frontend',
    difficulty: 2,
    trending: true,
    popularity: 9,
    description: 'Framework CSS utility-first',
    keywords: ['tailwind', 'css framework', 'utility-first', 'responsive', 'design system']
  },

  // Default/Fallback
  'default': {
    name: 'default',
    displayName: 'Projeto',
    color: '#6B7280',
    bgColor: 'bg-slate-500',
    textColor: 'text-slate-100',
    gradient: 'from-slate-500 to-slate-600',
    icon: FaCode,
    category: 'other',
    difficulty: 1,
    trending: false,
    popularity: 1,
    description: 'Projeto de tecnologia',
    keywords: ['projeto', 'development', 'code', 'technology']
  }
};

// Detecção avançada com padrões RegExp otimizados
const DETECTION_PATTERNS: Record<string, RegExp[]> = {
  // Frontend Frameworks
  'react': [/\breact\b/i, /reactjs/i, /react\.js/i, /\bjsx\b/i, /hooks/i],
  'nextjs': [/next\.?js/i, /\bnext\b/i, /vercel/i, /ssr/i, /static.?generation/i],
  'vue': [/\bvue\b/i, /vuejs/i, /vue\.js/i, /composition.?api/i],
  'nuxt': [/nuxt/i, /nuxtjs/i, /nuxt\.js/i],
  'angular': [/angular/i, /\bng\b/i, /angularjs/i, /angular.?cli/i],
  'svelte': [/svelte/i, /sveltekit/i],
  'solid': [/solid/i, /solidjs/i, /solid\.js/i],
  
  // Languages
  'typescript': [/typescript/i, /\bts\b/i, /\.tsx?/i, /type.?safe/i],
  'javascript': [/javascript/i, /\bjs\b/i, /\.jsx?/i, /ecmascript/i, /es\d+/i],
  'python': [/python/i, /\bpy\b/i, /\.py/i, /python\d/i],
  'java': [/\bjava\b/i, /\bjvm\b/i, /openjdk/i, /\.java/i],
  'csharp': [/c#/i, /csharp/i, /c.?sharp/i, /\.cs/i],
  'dotnet': [/\.net/i, /dotnet/i, /asp\.net/i, /core/i],
  'php': [/\bphp\b/i, /\.php/i, /php\d/i],
  'go': [/\bgo\b/i, /golang/i, /\.go/i],
  'rust': [/rust/i, /cargo/i, /\.rs/i, /rustc/i],
  'swift': [/swift/i, /\.swift/i, /swiftui/i],
  'kotlin': [/kotlin/i, /\.kt/i, /\.kts/i],
  'dart': [/dart/i, /\.dart/i],
  
  // Mobile
  'flutter': [/flutter/i, /dart/i, /flutter.?sdk/i],
  'react-native': [/react.?native/i, /react-native/i, /expo/i, /metro/i],
  
  // Backend Frameworks
  'node': [/node\.?js/i, /\bnode\b/i, /npm/i, /yarn/i, /pnpm/i],
  'django': [/django/i, /django.?rest/i, /drf/i],
  'fastapi': [/fastapi/i, /fast.?api/i, /pydantic/i],
  'laravel': [/laravel/i, /artisan/i, /eloquent/i, /blade/i],
  'spring': [/spring/i, /spring.?boot/i, /maven/i, /gradle/i],
  
  // Databases
  'postgresql': [/postgresql/i, /postgres/i, /\bpsql\b/i, /postgre/i],
  'mysql': [/mysql/i, /mariadb/i, /\.sql/i],
  'mongodb': [/mongodb/i, /\bmongo\b/i, /mongoose/i, /atlas/i],
  'redis': [/redis/i, /cache/i, /redis.?server/i],
  'firebase': [/firebase/i, /firestore/i, /fireauth/i, /firebase.?admin/i],
  'supabase': [/supabase/i, /supa/i],
  
  // DevOps & Cloud
  'docker': [/docker/i, /dockerfile/i, /container/i, /containeriz/i],
  'kubernetes': [/kubernetes/i, /\bk8s\b/i, /kubectl/i, /helm/i],
  'aws': [/\baws\b/i, /amazon.?web/i, /\bec2\b/i, /\bs3\b/i, /lambda/i, /cloudformation/i],
  'azure': [/azure/i, /microsoft.?azure/i],
  'gcp': [/gcp/i, /google.?cloud/i, /\bgke\b/i, /bigquery/i],
  
  // Testing
  'jest': [/jest/i, /jest\.config/i, /\.test\.js/i, /\.spec\.js/i],
  'cypress': [/cypress/i, /cypress\.config/i, /e2e/i],
  'playwright': [/playwright/i, /\.spec\.ts/i, /page\.test/i],
  
  // Web Technologies
  'html': [/\bhtml\b/i, /html5/i, /\.html?/i, /markup/i],
  'css': [/\bcss\b/i, /css3/i, /\.css/i, /stylesheet/i],
  'sass': [/sass/i, /scss/i, /\.s[ac]ss/i],
  'tailwind': [/tailwind/i, /tailwindcss/i, /utility.?first/i, /tw-/i],
  
  // AI/ML
  'tensorflow': [/tensorflow/i, /\btf\b/i, /tfjs/i, /keras/i],
  'pytorch': [/pytorch/i, /torch/i, /\.pt/i],
  
  // Blockchain
  'solidity': [/solidity/i, /\.sol/i, /smart.?contract/i],
  'ethereum': [/ethereum/i, /\beth\b/i, /web3/i, /defi/i]
};

/**
 * Detecta múltiplas tecnologias em um texto
 */
function detectMultipleTechnologies(content: string): LanguageColor[] {
  if (!content || typeof content !== 'string') {
    return [LANGUAGE_COLORS.default];
  }

  const normalizedContent = content.toLowerCase().trim();
  
  if (!normalizedContent) {
    return [LANGUAGE_COLORS.default];
  }

  const detected = new Set<LanguageColor>();
  
  // Usar padrões de detecção mais precisos
  for (const [techKey, patterns] of Object.entries(DETECTION_PATTERNS)) {
    const techConfig = LANGUAGE_COLORS[techKey];
    if (techConfig && patterns.some(pattern => pattern.test(normalizedContent))) {
      detected.add(techConfig);
    }
  }
  
  // Se não detectou nenhuma tecnologia específica, tentar detecção simples por keywords
  if (detected.size === 0) {
    for (const [key, config] of Object.entries(LANGUAGE_COLORS)) {
      if (key !== 'default' && config.keywords.some(keyword => 
        normalizedContent.includes(keyword.toLowerCase())
      )) {
        detected.add(config);
        break; // Pegar apenas a primeira correspondência
      }
    }
  }
  
  // Se ainda não detectou nada, usar default
  if (detected.size === 0) {
    detected.add(LANGUAGE_COLORS.default);
  }
  
  // Converter Set para Array e ordenar por prioridade
  const detectedArray = Array.from(detected)
    .sort((a, b) => {
      // Priorizar trending
      if (a.trending && !b.trending) return -1;
      if (!a.trending && b.trending) return 1;
      
      // Depois por popularidade
      if (a.popularity !== b.popularity) return b.popularity - a.popularity;
      
      // Por último por dificuldade (menor primeiro)
      return a.difficulty - b.difficulty;
    })
    .slice(0, 3); // Limitar a 3 tecnologias
  
  return detectedArray;
}

/**
 * Detecta uma única tecnologia no conteúdo
 */
function detectSingleTechnology(content: string): LanguageColor {
  const technologies = detectMultipleTechnologies(content);
  return technologies[0] || LANGUAGE_COLORS.default;
}

/**
 * Cria um gradiente combinado baseado em múltiplas tecnologias
 */
function createCombinedGradient(technologies: LanguageColor[]): string {
  if (!technologies || technologies.length === 0) {
    return LANGUAGE_COLORS.default.gradient;
  }

  if (technologies.length === 1) {
    return technologies[0].gradient;
  }
  
  const colors = technologies.map(extractMainColor).slice(0, 3);
  
  if (colors.length === 2) {
    return `from-${colors[0]} via-${colors[1]} to-${colors[0]}`;
  }
  
  if (colors.length === 3) {
    return `from-${colors[0]} via-${colors[1]} to-${colors[2]}`;
  }
  
  return technologies[0].gradient;
}

/**
 * Extrai a cor principal de uma configuração de tecnologia
 */
function extractMainColor(tech: LanguageColor): string {
  if (!tech?.color) return 'slate-500';

  // Mapear cores hex para classes Tailwind equivalentes
  const colorMap: Record<string, string> = {
    '#F7DF1E': 'yellow-400',    // JavaScript
    '#3178C6': 'blue-500',      // TypeScript
    '#61DAFB': 'cyan-400',      // React
    '#4FC08D': 'green-500',     // Vue
    '#00DC82': 'emerald-500',   // Nuxt
    '#DD0031': 'red-600',       // Angular
    '#FF3E00': 'orange-600',    // Svelte
    '#2C4F7C': 'blue-800',      // Solid
    '#339933': 'green-600',     // Node
    '#000000': 'black',         // Next.js
    '#E34F26': 'orange-500',    // HTML
    '#1572B6': 'blue-600',      // CSS
    '#CC6699': 'pink-500',      // Sass
    '#06B6D4': 'cyan-500',      // Tailwind
    '#3776AB': 'blue-500',      // Python
    '#092E20': 'green-800',     // Django
    '#009688': 'teal-600',      // FastAPI
    '#ED8B00': 'orange-600',    // Java
    '#6DB33F': 'green-600',     // Spring
    '#239120': 'purple-600',    // C#
    '#512BD4': 'purple-700',    // .NET
    '#777BB4': 'indigo-500',    // PHP
    '#FF2D20': 'red-500',       // Laravel
    '#00ADD8': 'cyan-500',      // Go
    '#CE422B': 'orange-700',    // Rust
    '#FA7343': 'orange-500',    // Swift
    '#7F52FF': 'purple-500',    // Kotlin
    '#02569B': 'blue-600',      // Flutter
    '#0175C2': 'blue-600',      // Dart
    '#4479A1': 'blue-600',      // MySQL
    '#336791': 'blue-700',      // PostgreSQL
    '#47A248': 'green-600',     // MongoDB
    '#DC382D': 'red-600',       // Redis
    '#FFCA28': 'yellow-400',    // Firebase
    '#3ECF8E': 'emerald-500',   // Supabase
    '#FF9900': 'orange-500',    // AWS
    '#0078D4': 'blue-600',      // Azure
    '#4285F4': 'blue-500',      // GCP
    '#2496ED': 'blue-500',      // Docker
    '#326CE5': 'blue-600',      // Kubernetes
    '#C21325': 'red-600',       // Jest
    '#17202C': 'gray-800',      // Cypress
    '#2EAD33': 'green-600',     // Playwright
    '#363636': 'gray-700',      // Solidity
    '#3C3C3D': 'gray-700',      // Ethereum
    '#FF6F00': 'orange-500',    // TensorFlow
    '#EE4C2C': 'red-500',       // PyTorch
    '#6B7280': 'slate-500',     // Default
  };
  
  return colorMap[tech.color] || 'slate-500';
}

/**
 * Detecta a linguagem/tecnologia principal de um projeto
 * @param project - Qualquer objeto que represente um projeto
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function detectLanguage(project: any): LanguageColor {
  if (!project || typeof project !== 'object') {
    return LANGUAGE_COLORS.default;
  }

  const fields = [
    project.titulo || project.title || '',
    project.descricao || project.description || '',
    project.categoria || project.category || '',
    Array.isArray(project.tags) ? project.tags.join(' ') : '',
    Array.isArray(project.tecnologias) ? project.tecnologias.join(' ') : '',
    Array.isArray(project.stack) ? project.stack.join(' ') : ''
  ];
  
  const content = fields
    .filter(field => typeof field === 'string')
    .join(' ')
    .trim();
  
  if (!content) {
    return LANGUAGE_COLORS.default;
  }
  
  const technologies = detectMultipleTechnologies(content);
  
  if (technologies.length === 1) {
    return technologies[0];
  }
  
  // Para múltiplas tecnologias, criar uma configuração combinada
  const combinedGradient = createCombinedGradient(technologies);
  const mainColor = technologies[0].color;
  const combinedName = technologies.slice(0, 2).map(t => t.displayName).join(' + ');
  
  return {
    ...technologies[0],
    name: 'combined',
    displayName: combinedName,
    color: mainColor,
    gradient: combinedGradient,
    difficulty: Math.max(...technologies.map(t => t.difficulty)) as 1 | 2 | 3 | 4 | 5,
    trending: technologies.some(t => t.trending),
    popularity: Math.max(...technologies.map(t => t.popularity)),
    description: `Projeto usando ${technologies.map(t => t.displayName).join(', ')}`,
    keywords: [...new Set(technologies.flatMap(t => t.keywords))]
  };
}

/**
 * Obtém configuração de cor por categoria
 */
export function getCategoryColor(categoryName?: string | null | undefined): LanguageColor {
  if (!categoryName || typeof categoryName !== 'string') {
    return LANGUAGE_COLORS.default;
  }

  const normalizedCategory = categoryName.toLowerCase().trim();
  
  // Mapeamento direto de categorias para linguagens
  const categoryMappings: Record<string, string> = {
    'frontend': 'react',
    'backend': 'node',
    'fullstack': 'javascript',
    'mobile': 'flutter',
    'web': 'html',
    'api': 'node',
    'database': 'postgresql',
    'ui/ux': 'css',
    'devops': 'docker',
    'cloud': 'aws',
    'ai': 'tensorflow',
    'ml': 'pytorch',
    'machine learning': 'pytorch',
    'artificial intelligence': 'tensorflow',
    'blockchain': 'ethereum',
    'web3': 'solidity',
    'testing': 'jest'
  };

  const mappedLang = categoryMappings[normalizedCategory];
  if (mappedLang && LANGUAGE_COLORS[mappedLang]) {
    return LANGUAGE_COLORS[mappedLang];
  }

  return detectSingleTechnology(normalizedCategory);
}

/**
 * Gera um gradiente territorial baseado em múltiplas tecnologias
 */
export function generateTerritoryGradient(categoryName?: string | null): string {
  if (!categoryName || typeof categoryName !== 'string') {
    return 'from-slate-500 to-slate-600';
  }
  
  const technologies = detectMultipleTechnologies(categoryName);
  
  if (technologies.length > 1 && technologies[0] !== LANGUAGE_COLORS.default) {
    return createCombinedGradient(technologies);
  }
  
  // Fallback para gradientes territoriais dinâmicos
  const territoryGradients = [
    'from-red-500 via-orange-500 to-pink-500',
    'from-blue-500 via-cyan-500 to-teal-500', 
    'from-green-500 via-emerald-500 to-lime-500',
    'from-purple-500 via-violet-500 to-fuchsia-500',
    'from-orange-500 via-amber-500 to-yellow-500',
    'from-indigo-500 via-blue-500 to-cyan-500',
    'from-teal-500 via-green-500 to-emerald-500',
    'from-yellow-500 via-orange-500 to-red-500',
    'from-pink-500 via-purple-500 to-indigo-500',
    'from-cyan-500 via-blue-500 to-purple-500'
  ];
  
  const hash = categoryName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return territoryGradients[hash % territoryGradients.length];
}

/**
 * Estatísticas das tecnologias
 * @param projects - Array de projetos de qualquer tipo
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getTechnologyStats(projects: any[]): {
  trending: LanguageColor[];
  popular: LanguageColor[];
  emerging: LanguageColor[];
  categories: Record<string, number>;
  byDifficulty: Record<string, LanguageColor[]>;
} {
  if (!projects || !Array.isArray(projects)) {
    return { 
      trending: [], 
      popular: [], 
      emerging: [], 
      categories: {},
      byDifficulty: { easy: [], medium: [], hard: [], expert: [], master: [] }
    };
  }

  const techCount = new Map<string, number>();
  const categoryCount: Record<string, number> = {};

  projects.forEach(project => {
    const detected = detectLanguage(project);
    if (detected && detected.name !== 'default') {
      const key = detected.displayName;
      techCount.set(key, (techCount.get(key) || 0) + 1);
      categoryCount[detected.category] = (categoryCount[detected.category] || 0) + 1;
    }
  });

  const allTechs = Object.values(LANGUAGE_COLORS).filter(tech => tech.name !== 'default');
  
  const trending = allTechs
    .filter(tech => tech.trending)
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 6);
    
  const popular = Array.from(techCount.entries())
    .sort(([,a], [,b]) => b - a)
    .slice(0, 6)
    .map(([name]) => allTechs.find(tech => tech.displayName === name))
    .filter(Boolean) as LanguageColor[];
  
  const emerging = allTechs
    .filter(tech => tech.difficulty >= 4 && tech.trending)
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 4);

  const byDifficulty = {
    easy: allTechs.filter(tech => tech.difficulty === 1),
    medium: allTechs.filter(tech => tech.difficulty >= 2 && tech.difficulty <= 3),
    hard: allTechs.filter(tech => tech.difficulty === 4),
    expert: allTechs.filter(tech => tech.difficulty === 5),
    master: allTechs.filter(tech => tech.difficulty === 5 && tech.trending)
  };

  return { trending, popular, emerging, categories: categoryCount, byDifficulty };
}

/**
 * Busca tecnologias por termo
 */
export function searchTechnologies(query: string): LanguageColor[] {
  if (!query || typeof query !== 'string') {
    return [];
  }

  const normalizedQuery = query.toLowerCase().trim();
  const allTechs = Object.values(LANGUAGE_COLORS).filter(tech => tech.name !== 'default');
  
  return allTechs.filter(tech => 
    tech.displayName.toLowerCase().includes(normalizedQuery) ||
    tech.keywords.some(keyword => keyword.toLowerCase().includes(normalizedQuery)) ||
    tech.description.toLowerCase().includes(normalizedQuery)
  ).sort((a, b) => b.popularity - a.popularity);
}

/**
 * Obtém tecnologias por categoria
 */
export function getTechnologiesByCategory(category: string): LanguageColor[] {
  const allTechs = Object.values(LANGUAGE_COLORS).filter(tech => tech.name !== 'default');
  return allTechs
    .filter(tech => tech.category === category)
    .sort((a, b) => b.popularity - a.popularity);
}

// Aliases para retrocompatibilidade
export const generateCategoryGradient = generateTerritoryGradient;
