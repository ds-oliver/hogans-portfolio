export default function Work() {
  return (
    <section id="work" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-center text-3xl sm:text-4xl font-semibold text-ink mb-10">
          Work
        </h2>
        <div className="rounded-lg border border-surface-line bg-surface-raised p-8">
          <p className="text-xs uppercase tracking-wider text-layer-2 mb-2">
            Port of Portland
          </p>
          <h3 className="text-xl font-semibold text-ink mb-6">
            Bid tab analysis pipeline
          </h3>
          <div className="space-y-5 text-ink-muted leading-relaxed">
            <p>
              The Port had years of bid tab data and no way to use it. Historical
              pricing was fragmented across separate files with no way to compare
              line items across projects. There was no way to compare line items
              across projects or see how costs moved over time.
            </p>
            <p>
              The workbooks were built for bid openings, not for analysis. Bidder
              and pricing information was structured inconsistently from source to
              source, naming conventions were inconsistent, and the same pay item
              appeared under many different descriptions. Most of the work was
              reshaping and normalizing that into something a reporting layer could
              sit on.
            </p>
            <p>
              I built a layered pipeline in Databricks, raw through reporting, with
              a crosswalk in the middle that maps normalized descriptions to Port
              cost codes. The mappings live in reference files rather than in the
              code, so Port staff change how an item maps by editing a file, not by
              asking for a developer. Power BI reads the output on a schedule.
            </p>
            <p>
              It runs as one scheduled job in about five minutes and reports what
              it found each run, including anything that came through unmapped. The
              loader halts on a bad reference file edit rather than letting it
              through, so failures are visible instead of silent.
            </p>
            <p>
              Adding a new bid tab is now: drop the file in the source folder, run
              the job, check the report. On lookups, the Port&apos;s own estimate is
              over an hour saved per bid.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
