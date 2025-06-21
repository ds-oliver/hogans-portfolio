"use client";

import { motion } from 'framer-motion';
import Button from './Button';
import { 
  UserIcon, 
  WrenchScrewdriverIcon, 
  RocketLaunchIcon, 
  AcademicCapIcon, 
  EnvelopeIcon, 
  DocumentArrowDownIcon 
} from '@heroicons/react/24/outline';

const navigationCards = [
  {
    title: "About",
    description: "Learn about my background",
    href: "#about",
    icon: UserIcon,
    accentColor: "teal"
  },
  {
    title: "Skills", 
    description: "Technical expertise",
    href: "#skills",
    icon: WrenchScrewdriverIcon,
    accentColor: "gold"
  },
  {
    title: "Projects",
    description: "Featured work",
    href: "#projects", 
    icon: RocketLaunchIcon,
    accentColor: "teal"
  },
  {
    title: "Education",
    description: "Academic background",
    href: "#education",
    icon: AcademicCapIcon,
    accentColor: "gold"
  },
  {
    title: "Contact",
    description: "Get in touch",
    href: "#contact",
    icon: EnvelopeIcon,
    accentColor: "teal"
  },
  {
    title: "Resume",
    description: "Download PDF",
    href: "/resume.pdf",
    icon: DocumentArrowDownIcon,
    accentColor: "gold"
  }
];

const NavigationCards = () => {
  return (
    <section className="py-16 max-w-6xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-charcoal-400 rounded-xl shadow-lg p-8 border border-charcoal-600"
      >
        <h2 className="text-2xl font-f1 mb-6 text-center" style={{ color: 'var(--foreground)' }}>
          Explore My Portfolio
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {navigationCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer"
            >
              <Button
                href={card.href}
                variant="card"
                className="w-full h-full p-6 rounded-lg group"
                animate={false} // We handle animation with the parent motion.div
                cardContent={
                  <>
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                        style={{
                          backgroundColor: 'transparent',
                          border: '1px solid var(--foreground-secondary)'
                        }}
                      >
                        <card.icon 
                          className="w-4 h-4 transition-colors duration-300" 
                          style={{ color: 'var(--foreground-secondary)' }}
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 
                          className="text-lg font-f1 transition-colors duration-300"
                          style={{ color: 'var(--foreground)' }}
                        >
                          {card.title}
                          <span 
                            className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1"
                            style={{ color: 'var(--foreground-secondary)' }}
                          >
                            →
                          </span>
                        </h3>
                      </div>
                    </div>
                  </>
                }
              >
                {/* Required children prop, but content is handled by cardContent */}
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default NavigationCards; 