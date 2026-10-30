// Snapshots public GitHub activity for the GitHub section into
// src/data/github.json. The site is a static export, so the data is fetched
// here at build time rather than in the browser.
//
// Needs a token for the GraphQL contribution calendar:
//   GITHUB_TOKEN=$(gh auth token) npm run sync:github
//
// Without a token, or if GitHub is unreachable, the committed snapshot is
// left as it is and the build carries on.

import { readFile, writeFile } from 'node:fs/promises';

const LOGIN = 'ds-oliver';
const OUT = new URL('../src/data/github.json', import.meta.url);
const TOP_REPOS = 6;
const TOP_LANGUAGES = 5;

// Repo names to keep off the site, e.g. coursework.
const EXCLUDE = new Set([]);

// Styling and markup, left out so the language mix reflects code.
const MARKUP = new Set(['CSS', 'SCSS', 'HTML']);

const token = process.env.GITHUB_TOKEN;

async function gh(path, init = {}) {
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
  return res.status === 204 ? [] : res.json();
}

const query = `query($login: String!) {
  user(login: $login) {
    url
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

async function commitsBy(repo) {
  // GitHub returns 202 while it computes stats for a cold repo; treat as 0.
  const contributors = await gh(`/repos/${LOGIN}/${repo}/contributors?per_page=100`);
  if (!Array.isArray(contributors)) return 0;
  return contributors.find((c) => c.login === LOGIN)?.contributions ?? 0;
}

async function main() {
  const { data, errors } = await gh('/graphql', {
    method: 'POST',
    body: JSON.stringify({ query, variables: { login: LOGIN } }),
  });
  if (errors) throw new Error(JSON.stringify(errors));
  const user = data.user;

  const repos = (
    await Promise.all(
      user.repositories.nodes
        .filter((r) => !EXCLUDE.has(r.name))
        .map(async (r) => ({ ...r, commits: await commitsBy(r.name) }))
    )
  ).filter((r) => r.commits > 0);

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

  const snapshot = {
    login: LOGIN,
    profileUrl: user.url,
    fetchedAt: new Date().toISOString(),
    contributionsLastYear: calendar.totalContributions,
    publicRepos: user.repositories.totalCount,
    calendarStart: calendar.weeks[0].contributionDays[0].date,
    weeks: calendar.weeks.map((w) => w.contributionDays.map((d) => d.contributionCount)),
    languages,
    repos: repos
      .sort((a, b) => b.commits - a.commits || b.pushedAt.localeCompare(a.pushedAt))
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

  await writeFile(OUT, JSON.stringify(snapshot, null, 2) + '\n');
  console.log(`github: wrote snapshot, ${snapshot.repos.length} repos`);
}

if (!token) {
  console.log('github: no GITHUB_TOKEN, keeping committed snapshot');
} else {
  main().catch(async (err) => {
    await readFile(OUT).catch(() => {
      throw new Error('github: fetch failed and no snapshot exists', { cause: err });
    });
    console.warn(`github: fetch failed, keeping committed snapshot. ${err.message}`);
  });
}
