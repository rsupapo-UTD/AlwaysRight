import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { commonOptions } from '../../utils/chartConfig';

interface OrderStatusChartProps {
  data: {
    OrderStatus: string;
    count: number;
  }[];
}

const OrderStatusChart: React.FC<OrderStatusChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.OrderStatus),
    datasets: [{
      data: data.map(item => item.count),
      backgroundColor: [
        '#4CAF50', // Completed
        '#FFC107', // Processing
        '#F44336'  // Other statuses
      ]
    }]
  };

  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Typography variant="h6" gutterBottom>
        Order Status Distribution
      </Typography>
      <Box sx={{ 
        flexGrow: 1, 
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Doughnut data={chartData} options={commonOptions} />
      </Box>
    </Paper>
  );
};

export default OrderStatusChart; 