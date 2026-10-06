import { SQUADS, json, listResponses, readMembers, readSessions } from './lib.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' });
  try {
    const [members, sessions, responses] = await Promise.all([
      readMembers(),
      readSessions(),
      listResponses(),
    ]);
    return json(res, 200, { squads: SQUADS, members, sessions, responses, serverTime: new Date().toISOString() });
  } catch (error) {
    console.error(error);
    return json(res, 500, { error: 'Failed to load state' });
  }
}