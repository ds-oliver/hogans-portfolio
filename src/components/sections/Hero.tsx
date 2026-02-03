"use client";

import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className="py-32 text-center px-8">
      <h1 className="font-poppins text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl" style={{ lineHeight: '1.2', overflow: 'visible' }}>
        Hi, I&apos;m{' '}
        <span 
          className={`text-gradient-fuschia-watermelon ${styles.name}`}
          style={{ color: 'var(--accent-gold)' }}
        >
        </span>
      </h1>

      <p className="mt-8 mx-auto max-w-xl text-lg text-saffron-800 text-left">
        I&apos;m a data engineer who builds pipelines, warehouses, and data products that teams can rely on.
        Off the clock I build backend tools and APIs—automation, services, and side-projects that scratch
        the software-engineering itch and keep the craft sharp.
      </p>
    </section>
  );
} 