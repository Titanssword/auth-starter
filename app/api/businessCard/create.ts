// pages/api/businessCard/create.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { createBusinessCard } from 'app/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    try {
      const newBusinessCard = await createBusinessCard(content);
      return res.status(201).json(newBusinessCard);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
