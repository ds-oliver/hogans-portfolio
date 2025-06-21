"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-charcoal/90 backdrop-blur-sm border-b border-charcoal-400">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span 
              className="text-xl font-semibold tracking-wide transition-all duration-300 hover:scale-105 text-gradient-fuschia-watermelon"
              style={{ 
                fontFamily: 'var(--font-poppins)',
                background: 'linear-gradient(to right, var(--primary-accent), var(--secondary-accent))',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'var(--primary-accent)' // fallback
              }}
            >
              Hogan Marhoefer
            </span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-saffron-800"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-6">
          {navigation.map((item) => (
            <Button
              key={item.name}
              href={item.href}
              variant="outline"
              size="sm"
              className="rounded-lg"
            >
              {item.name}
            </Button>
          ))}
        </div>
      </nav>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="lg:hidden"
          >
            <div className="fixed inset-0 z-50" />
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-charcoal px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-charcoal-600 border-l border-charcoal-400">
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5">
                  <span 
                    className="text-xl font-semibold tracking-wide transition-all duration-300 text-gradient-fuschia-watermelon"
                    style={{ 
                      fontFamily: 'var(--font-poppins)',
                      background: 'linear-gradient(to right, var(--primary-accent), var(--secondary-accent))',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      color: 'var(--primary-accent)' // fallback
                    }}
                  >
                    Hogan Marhoefer
                  </span>
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-saffron-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-charcoal-600">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Button
                        key={item.name}
                        href={item.href}
                        variant="outline"
                        size="md"
                        className="w-full justify-start rounded-lg"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 