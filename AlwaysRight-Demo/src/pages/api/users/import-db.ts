import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const connection = await pool.getConnection();
    try {
      const [users] = await connection.query('SELECT * FROM users');
      res.status(200).json({ 
        message: 'Data imported successfully', 
        users 
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error importing data:', error);
    res.status(500).json({ message: 'Error importing data from database' });
  }
} 