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
  { ProductName: 'Modern Leather Sofa', total_revenue: 25000 },
  { ProductName: 'Nike Air Max 2024', total_revenue: 18000 },
  { ProductName: 'Adjustable Standing Desk', total_revenue: 15000 },
  { ProductName: 'iPhone 15 Pro', total_revenue: 12000 },
  { ProductName: 'MacBook Pro M3', total_revenue: 8500 }
];

export const mockOrderStatus: OrderStatus[] = [
  { OrderStatus: 'Completed', count: 85 },
  { OrderStatus: 'Processing', count: 45 },
  { OrderStatus: 'Pending', count: 26 }
]; 