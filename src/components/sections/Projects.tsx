"use client";

import { motion } from 'framer-motion';
import { ArrowTopRightOnSquareIcon, CodeBracketIcon } from '@heroicons/react/24/outline';

const projects = [
  {
    title: "Morning Routine Optimizer",
    description: "ETM 540 course project that models a morning routine as an optimization problem, balancing time constraints and task tradeoffs to produce an efficient schedule.",
    technologies: ["Optimization", "Scheduling", "Python"],
    image: "/projects/morning-routine.jpg",
    demoLink: "https://example.com/demo",
    codeLink: "https://github.com/ds-oliver/MS-ADSB-ETM540-Morning-Routine-Optimizer",
  },
  {
    title: "Fantrax API Wrapper",
    description: "Unofficial Python bindings for the Fantrax API, focused on making it easy to query leagues, rosters, and scoring data.",
    technologies: ["Python", "API", "Requests"],
    image: "/projects/fantrax-api.jpg",
    demoLink: "https://example.com/demo",
    codeLink: "https://github.com/ds-oliver/FantraxAPI",
  },
  {
    title: "Hogan's Portfolio",
    description: "Personal portfolio built with Next.js, React, Tailwind CSS, and Framer Motion, deployed on Vercel.",
    technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    image: "/projects/portfolio.jpg",
    demoLink: "https://example.com/demo",
    codeLink: "https://github.com/ds-oliver/hogans-portfolio",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-charcoal-200 dark:bg-charcoal-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-f1 tracking-tight sm:text-4xl text-charcoal-900">
            Featured Projects
          </h2>
          <p className="mt-4 text-lg text-charcoal-800">
            A showcase of my recent work and contributions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-charcoal-400 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border-2 border-charcoal-600"
            >
              <div className="aspect-w-16 aspect-h-9 bg-charcoal-600 relative overflow-hidden">
                {/* Add actual project images later */}
                <div className="w-full h-48 bg-charcoal-600" />
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  style={{
                    background: index % 2 === 0 
                      ? 'linear-gradient(45deg, var(--accent-teal), var(--accent-teal-hover))' 
                      : 'linear-gradient(45deg, var(--accent-gold), var(--accent-gold-hover))'
                  }}
                >
                  <span className="text-white font-semibold text-lg">View Project</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-charcoal-800">{project.title}</h3>
                <p className="text-charcoal-900 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <motion.span
                      key={tech}
                      className="px-3 py-1 text-sm rounded-full transition-all duration-300 cursor-pointer"
                      style={{
                        backgroundColor: 'var(--background-secondary)',
                        color: 'var(--foreground-secondary)',
                        border: '1px solid var(--accent-teal)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--accent-teal)';
                        e.currentTarget.style.color = 'var(--background)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--background-secondary)';
                        e.currentTarget.style.color = 'var(--foreground-secondary)';
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-300"
                    style={{ color: 'var(--accent-teal)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--accent-teal-hover)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--accent-teal)';
                    }}
                  >
                    <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                    Live Demo
                  </a>
                  <a
                    href={project.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-300"
                    style={{ color: 'var(--accent-gold)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--accent-gold-hover)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--accent-gold)';
                    }}
                  >
                    <CodeBracketIcon className="h-5 w-5" />
                    View Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 
