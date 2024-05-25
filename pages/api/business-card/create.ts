// app/api/businessCard/create.ts

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createBusinessCard } from '../db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const { id, content } = req.body;

    if (!id || !content) {
      return res.status(400).json({ error: 'ID and Content are required' });
    }

    try {
      const newBusinessCard = await createBusinessCard(id, content);
      return res.status(201).json(newBusinessCard);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
