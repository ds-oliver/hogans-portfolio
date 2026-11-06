"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowsPointingOutIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import type { Diagram, DiagramTheme, Practice } from '@/lib/diagrams';

const PRACTICES: { id: Practice | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'solutions-architecture', label: 'Solutions Architecture' },
  { id: 'data-engineering', label: 'Data Engineering' },
  { id: 'process-automation', label: 'Process Automation' },
  { id: 'analytics-engineering', label: 'Analytics Engineering' },
];

const PRACTICE_LABEL: Record<Practice, string> = {
  'solutions-architecture': 'Solutions Architecture',
  'data-engineering': 'Data Engineering',
  'process-automation': 'Process Automation',
  'analytics-engineering': 'Analytics Engineering',
};

// Frame tone matches each diagram's own canvas so the card reads as one surface.
const FRAME: Record<DiagramTheme, string> = {
  dark: 'bg-surface border-surface-line',
  blueprint: 'bg-surface border-surface-line',
  split: 'bg-surface border-surface-line',
  deep: 'bg-layer-3 border-layer-2',
  light: 'bg-layer-1 border-layer-1-stroke',
};

const pad = (n: number) => String(n).padStart(2, '0');

function Svg({ markup, className }: { markup: string; className?: string }) {
  return <div className={`diagram ${className ?? ''}`} dangerouslySetInnerHTML={{ __html: markup }} />;
}

function Lightbox({ diagram, onClose }: { diagram: Diagram; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={diagram.title}
      className="fixed inset-0 z-[60] flex flex-col bg-surface/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3 border-b border-surface-line">
        <p className="text-sm font-semibold text-ink truncate">{diagram.title}</p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="rounded-md p-2 text-ink-muted hover:text-ink"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
      {/* On narrow screens the diagram keeps a readable width and pans. */}
      <div className="flex-1 overflow-auto p-4" onClick={(e) => e.stopPropagation()}>
        <div className={`mx-auto min-w-[900px] max-w-[1600px] rounded-md border ${FRAME[diagram.theme]}`}>
          <Svg markup={diagram.svg} />
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default function DiagramGallery({
  diagrams,
  legend,
}: {
  diagrams: Diagram[];
  legend: string;
}) {
  const [practice, setPractice] = useState<Practice | 'all'>('all');
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [zoomed, setZoomed] = useState(false);
  const [showLegend, setShowLegend] = useState(false);
  const reduceMotion = useReducedMotion();
  const stripRef = useRef<HTMLDivElement>(null);

  const visible = useMemo(
    () => (practice === 'all' ? diagrams : diagrams.filter((d) => d.practice === practice)),
    [diagrams, practice],
  );
  const current = visible[index];

  const go = useCallback(
    (delta: number) => {
      setDirection(delta);
      setIndex((i) => (i + delta + visible.length) % visible.length);
    },
    [visible.length],
  );

  const select = (i: number) => {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  };

  const filter = (p: Practice | 'all') => {
    setPractice(p);
    setIndex(0);
  };

  // Keep the active chip in view as the reader steps through.
  useEffect(() => {
    // Scroll only the strip; scrollIntoView would also move the page.
    const strip = stripRef.current;
    const chip = strip?.querySelector<HTMLElement>(`[data-i="${index}"]`);
    if (strip && chip) {
      strip.scrollTo({
        left: chip.offsetLeft - strip.offsetLeft - (strip.clientWidth - chip.clientWidth) / 2,
        behavior: 'smooth',
      });
    }
  }, [index, practice]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
  };

  if (!current) return null;

  const slide = reduceMotion ? 0 : 40;

  return (
    <div>
      <div role="tablist" aria-label="Filter by practice" className="flex flex-wrap justify-center gap-2 mb-8">
        {PRACTICES.map((p) => {
          const active = practice === p.id;
          return (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => filter(p.id)}
              className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
                active
                  ? 'border-layer-1 bg-layer-3 text-ink'
                  : 'border-surface-line text-ink-muted hover:border-layer-2 hover:text-ink'
              }`}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      <div
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-roledescription="carousel"
        aria-label="Architecture diagrams"
        className="outline-none focus-visible:ring-2 focus-visible:ring-layer-2 rounded-lg"
      >
        <div className={`relative overflow-hidden rounded-lg border transition-colors duration-300 ${FRAME[current.theme]}`}>
          <AnimatePresence initial={false} mode="popLayout" custom={direction}>
            <motion.button
              key={`${practice}-${current.slug}`}
              type="button"
              aria-label={`Open ${current.title} full screen`}
              onClick={() => setZoomed(true)}
              custom={direction}
              initial={{ opacity: 0, x: direction * slide }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * slide }}
              transition={{ duration: reduceMotion ? 0 : 0.28, ease: 'easeOut' }}
              drag={visible.length > 1 ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(1);
                else if (info.offset.x > 60) go(-1);
              }}
              className="block w-full cursor-zoom-in"
            >
              <Svg markup={current.svg} />
            </motion.button>
          </AnimatePresence>

          <span className="pointer-events-none absolute right-3 top-3 hidden sm:flex items-center gap-1 rounded bg-surface/80 px-2 py-1 text-xs text-ink-muted">
            <ArrowsPointingOutIcon className="h-3.5 w-3.5" /> Expand
          </span>
        </div>

        <div className="mt-5 flex items-start gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous diagram"
            className="shrink-0 rounded-md border border-surface-line p-2 text-ink-muted hover:border-layer-2 hover:text-ink"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <div className="flex-1 min-w-0 text-center" aria-live="polite">
            <p className="text-xs uppercase tracking-wider text-layer-2">
              {PRACTICE_LABEL[current.practice]} · {pad(index + 1)} / {pad(visible.length)}
            </p>
            <h3 className="mt-1 text-lg font-semibold text-ink">{current.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-ink-muted">{current.caption}</p>
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next diagram"
            className="shrink-0 rounded-md border border-surface-line p-2 text-ink-muted hover:border-layer-2 hover:text-ink"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={stripRef}
        className="mt-6 flex gap-2 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:thin]"
      >
        {visible.map((d, i) => (
          <button
            key={d.slug}
            type="button"
            data-i={i}
            onClick={() => select(i)}
            aria-current={i === index}
            className={`snap-start shrink-0 w-44 rounded-md border px-3 py-2 text-left transition-colors ${
              i === index
                ? 'border-layer-2 bg-surface-raised'
                : 'border-surface-line hover:border-layer-2'
            }`}
          >
            <span className="block text-[11px] text-ink-dim">{pad(i + 1)}</span>
            <span className={`block text-xs leading-snug ${i === index ? 'text-ink' : 'text-ink-muted'}`}>
              {d.title}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={() => setShowLegend((s) => !s)}
          aria-expanded={showLegend}
          className="text-sm text-layer-2 underline-offset-4 hover:underline"
        >
          {showLegend ? 'Hide the shape key' : 'How to read these diagrams'}
        </button>
      </div>
      {showLegend && (
        <div className="mt-4 overflow-hidden rounded-lg border border-surface-line bg-surface">
          <Svg markup={legend} />
        </div>
      )}

      {zoomed && <Lightbox diagram={current} onClose={() => setZoomed(false)} />}
    </div>
  );
}
