export default function Work() {
  return (
    <section id="work" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-center text-3xl sm:text-4xl font-semibold text-ink mb-10">
          Work
        </h2>
        <div className="rounded-lg border border-surface-line bg-surface-raised p-8">
          {/*
            TODO: Port of Portland bid tab pipeline. Blocked on Hogan for the
            engagement description (client, problem, what was built, outcome)
            and confirmation that nothing described touches non-public Port
            data. See docs/MARLEN_SITE_REBUILD.md section 9, items 2 and 3.
            Do not invent content here.
          */}
          <p className="text-xs uppercase tracking-wider text-ink-dim mb-4">
            Case study pending
          </p>
          <p className="text-ink-muted leading-relaxed">
            Details of a completed engagement will appear here once confirmed.
          </p>
        </div>
      </div>
    </section>
  );
}
