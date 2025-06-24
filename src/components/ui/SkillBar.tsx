"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './SkillBar.module.css';

interface Props {
  level: number;          // 0–10
  filledColor: 'work' | 'learning';
}

const SkillBar: React.FC<Props> = ({ level, filledColor }) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            // Trigger ripple effect on all active squares
            const squares = entry.target.querySelectorAll(`.${styles.skillSquare}.${styles.active}`);
            squares.forEach((square, index) => {
              setTimeout(() => {
                square.classList.add(styles.rippleOnView);
                setTimeout(() => {
                  square.classList.remove(styles.rippleOnView);
                }, 2200); // Match the slower CSS transition duration
              }, index * 150); // Increased stagger delay for more dramatic effect
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <div ref={containerRef} className="flex gap-1.25" style={{ width: '300px' }}>
      {Array.from({ length: 10 }).map((_, i) => {
        const isActive = i < level;
        
        // Build CSS classes for the ripple effect
        const baseClasses = `h-[26px] w-[26px] rounded-sm ring-1 ring-gray-700 ${styles.skillSquare}`;
        const colorClasses = isActive 
          ? `${baseClasses} ${styles[filledColor]} ${styles.active}`
          : `${baseClasses}`;
        
        // Use fallback inline styles for base colors
        const customStyle = isActive 
          ? {} // Remove hardcoded colors, use CSS module classes instead
          : { backgroundColor: 'var(--background-secondary)' }; // unfilled - charcoal background
        
        return (
          <motion.div
            key={i}
            className={colorClasses}
            style={customStyle}
            initial={{ scale: 0, rotate: 0 }}
            animate={{ 
              scale: 1, 
              rotate: [0, -10, 10, -5, 5, 0] // jiggle effect
            }}
            transition={{
              scale: {
                duration: 0.3,
                delay: i * 0.05, // staggered animation
                ease: "easeOut"
              },
              rotate: {
                duration: 0.6,
                delay: i * 0.05 + 0.2, // jiggle after scale
                ease: "easeInOut"
              }
            }}
            tabIndex={0} // Make focusable for keyboard accessibility
          />
        );
      })}
    </div>
  );
};

export default SkillBar; 