import { Box } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { SalesData } from '../../types/dashboard';

// 注册 ChartJS 组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// 定义图表选项类型
const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      display: true
    },
    title: {
      display: false
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      beginAtZero: true,
      ticks: {
        callback: function(value) {
          return '$' + value.toLocaleString();
        }
      },
      grid: {
        borderDash: [2],
        drawBorder: false,
        color: 'rgba(0, 0, 0, 0.1)'
      }
    }
  },
  elements: {
    line: {
      tension: 0.4
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 6
    }
  }
} as ChartOptions<'line'>;

interface SalesChartProps {
  data: SalesData;
}

export default function SalesChart({ data }: SalesChartProps) {
  return (
    <Box sx={{ 
      width: '100%', 
      height: 'calc(100% - 40px)',
      position: 'relative'
    }}>
      <Line
        data={data}
        options={chartOptions}
      />
    </Box>
  );
} 