import { kv } from '@vercel/kv';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { NextResponse } from 'next/server';
 
 export default async function (request: VercelRequest, res: VercelResponse) {
   const { myID, friendID } = request.body;
   try {
    await kv.lpush(
        myID + "_friends",
        friendID
    );
    return res.status(200).json("add success");
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
 }