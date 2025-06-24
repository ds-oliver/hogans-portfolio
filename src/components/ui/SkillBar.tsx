"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './SkillBar.module.css';

interface Props {
  level: number;          // 0–10
  filledColor: 'work' | 'learning';
}

const SkillBar: React.FC<Props> = ({ level, filledColor }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="flex gap-1.25" style={{ width: '300px' }}>
      {Array.from({ length: 10 }).map((_, i) => {
        const isActive = i < level;
        
        // Build CSS classes for the ripple effect
        const baseClasses = `h-[26px] w-[26px] rounded-sm ${styles.skillSquare}`;
        const colorClasses = isActive 
          ? `${baseClasses} ${styles[filledColor]} ${isInView ? styles.rippleOnView : ''}`
          : `${baseClasses} ${styles[filledColor]} ${styles.inactive}`;
        
        return (
          <motion.div
            key={i}
            className={colorClasses}
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