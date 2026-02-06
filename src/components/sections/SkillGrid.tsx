"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import SkillBar from "../ui/SkillBar";
import SkillRadarChart, { SkillData } from "../ui/SkillRadarChart";

type SkillSet = Record<string, number>;

/** Level 1-10: >= 6 = green (Production Ready), <= 5 = orange (Actively Learning) */
const PROFICIENCY_THRESHOLD = 6;

const TOP_PROFICIENCIES_COUNT = 6;

/** Merge all skills across domains, take max level per skill name, return top N by level. */
function getTopProficiencies(domains: SkillDomain[], n: number): [string, number][] {
  const merged: Record<string, number> = {};
  for (const d of domains) {
    for (const [name, level] of Object.entries(d.technologies)) {
      merged[name] = Math.max(merged[name] ?? 0, level);
    }
  }
  return Object.entries(merged)
    .sort(([, a], [, b]) => b - a)
    .slice(0, n);
}

function getDomainRadarData(domains: SkillDomain[]): SkillData[] {
  return domains.map((domain) => {
    const levels = Object.values(domain.technologies);
    const productionLevels = levels.filter((level) => level >= PROFICIENCY_THRESHOLD);
    const baseLevels = productionLevels.length > 0 ? productionLevels : levels;
    const average = baseLevels.reduce((sum, level) => sum + level, 0) / baseLevels.length;
    return {
      skill: domain.name,
      level: Math.round(average * 10),
      fullMark: 100,
    };
  });
}

interface SkillDomain {
  name: string;
  technologies: SkillSet;
}

const skillDomains: SkillDomain[] = [
  {
    name: "Data Science",
    technologies: {
      "NUMPY & PANDAS": 10,
      "DATA CLEANING & NORMALIZATION": 10,
      "OPERATIONS RESEARCH": 9,
      "FEATURE ENGINEERING": 9,
      "SCIKIT-LEARN": 8,
      TENSORFLOW: 5,
      MLFLOW: 4,
      PYTORCH: 4,
      XGBOOST: 3,
      OPTUNA: 3,
    },
  },
  {
    name: "Analytics",
    technologies: {
      "DATA MODELING": 8,
      "REPORTING & DASHBOARDS": 8,
      TABLEAU: 8,
      EXCEL: 7,
      "ORACLE ANALYTICS CLOUD": 7,
      "POWER BI": 7,
      LOOKER: 5,
      "AWS QUICKSIGHT": 5,
      METABASE: 4,
      MODE: 4,
      SUPERSET: 3,
      DOMO: 3,
    },
  },
  {
    name: "Data Engineering",
    technologies: {
      "SQL (ORACLE/MYSQL)": 9,
      PYTHON: 9,
      "ORACLE ADW": 7,
      SNOWFLAKE: 7,
      AIRFLOW: 7,
      SPARK: 5,
      DBT: 5,
      TERRAFORM: 5,
      KAFKA: 4,
      GRAFANA: 4,
    },
  },
  {
    name: "Application Development (Backend)",
    technologies: {
      POSTGRES: 8,
      GIT: 6,
      "REST APIs": 6,
      DOCKER: 4,
      FASTAPI: 5,
      KUBERNETES: 5,
    },
  },
];

const cardStyle = {
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "flex-start",
  fontFamily: "Poppins, sans-serif",
  fontWeight: 600,
  letterSpacing: "0.6px",
  width: "100%",
  maxWidth: "100%",
  margin: "0 auto" as const,
  backgroundColor: "var(--background-secondary)",
  borderRadius: "12px",
  padding: "14px 16px",
  border: "2px solid var(--foreground-secondary)",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
};

