import React, { useEffect, useState } from 'react';
import { Grid, Box, Skeleton, Container, Paper, Typography, CircularProgress } from '@mui/material';
import DashboardLayout from '../components/layouts/DashboardLayout';
import StatCard from '../components/dashboard/StatCard';
import SalesChart from '../components/dashboard/SalesChart';
import TopProductsChart from '../components/dashboard/TopProductsChart';
import OrderStatusChart from '../components/dashboard/OrderStatusChart';
import { fetchSalesData, fetchStatistics, fetchTopProducts, fetchOrderStatus } from '../utils/api';
import { ShoppingCart, AttachMoney, People, Inventory } from '@mui/icons-material';
import { SalesData, Statistics, TopProduct, OrderStatus } from '../types/dashboard';
import { mockSalesData, mockStatistics, mockTopProducts, mockOrderStatus } from '../utils/mockData';
import TopProductsTable from '@/components/dashboard/TopProductsTable';

// 定义类型
interface Order {
  id: string;
  status: 'pending' | 'processing' | 'completed';
  total: number;
  orderDate: string;
}

interface OrderStatusData {
  OrderStatus: string;
  count: number;
}

interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
}

export default function Dashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [salesData, setSalesData] = useState<SalesData>(mockSalesData);
    const [stats, setStats] = useState<DashboardStats>({
        totalSales: 0,
        totalOrders: 0,
        totalCustomers: 0,
        totalProducts: 0
    });
    const [topProducts, setTopProducts] = useState<TopProduct[]>(mockTopProducts);
    const [orderStatusData, setOrderStatusData] = useState<OrderStatusData[]>([]);

    const calculateRealTimeStats = async () => {
        try {
            // Get orders from localStorage
            const orders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');
            const products = JSON.parse(localStorage.getItem('products') || '[]');
            const users = JSON.parse(localStorage.getItem('users') || '[]');

            // Calculate total sales and orders
            const totalSales = orders.reduce((sum, order) => sum + (order.total || 0), 0);
            const totalOrders = orders.length;
            const totalCustomers = users.filter(user => user.role === 'user').length;
            const totalProducts = products.length;

            // Update stats
            setStats({
                totalSales,
                totalOrders,
                totalCustomers,
                totalProducts
            });

            // Calculate order status distribution
            const statusCounts = orders.reduce((acc: { [key: string]: number }, order) => {
                const status = order.status || 'pending';
                acc[status] = (acc[status] || 0) + 1;
                return acc;
            }, {});

            // Convert to chart format
            const chartData = Object.entries(statusCounts).map(([status, count]) => ({
                OrderStatus: status,
                count: count
            }));

            setOrderStatusData(chartData);
        } catch (error) {
            console.error('Error loading dashboard data:', error);
            // Fallback to mock data
            setStats({
                totalSales: 150000,
                totalOrders: 450,
                totalCustomers: 200,
                totalProducts: 50
            });
            setOrderStatusData([
                { OrderStatus: 'pending', count: 26 },
                { OrderStatus: 'processing', count: 45 },
                { OrderStatus: 'completed', count: 85 }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        calculateRealTimeStats();
    }, []);

    return (
        <DashboardLayout>
            <Container maxWidth="lg" sx={{ mb: 4 }}>
                {/* Stats Cards */}
                <Grid container spacing={3} sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatCard 
                            title="Total Sales" 
                            value={stats.totalSales}
                            icon={<AttachMoney />}
                            trend={12}
                            sx={{
                                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                color: 'white'
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatCard 
                            title="Total Orders" 
                            value={stats.totalOrders}
                            icon={<ShoppingCart />}
                            trend={8}
                            sx={{
                                background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
                                color: 'white'
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatCard 
                            title="Total Customers" 
                            value={stats.totalCustomers}
                            icon={<People />}
                            trend={15}
                            sx={{
                                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                color: 'white'
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatCard 
                            title="Total Products" 
                            value={stats.totalProducts}
                            icon={<Inventory />}
                            trend={5}
                            sx={{
                                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                                color: 'white'
                            }}
                        />
                    </Grid>
                </Grid>

                {/* Charts Row */}
                <Grid container spacing={3} sx={{ mb: 3 }}>
                    <Grid item xs={12} md={8}>
                        <Paper sx={{ p: 3, height: '400px' }}>
                            <Typography variant="h6" gutterBottom>
                                Sales Trend
                            </Typography>
                            {isLoading ? (
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                    <CircularProgress />
                                </Box>
                            ) : (
                                <SalesChart data={salesData} />
                            )}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 3, height: '400px' }}>
                            <Typography variant="h6" gutterBottom>
                                Order Status
                            </Typography>
                            {isLoading ? (
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                    <CircularProgress />
                                </Box>
                            ) : (
                                <OrderStatusChart data={orderStatusData} />
                            )}
                        </Paper>
                    </Grid>
                </Grid>

                {/* Top Products Table */}
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Top Products
                            </Typography>
                            {isLoading ? (
                                <Skeleton variant="rectangular" height={200} />
                            ) : (
                                <TopProductsTable products={topProducts} />
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </DashboardLayout>
    );
} 