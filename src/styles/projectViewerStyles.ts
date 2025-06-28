// src/styles/projectViewerStyles.ts
export const projectViewerStyles = `
.project-viewer-content {
  /* Custom CSS variables */
  --content-max-width: 100%;
  --code-bg: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  --code-text: #1e293b;
  --highlight-bg: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  --highlight-text: #92400e;
  --premium-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --accent-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  --success-gradient: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
  
  /* Remove default prose margins for better control */
  margin: 0;
  padding: 0;
  width: 100%;
  position: relative;
}

.dark .project-viewer-content {
  --code-bg: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  --code-text: #f8fafc;
  --highlight-bg: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  --highlight-text: #1f2937;
}

/* VIÉS COGNITIVO: Hierarquia Visual Premium */
.project-viewer-content h1 {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 900;
  margin-bottom: 2rem;
  margin-top: 0;
  background: var(--premium-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
  line-height: 1.1;
  position: relative;
  text-shadow: 0 0 30px rgba(102, 126, 234, 0.3);
}

/* Efeito de "Glow" para chamar atenção */
.project-viewer-content h1::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--premium-gradient);
  opacity: 0.1;
  filter: blur(20px);
  z-index: -1;
}

/* VIÉS COGNITIVO: Escassez e Urgência */
.project-viewer-content h2 {
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 800;
  margin-bottom: 1.25rem;
  margin-top: 2.5rem;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.025em;
  line-height: 1.2;
  position: relative;
  animation: subtle-pulse 3s ease-in-out infinite;
}

@keyframes subtle-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

.project-viewer-content h3 {
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  font-weight: 700;
  margin-bottom: 1rem;
  margin-top: 2rem;
  color: #6366f1;
  line-height: 1.3;
  position: relative;
  transition: all 0.3s ease;
}

.project-viewer-content h3:hover {
  color: #4f46e5;
}

/* VIÉS COGNITIVO: Facilidade de Leitura + Dopamina */
.project-viewer-content p {
  font-size: clamp(1rem, 2.5vw, 1.125rem);
  line-height: 1.8;
  margin-bottom: 1.5rem;
  margin-top: 0;
  color: hsl(var(--muted-foreground));
  font-weight: 400;
  word-wrap: break-word;
  overflow-wrap: break-word;
  transition: all 0.3s ease;
}

.project-viewer-content p:hover {
  color: hsl(var(--foreground));
}

/* VIÉS COGNITIVO: Destaque de Código Premium */
.project-viewer-content pre {
  background: var(--code-bg);
  color: var(--code-text);
  border-radius: 16px;
  padding: 1.5rem;
  overflow-x: auto;
  margin: 2rem 0;
  font-size: 0.9rem;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
  box-shadow: 
    0 10px 25px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border: 2px solid transparent;
  background-clip: padding-box;
  position: relative;
  transition: all 0.4s ease;
}

.project-viewer-content pre:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

/* Indicador visual de "premium" */
.project-viewer-content pre::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--premium-gradient);
  border-radius: 16px 16px 0 0;
}

.project-viewer-content pre code {
  background: none;
  padding: 0;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  border-radius: 0;
}

/* VIÉS COGNITIVO: Código Inline com "Call to Action" */
.project-viewer-content code {
  background: var(--code-bg);
  color: var(--code-text);
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
  padding: 0.25rem 0.6rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  border: 1px solid rgba(102, 126, 234, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
}

.project-viewer-content code:hover {
  background: var(--premium-gradient);
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

/* VIÉS COGNITIVO: Destaque Especial (Escassez) */
.project-viewer-content .highlight-text {
  background: var(--highlight-bg);
  color: var(--highlight-text);
  font-style: normal;
  font-weight: 700;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  font-size: 0.9rem;
  border: 2px solid #f59e0b;
  display: inline-block;
  margin: 0 0.25rem;
  position: relative;
  animation: attention-glow 2s ease-in-out infinite;
  box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
}

@keyframes attention-glow {
  0%, 100% { box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3); }
  50% { box-shadow: 0 8px 25px rgba(245, 158, 11, 0.5); }
}

/* VIÉS COGNITIVO: Listas com Progressão Visual */
.project-viewer-content ul, .project-viewer-content ol {
  margin-left: 2rem;
  margin-bottom: 1.5rem;
  margin-top: 1rem;
  padding-left: 0;
}

.project-viewer-content li {
  margin-bottom: 0.75rem;
  line-height: 1.7;
  word-wrap: break-word;
  position: relative;
  transition: all 0.3s ease;
  padding-left: 0.5rem;
}

.project-viewer-content li:hover {
  color: hsl(var(--foreground));
}

.project-viewer-content li::marker {
  color: #6366f1;
  font-weight: bold;
}

.project-viewer-content li p {
  margin-bottom: 0.5rem;
}

/* VIÉS COGNITIVO: Links Premium */
.project-viewer-content a {
  color: #6366f1;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
  word-wrap: break-word;
}

.project-viewer-content a::before {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--premium-gradient);
  transition: width 0.3s ease;
}

.project-viewer-content a:hover {
  color: #4f46e5;
}

.project-viewer-content a:hover::before {
  width: 100%;
}

/* VIÉS COGNITIVO: Tabelas com Hierarquia Visual */
.project-viewer-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 2rem 0;
  font-size: 0.9rem;
  box-shadow: 
    0 10px 25px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  border: none;
}

.project-viewer-content th, .project-viewer-content td {
  border: 1px solid rgba(0, 0, 0, 0.05);
  padding: 1rem 1.25rem;
  text-align: left;
  word-wrap: break-word;
}

.project-viewer-content th {
  background: var(--premium-gradient);
  color: white;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 0.8rem;
}

.project-viewer-content td {
  background: rgba(102, 126, 234, 0.05);
}

/* VIÉS COGNITIVO: Imagens com Efeito Premium */
.project-viewer-content img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 3rem auto;
  border-radius: 16px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  transition: all 0.4s ease;
}

.project-viewer-content img:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.1);
}

/* VIÉS COGNITIVO: Blockquotes como "Testemunhos" */
.project-viewer-content blockquote {
  border-left: 4px solid #6366f1;
  padding-left: 2rem;
  margin: 2rem 0;
  font-style: italic;
  color: hsl(var(--muted-foreground));
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(167, 139, 250, 0.05) 100%);
  padding: 2rem;
  border-radius: 12px;
  position: relative;
  font-size: 1.1rem;
  font-weight: 500;
}

.project-viewer-content blockquote::before {
  content: '"';
  font-size: 4rem;
  color: #6366f1;
  position: absolute;
  top: 0.5rem;
  left: 1rem;
  opacity: 0.3;
  font-family: serif;
}

/* VIÉS COGNITIVO: Separadores com Elegância */
.project-viewer-content hr {
  margin: 3rem 0;
  border: none;
  height: 2px;
  background: var(--premium-gradient);
  border-radius: 1px;
  opacity: 0.6;
}

/* Responsive optimizations com foco na experiência */
@media (max-width: 768px) {
  .project-viewer-content {
    font-size: 0.95rem;
  }

  .project-viewer-content pre {
    padding: 1.25rem;
    font-size: 0.85rem;
    margin: 1.5rem 0;
  }

  .project-viewer-content ul, .project-viewer-content ol {
    margin-left: 1.5rem;
  }

  .project-viewer-content table {
    font-size: 0.85rem;
  }

  .project-viewer-content th, .project-viewer-content td {
    padding: 0.75rem 1rem;
  }

  .project-viewer-content img {
    margin: 2rem auto;
  }
}

@media (max-width: 480px) {
  .project-viewer-content pre {
    padding: 1rem;
    font-size: 0.8rem;
  }

  .project-viewer-content th, .project-viewer-content td {
    padding: 0.5rem 0.75rem;
  }
}
`;
