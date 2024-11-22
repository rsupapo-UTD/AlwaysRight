import axios from 'axios';
import { SalesData, Statistics, TopProduct, OrderStatus } from '../types/dashboard';
import { mockSalesData, mockStatistics, mockTopProducts, mockOrderStatus } from './mockData';

const api = axios.create({
  baseURL: '/api',
  timeout: 5000
});

export const fetchSalesData = async (): Promise<SalesData> => {
  try {
    const { data } = await api.get('/sales');
    return data;
  } catch (error) {
    console.error('Error fetching sales data:', error);
    return mockSalesData;
  }
};

export const fetchStatistics = async (): Promise<Statistics> => {
  try {
    const { data } = await api.get('/statistics');
    return data;
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return mockStatistics;
  }
};

export const fetchTopProducts = async (): Promise<TopProduct[]> => {
  try {
    const { data } = await api.get('/top-products');
    return data;
  } catch (error) {
    console.error('Error fetching top products:', error);
    return mockTopProducts;
  }
};

export const fetchOrderStatus = async (): Promise<OrderStatus[]> => {
  try {
    const { data } = await api.get('/order-status');
    return data;
  } catch (error) {
    console.error('Error fetching order status:', error);
    return mockOrderStatus;
  }
}; 