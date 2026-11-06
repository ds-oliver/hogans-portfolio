import DiagramGallery from '@/components/ui/DiagramGallery';
import { getDiagrams, getShapesLegend } from '@/lib/diagrams';

export default function Architecture() {
  const diagrams = getDiagrams();
  const legend = getShapesLegend();

  return (
    <section id="architecture" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center text-3xl sm:text-4xl font-semibold text-ink mb-4">
          Architecture
        </h2>
        <p className="mx-auto max-w-2xl text-center text-ink-muted leading-relaxed mb-10">
          Patterns drawn from delivered work, with client details removed. Filter by
          practice area, or open any diagram full screen.
        </p>
        <DiagramGallery diagrams={diagrams} legend={legend} />
      </div>
    </section>
  );
}
