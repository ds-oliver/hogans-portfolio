import { buildSnapshot } from '../../src/lib/github-snapshot.mjs';

interface Env {
  GITHUB_TOKEN: string;
}

interface EventContext {
  request: Request;
  env: Env;
  waitUntil: (promise: Promise<unknown>) => void;
}

// Cloudflare's edge cache. Not in the DOM lib types.
const edgeCache = (caches as unknown as { default: Cache }).default;

// GitHub is called at most once an hour per edge location, however much
// traffic the page gets.
const EDGE_TTL = 3600;

export async function onRequestGet(context: EventContext): Promise<Response> {
  const { request, env } = context;
  const key = new Request(new URL('/api/github', request.url).toString());

  const cached = await edgeCache.match(key);
  if (cached) return cached;

  if (!env.GITHUB_TOKEN) {
    console.error('github: missing GITHUB_TOKEN');
    return new Response(null, { status: 503 });
  }

  try {
    const snapshot = await buildSnapshot(env.GITHUB_TOKEN);
    const response = new Response(JSON.stringify(snapshot), {
      headers: {
        'content-type': 'application/json',
        'cache-control': `public, max-age=300, s-maxage=${EDGE_TTL}`,
      },
    });
    context.waitUntil(edgeCache.put(key, response.clone()));
    return response;
  } catch (err) {
    // The page keeps its build-time snapshot when this fails.
    console.error('github: fetch failed', err);
    return new Response(null, { status: 502 });
  }
}
