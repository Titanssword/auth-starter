// pages/api/users.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { createUser } from '../db'; // 确保路径与你的项目结构相匹配

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 检查请求方法是否为 POST
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // 验证请求体中的 email 和 password 是否存在
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
      // 调用 createUser 函数创建新用户
      await createUser(email, password);

      // 用户创建成功后的响应
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      // 错误处理
      console.error('Failed to create user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    // 如果不是 POST 请求，返回 405 Method Not Allowed
    res.status(405).json({ error: 'Method not allowed' });
  }
}