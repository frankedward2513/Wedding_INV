import React from 'react';

/**
 * Realistic 3D Butterfly with flapping wings
 */
interface ButterflyProps {
  className?: string;
  size?: number;
  color?: 'gold' | 'blush' | 'sage' | 'champagne';
  style?: React.CSSProperties;
}

export const Butterfly: React.FC<ButterflyProps> = ({
  className = '',
  size = 28,
  color = 'gold',
  style = {},
}) => {
  const colorMap = {
    gold: {
      wingGradient: ['#E6C875', '#B58D3D', '#7E5B18'],
      edge: '#C5A059',
      body: '#5A4622',
      glow: 'rgba(230, 200, 117, 0.4)',
    },
    blush: {
      wingGradient: ['#F7D8D3', '#E8B4AC', '#B86F64'],
      edge: '#D99B91',
      body: '#5C3833',
      glow: 'rgba(247, 216, 211, 0.4)',
    },
    sage: {
      wingGradient: ['#C5D6C2', '#8EA689', '#576D52'],
      edge: '#7E9778',
      body: '#3A4836',
      glow: 'rgba(197, 214, 194, 0.4)',
    },
    champagne: {
      wingGradient: ['#FFF0DF', '#E8D2BA', '#B59676'],
      edge: '#D9BC9E',
      body: '#5C4834',
      glow: 'rgba(255, 240, 223, 0.4)',
    },
  }[color];

  const wingW = size * 0.7;
  const wingH = size;

  return (
    <div
      className={`inline-flex items-center justify-center pointer-events-none select-none ${className}`}
      style={{
        width: size * 1.5,
        height: size,
        perspective: '400px',
        ...style,
      }}
      aria-hidden="true"
    >
      {/* Left Wing */}
      <div className="animate-wing-left origin-right relative">
        <svg
          width={wingW}
          height={wingH}
          viewBox="0 0 40 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: `drop-shadow(0 2px 4px ${colorMap.glow})` }}
        >
          <defs>
            <linearGradient id={`grad-left-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colorMap.wingGradient[0]} />
              <stop offset="50%" stopColor={colorMap.wingGradient[1]} />
              <stop offset="100%" stopColor={colorMap.wingGradient[2]} />
            </linearGradient>
          </defs>
          <path
            d="M38 25C38 25 35 12 24 5C13 -2 2 4 4 15C6 24 20 25 38 25Z"
            fill={`url(#grad-left-${color})`}
            fillOpacity="0.85"
            stroke={colorMap.edge}
            strokeWidth="0.8"
          />
          <path
            d="M38 26C38 26 32 35 22 43C12 51 3 44 6 36C9 28 22 26 38 26Z"
            fill={`url(#grad-left-${color})`}
            fillOpacity="0.75"
            stroke={colorMap.edge}
            strokeWidth="0.8"
          />
          {/* Wing veins */}
          <path d="M38 25C26 20 12 14 6 12" stroke={colorMap.edge} strokeWidth="0.5" strokeOpacity="0.6" />
          <path d="M38 26C24 32 14 38 8 36" stroke={colorMap.edge} strokeWidth="0.5" strokeOpacity="0.6" />
        </svg>
      </div>

      {/* Butterfly Body */}
      <div
        className="w-[2px] h-[65%] rounded-full mx-[0.5px] z-10 relative"
        style={{ backgroundColor: colorMap.body }}
      >
        {/* Antennae */}
        <div className="absolute -top-[5px] -left-[2px] w-[3px] h-[4px] border-t border-l border-[#5A4622] rounded-tl-full transform -rotate-45" />
        <div className="absolute -top-[5px] -right-[2px] w-[3px] h-[4px] border-t border-r border-[#5A4622] rounded-tr-full transform rotate-45" />
      </div>

      {/* Right Wing */}
      <div className="animate-wing-right origin-left relative">
        <svg
          width={wingW}
          height={wingH}
          viewBox="0 0 40 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: `drop-shadow(0 2px 4px ${colorMap.glow})` }}
        >
          <defs>
            <linearGradient id={`grad-right-${color}`} x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={colorMap.wingGradient[0]} />
              <stop offset="50%" stopColor={colorMap.wingGradient[1]} />
              <stop offset="100%" stopColor={colorMap.wingGradient[2]} />
            </linearGradient>
          </defs>
          <path
            d="M2 25C2 25 5 12 16 5C27 -2 38 4 36 15C34 24 20 25 2 25Z"
            fill={`url(#grad-right-${color})`}
            fillOpacity="0.85"
            stroke={colorMap.edge}
            strokeWidth="0.8"
          />
          <path
            d="M2 26C2 26 8 35 18 43C28 51 37 44 34 36C31 28 18 26 2 26Z"
            fill={`url(#grad-right-${color})`}
            fillOpacity="0.75"
            stroke={colorMap.edge}
            strokeWidth="0.8"
          />
          {/* Wing veins */}
          <path d="M2 25C14 20 28 14 34 12" stroke={colorMap.edge} strokeWidth="0.5" strokeOpacity="0.6" />
          <path d="M2 26C16 32 26 38 32 36" stroke={colorMap.edge} strokeWidth="0.5" strokeOpacity="0.6" />
        </svg>
      </div>
    </div>
  );
};

/**
 * Elegant Floral Divider with centered blossom and gold leaf vines
 */
export const FloralDivider: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center gap-3 my-8 opacity-80 ${className}`} aria-hidden="true">
      <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent via-[#C5A059]/40 to-[#C5A059]" />
      <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Leaf Left */}
        <path d="M8 10C5 7 2 9 0 10C2 11 5 13 8 10Z" fill="#8A9A86" opacity="0.8" />
        {/* Leaf Right */}
        <path d="M24 10C27 7 30 9 32 10C30 11 27 13 24 10Z" fill="#8A9A86" opacity="0.8" />
        {/* Rose center blossom */}
        <circle cx="16" cy="10" r="4.5" fill="#EED7CF" stroke="#C5A059" strokeWidth="0.8" />
        <path d="M14.5 9C15 8 17 8 17.5 9C17 10.5 15 10.5 14.5 9Z" fill="#C5A059" opacity="0.8" />
      </svg>
      <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent via-[#C5A059]/40 to-[#C5A059]" />
    </div>
  );
};

/**
 * Botanical Corner Frame (SVG flourishes for cards & sections)
 */
export const BotanicalCorner: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  size?: number;
}> = ({ position, className = '', size = 70 }) => {
  const transform = {
    'top-left': 'scale(1, 1)',
    'top-right': 'scale(-1, 1)',
    'bottom-left': 'scale(1, -1)',
    'bottom-right': 'scale(-1, -1)',
  }[position];

  return (
    <div
      className={`absolute pointer-events-none select-none opacity-60 ${className}`}
      style={{
        width: size,
        height: size,
        top: position.includes('top') ? 0 : undefined,
        bottom: position.includes('bottom') ? 0 : undefined,
        left: position.includes('left') ? 0 : undefined,
        right: position.includes('right') ? 0 : undefined,
      }}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform, transformOrigin: 'center' }}
      >
        {/* Main graceful vine */}
        <path
          d="M6 94 C 6 45, 45 6, 94 6"
          stroke="#C5A059"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Outer subtle guide */}
        <path
          d="M12 94 C 12 50, 50 12, 94 12"
          stroke="#C5A059"
          strokeWidth="0.6"
          strokeDasharray="2 2"
          opacity="0.6"
        />
        {/* Leaves */}
        <path d="M22 68 C 16 62, 18 54, 26 56 C 28 62, 26 67, 22 68 Z" fill="#8A9A86" opacity="0.85" />
        <path d="M42 42 C 34 38, 38 30, 46 32 C 48 38, 46 41, 42 42 Z" fill="#8A9A86" opacity="0.85" />
        <path d="M68 22 C 62 16, 54 18, 56 26 C 62 28, 67 26, 68 22 Z" fill="#8A9A86" opacity="0.85" />
        {/* Petal flowers */}
        <circle cx="28" cy="56" r="3.5" fill="#EED7CF" stroke="#C5A059" strokeWidth="0.5" />
        <circle cx="56" cy="28" r="3.5" fill="#EED7CF" stroke="#C5A059" strokeWidth="0.5" />
        <circle cx="48" cy="34" r="4.5" fill="#FDF3E7" stroke="#C5A059" strokeWidth="0.6" />
        <circle cx="94" cy="6" r="2.5" fill="#C5A059" />
        <circle cx="6" cy="94" r="2.5" fill="#C5A059" />
      </svg>
    </div>
  );
};