function SkillGridPanel({ technologies }: { technologies: SkillSet }) {
  const entries = Object.entries(technologies);
  const productionReady = entries
    .filter(([, level]) => level >= PROFICIENCY_THRESHOLD)
    .sort(([, a], [, b]) => b - a);
  const activelyLearning = entries
    .filter(([, level]) => level < PROFICIENCY_THRESHOLD)
    .sort(([, a], [, b]) => b - a);
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="skill-bars-container gradient-border-hover w-full"
      style={cardStyle}
    >
      <div className="flex justify-center w-full mb-4">
        <span
          className="text-sm bg-black bg-opacity-20 px-3 py-1 rounded-full"
          style={{ color: "var(--foreground-secondary)" }}
        >
          {entries.length} Technologies
        </span>
      </div>
      <div
        className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4"
        style={{ maxWidth: "700px", margin: "0 auto" }}
      >
        <div className="flex flex-col gap-4">
          {productionReady.map(([label, lvl], index) => (
            <motion.div
              key={label}
              className="skill-bar"
              style={{ display: "flex", flexDirection: "column" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
            >
              <div className="flex justify-center sm:justify-start">
                <div style={{ width: "300px" }}>
                  <div
                    className="skill-bar-title text-sm font-medium uppercase tracking-wider mb-2"
                    style={{ color: "var(--skill-text)" }}
                  >
                    {label}
                  </div>
                  <SkillBar level={lvl} filledColor="work" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {activelyLearning.map(([label, lvl], index) => (
            <motion.div
              key={label}
              className="skill-bar"
              style={{ display: "flex", flexDirection: "column" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
            >
              <div className="flex justify-center sm:justify-start">
                <div style={{ width: "300px" }}>
                  <div
                    className="skill-bar-title text-sm font-medium uppercase tracking-wider mb-2"
                    style={{ color: "var(--skill-text)" }}
                  >
                    {label}
                  </div>
                  <SkillBar level={lvl} filledColor="learning" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function SkillGrid() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = skillDomains.length;
  const radarData = getDomainRadarData(skillDomains);

  const goPrev = () => setCurrentIndex((i) => (i === 0 ? total - 1 : i - 1));
  const goNext = () => setCurrentIndex((i) => (i === total - 1 ? 0 : i + 1));

  return (
    <section className="py-20 bg-charcoal-100">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: "var(--foreground)" }}
          >
            Technical Skills
          </h2>
          <p
            className="text-lg max-w-3xl mx-auto leading-relaxed mb-6"
            style={{ color: "var(--foreground-muted)" }}
          >
            Core data-engineering stack I use daily, plus backend and infra tools I&apos;m building
            with in side-projects and ongoing learning.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-2 mb-8"
            style={{ color: "var(--foreground-muted)" }}
          >
            <span className="text-xs uppercase tracking-wider mr-1">Strongest areas</span>
            {getTopProficiencies(skillDomains, TOP_PROFICIENCIES_COUNT).map(([label, lvl]) => {
              const isProduction = lvl >= PROFICIENCY_THRESHOLD;
              return (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm font-medium border-l-2"
                  style={{
                    color: "var(--foreground)",
                    borderColor: "transparent",
                    borderLeft: `2px solid ${
                      isProduction ? "var(--accent-green)" : "var(--accent-gold)"
                    }`,
                    backgroundImage:
                      "linear-gradient(135deg, rgba(44, 177, 188, 0.15), rgba(124, 131, 255, 0.15))",
                  }}
                >
                  {label}
                </span>
              );
            })}
          </motion.div>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous domain"
              className="p-2 rounded-full border-2 transition-colors hover:bg-charcoal-300"
              style={{
                borderColor: "var(--foreground-secondary)",
                color: "var(--foreground)",
              }}
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <span
              className="text-base font-semibold min-w-[140px]"
              style={{ color: "var(--foreground)" }}
            >
              {skillDomains[currentIndex].name}
            </span>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next domain"
              className="p-2 rounded-full border-2 transition-colors hover:bg-charcoal-300"
              style={{
                borderColor: "var(--foreground-secondary)",
                color: "var(--foreground)",
              }}
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="flex justify-center gap-2 mt-4" role="tablist" aria-label="Skill domains">
            {skillDomains.map((domain, i) => (
              <button
                key={domain.name}
                type="button"
                role="tab"
                aria-selected={i === currentIndex}
                aria-label={`View ${domain.name}`}
                onClick={() => setCurrentIndex(i)}
                className="w-2.5 h-2.5 rounded-full transition-all"
                style={{
                  backgroundColor:
                    i === currentIndex ? "var(--accent-gold)" : "var(--foreground-muted)",
                  opacity: i === currentIndex ? 1 : 0.5,
                }}
              />
            ))}
          </div>
        </motion.div>

        <div className="overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
            >
              <SkillGridPanel technologies={skillDomains[currentIndex].technologies} />
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="max-w-2xl mx-auto">
            <p
              className="text-sm leading-relaxed mb-4"
              style={{ color: "var(--foreground-muted)" }}
            >
              These skills represent my journey as a developer, combining proven expertise with
              continuous learning. I believe in staying current with emerging technologies while
              maintaining mastery of core fundamentals.
            </p>
            <div
              className="flex justify-center items-center space-x-6 text-xs flex-wrap gap-y-2"
              style={{ color: "var(--foreground-secondary)" }}
            >
              <span className="flex items-center">
                <div
                  className="w-2 h-2 rounded-full mr-2"
                  style={{ backgroundColor: "var(--accent-green)" }}
                />
                Production Ready
              </span>
              <span className="flex items-center">
                <div
                  className="w-2 h-2 rounded-full mr-2"
                  style={{ backgroundColor: "var(--accent-gold)" }}
                />
                Actively Learning
              </span>
            </div>
          </div>
        </motion.div>

        <div className="mt-12">
          <SkillRadarChart data={radarData} />
        </div>
      </div>
    </section>
  );
}
