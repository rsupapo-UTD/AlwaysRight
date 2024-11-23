import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartOptions
} from 'chart.js';

// 注册 ChartJS 组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// 通用图表配置
export const commonOptions: ChartOptions<'line' | 'bar' | 'doughnut'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (value) => `$${value}`
      }
    }
  }
};

// 饼图特定配置
export const doughnutOptions: ChartOptions<'doughnut'> = {
  ...commonOptions,
  cutout: '60%',
  plugins: {
    ...commonOptions.plugins,
    legend: {
      position: 'right',
      labels: {
        boxWidth: 12
      }
    }
  }
}; 