import React, { useEffect, useState } from 'react';
import { Grid, Box, Skeleton, Container, Paper, Typography, CircularProgress, Chip } from '@mui/material';
import DashboardLayout from '../components/layouts/DashboardLayout';
import StatCard from '../components/dashboard/StatCard';
import SalesChart from '../components/dashboard/SalesChart';
import TopProductsChart from '../components/dashboard/TopProductsChart';
import OrderStatusChart from '../components/dashboard/OrderStatusChart';
import { ShoppingCart, AttachMoney, People, Inventory } from '@mui/icons-material';
import TopProductsTable from '@/components/dashboard/TopProductsTable';
import { mockProducts } from '@/data/mockProducts';

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

interface SalesDataPoint {
  date: string;
  sales: number;
}

type SalesData = SalesDataPoint[];

interface TopProduct {
  id: string;
  name: string;
  sales: number;
  revenue: number;
}

export default function Dashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [salesData, setSalesData] = useState<SalesData>([]);
    const [stats, setStats] = useState<DashboardStats>({
        totalSales: 0,
        totalOrders: 0,
        totalCustomers: 0,
        totalProducts: 0
    });
    const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
    const [orderStatusData, setOrderStatusData] = useState<OrderStatusData[]>([]);

    const calculateRealTimeStats = async () => {
        try {
            // 获取数据
            const orders = JSON.parse(localStorage.getItem('orders') || '[]');
            const products = JSON.parse(localStorage.getItem('products') || '[]');
            const users = JSON.parse(localStorage.getItem('users') || '[]');

            // 计算销售趋势数据
            const last7Days = Array.from({ length: 7 }, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - i);
                return date.toISOString().split('T')[0];
            }).reverse();

            const salesTrend = last7Days.map(date => ({
                date,
                sales: orders
                    .filter((order: any) => order.orderDate?.startsWith(date))
                    .reduce((sum: number, order: any) => sum + (order.total || 0), 0)
            }));

            setSalesData(salesTrend as unknown as SalesData);

            // 直接使用模拟数据
            const topProductsList: TopProduct[] = [
                {
                    id: '4',
                    name: 'Adjustable Standing Desk',
                    sales: 4,
                    revenue: 2999.96
                },
                {
                    id: '1',
                    name: 'Modern Leather Sofa',
                    sales: 2,
                    revenue: 1799.98
                },
                {
                    id: '2',
                    name: 'Nike Air Max 2024',
                    sales: 3,
                    revenue: 539.97
                },
                {
                    id: '3',
                    name: 'iPhone 15 Pro',
                    sales: 1,
                    revenue: 999.99
                },
                {
                    id: '5',
                    name: 'MacBook Pro M3',
                    sales: 1,
                    revenue: 1999.99
                }
            ];

            setTopProducts(topProductsList);

            // 其他统计...
            const totalSales = orders.reduce((sum: number, order: any) => sum + (order.total || 0), 0);
            const totalOrders = orders.length;
            const totalCustomers = users.filter((user: any) => user.role === 'user').length;
            const totalProducts = products.length || mockProducts.length;

            setStats({
                totalSales,
                totalOrders,
                totalCustomers,
                totalProducts
            });

            // 订单状态统计
            const statusCounts = orders.reduce((acc: { [key: string]: number }, order: any) => {
                const status = order.status || 'pending';
                acc[status] = (acc[status] || 0) + 1;
                return acc;
            }, {});

            const chartData = Object.entries(statusCounts).map(([status, count]) => ({
                OrderStatus: status,
                count: count
            }));

            setOrderStatusData(chartData as OrderStatusData[]);
            setIsLoading(false);
        } catch (error) {
            console.error('Error calculating stats:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        calculateRealTimeStats();
    }, []);

    return (
        <DashboardLayout>
            <Box
                sx={{
                    minHeight: '100vh',
                    background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
                    py: 4
                }}
            >
                <Container maxWidth="lg">
                    {/* Stats Cards */}
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    height: '100%',
                                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                    color: 'white',
                                    borderRadius: 2,
                                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 12px 24px rgba(59, 130, 246, 0.25)'
                                    }
                                }}
                            >
                                <StatCard 
                                    title="Total Sales" 
                                    value={stats.totalSales}
                                    icon={<AttachMoney />}
                                    trend={12}
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    height: '100%',
                                    background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
                                    color: 'white',
                                    borderRadius: 2,
                                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 12px 24px rgba(139, 92, 246, 0.25)'
                                    }
                                }}
                            >
                                <StatCard 
                                    title="Total Orders" 
                                    value={stats.totalOrders}
                                    icon={<ShoppingCart />}
                                    trend={8}
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    height: '100%',
                                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                    color: 'white',
                                    borderRadius: 2,
                                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 12px 24px rgba(16, 185, 129, 0.25)'
                                    }
                                }}
                            >
                                <StatCard 
                                    title="Total Customers" 
                                    value={stats.totalCustomers}
                                    icon={<People />}
                                    trend={15}
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    height: '100%',
                                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                                    color: 'white',
                                    borderRadius: 2,
                                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 12px 24px rgba(245, 158, 11, 0.25)'
                                    }
                                }}
                            >
                                <StatCard 
                                    title="Total Products" 
                                    value={stats.totalProducts}
                                    icon={<Inventory />}
                                    trend={5}
                                />
                            </Paper>
                        </Grid>
                    </Grid>

                    {/* Charts Row */}
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        <Grid item xs={12} md={8}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    height: '400px',
                                    borderRadius: 2,
                                    background: 'linear-gradient(to right bottom, #ffffff, #f8fafc)',
                                    backdropFilter: 'blur(20px)',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    transition: 'box-shadow 0.2s ease-in-out',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    '&:hover': {
                                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                                    },
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: '4px',
                                        background: 'linear-gradient(to right, #3b82f6, #2563eb)'
                                    }
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
                                        Sales Trend
                                    </Typography>
                                    <Chip 
                                        label="Last 7 Days" 
                                        size="small" 
                                        sx={{ 
                                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                            color: '#2563eb',
                                            fontWeight: 500
                                        }} 
                                    />
                                </Box>
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
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    height: '400px',
                                    borderRadius: 2,
                                    background: 'linear-gradient(to right bottom, #ffffff, #f8fafc)',
                                    backdropFilter: 'blur(20px)',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    transition: 'box-shadow 0.2s ease-in-out',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    '&:hover': {
                                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                                    },
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: '4px',
                                        background: 'linear-gradient(to right, #8b5cf6, #6d28d9)'
                                    }
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
                                        Order Status
                                    </Typography>
                                    <Chip 
                                        label="Real-time" 
                                        size="small" 
                                        sx={{ 
                                            backgroundColor: 'rgba(139, 92, 246, 0.1)',
                                            color: '#6d28d9',
                                            fontWeight: 500
                                        }} 
                                    />
                                </Box>
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
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    borderRadius: 2,
                                    background: 'linear-gradient(to right bottom, #ffffff, #f8fafc)',
                                    backdropFilter: 'blur(20px)',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    transition: 'box-shadow 0.2s ease-in-out',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    '&:hover': {
                                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                                    },
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: '4px',
                                        background: 'linear-gradient(to right, #10b981, #059669)'
                                    }
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
                                        Top Products
                                    </Typography>
                                    <Chip 
                                        label="Best Sellers" 
                                        size="small" 
                                        sx={{ 
                                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                            color: '#059669',
                                            fontWeight: 500
                                        }} 
                                    />
                                </Box>
                                {isLoading ? (
                                    <Skeleton variant="rectangular" height={200} />
                                ) : (
                                    <TopProductsTable products={topProducts} />
                                )}
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </DashboardLayout>
    );
} 