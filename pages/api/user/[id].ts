import { kv } from '@vercel/kv';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { NextResponse } from 'next/server';
 
 export default async function (request: VercelRequest, res: VercelResponse) {
   const { id } = request.query;
   try {
      const businessCard = await kv.get((id as string));
      if (!businessCard) {
        return res.status(404).json({ error: 'Business card not found' });
      }
      return res.status(200).json(businessCard);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
 }