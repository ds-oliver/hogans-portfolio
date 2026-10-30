import { ArrowUpRightIcon } from '@heroicons/react/20/solid';
import { GitHubIcon } from '@/components/ui/SocialLinks';
import github from '@/data/github.json';

// Languages share the four-blue ramp, lightest first. No second hue.
const languageColors = [
  'bg-layer-2',
  'bg-layer-1',
  'bg-ink-muted',
  'bg-layer-1-stroke',
  'bg-ink-dim',
  'bg-surface-line',
];

const levelColors = [
  'bg-surface-line',
  'bg-layer-2/30',
  'bg-layer-2/55',
  'bg-layer-2',
  'bg-layer-1',
];

const DAY = 86_400_000;

const formatDate = (iso: string, opts: Intl.DateTimeFormatOptions) =>
  new Date(iso).toLocaleDateString('en-US', { timeZone: 'UTC', ...opts });

function languageColor(name: string) {
  const i = github.languages.findIndex((l) => l.name === name);
  return i === -1 ? 'bg-ink-dim' : languageColors[i];
}

function Calendar() {
  const start = new Date(`${github.calendarStart}T00:00:00Z`).getTime();
  const max = Math.max(1, ...github.weeks.flat());
  // The first week can start mid-week; pad it so rows line up by weekday.
  const lead = new Date(start).getUTCDay();
  const weeks = github.weeks.map((days, i) =>
    i === 0 ? [...Array(lead).fill(null), ...days] : days
  );

  const months = weeks.map((_, i) => {
    const weekStart = new Date(start + (i * 7 - lead) * DAY);
    const prev = new Date(weekStart.getTime() - 7 * DAY);
    return i > 0 && weekStart.getUTCMonth() !== prev.getUTCMonth()
      ? formatDate(weekStart.toISOString(), { month: 'short' })
      : '';
  });

  return (
    <div>
      <div
        className="mb-1.5 hidden sm:grid gap-[3px] text-[10px] text-ink-dim"
        style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` }}
        aria-hidden="true"
      >
        {months.map((m, i) => (
          <span key={i} className="whitespace-nowrap">
            {m}
          </span>
        ))}
      </div>
      <div
        // Phones get the last six months so the cells stay legible.
        className="grid grid-cols-[repeat(26,minmax(0,1fr))] gap-[3px] sm:grid-cols-[repeat(var(--weeks),minmax(0,1fr))]"
        style={{ '--weeks': weeks.length } as React.CSSProperties}
        role="img"
        aria-label={`${github.contributionsLastYear} contributions in the last year`}
      >
        {weeks.map((days, w) => (
          <div
            key={w}
            className={`grid-rows-7 gap-[3px] ${w < weeks.length - 26 ? 'hidden sm:grid' : 'grid'}`}
          >
            {days.map((count, d) => {
              if (count === null) return <span key={d} />;
              const date = new Date(start + (w * 7 + d - lead) * DAY).toISOString();
              // Square root so a light day still shows next to a heavy one.
              const level = count === 0 ? 0 : Math.ceil(Math.sqrt(count / max) * 4);
              return (
                <span
                  key={d}
                  title={`${count} ${count === 1 ? 'contribution' : 'contributions'} on ${formatDate(date, { month: 'short', day: 'numeric', year: 'numeric' })}`}
                  className={`aspect-square rounded-[2px] ${levelColors[level]}`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function Languages() {
  return (
    <div>
      <div className="flex h-2 gap-[3px] overflow-hidden rounded-full">
        {github.languages.map((l, i) => (
          <span
            key={l.name}
            className={languageColors[i]}
            style={{ width: `${l.share * 100}%`, minWidth: '3px' }}
          />
        ))}
      </div>
      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        {github.languages.map((l, i) => (
          <li key={l.name} className="flex items-center gap-2 text-ink-muted">
            <span className={`h-2 w-2 rounded-full ${languageColors[i]}`} aria-hidden="true" />
            <span className="text-ink">{l.name}</span>
            <span className="tabular-nums text-ink-dim">
              {l.share < 0.01 ? '<1' : Math.round(l.share * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RepoCard({ repo }: { repo: (typeof github.repos)[number] }) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-lg border border-surface-line bg-surface p-5 transition-colors hover:border-layer-2"
    >
      <div className="flex items-start justify-between gap-3">
        <h4 className="min-w-0 truncate font-mono text-sm text-ink" title={repo.name}>
          {repo.name}
        </h4>
        <ArrowUpRightIcon
          className="h-4 w-4 flex-shrink-0 text-ink-dim transition-colors group-hover:text-layer-2"
          aria-hidden="true"
        />
      </div>
      {repo.description && (
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">
          {repo.description}
        </p>
      )}
      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-4 text-xs text-ink-dim">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${languageColor(repo.language)}`} aria-hidden="true" />
            {repo.language}
          </span>
        )}
        <span className="tabular-nums">
          {repo.commits} {repo.commits === 1 ? 'commit' : 'commits'}
        </span>
        <span>{formatDate(repo.pushedAt, { month: 'short', year: 'numeric' })}</span>
        {repo.isFork && (
          <span className="rounded border border-surface-line px-1.5 py-px uppercase tracking-wider">
            Fork
          </span>
        )}
      </div>
    </a>
  );
}

export default function GitHub() {
  return (
    <section id="github" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center text-3xl sm:text-4xl font-semibold text-ink mb-4">
          Open source
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-center text-ink-muted">
          Public repositories on GitHub, with activity and languages pulled from
          the GitHub API.
        </p>

        <div className="rounded-lg border border-surface-line bg-surface-raised p-6 sm:p-8">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <a
              href={github.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3"
            >
              <GitHubIcon className="h-7 w-7 text-ink" />
              <span>
                <span className="block text-ink group-hover:text-layer-2 transition-colors">
                  {github.login}
                </span>
                <span className="block text-xs text-ink-dim">
                  {github.publicRepos} public repositories
                </span>
              </span>
            </a>
            <p className="text-sm text-ink-muted">
              <span className="font-semibold text-ink tabular-nums">
                {github.contributionsLastYear}
              </span>{' '}
              contributions in the last year
            </p>
          </div>

          <Calendar />

          <div className="mt-10">
            <p className="mb-4 text-xs uppercase tracking-wider text-layer-2">
              Languages, weighted by commits
            </p>
            <Languages />
          </div>

          <div className="mt-10">
            <p className="mb-4 text-xs uppercase tracking-wider text-layer-2">
              Pinned repositories
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {github.repos.map((repo) => (
                <RepoCard key={repo.name} repo={repo} />
              ))}
            </div>
          </div>

          <p className="mt-8 text-xs text-ink-dim">
            Pulled from the GitHub API on{' '}
            {formatDate(github.fetchedAt, {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              timeZone: 'America/Los_Angeles',
            })}
            .
          </p>
        </div>
      </div>
    </section>
  );
}
