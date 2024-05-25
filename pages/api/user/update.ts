import { kv } from '@vercel/kv';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { NextResponse } from 'next/server';
 
 export default async function (request: VercelRequest, response: VercelResponse) {
    const { id, content } = request.body;
    try {
        kv.set(id, content, {});
        response.status(200).json({ message: 'User update successfully' });
    } catch (error) {
        return response.status(500).json({ error: 'Internal server error' });
    }
}