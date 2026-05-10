import React from 'react';
import { motion } from 'motion/react';

const PARTICLE_COUNT = 15;

export const FloatingParticles: React.FC = () => {
  const particles = Array.from({ length: PARTICLE_COUNT });

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {particles.map((_, i) => {
        const size = Math.random() * 20 + 10;
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        // Brand colors: gold, cream, pink, white
        const colors = ['#D4AF37', '#FAF7F2', '#FCE4EC', '#FFFFFF'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        return (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0, 
              x: `${startX}%`, 
              y: `${startY}%`, 
              scale: 0 
            }}
            animate={{ 
              opacity: [0, 0.4, 0],
              x: [`${startX}%`, `${startX + (Math.random() * 10 - 5)}%`],
              y: [`${startY}%`, `${startY - (Math.random() * 20 + 10)}%`],
              scale: [0.5, 1, 0.5],
              rotate: [0, 180]
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: delay,
              ease: "easeInOut"
            }}
            className="absolute rounded-full blur-[2px] shadow-[0_0_10px_rgba(212,175,55,0.3)]"
            style={{
              width: size,
              height: size,
              backgroundColor: color,
            }}
          >
            {/* Occasionally add an emoji particle for that "dessert" feel */}
            {i % 4 === 0 && (
               <span className="text-[12px] opacity-20 filter grayscale blur-[1px]">
                 {['🧁', '🍦', '🍩', '🍪'][Math.floor(Math.random() * 4)]}
               </span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};
