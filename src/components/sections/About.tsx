"use client";

import { motion } from 'framer-motion';
import { ArrowDownTrayIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import Button from '../ui/Button';

export default function About() {
  return (
    <section id="about" className="py-20 bg-charcoal-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-f1 tracking-tight sm:text-4xl text-saffron-900">
            About Me
          </h2>
          <p className="mt-4 text-lg text-saffron-800">
            Data engineering first; backend and side-projects on the side
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-lg text-saffron-800">
              I&apos;m a Data Engineer with a strong background in the modern data stack: pipelines,
              warehouses, ETL/ELT, and data quality. I design and build systems that make data reliable,
              discoverable, and actionable for the teams that depend on it.
            </p>
            <p className="text-lg text-saffron-800">
              My day-to-day centers on Snowflake, Databricks, dbt, Airflow, and SQL—building and
              maintaining robust data pipelines and helping organizations level up their DataOps and
              reporting.
            </p>
            <p className="text-lg text-saffron-800">
              Outside of data engineering I stay sharp with backend software engineering: APIs, services,
              and automation. Many of my side-projects are Python-based tools and libraries that solve
              real problems and keep me close to the code.
            </p>
            <div className="pt-6 flex flex-col sm:flex-row gap-4">
              <Button
                href="https://www.linkedin.com/in/your-profile"
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                size="lg"
                icon={<ArrowTopRightOnSquareIcon className="h-5 w-5" />}
                className="rounded-full"
              >
                View on LinkedIn
              </Button>
              <Button
                href="/resume.pdf"
                variant="ghost"
                size="lg"
                icon={<ArrowDownTrayIcon className="h-5 w-5" />}
                className="rounded-full"
              >
                Download PDF
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            <motion.div 
              className="rounded-lg border-2 border-gray-600 bg-charcoal-300 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group gradient-border-hover"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="p-6 rounded-md transition-all duration-300">
                <h3 className="text-lg font-semibold mb-2 text-charcoal-800 transition-all duration-300">Data Engineering</h3>
                <ul className="space-y-2 text-charcoal-900">
                  <li>• ETL Pipeline Development</li>
                  <li>• Data Warehouse Design</li>
                  <li>• Data Quality & Testing</li>
                  <li>• Performance Optimization</li>
                </ul>
              </div>
            </motion.div>
            <motion.div 
              className="rounded-lg border-2 border-gray-600 bg-charcoal-300 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group gradient-border-hover"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="p-6 rounded-md transition-all duration-300">
                <h3 className="text-lg font-semibold mb-2 text-charcoal-800 transition-all duration-300">Backend & Side Projects</h3>
                <ul className="space-y-2 text-charcoal-900">
                  <li>• APIs & Services</li>
                  <li>• Python Libraries & Tools</li>
                  <li>• Automation & Scripting</li>
                  <li>• Clean, Maintainable Code</li>
                </ul>
              </div>
            </motion.div>
            <motion.div 
              className="rounded-lg border-2 border-gray-600 bg-charcoal-300 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group gradient-border-hover"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="p-6 rounded-md transition-all duration-300">
                <h3 className="text-lg font-semibold mb-2 text-charcoal-800 transition-all duration-300">Cloud & DevOps</h3>
                <ul className="space-y-2 text-charcoal-900">
                  <li>• AWS & GCP</li>
                  <li>• Docker & Kubernetes</li>
                  <li>• CI/CD Pipelines</li>
                  <li>• Infrastructure as Code</li>
                </ul>
              </div>
            </motion.div>
            <motion.div 
              className="rounded-lg border-2 border-gray-600 bg-charcoal-300 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group gradient-border-hover"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="p-6 rounded-md transition-all duration-300">
                <h3 className="text-lg font-semibold mb-2 text-charcoal-800 transition-all duration-300">Tools & Languages</h3>
                <ul className="space-y-2 text-charcoal-900">
                  <li>• Python & SQL</li>
                  <li>• Snowflake & Databricks</li>
                  <li>• Apache Spark</li>
                  <li>• Git & GitHub</li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 