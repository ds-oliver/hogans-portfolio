const services = [
  {
    title: "Pipeline builds",
    description:
      "Production data pipelines, ingestion through delivery, built to run unattended.",
  },
  {
    title: "Source-to-target mapping and data modeling",
    description:
      "Documented field-level lineage and dimensional models that survive handoff.",
  },
  {
    title: "Validation and reconciliation",
    description:
      "Row and value level checks that prove the target matches the source, not just that the job succeeded.",
  },
  {
    title: "Requirements translation",
    description:
      "Working directly with business owners to turn what they need into something an engineer can build against.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center text-3xl sm:text-4xl font-semibold text-ink mb-12">
          Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-lg border border-surface-line bg-surface-raised p-6"
            >
              <h3 className="text-lg font-semibold text-ink mb-2">
                {service.title}
              </h3>
              <p className="text-ink-muted leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
