// Copies blacktop-api's rendered Reddit threads into formula1.json in the
// exact shape the Devvit app's parsePayload() expects: { sessions, weekend }.
import { writeFileSync } from 'node:fs';

const BASE = 'https://api.ocblacktop.com/reddit-feed';
// Cloudflare on this host challenges curl-style agents; a named agent passes.
const HEADERS = { Accept: 'application/json', 'User-Agent': 'blacktop-feed relay (+https://ocblacktop.com)' };

async function getJson(path) {
  const res = await fetch(`${BASE}${path}`, { headers: HEADERS, signal: AbortSignal.timeout(20_000) });
  if (!res.ok) throw new Error(`GET ${path} -> HTTP ${res.status}`);
  return res.json();
}

const [{ sessions }, { event }] = await Promise.all([
  getJson('/formula1'),
  getJson('/formula1/weekend'),
]);
if (!Array.isArray(sessions)) throw new Error('feed returned no sessions array');

// Stable key order so an unchanged feed produces a byte-identical file and no commit.
const payload = { sessions, weekend: event ?? null };
writeFileSync('formula1.json', JSON.stringify(payload, null, 1) + '\n');
console.log(`wrote formula1.json: ${sessions.length} sessions, weekend=${event ? event.title : 'none'}`);
