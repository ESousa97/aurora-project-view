// src/types/markdown.d.ts
declare module '*.md' {
  const content: string;
  export default content;
}

// Adicione também ao seu tsconfig.json se necessário:
// {
//   "compilerOptions": {
//     "types": ["vite/client"]
//   },
//   "include": ["src", "src/types/*.d.ts"]
// }
