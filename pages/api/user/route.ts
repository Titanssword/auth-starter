import { kv } from '@vercel/kv';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { NextResponse } from 'next/server';
 
 export default function (request: VercelRequest, response: VercelResponse) {
    const { id, content } = request.body;

    try {
        const user = kv.hgetall('user:me');
        console.log(user)
      // 用户创建成功后的响应
      response.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      // 错误处理
      console.error('Failed to create user:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
 }