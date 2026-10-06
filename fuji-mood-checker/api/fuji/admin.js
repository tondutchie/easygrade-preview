import {
  SQUADS,
  clearResponsePrefix,
  json,
  listAll,
  readMembers,
  readSessions,
  requireAdmin,
  sessionId,
  writeMembers,
  writeSessions,
} from './lib.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });
  if (!requireAdmin(req)) return json(res, 401, { error: 'Invalid Admin PIN' });

  try {
    const body = req.body || {};
    const action = body.action;
    if (action === 'verify') return json(res, 200, { ok: true });

    if (action === 'addMember') {
      const name = String(body.name || '').trim();
      const squad = String(body.squad || '');
      if (!name || !SQUADS.includes(squad)) return json(res, 400, { error: 'Invalid member' });
      const members = await readMembers();
      const max = members.reduce((m, x) => Math.max(m, Number(String(x.id || '').replace('M','')) || 0), 0);
      const id = `M${String(max + 1).padStart(3, '0')}`;
      members.push({ id, name, squad, active: true, createdAt: new Date().toISOString() });
      await writeMembers(members);
      return json(res, 200, { ok: true, id });
    }

    if (action === 'toggleMember') {
      const members = await readMembers();
      const member = members.find(m => m.id === body.id);
      if (!member) return json(res, 404, { error: 'Member not found' });
      member.active = !member.active;
      await writeMembers(members);
      return json(res, 200, { ok: true, active: member.active });
    }

    if (action === 'openSession') {
      const year = Number(body.year);
      const sprint = Number(body.sprint);
      const squad = String(body.squad || '');
      if (!Number.isInteger(year) || !Number.isInteger(sprint) || sprint < 1 || !SQUADS.includes(squad)) {
        return json(res, 400, { error: 'Invalid session' });
      }
      const id = sessionId(year, sprint, squad);
      const sessions = await readSessions();
      let existing = sessions.find(s => s.id === id);
      let existingCount = 0;
      if (existing) {
        const existingResponses = await listAll(`fuji/responses/${id}/`);
        existingCount = existingResponses.length;
        if (existingCount && !body.resetExisting) {
          return json(res, 409, { error: 'RESET_REQUIRED', count: existingCount });
        }
        if (existingCount && body.resetExisting) {
          await clearResponsePrefix(`fuji/responses/${id}/`);
        }
      }
      if (!existing) {
        existing = { id, year, sprint, squad, open: true, openedAt: new Date().toISOString(), closedAt: null };
        sessions.push(existing);
      } else {
        Object.assign(existing, { open: true, openedAt: new Date().toISOString(), closedAt: null });
      }
      await writeSessions(sessions);
      return json(res, 200, { ok: true, session: existing, deletedResponses: body.resetExisting ? existingCount : 0 });
    }

    if (action === 'closeSession') {
      const sessions = await readSessions();
      const session = sessions.find(s => s.id === body.id);
      if (!session) return json(res, 404, { error: 'Session not found' });
      session.open = false;
      session.closedAt = new Date().toISOString();
      await writeSessions(sessions);
      return json(res, 200, { ok: true });
    }

    if (action === 'resetSession') {
      const sessions = await readSessions();
      const session = sessions.find(s => s.id === body.id);
      if (!session) return json(res, 404, { error: 'Session not found' });
      const deleted = await clearResponsePrefix(`fuji/responses/${session.id}/`);
      Object.assign(session, { open: true, openedAt: new Date().toISOString(), closedAt: null });
      await writeSessions(sessions);
      return json(res, 200, { ok: true, deletedResponses: deleted });
    }

    if (action === 'resetAll') {
      await clearResponsePrefix('fuji/responses/');
      await Promise.all([writeMembers([]), writeSessions([])]);
      return json(res, 200, { ok: true });
    }

    return json(res, 400, { error: 'Unknown action' });
  } catch (error) {
    console.error(error);
    return json(res, 500, { error: 'Admin operation failed' });
  }
}