"use client";

import styles from './Hero.module.css';
import Button from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="py-32 text-center px-8">
      <h1
        className="mx-auto text-4xl tracking-tight sm:text-6xl lg:text-7xl text-ink"
        style={{ lineHeight: '1.2', overflow: 'visible' }}
      >
        <span className="font-semibold">Marlen</span>{' '}
        <span className="sr-only">Solutions</span>
        <span className={`font-normal ${styles.name}`} aria-hidden="true" />
      </h1>

      <p className="mt-4 text-lg text-layer-2">
        Data Engineering and Solutions Architecting
      </p>

      <p className="mt-6 mx-auto max-w-xl text-lg text-ink-muted">
        I build data pipelines that run in production, map the source systems they
        pull from, and write the validation that proves the numbers landed right.
      </p>

      <div className="mt-10">
        <Button href="#contact" variant="primary" size="lg">
          Get in touch
        </Button>
      </div>
    </section>
  );
}
