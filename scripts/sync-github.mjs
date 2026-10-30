// Snapshots public GitHub activity for the GitHub section into
// src/data/github.json. The page renders this snapshot first and on any
// failure of the live endpoint, functions/api/github.ts.
//
//   GITHUB_TOKEN=$(gh auth token) npm run sync:github
//
// Without a token, or if GitHub is unreachable, the committed snapshot is
// left as it is and the build carries on.

import { readFile, writeFile } from 'node:fs/promises';
import { buildSnapshot } from '../src/lib/github-snapshot.mjs';

const OUT = new URL('../src/data/github.json', import.meta.url);
const token = process.env.GITHUB_TOKEN;

async function main() {
  const snapshot = await buildSnapshot(token);
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
