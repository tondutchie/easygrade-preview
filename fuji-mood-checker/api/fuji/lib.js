import { del, get, list, put } from '@vercel/blob';
import { createHash, timingSafeEqual } from 'node:crypto';

export const SQUADS = ['FFM','HPC','Product','Platform','Data','Order','Partner','UX/UI','AppSupport&Infra'];
const MEMBERS_PATH = 'fuji/members.json';
const SESSIONS_PATH = 'fuji/sessions.json';
const ACCESS = 'private';

export function sessionId(year, sprint, squad) {
  return `${year}-s${sprint}-${encodeURIComponent(squad).replaceAll('%', '_')}`;
}

export async function readJson(pathname, fallback) {
  const result = await get(pathname, { access: ACCESS, useCache: false });
  if (!result || result.statusCode !== 200) return structuredClone(fallback);
  const text = await new Response(result.stream).text();
  try { return JSON.parse(text); } catch { return structuredClone(fallback); }
}

export async function writeJson(pathname, value) {
  await put(pathname, JSON.stringify(value), {
    access: ACCESS,
    allowOverwrite: true,
    addRandomSuffix: false,
    contentType: 'application/json',
    cacheControlMaxAge: 0,
  });
}

export async function readMembers() { return await readJson(MEMBERS_PATH, []); }
export async function writeMembers(members) { return await writeJson(MEMBERS_PATH, members); }
export async function readSessions() { return await readJson(SESSIONS_PATH, []); }
export async function writeSessions(sessions) { return await writeJson(SESSIONS_PATH, sessions); }

export async function listAll(prefix) {
  let cursor;
  const out = [];
  do {
    const page = await list({ prefix, cursor, limit: 1000 });
    out.push(...page.blobs);
    cursor = page.cursor || undefined;
  } while (cursor);
  return out;
}

export async function listResponses() {
  const blobs = await listAll('fuji/responses/');
  const members = await readMembers();
  const memberMap = new Map(members.map(m => [m.id, m]));
  const latest = new Map();
  for (const blob of blobs) {
    const match = blob.pathname.match(/^fuji\/responses\/([^/]+)\/([^/]+)__([0-9]{1,2})\.json$/);
    if (!match) continue;
    const [, sessionIdValue, memberId, scoreRaw] = match;
    const score = Number(scoreRaw);
    if (!Number.isInteger(score) || score < 0 || score > 10) continue;
    const member = memberMap.get(memberId);
    const rec = {
      id: `${sessionIdValue}_${memberId}`,
      sessionId: sessionIdValue,
      memberId,
      name: member?.name || memberId,
      squad: member?.squad || '',
      score,
      updatedAt: blob.uploadedAt || new Date().toISOString(),
    };
    const prev = latest.get(rec.id);
    if (!prev || String(rec.updatedAt) > String(prev.updatedAt)) latest.set(rec.id, rec);
  }
  return [...latest.values()];
}

export async function clearResponsePrefix(prefix) {
  const blobs = await listAll(prefix);
  if (blobs.length) await del(blobs.map(b => b.url));
  return blobs.length;
}

export async function writeMood(sessionIdValue, memberId, score) {
  const memberPrefix = `fuji/responses/${sessionIdValue}/${memberId}__`;
  await clearResponsePrefix(memberPrefix);
  const pathname = `${memberPrefix}${score}.json`;
  await put(pathname, JSON.stringify({ sessionId: sessionIdValue, memberId, score, updatedAt: new Date().toISOString() }), {
    access: ACCESS,
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
    cacheControlMaxAge: 0,
  });
}

export function requireAdmin(req) {
  const expectedHash = process.env.FUJI_ADMIN_PIN_HASH;
  const supplied = String(req.headers['x-admin-pin'] || '');
  if (!expectedHash || !/^\d{6}$/.test(supplied)) return false;
  const actualHash = createHash('sha256').update(supplied).digest('hex');
  const a = Buffer.from(actualHash, 'hex');
  const b = Buffer.from(expectedHash, 'hex');
  return a.length === b.length && timingSafeEqual(a, b);
}

export function json(res, status, body) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  return res.status(status).json(body);
}