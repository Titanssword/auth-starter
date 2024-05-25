// pages/api/businessCard/[id].ts

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getBusinessCardById } from '../db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;
  
  try {
    const businessCard = await getBusinessCardById(parseInt(id as string));
    if (!businessCard) {
      return res.status(404).json({ error: 'Business card not found' });
    }
    return res.status(200).json(businessCard);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
