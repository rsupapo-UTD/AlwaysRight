import { Box, Typography } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions as ChartJsOptions
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface OrderStatusChartProps {
  data: Array<{
    OrderStatus: string;
    count: number;
  }>;
}

export default function OrderStatusChart({ data }: OrderStatusChartProps) {
  const chartData: ChartData<'doughnut'> = {
    labels: data.map(item => item.OrderStatus),
    datasets: [
      {
        data: data.map(item => item.count),
        backgroundColor: [
          '#4ade80', // Completed
          '#fbbf24', // Processing
          '#ef4444'  // Pending
        ],
        borderColor: [
          '#22c55e',
          '#f59e0b',
          '#dc2626'
        ],
        borderWidth: 1,
        hoverOffset: 4
      }
    ]
  };

  const options: ChartJsOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      }
    },
    cutout: '70%'
  };

  return (
    <Box sx={{ height: '100%', minHeight: 300 }}>
      <Doughnut data={chartData} options={options} />
    </Box>
  );
} 