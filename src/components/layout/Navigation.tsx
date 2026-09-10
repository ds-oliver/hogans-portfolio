"use client";

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';

const navigation = [
  { name: 'Services', href: '#services' },
  { name: 'Work', href: '#work' },
  { name: 'Capabilities', href: '#capabilities' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

function MarlenMark() {
  // Canonical mark_small_dark.svg from brand/, the simplified sibling for
  // use at 32px and below on the dark tile. Not redrawn or re-proportioned.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/brand/mark_small_dark.svg" alt="" width="28" height="28" aria-hidden="true" />
  );
}

function MarlenLockup() {
  return (
    <span className="flex items-center gap-2.5">
      <MarlenMark />
      <span className="text-lg tracking-tight text-ink">
        <span className="font-semibold">Marlen</span> <span className="font-normal">Solutions</span>
      </span>
    </span>
  );
}

function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  // Rendered through a portal straight to document.body. Nesting a fixed,
  // full-viewport overlay inside the header is fragile: position: fixed
  // normally resolves against the viewport, but ANY ancestor with a
  // transform, filter, or backdrop-filter becomes the containing block
  // instead. The header carries backdrop-blur-sm for its own translucency,
  // which silently shrank this drawer's `inset-y-0` down to the header's
  // own ~76px box. A portal sidesteps the whole category of bug, present
  // and future, by never being a descendant of the header at all.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && [
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 lg:hidden"
          onClick={onClose}
        />,
        <motion.div
          key="drawer"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 20 }}
          className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-tile px-6 py-6 sm:max-w-sm border-l border-surface-line lg:hidden"
        >
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5" onClick={onClose}>
              <MarlenLockup />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-ink-muted"
              onClick={onClose}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-surface-line">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Button
                    key={item.name}
                    href={item.href}
                    variant="outline"
                    size="md"
                    className="w-full justify-start rounded-lg"
                    onClick={onClose}
                  >
                    {item.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>,
      ]}
    </AnimatePresence>,
    document.body
  );
}

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-tile/90 backdrop-blur-sm border-b border-surface-line">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <MarlenLockup />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-ink-muted"
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
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
}
