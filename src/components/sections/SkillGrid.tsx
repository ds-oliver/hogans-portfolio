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
    name: "Requirements and delivery",
    items: [
      { label: "Requirements to sign-off", tier: "production" },
      { label: "Requirements traceability", tier: "production" },
      { label: "Gap and open-items triage", tier: "production" },
      { label: "Technical runbook authorship", tier: "production" },
      { label: "Structured meeting minutes", tier: "production" },
      { label: "Backlog decomposition", tier: "production" },
      { label: "Effort estimation", tier: "production" },
      { label: "Vendor scope negotiation", tier: "production" },
      { label: "Change-advisory packages", tier: "production" },
      { label: "Security review coordination", tier: "production" },
      { label: "Release test cycle ownership", tier: "production" },
      { label: "Requirements tooling", tier: "working" },
      { label: "Agile delivery practice", tier: "working" },
    ],
  },
  {
    name: "Validation and reconciliation",
    items: [
      { label: "Production validation SQL", tier: "production" },
      { label: "Manual checks as pass/fail", tier: "production" },
      { label: "Cross-system reconciliation", tier: "production" },
      { label: "Incident root-cause tracing", tier: "production" },
      { label: "Environment drift detection", tier: "production" },
      { label: "File comparison gates", tier: "production" },
      { label: "Assumptions tested in data", tier: "production" },
      { label: "Layered network diagnostics", tier: "working" },
    ],
  },
  {
    name: "Data formats and modeling",
    items: [
      { label: "Source-to-target mapping", tier: "production" },
      { label: "Fixed-width flat-file analysis", tier: "production" },
      { label: "CSV as exchange contract", tier: "production" },
      { label: "Spreadsheet data contracts", tier: "production" },
      { label: "Data lineage documentation", tier: "production" },
      { label: "Testable business rules", tier: "production" },
      { label: "X12 EDI 834", tier: "production" },
      { label: "X12 EDI 820", tier: "production" },
      { label: "Vendor segment layouts", tier: "working" },
      { label: "Batch state modeling", tier: "working" },
    ],
  },
  {
    name: "Platforms and languages",
    items: [
      { label: "SQL Server and T-SQL", tier: "production" },
      { label: "Python for reconciliation", tier: "production" },
      { label: "Legacy reverse-engineering", tier: "production" },
      { label: "Enterprise ERP releases", tier: "production" },
      { label: "Databricks", tier: "production" },
      { label: "Power BI", tier: "working" },
      { label: "Serverless cloud compute", tier: "working" },
      { label: "Infrastructure as code", tier: "working" },
      { label: "Managed identity and secrets", tier: "working" },
      { label: "TypeScript and Node", tier: "working" },
      { label: "SSIS", tier: "working" },
      { label: "VBA", tier: "working" },
      { label: "Managed file transfer", tier: "working" },
      { label: "CRM as upstream source", tier: "working" },
    ],
  },
];

function CapabilityPanel({ domain }: { domain: CapabilityDomain }) {
  const production = domain.items.filter((item) => item.tier === "production");
  const working = domain.items.filter((item) => item.tier === "working");

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
                className="relative pl-5 text-ink"
              >
                <span className="absolute left-0 top-[0.45em] h-2 w-2 bg-layer-2" />
                {item.label}
              </motion.li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-wider text-ink-dim mb-3">
            Working knowledge
          </h4>
          {working.length === 0 ? (
            <p className="text-sm text-ink-dim">None in this domain.</p>
          ) : (
            <ul className="space-y-2">
              {working.map((item, index) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.06 }}
                  className="relative pl-5 text-ink-muted"
                >
                  <span className="absolute left-0 top-[0.45em] h-2 w-2 border border-layer-2" />
                  {item.label}
                </motion.li>
              ))}
            </ul>
          )}
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
            Production use means I have built, shipped, or operated it on a real
            system. Working knowledge means I have used, configured, read, or
            debugged it.
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
              <CapabilityPanel domain={capabilityDomains[currentIndex]} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
