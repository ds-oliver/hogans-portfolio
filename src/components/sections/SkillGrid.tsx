"use client";

import { useState, type KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Tier = "production" | "working";

interface CapabilityItem {
  label: string;
  tier: Tier;
}

interface CapabilityDomain {
  name: string;
  items: CapabilityItem[];
  note?: string;
}

const capabilityDomains: CapabilityDomain[] = [
  {
    name: "Platforms",
    items: [
      { label: "Databricks", tier: "production" },
      { label: "SQL Server and T-SQL (SSMS)", tier: "production" },
      { label: "Oracle", tier: "production" },
      { label: "Power BI", tier: "production" },
      { label: "Synapse", tier: "working" },
      { label: "Snowflake", tier: "working" },
      { label: "Postgres", tier: "working" },
    ],
  },
  {
    name: "Pipeline and orchestration",
    items: [
      { label: "Python", tier: "production" },
      { label: "SQL", tier: "production" },
      { label: "Boomi", tier: "working" },
      { label: "Azure DevOps", tier: "working" },
      { label: "Airflow", tier: "working" },
      { label: "Incremental and full-load patterns", tier: "working" },
    ],
  },
  {
    name: "Formats and mapping",
    items: [
      { label: "X12 EDI 834", tier: "production" },
      { label: "X12 EDI 820", tier: "production" },
      { label: "Fixed-length flat files", tier: "production" },
      { label: "Proprietary flat-file formats", tier: "production" },
      { label: "Field-level source-to-target mapping", tier: "production" },
      { label: "Data contracts", tier: "production" },
      { label: "Dimensional modeling", tier: "production" },
      { label: "Slowly changing dimensions", tier: "production" },
    ],
    note: "Mapping approach adapts per format rather than applying one template. Contracts cover types, transformations, null handling, and business rules, written to test as pass or fail against real data rather than left as prose.",
  },
  {
    name: "Validation",
    items: [
      { label: "Reconciliation queries", tier: "production" },
      { label: "Row and aggregate checks", tier: "production" },
      { label: "Exception reporting", tier: "production" },
    ],
    note: "Validation SQL ships with the spec. Requirements get reconciled against existing documentation and the data itself before going to subject matter experts, so SME time confirms or corrects inference rather than starting discovery from scratch. Disagreements get settled by pulling the records in dispute.",
  },
];

type Filter = "all" | Tier;

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "production", label: "Production" },
  { value: "working", label: "Working knowledge" },
];

function Chip({ item }: { item: CapabilityItem }) {
  const isProduction = item.tier === "production";
  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.2 }}
      whileHover={{ y: -2 }}
      title={isProduction ? "Used in production" : "Working knowledge"}
      className={
        isProduction
          ? "flex items-center gap-2 rounded-md border border-layer-2/50 bg-layer-3/30 px-3 py-1.5 text-sm text-ink transition-colors hover:border-layer-1 hover:bg-layer-3/60"
          : "flex items-center gap-2 rounded-md border border-dashed border-steel-line bg-deep/40 px-3 py-1.5 text-sm text-ink-muted transition-colors hover:border-layer-2 hover:text-ink"
      }
    >
      <span
        aria-hidden="true"
        className={
          isProduction
            ? "h-1.5 w-1.5 shrink-0 bg-layer-2"
            : "h-1.5 w-1.5 shrink-0 border border-layer-2"
        }
      />
      {item.label}
    </motion.li>
  );
}

export default function SkillGrid() {
  const [index, setIndex] = useState(0);
  const [filter, setFilter] = useState<Filter>("all");
  const total = capabilityDomains.length;
  const domain = capabilityDomains[index];
  const visible = domain.items.filter(
    (item) => filter === "all" || item.tier === filter,
  );

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? (index + 1) % total
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? (index - 1 + total) % total
          : null;
    if (next === null) return;
    e.preventDefault();
    setIndex(next);
    document.getElementById(`stack-tab-${next}`)?.focus();
  };

  return (
    <section
      id="stack"
      className="py-24 px-6 bg-deep/80 border-y border-steel-line"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-ink mb-4">
            Technology Stack
          </h2>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed text-ink-muted">
            Production use means I have built and supported it on a real system.
            Working knowledge means I have built with it and would scope accordingly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
          <div
            role="tablist"
            aria-label="Technology domains"
            aria-orientation="vertical"
            className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-1 md:pb-0"
          >
            {capabilityDomains.map((d, i) => {
              const active = i === index;
              return (
                <button
                  key={d.name}
                  id={`stack-tab-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls="stack-panel"
                  tabIndex={active ? 0 : -1}
                  onClick={() => setIndex(i)}
                  onKeyDown={onTabKey}
                  className={`relative shrink-0 rounded-md border px-4 py-3 text-left transition-colors ${
                    active
                      ? "border-layer-2/60 text-ink"
                      : "border-steel-line bg-steel/60 text-ink-muted hover:border-layer-2/50 hover:text-ink"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="stack-active"
                      className="absolute inset-0 rounded-md bg-layer-3/40"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                  <span className="relative flex items-center justify-between gap-4">
                    <span className="font-semibold whitespace-nowrap md:whitespace-normal">
                      {d.name}
                    </span>
                    <span className="text-xs text-ink-dim">{d.items.length}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div
            id="stack-panel"
            role="tabpanel"
            aria-labelledby={`stack-tab-${index}`}
            className="rounded-lg border border-steel-line bg-steel p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <h3 className="text-lg font-semibold text-ink">{domain.name}</h3>
              <div
                role="group"
                aria-label="Filter by experience level"
                className="inline-flex rounded-md border border-steel-line bg-deep/60 p-0.5"
              >
                {filters.map((f) => (
                  <button
                    key={f.value}
                    type="button"
                    aria-pressed={filter === f.value}
                    onClick={() => setFilter(f.value)}
                    className={`rounded px-3 py-1 text-xs transition-colors ${
                      filter === f.value
                        ? "bg-layer-3 text-ink"
                        : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <ul className="flex flex-wrap gap-2 min-h-[3rem]">
              <AnimatePresence mode="popLayout" initial={false}>
                {visible.map((item) => (
                  <Chip key={`${domain.name}-${item.label}`} item={item} />
                ))}
              </AnimatePresence>
            </ul>
            {visible.length === 0 && (
              <p className="text-sm text-ink-dim">None in this domain.</p>
            )}

            <div className="mt-5 flex gap-5 text-xs text-ink-dim">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-layer-2" /> Used in production
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 border border-layer-2" /> Working knowledge
              </span>
            </div>

            {domain.note && (
              <p className="mt-6 pt-6 border-t border-steel-line text-ink-muted leading-relaxed">
                {domain.note}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
