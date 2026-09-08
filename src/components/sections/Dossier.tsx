"use client";

import { motion } from "framer-motion";

const fields: { label: string; value: string }[] = [
  { label: "SUBJECT", value: "Hogan Marhoefer" },
  { label: "DESIGNATION", value: "Principal, Marlen Solutions LLC" },
  { label: "BASE OF OPS", value: "Portland, Oregon" },
  { label: "REGISTRY", value: "Oregon No. 258911594" },
  {
    label: "DOMAINS",
    value: "Utilities and energy, public sector, insurance and payroll systems",
  },
  { label: "CORE STACK", value: "SQL, Python, dimensional modeling" },
  { label: "METHOD", value: "Requirements to mapping to validation" },
  { label: "CREDENTIALS", value: "M.S. Applied Data Science for Business" },
  { label: "COVERAGE", value: "GL $1M/$2M, E&O $1M, occurrence form" },
  { label: "STATUS", value: "Accepting engagements" },
];

function CornerBracket({ className }: { className: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden="true"
    >
      <path d="M1 11V1H11" stroke="var(--color-layer-2)" strokeWidth="2" />
    </svg>
  );
}

export default function Dossier() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-5xl mx-auto rounded-lg bg-tile p-8 sm:p-10">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,240px)_1fr] gap-10">
          <div className="relative mx-auto w-full max-w-[240px]">
            <div
              className="relative border border-layer-2"
              style={{ aspectRatio: "4 / 5", overflow: "hidden" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hogan.jpg"
                alt="Hogan Marhoefer"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "62% 22%",
                  display: "block",
                  filter: "grayscale(30%)",
                }}
              />
            </div>
            <CornerBracket className="absolute -top-1 -left-1" />
            <CornerBracket className="absolute -top-1 -right-1 rotate-90" />
            <CornerBracket className="absolute -bottom-1 -right-1 rotate-180" />
            <CornerBracket className="absolute -bottom-1 -left-1 -rotate-90" />
          </div>

          <div>
            <dl>
              {fields.map((field, index) => (
                <motion.div
                  key={field.label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.06 }}
                  className="grid grid-cols-[120px_1fr] sm:grid-cols-[160px_1fr] gap-4 py-1.5 font-mono"
                >
                  <dt
                    className="text-layer-2 uppercase"
                    style={{ fontSize: "11px", letterSpacing: "0.08em" }}
                  >
                    {field.label}
                  </dt>
                  <dd className="text-ink" style={{ fontSize: "14px" }}>
                    {field.value}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
