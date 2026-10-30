// Builds the data behind the GitHub section. Shared by the build-time
// snapshot (scripts/sync-github.mjs) and the live endpoint
// (functions/api/github.ts), so both always produce the same shape.
// Uses only fetch, so it runs in Node and in Cloudflare Workers.

const LOGIN = 'ds-oliver';
const TOP_REPOS = 6;
const TOP_LANGUAGES = 5;

// Repo names to keep off the site, e.g. coursework.
const EXCLUDE = new Set(['data_mining_hw']);

// Styling and markup, left out so the language mix reflects code.
const MARKUP = new Set(['CSS', 'SCSS', 'HTML']);

async function gh(token, path, init = {}) {
  const res = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      accept: 'application/vnd.github+json',
      authorization: `Bearer ${token}`,
      'user-agent': 'marlensolutions-site',
      ...init.headers,
    },
  });
  if (!res.ok) throw new Error(`${path}: ${res.status} ${await res.text()}`);
  if (res.status === 202) throw new Error(`${path}: GitHub is still computing stats`);
  return res.status === 204 ? [] : res.json();
}

const query = `query($login: String!) {
  user(login: $login) {
    url
    pinnedItems(first: 6, types: REPOSITORY) {
      nodes { ... on Repository { name } }
    }
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount } }
      }
    }
    repositories(first: 100, ownerAffiliations: OWNER, privacy: PUBLIC) {
      totalCount
      nodes {
        name url description isFork pushedAt
        primaryLanguage { name }
        languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
          edges { size node { name } }
        }
      }
    }
  }
}`;

async function commitsBy(token, repo) {
  const contributors = await gh(token, `/repos/${LOGIN}/${repo}/contributors?per_page=100`);
  if (!Array.isArray(contributors)) return 0;
  return contributors.find((c) => c.login === LOGIN)?.contributions ?? 0;
}

export async function buildSnapshot(token) {
  const { data, errors } = await gh(token, '/graphql', {
    method: 'POST',
    body: JSON.stringify({ query, variables: { login: LOGIN } }),
  });
  if (errors) throw new Error(JSON.stringify(errors));
  const user = data.user;

  const repos = (
    await Promise.all(
      user.repositories.nodes
        .filter((r) => !EXCLUDE.has(r.name))
        .map(async (r) => ({ ...r, commits: await commitsBy(token, r.name) }))
    )
  ).filter((r) => r.commits > 0);

  // Cards follow the pins on the GitHub profile, in pin order, topped up
  // with the most-contributed repos if fewer than TOP_REPOS are pinned.
  const pinned = user.pinnedItems.nodes.map((n) => n.name);
  const pinRank = (r) => (pinned.includes(r.name) ? pinned.indexOf(r.name) : Infinity);

  // Each repo's language mix, weighted by how many of its commits are mine,
  // so a fork's upstream code does not count as my own output.
  const weights = new Map();
  for (const r of repos) {
    const edges = r.languages.edges.filter((e) => !MARKUP.has(e.node.name));
    const total = edges.reduce((sum, e) => sum + e.size, 0);
    for (const e of edges) {
      const w = (e.size / total) * r.commits;
      weights.set(e.node.name, (weights.get(e.node.name) ?? 0) + w);
    }
  }
  const weightTotal = [...weights.values()].reduce((a, b) => a + b, 0);
  const ranked = [...weights.entries()].sort((a, b) => b[1] - a[1]);
  const languages = ranked.slice(0, TOP_LANGUAGES).map(([name, w]) => ({
    name,
    share: w / weightTotal,
  }));
  const rest = ranked.slice(TOP_LANGUAGES).reduce((sum, [, w]) => sum + w, 0);
  if (rest > 0) languages.push({ name: 'Other', share: rest / weightTotal });

  const calendar = user.contributionsCollection.contributionCalendar;

  return {
    login: LOGIN,
    profileUrl: user.url,
    fetchedAt: new Date().toISOString(),
    contributionsLastYear: calendar.totalContributions,
    publicRepos: user.repositories.totalCount,
    calendarStart: calendar.weeks[0].contributionDays[0].date,
    weeks: calendar.weeks.map((w) => w.contributionDays.map((d) => d.contributionCount)),
    languages,
    repos: repos
      .sort(
        (a, b) =>
          pinRank(a) - pinRank(b) ||
          b.commits - a.commits ||
          b.pushedAt.localeCompare(a.pushedAt)
      )
      .slice(0, TOP_REPOS)
      .map((r) => ({
        name: r.name,
        url: r.url,
        description: r.description,
        language: r.primaryLanguage?.name ?? null,
        isFork: r.isFork,
        commits: r.commits,
        pushedAt: r.pushedAt,
      })),
  };
}
