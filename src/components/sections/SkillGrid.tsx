"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

type Tier = "production" | "working";

interface CapabilityItem {
  label: string;
  tier: Tier;
}

interface CapabilityDomain {
  name: string;
  items: CapabilityItem[];
}

const capabilityDomains: CapabilityDomain[] = [
  {
    name: "Data platforms",
    items: [
      { label: "Oracle", tier: "production" },
      { label: "SQL Server", tier: "production" },
      { label: "Snowflake", tier: "working" },
      { label: "Postgres", tier: "working" },
    ],
  },
  {
    name: "Pipeline and orchestration",
    items: [
      { label: "Python", tier: "production" },
      { label: "SQL", tier: "production" },
      { label: "Airflow", tier: "working" },
      { label: "Incremental and full-load patterns", tier: "working" },
    ],
  },
  {
    name: "Modeling and mapping",
    items: [
      { label: "Dimensional modeling", tier: "production" },
      { label: "Source-to-target specs", tier: "production" },
      { label: "Slowly changing dimensions", tier: "production" },
    ],
  },
  {
    name: "Validation",
    items: [
      { label: "Reconciliation queries", tier: "production" },
      { label: "Row and aggregate checks", tier: "production" },
      { label: "Exception reporting", tier: "production" },
    ],
  },
];

function CapabilityPanel({ items }: { items: CapabilityItem[] }) {
  const production = items.filter((item) => item.tier === "production");
  const working = items.filter((item) => item.tier === "working");

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full rounded-lg border border-surface-line bg-surface-raised p-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <h4 className="text-xs uppercase tracking-wider text-ink-dim mb-3">
            Used in production
          </h4>
          <ul className="space-y-2">
            {production.map((item, index) => (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.06 }}
                className="flex items-center gap-2 text-ink"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-layer-2 flex-shrink-0" />
                {item.label}
              </motion.li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-wider text-ink-dim mb-3">
            Working knowledge
          </h4>
          <ul className="space-y-2">
            {working.length === 0 && (
              <li className="text-sm text-ink-dim">None in this domain.</li>
            )}
            {working.map((item, index) => (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.06 }}
                className="flex items-center gap-2 text-ink-muted"
              >
                <span className="h-1.5 w-1.5 rounded-full border border-layer-2 flex-shrink-0" />
                {item.label}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default function SkillGrid() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = capabilityDomains.length;

  const goPrev = () => setCurrentIndex((i) => (i === 0 ? total - 1 : i - 1));
  const goNext = () => setCurrentIndex((i) => (i === total - 1 ? 0 : i + 1));

  return (
    <section id="capabilities" className="py-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-ink mb-4">
            Capabilities
          </h2>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed text-ink-muted">
            Four domains, split between where the daily work happens and where the
            working knowledge stands ready for the next engagement.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 flex-wrap mb-8">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous domain"
            className="p-2 rounded-full border border-surface-line text-ink hover:bg-surface-raised transition-colors"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <span className="text-base font-semibold min-w-[220px] text-center text-ink">
            {capabilityDomains[currentIndex].name}
          </span>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next domain"
            className="p-2 rounded-full border border-surface-line text-ink hover:bg-surface-raised transition-colors"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>
        <div
          className="flex justify-center gap-2 mb-10"
          role="tablist"
          aria-label="Capability domains"
        >
          {capabilityDomains.map((domain, i) => (
            <button
              key={domain.name}
              type="button"
              role="tab"
              aria-selected={i === currentIndex}
              aria-label={`View ${domain.name}`}
              onClick={() => setCurrentIndex(i)}
              className="w-2.5 h-2.5 rounded-full bg-layer-2 transition-opacity"
              style={{ opacity: i === currentIndex ? 1 : 0.35 }}
            />
          ))}
        </div>

        <div className="overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
            >
              <CapabilityPanel items={capabilityDomains[currentIndex].items} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
