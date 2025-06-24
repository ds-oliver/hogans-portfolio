"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import SkillRadarChart from '@/components/ui/SkillRadarChart';
import Button from '@/components/ui/Button';

const skillCategories = [
  {
    name: 'Data Engineering',
    skills: [
      { name: 'Snowflake', level: 90 },
      { name: 'Databricks', level: 85 },
      { name: 'Apache Spark', level: 80 },
      { name: 'ETL/ELT', level: 90 },
      { name: 'Data Modeling', level: 85 },
      { name: 'Data Quality', level: 85 },
    ],
  },
  {
    name: 'Machine Learning',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'scikit-learn', level: 85 },
      { name: 'TensorFlow', level: 75 },
      { name: 'Feature Engineering', level: 85 },
      { name: 'Model Deployment', level: 80 },
      { name: 'MLOps', level: 75 },
    ],
  },
  {
    name: 'Cloud & DevOps',
    skills: [
      { name: 'AWS', level: 85 },
      { name: 'GCP', level: 80 },
      { name: 'Docker', level: 85 },
      { name: 'Kubernetes', level: 75 },
      { name: 'CI/CD', level: 80 },
      { name: 'Terraform', level: 70 },
    ],
  },
  {
    name: 'Tools & Languages',
    skills: [
      { name: 'SQL', level: 95 },
      { name: 'Python', level: 90 },
      { name: 'Git', level: 85 },
      { name: 'Airflow', level: 85 },
      { name: 'dbt', level: 80 },
      { name: 'Shell Scripting', level: 80 },
    ],
  },
];

// Single gradient for all skill bars - now using sophisticated accent colors
const getSkillGradient = () => {
  return 'bg-gradient-to-r from-[#8A2BE2] to-[var(--accent-gold)]'; // sophisticated purple to gold gradient
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].name);

  return (
    <section id="skills" className="py-20 bg-charcoal-200 dark:bg-charcoal-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-f1 tracking-tight sm:text-4xl text-charcoal-900">
            Technical Skills
          </h2>
          <p className="mt-4 text-lg text-charcoal-800">
            A comprehensive overview of my technical expertise
          </p>
        </motion.div>

        {/* Radar Chart Section */}
        <div className="mb-16">
          <SkillRadarChart />
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {skillCategories.map((category, index) => (
            <Button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              variant={activeCategory === category.name ? (index % 2 === 0 ? 'primary' : 'secondary') : 'ghost'}
              size="sm"
              className="rounded-full"
            >
              {category.name}
            </Button>
          ))}
        </div>

        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories
            .find((category) => category.name === activeCategory)
            ?.skills.map((skill) => (
              <motion.div
                key={skill.name}
                className="rounded-lg p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group border-2"
                style={{
                  backgroundColor: 'var(--background-secondary)',
                  borderColor: 'var(--accent-teal)'
                }}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 
                    className="text-lg font-semibold transition-all duration-300"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {skill.name}
                  </h3>
                  <span 
                    className="text-sm transition-all duration-300 font-bold"
                    style={{ color: 'var(--accent-gold)' }}
                  >
                    {skill.level}%
                  </span>
                </div>
                <div 
                  className="w-full rounded-full h-2.5 overflow-hidden"
                  style={{ backgroundColor: 'var(--background)' }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                    className={`h-2.5 rounded-full ${getSkillGradient()} relative group-hover:animate-pulse`}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20 rounded-full"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        ease: "linear",
                        delay: 1.5 
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
        </motion.div>

        <div className="flex justify-center items-center space-x-6 text-xs" style={{ color: 'var(--foreground-secondary)' }}>
          <span className="flex items-center">
            <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#62db5d' }}></div>
            Production Ready
          </span>
          <span className="flex items-center">
            <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#ffbd6d' }}></div>
            Actively Learning
          </span>
        </div>
      </div>
    </section>
  );
} 