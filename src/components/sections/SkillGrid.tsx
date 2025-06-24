"use client";

import { motion } from 'framer-motion';
import SkillBar from '../ui/SkillBar';

const skills = {
  work: {
    'SQL (ORACLE/MYSQL)': 10,
    PYTHON: 9,
    AIRFLOW: 9,
    OAC: 8,
    AWS: 8,
    DBT: 8,
    TABLEAU: 7,
    SPARK: 7,
  },
  learning: {
    SNOWFLAKE: 7,
    DOCKER: 6,
    KUBERNETES: 6,
    KAFKA: 6,
    GIT: 5,
    MLFLOW: 5,
    TERRAFORM: 5,
    GRAFANA: 4,
  },
};

const SkillGrid = () => (
  <section className="py-20 bg-charcoal-100">
    <div className="max-w-5xl mx-auto px-6">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
          Technical Skills
        </h2>
        <p className="text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>
          A comprehensive overview of my technical expertise, from technologies I use professionally 
          to emerging skills I&apos;m actively developing to stay at the forefront of innovation.
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2">
    {/* Proficient column */}
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
          className="skill-bars-container gradient-border-hover"
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'flex-start', 
            fontFamily: 'Poppins, sans-serif', 
            fontWeight: 600, 
            letterSpacing: '0.6px', 
            width: '100%', 
            maxWidth: '340px',
            margin: '0 auto',
            backgroundColor: 'var(--background-secondary)',
            borderRadius: '12px',
            padding: '24px',
            border: '2px solid var(--foreground-secondary)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }}
        >
          <h3 className="text-xl font-semibold mb-8 tracking-wide font-poppins" style={{ alignSelf: 'center', color: 'var(--foreground)' }}>what I work with</h3>
          <div className="text-center mb-6">
            <span className="text-sm bg-black bg-opacity-20 px-3 py-1 rounded-full" style={{ color: 'var(--foreground-secondary)' }}>
              {Object.keys(skills.work).length} Technologies
            </span>
          </div>
          <div className="w-full" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {Object.entries(skills.work).map(([label, lvl], index) => (
          <motion.div 
            key={label} 
                className="skill-bar"
                style={{ display: 'flex', flexDirection: 'column' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center">
              <div style={{ width: '300px' }}>
                <div 
                  className="skill-bar-title text-sm font-medium uppercase tracking-wider mb-2" 
                  style={{ color: 'var(--skill-text)' }}
                >
                  {label}
                </div>
                <SkillBar level={lvl} filledColor="work" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>

    {/* Learning column */}
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
          className="skill-bars-container gradient-border-hover"
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'flex-start', 
            fontFamily: 'Poppins, sans-serif', 
            fontWeight: 600, 
            letterSpacing: '0.6px', 
            width: '100%', 
            maxWidth: '340px',
            margin: '0 auto',
            backgroundColor: 'var(--background-secondary)',
            borderRadius: '12px',
            padding: '24px',
            border: '2px solid var(--foreground-secondary)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }}
        >
          <h3 className="text-xl font-semibold mb-8 tracking-wide font-poppins" style={{ alignSelf: 'center', color: 'var(--foreground)' }}>what I&apos;m learning</h3>
          <div className="text-center mb-6">
            <span className="text-sm bg-black bg-opacity-20 px-3 py-1 rounded-full" style={{ color: 'var(--foreground-secondary)' }}>
              {Object.keys(skills.learning).length} Technologies
            </span>
          </div>
          <div className="w-full" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {Object.entries(skills.learning).map(([label, lvl], index) => (
          <motion.div 
            key={label} 
                className="skill-bar"
                style={{ display: 'flex', flexDirection: 'column' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center">
              <div style={{ width: '300px' }}>
                <div 
                  className="skill-bar-title text-sm font-medium uppercase tracking-wider mb-2" 
                  style={{ color: 'var(--skill-text)' }}
                >
                  {label}
                </div>
                <SkillBar level={lvl} filledColor="learning" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
      </div>

      {/* Section Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        <div className="max-w-2xl mx-auto">
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--foreground-muted)' }}>
            These skills represent my journey as a developer, combining proven expertise with continuous learning. 
            I believe in staying current with emerging technologies while maintaining mastery of core fundamentals.
          </p>
          <div className="flex justify-center items-center space-x-6 text-xs" style={{ color: 'var(--foreground-secondary)' }}>
            <span className="flex items-center">
              <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: 'var(--accent-green)' }}></div>
              Production Ready
            </span>
            <span className="flex items-center">
              <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#ffbd6d' }}></div>
              Actively Learning
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default SkillGrid; 