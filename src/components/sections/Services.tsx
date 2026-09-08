const services = [
  {
    title: "Pipeline builds",
    description:
      "Ingestion through delivery, built to run unattended. Scheduled, monitored, and documented well enough that someone else can maintain it.",
  },
  {
    title: "Source-to-target mapping and data modeling",
    description:
      "Field-level mapping documents and dimensional models. The spec is a deliverable, not a byproduct of the build.",
  },
  {
    title: "Validation and reconciliation",
    description:
      "Row counts, value-level comparisons, exception reporting. A job that finishes is not the same as a job that loaded the right data.",
  },
  {
    title: "Requirements translation",
    description:
      "Sitting with the people who own the process, then writing something an engineer can build from. Most of what goes wrong on a data project goes wrong here, not in the code.",
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
