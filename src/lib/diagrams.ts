import fs from 'node:fs';
import path from 'node:path';

export type Practice =
  | 'solutions-architecture'
  | 'data-engineering'
  | 'process-automation'
  | 'analytics-engineering';

export type DiagramTheme = 'dark' | 'light' | 'deep' | 'split' | 'blueprint';

export interface Diagram {
  slug: string;
  title: string;
  caption: string;
  theme: DiagramTheme;
  practice: Practice;
  svg: string;
}

interface Meta {
  file: string;
  title: string;
  caption: string;
  theme: DiagramTheme;
  practice: Practice;
}

const DIR = path.join(process.cwd(), 'src/content/diagrams');

// Each SVG is inlined so the page's Sora applies (next/font registers it under
// a hashed family name that an <img> SVG can't see). Inlining means several
// SVGs share one DOM, so ids are prefixed per file to keep markers and
// patterns from resolving to another diagram's definitions.
function prepare(raw: string, prefix: string, label: string): string {
  return raw
    .replace(/<\?xml[^>]*>/g, '')
    .replace(/<metadata>[\s\S]*?<\/metadata>/g, '')
    .replace(/\sxmlns:c2pa="[^"]*"/g, '')
    .replace(/\sfont-family="[^"]*"/g, '')
    .replace(/\sid="([^"]+)"/g, ` id="${prefix}-$1"`)
    .replace(/url\(#([^)]+)\)/g, `url(#${prefix}-$1)`)
    .replace(/href="#([^"]+)"/g, `href="#${prefix}-$1"`)
    .replace(
      /<svg\b([^>]*?)\swidth="\d+"\sheight="\d+"/,
      `<svg$1 role="img" aria-label="${label.replace(/"/g, '&quot;')}"`,
    );
}

function slugOf(file: string): string {
  return file.replace(/\.svg$/, '');
}

export function getDiagrams(): Diagram[] {
  const meta: Meta[] = JSON.parse(fs.readFileSync(path.join(DIR, 'carousel.json'), 'utf8'));
  return meta.map((m) => {
    const slug = slugOf(m.file);
    const raw = fs.readFileSync(path.join(DIR, m.file), 'utf8');
    return {
      slug,
      title: m.title,
      caption: m.caption,
      theme: m.theme,
      practice: m.practice,
      svg: prepare(raw, slug, m.title),
    };
  });
}

export function getShapesLegend(): string {
  const raw = fs.readFileSync(path.join(DIR, 'shapes-legend.svg'), 'utf8');
  return prepare(raw, 'legend', 'Shape and line legend');
}
