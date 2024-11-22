import { NextApiRequest, NextApiResponse } from 'next';
import pool, { testConnection } from '../../utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const isConnected = await testConnection();
    if (isConnected) {
      // 测试查询
      const [rows] = await pool.query('SHOW TABLES');
      res.status(200).json({ 
        status: 'success', 
        message: 'Database connected successfully',
        tables: rows 
      });
    } else {
      res.status(500).json({ 
        status: 'error', 
        message: 'Database connection failed' 
      });
    }
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'API error occurred' 
    });
  }
} 