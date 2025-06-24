
export const DETECTION_PATTERNS: Record<string, RegExp[]> = {
  // Frontend Frameworks
  'react': [/\breact\b/i, /reactjs/i, /react\.js/i, /\bjsx\b/i, /hooks/i],
  'nextjs': [/next\.?js/i, /\bnext\b/i, /vercel/i, /ssr/i, /static.?generation/i],
  'vue': [/\bvue\b/i, /vuejs/i, /vue\.js/i, /composition.?api/i],
  'angular': [/angular/i, /\bng\b/i, /angularjs/i, /angular.?cli/i],
  
  // Languages
  'typescript': [/typescript/i, /\bts\b/i, /\.tsx?/i, /type.?safe/i],
  'javascript': [/javascript/i, /\bjs\b/i, /\.jsx?/i, /ecmascript/i, /es\d+/i],
  'python': [/python/i, /\bpy\b/i, /\.py/i, /python\d/i],
  'java': [/\bjava\b/i, /\bjvm\b/i, /openjdk/i, /\.java/i],
  
  // Backend Frameworks
  'node': [/node\.?js/i, /\bnode\b/i, /npm/i, /yarn/i, /pnpm/i],
  'django': [/django/i, /django.?rest/i, /drf/i],
  
  // DevOps
  'docker': [/docker/i, /dockerfile/i, /container/i, /containeriz/i],
  
  // Web Technologies
  'html': [/\bhtml\b/i, /html5/i, /\.html?/i, /markup/i],
  'css': [/\bcss\b/i, /css3/i, /\.css/i, /stylesheet/i]
};
