// src/components/GradientIcon.tsx
import React, { useId } from 'react';
import { cn } from '@/lib/utils';

/**
 * Converte nome Tailwind → cor HEX rápida.
 * (adicione cores novas se precisar)
 */
const tailwindToHex: Record<string, string> = {
  'yellow-400': '#FBBF24',
  'blue-500'  : '#3B82F6',
  'cyan-400'  : '#22D3EE',
  'green-500' : '#10B981',
  'red-600'   : '#DC2626',
  'orange-500': '#F97316',
  'blue-600'  : '#2563EB',
  'green-600' : '#059669',
  'black'     : '#000000',
  'slate-500' : '#64748B',
};

interface GradientIconProps {
  /** Componente SVG (ex.: ícones do react-icons) */
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** Ex.: "from-yellow-400 via-blue-500 to-green-500" */
  gradient: string;
  className?: string;
}

export const GradientIcon: React.FC<GradientIconProps> = ({
  icon: Icon,
  gradient,
  className,
}) => {
  const gradId = useId(); // id único p/ evitar colisão em múltiplos ícones
  const tokens = gradient.split(' ').filter(Boolean);

  /** Extrai as cores removendo prefixos from-/via-/to- */
  const stops = tokens.map((token, idx) => {
    const raw = token.replace(/^(?:from-|via-|to-)/, '');
    const hex = tailwindToHex[raw] ?? raw; // fallback: o próprio valor
    const pct =
      idx === 0 ? '0%' : idx === tokens.length - 1 ? '100%' : '50%';

    return { hex, pct };
  });

  return (
    <>
      {/* Define o gradiente uma única vez no DOM (invisível) */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            {stops.map(({ hex, pct }) => (
              <stop key={pct} offset={pct} stopColor={hex} />
            ))}
          </linearGradient>
        </defs>
      </svg>

      {/* Ícone preenchido pelo gradiente */}
      <Icon
        className={cn(className)}
        style={{ fill: `url(#${gradId})` }}
      />
    </>
  );
};
