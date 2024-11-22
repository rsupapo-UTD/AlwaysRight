import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { commonOptions } from '../../utils/chartConfig';
import { TopProduct } from '../../types/dashboard';

interface TopProductsChartProps {
  data: TopProduct[];
}

const TopProductsChart: React.FC<TopProductsChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.ProductName),
    datasets: [{
      label: 'Revenue ($)',
      data: data.map(item => item.total_revenue),
      backgroundColor: '#4CAF50',
      borderRadius: 6
    }]
  };

  const options = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      title: {
        display: true,
        text: 'Top Products by Revenue'
      }
    }
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
        Top Products by Revenue
      </Typography>
      <Box sx={{ flexGrow: 1, position: 'relative', minHeight: '300px' }}>
        <Bar data={chartData} options={options} />
      </Box>
    </Paper>
  );
};

export default TopProductsChart; 