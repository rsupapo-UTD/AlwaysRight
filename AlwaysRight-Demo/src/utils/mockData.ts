import { SalesData, Statistics, TopProduct, OrderStatus } from '../types/dashboard';

export const mockSalesData: SalesData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    label: 'Monthly Sales',
    data: [30000, 35000, 45000, 40000, 50000, 55000],
    borderColor: '#2563eb',
    tension: 0.4
  }]
};

export const mockStatistics: Statistics = {
  totalSales: 150000,
  totalOrders: 450,
  totalCustomers: 200,
  totalProducts: 50
};

export const mockTopProducts: TopProduct[] = [
  { ProductName: 'Product A', total_revenue: 25000 },
  { ProductName: 'Product B', total_revenue: 18000 },
  { ProductName: 'Product C', total_revenue: 15000 },
  { ProductName: 'Product D', total_revenue: 12000 },
  { ProductName: 'Product E', total_revenue: 8500 }
];

export const mockOrderStatus: OrderStatus[] = [
  { OrderStatus: 'Completed', count: 85 },
  { OrderStatus: 'Processing', count: 45 },
  { OrderStatus: 'Pending', count: 26 }
]; 