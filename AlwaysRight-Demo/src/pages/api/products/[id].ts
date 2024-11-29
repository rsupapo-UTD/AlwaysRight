import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      try {
        const [rows] = await pool.query(`
          SELECT * FROM Product WHERE ProductID = ?
        `, [id]);

        if (!rows || (rows as any[]).length === 0) {
          return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(rows[0]);
      } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Error fetching product' });
      }
      break;

    case 'PUT':
      try {
        const { name, description, price, stock, category, status } = req.body;
        
        await pool.query(`
          UPDATE Product 
          SET 
            ProductName = ?,
            Description = ?,
            Price = ?,
            Stock = ?,
            Category = ?,
            Status = ?,
            UpdatedAt = NOW()
          WHERE ProductID = ?
        `, [name, description, price, stock, category, status, id]);

        res.status(200).json({ message: 'Product updated successfully' });
      } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Error updating product' });
      }
      break;

    case 'DELETE':
      try {
        await pool.query('DELETE FROM Product WHERE ProductID = ?', [id]);
        res.status(200).json({ message: 'Product deleted successfully' });
      } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Error deleting product' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 