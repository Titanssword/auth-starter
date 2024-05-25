import { kv } from '@vercel/kv';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function (request: VercelRequest, res: VercelResponse) {
    const { id } = request.query;
    try {
        const { id } = request.query; // 假定你有一个id参数
        const key = id + "_friends"; // 构建KV存储的键
        const list = await kv.lrange(key, 0, -1); // 获取列表

        // 循环遍历list，使用kv.get获取每个id的具体内容
    const processedList = await Promise.all(
        list.map(async (itemId) => {
          // 假设itemId是数字类型，使用as string进行类型转换
          const item = await kv.get(itemId as string);
          // 处理item，构建包含id和item的对象
          return processItem(itemId as string, item);
        })
      );

        return res.status(200).json(processedList); // 返回处理后的列表
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

// 处理函数，将id和item放在一个JSON对象中
function processItem(itemId: string, item: any) {
    // 创建一个对象，包含id和item
    const result = {
        id: itemId,
        content: item // 假设item已经是你需要的结构，直接包含在对象中
    };
    return result;
}