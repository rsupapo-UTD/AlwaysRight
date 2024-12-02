import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Typography,
  LinearProgress
} from '@mui/material';
import { TopProduct } from '../../types/dashboard';

interface TopProductsTableProps {
  products: TopProduct[];
}

export default function TopProductsTable({ products }: TopProductsTableProps) {
  const maxRevenue = Math.max(...products.map(p => p.total_revenue));

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Product Name</TableCell>
          <TableCell>Revenue</TableCell>
          <TableCell>Performance</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.ProductName}>
            <TableCell>{product.ProductName}</TableCell>
            <TableCell>${product.total_revenue.toLocaleString()}</TableCell>
            <TableCell>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                <LinearProgress
                  variant="determinate"
                  value={(product.total_revenue / maxRevenue) * 100}
                  sx={{ 
                    width: '100%',
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 4,
                      backgroundColor: '#2563eb'
                    }
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  {Math.round((product.total_revenue / maxRevenue) * 100)}%
                </Typography>
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
} 