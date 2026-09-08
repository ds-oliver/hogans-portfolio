"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './SkillBar.module.css';

interface Props {
  /** Segments filled, 0-10. Represents lifecycle coverage, not a proficiency score. */
  level: number;
}

const SkillBar: React.FC<Props> = ({ level }) => {
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
        const classes = [
          'h-[26px]',
          'w-[26px]',
          'rounded-sm',
          styles.segment,
          isActive ? styles.filled : styles.empty,
          isActive && isInView ? styles.filledInView : '',
        ].filter(Boolean).join(' ');

        return (
          <motion.div
            key={i}
            className={classes}
            initial={{ scale: 0, rotate: 0 }}
            animate={{
              scale: 1,
              rotate: [0, -10, 10, -5, 5, 0],
            }}
            transition={{
              scale: {
                duration: 0.3,
                delay: i * 0.05,
                ease: "easeOut"
              },
              rotate: {
                duration: 0.6,
                delay: i * 0.05 + 0.2,
                ease: "easeInOut"
              }
            }}
            tabIndex={0}
          />
        );
      })}
    </div>
  );
};

export default SkillBar;
