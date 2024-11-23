import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { commonOptions } from '../../utils/chartConfig';
import { SalesData } from '../../types/dashboard';

interface SalesChartProps {
  data: SalesData;
}

const SalesChart: React.FC<SalesChartProps> = ({ data }) => {
  const chartData = {
    ...data,
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      fill: true,
      backgroundColor: (context: any) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(37, 99, 235, 0.2)');
        gradient.addColorStop(1, 'rgba(37, 99, 235, 0)');
        return gradient;
      }
    }))
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
        Sales Trend
      </Typography>
      <Box sx={{ flexGrow: 1, position: 'relative', minHeight: '400px' }}>
        <Line data={chartData} options={commonOptions} />
      </Box>
    </Paper>
  );
};

export default SalesChart; 