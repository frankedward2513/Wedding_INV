import React, { useEffect, useState, useId } from 'react';
import { Butterfly } from './BotanicalElements';

interface Petal {
  id: number;
  left: number; // percentage (0 - 100)
  size: number; // px
  duration: number; // seconds
  delay: number; // seconds
  opacity: number;
  rotation: number; // start deg
  color: string;
}

interface RoamingButterfly {
  id: number;
  startX: number;
  startY: number;
  color: 'gold' | 'blush' | 'sage' | 'champagne';
  size: number;
  duration: number;
}

export const FloatingParticlesLayer: React.FC<{ enabled?: boolean }> = ({ enabled = true }) => {
  const [petals, setPetals] = useState<Petal[]>([]);
  const [butterflies, setButterflies] = useState<RoamingButterfly[]>([]);
  const componentId = useId().replace(/:/g, '');

  useEffect(() => {
    // Generate gentle petals
    const petalColors = ['#F9EAE1', '#F4DCD1', '#F8ECE7', '#F1DFD5', '#EADFD5'];
    const generatedPetals: Petal[] = Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      left: Math.random() * 95,
      size: 10 + Math.random() * 12,
      duration: 14 + Math.random() * 12,
      delay: Math.random() * 15,
      opacity: 0.35 + Math.random() * 0.45,
      rotation: Math.random() * 360,
      color: petalColors[i % petalColors.length],
    }));
    setPetals(generatedPetals);

    // Generate gentle butterflies across the viewport
    const butterflyTypes: ('gold' | 'blush' | 'sage' | 'champagne')[] = ['gold', 'blush', 'champagne', 'sage'];
    const roaming: RoamingButterfly[] = [
      { id: 1, startX: 12, startY: 25, color: butterflyTypes[0], size: 28, duration: 24 },
      { id: 2, startX: 80, startY: 45, color: butterflyTypes[1], size: 24, duration: 28 },
      { id: 3, startX: 25, startY: 70, color: butterflyTypes[2], size: 22, duration: 26 },
      { id: 4, startX: 75, startY: 85, color: butterflyTypes[3], size: 26, duration: 32 },
    ];
    setButterflies(roaming);
  }, []);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden" aria-hidden="true">
      {/* Falling Petals */}
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute top-0"
          style={{
            left: `${petal.left}%`,
            animation: `petalSway ${petal.duration}s linear infinite`,
            animationDelay: `${petal.delay}s`,
            opacity: petal.opacity,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.3}
            viewBox="0 0 24 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: `rotate(${petal.rotation}deg)` }}
          >
            <path
              d="M12 0 C18 6, 24 16, 18 26 C14 32, 10 32, 6 26 C0 16, 6 6, 12 0 Z"
              fill={petal.color}
              stroke="#E8C7B8"
              strokeWidth="0.4"
            />
          </svg>
        </div>
      ))}

      {/* Roaming Fluttering Butterflies */}
      {butterflies.map((b) => (
        <div
          key={b.id}
          className="absolute transition-transform"
          style={{
            left: `${b.startX}%`,
            top: `${b.startY}%`,
            animation: `roam-${b.id} ${b.duration}s ease-in-out infinite alternate`,
          }}
        >
          <Butterfly size={b.size} color={b.color} />
        </div>
      ))}

      {/* Inline styles for individual butterfly organic roaming paths */}
      <style>{`
        @keyframes roam-1 {
          0% { transform: translate(0px, 0px) rotate(5deg) scale(0.95); }
          25% { transform: translate(60px, -45px) rotate(-8deg) scale(1.05); }
          50% { transform: translate(140px, 30px) rotate(12deg) scale(1); }
          75% { transform: translate(80px, 90px) rotate(-5deg) scale(0.92); }
          100% { transform: translate(-30px, 40px) rotate(8deg) scale(1); }
        }
        @keyframes roam-2 {
          0% { transform: translate(0px, 0px) rotate(-10deg) scale(1); }
          30% { transform: translate(-80px, -60px) rotate(15deg) scale(0.92); }
          60% { transform: translate(-130px, 40px) rotate(-5deg) scale(1.08); }
          100% { transform: translate(-20px, 90px) rotate(10deg) scale(0.95); }
        }
        @keyframes roam-3 {
          0% { transform: translate(0px, 0px) rotate(12deg) scale(0.95); }
          35% { transform: translate(90px, 70px) rotate(-12deg) scale(1.05); }
          70% { transform: translate(160px, -30px) rotate(8deg) scale(0.98); }
          100% { transform: translate(40px, -60px) rotate(-6deg) scale(1); }
        }
        @keyframes roam-4 {
          0% { transform: translate(0px, 0px) rotate(-6deg) scale(1.05); }
          40% { transform: translate(-100px, -70px) rotate(10deg) scale(0.92); }
          80% { transform: translate(-50px, -140px) rotate(-14deg) scale(1.02); }
          100% { transform: translate(40px, -50px) rotate(4deg) scale(0.98); }
        }
      `}</style>
    </div>
  );
};
