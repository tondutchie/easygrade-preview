import { json, readMembers, readSessions, writeMood } from './lib.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });
  try {
    const { sessionId, memberId, score } = req.body || {};
    const n = Number(score);
    if (!sessionId || !memberId || !Number.isInteger(n) || n < 0 || n > 10) {
      return json(res, 400, { error: 'Invalid mood payload' });
    }
    const [members, sessions] = await Promise.all([readMembers(), readSessions()]);
    const session = sessions.find(s => s.id === sessionId);
    const member = members.find(m => m.id === memberId && m.active);
    if (!session || !session.open) return json(res, 409, { error: 'Retro session is not open' });
    if (!member || member.squad !== session.squad) return json(res, 400, { error: 'Member does not belong to this squad' });
    await writeMood(sessionId, memberId, n);
    return json(res, 200, { ok: true, updatedAt: new Date().toISOString() });
  } catch (error) {
    console.error(error);
    return json(res, 500, { error: 'Failed to save mood' });
  }
}