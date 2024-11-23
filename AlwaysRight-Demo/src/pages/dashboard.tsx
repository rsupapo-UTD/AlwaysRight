import React, { useEffect, useState } from 'react';
import { Grid, Box, Skeleton } from '@mui/material';
import DashboardLayout from '../components/layouts/DashboardLayout';
import StatCard from '../components/dashboard/StatCard';
import SalesChart from '../components/dashboard/SalesChart';
import TopProductsChart from '../components/dashboard/TopProductsChart';
import OrderStatusChart from '../components/dashboard/OrderStatusChart';
import { fetchSalesData, fetchStatistics, fetchTopProducts, fetchOrderStatus } from '../utils/api';
import { ShoppingCart, AttachMoney, People, Inventory } from '@mui/icons-material';
import { SalesData, Statistics, TopProduct, OrderStatus } from '../types/dashboard';
import { mockSalesData, mockStatistics, mockTopProducts, mockOrderStatus } from '../utils/mockData';

export default function Dashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [salesData, setSalesData] = useState<SalesData>(mockSalesData);
    const [stats, setStats] = useState<Statistics>(mockStatistics); // 提供初始值
    const [topProducts, setTopProducts] = useState<TopProduct[]>(mockTopProducts);
    const [orderStatus, setOrderStatus] = useState<OrderStatus[]>(mockOrderStatus);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true); // 开始加载
            try {
                const [salesRes, statsRes, productsRes, statusRes] = await Promise.all([
                    fetchSalesData(),
                    fetchStatistics(),
                    fetchTopProducts(),
                    fetchOrderStatus()
                ]);
                
                // 使用新数据更新状态
                setSalesData(salesRes);
                setStats(statsRes);
                setTopProducts(productsRes);
                setOrderStatus(statusRes);
            } catch (error) {
                console.error('Error loading dashboard data:', error);
            } finally {
                // 延迟结束加载状态，避免闪烁
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            }
        };

        loadData();
    }, []);

    const renderStatCards = () => (
        <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
                {isLoading ? (
                    <Skeleton variant="rectangular" height={120} />
                ) : (
                    <StatCard 
                        title="Total Sales" 
                        value={stats?.totalSales ?? 0}
                        icon={<AttachMoney />}
                        color="primary"
                    />
                )}
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                {isLoading ? (
                    <Skeleton variant="rectangular" height={120} />
                ) : (
                    <StatCard 
                        title="Total Orders" 
                        value={stats?.totalOrders ?? 0}
                        icon={<ShoppingCart />}
                        color="secondary"
                    />
                )}
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                {isLoading ? (
                    <Skeleton variant="rectangular" height={120} />
                ) : (
                    <StatCard 
                        title="Total Customers" 
                        value={stats?.totalCustomers ?? 0}
                        icon={<People />}
                        color="success"
                    />
                )}
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                {isLoading ? (
                    <Skeleton variant="rectangular" height={120} />
                ) : (
                    <StatCard 
                        title="Total Products" 
                        value={stats?.totalProducts ?? 0}
                        icon={<Inventory />}
                        color="warning"
                    />
                )}
            </Grid>
        </Grid>
    );

    const renderCharts = () => (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                {isLoading ? (
                    <Skeleton variant="rectangular" height={400} />
                ) : (
                    <SalesChart data={salesData} />
                )}
            </Grid>
            <Grid item xs={12} md={6}>
                {isLoading ? (
                    <Skeleton variant="rectangular" height={350} />
                ) : (
                    <Box sx={{ height: '350px' }}>
                        <TopProductsChart data={topProducts} />
                    </Box>
                )}
            </Grid>
            <Grid item xs={12} md={6}>
                {isLoading ? (
                    <Skeleton variant="rectangular" height={350} />
                ) : (
                    <Box sx={{ height: '350px' }}>
                        <OrderStatusChart data={orderStatus} />
                    </Box>
                )}
            </Grid>
        </Grid>
    );

    return (
        <DashboardLayout>
            <Box sx={{ flexGrow: 1 }}>
                {renderStatCards()}
                {renderCharts()}
            </Box>
        </DashboardLayout>
    );
} 