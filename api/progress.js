import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const userId = req.query.userId || 'ali-default';

  try {
    if (req.method === 'GET') {
      // Load progress from KV
      const data = await kv.get(`coop-progress:${userId}`);
      return res.status(200).json(data || {});
    }

    if (req.method === 'POST') {
      // Save progress to KV
      const { state } = req.body;
      await kv.set(`coop-progress:${userId}`, state, { ex: 7776000 }); // 90 days expiry
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
