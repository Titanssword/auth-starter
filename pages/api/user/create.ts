import { kv } from '@vercel/kv';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { NextResponse } from 'next/server';

export default async function (request: VercelRequest, response: VercelResponse) {
    const { content } = request.body;
    try {
        const existID = await kv.get((content as string));
        if  (existID) {    
            response.status(200).json({id: existID}); 
        }
        const id = generateRandomId(10)
        kv.set(id, content, {  nx: true });
        kv.set(content, id, {  nx: true });
        response.status(200).json({ id: id, message: 'User created successfully' });
    } catch (error) {
        return response.status(500).json({ error: 'Internal server error' });
    }
}

function generateRandomId(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

const userId = generateRandomId(10); // 生成一个长度为10的随机ID
console.log(userId);