"use client";

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

interface SkillData {
  skill: string;
  level: number;
  fullMark: number;
}

const skillData: SkillData[] = [
  { skill: 'Data Engineering', level: 90, fullMark: 100 },
  { skill: 'Machine Learning', level: 85, fullMark: 100 },
  { skill: 'Cloud & DevOps', level: 80, fullMark: 100 },
  { skill: 'Python', level: 90, fullMark: 100 },
  { skill: 'SQL', level: 95, fullMark: 100 },
  { skill: 'Analytics', level: 85, fullMark: 100 },
];

export default function SkillRadarChart() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full h-96 bg-charcoal-400 rounded-xl shadow-lg p-6 border border-charcoal-600"
    >
      <h3 className="text-xl font-bold text-center mb-4" style={{ color: 'var(--foreground)' }}>
        Technical Expertise Overview
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={skillData}>
          <PolarGrid 
            stroke="var(--foreground-secondary)" 
            strokeOpacity={0.3}
            className="dark:stroke-gray-600"
          />
          <PolarAngleAxis 
            dataKey="skill" 
            tick={{ 
              fontSize: 12, 
              fill: 'var(--foreground-secondary)',
              fontWeight: 500
            }}
            className="text-gray-600 dark:text-gray-300"
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]} 
            tick={{ 
              fontSize: 10, 
              fill: 'var(--foreground-muted)' 
            }}
            tickCount={6}
          />
          <Radar
            name="Skills"
            dataKey="level"
            stroke="url(#skillGradient)"
            fill="url(#skillGradient)"
            fillOpacity={0.2}
            strokeWidth={3}
            dot={{ 
              r: 6, 
              fill: '#8A2BE2',
              stroke: 'var(--foreground)',
              strokeWidth: 2
            }}
          />
          <defs>
            <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8A2BE2" />
              <stop offset="100%" stopColor="var(--accent-gold)" />
            </linearGradient>
          </defs>
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  );
} 