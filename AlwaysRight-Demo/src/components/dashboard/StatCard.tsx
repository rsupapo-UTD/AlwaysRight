import React from 'react';
import { Paper, Typography, Box, alpha } from '@mui/material';

interface StatCardProps {
    title: string;
    value: number | string;
    icon?: React.ReactNode;
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
    trend?: number;
    sx?: any;
}

const StatCard: React.FC<StatCardProps> = ({ 
    title, 
    value, 
    icon, 
    trend, 
    color = 'primary',
    sx = {} 
}) => {
    return (
        <Paper 
            elevation={0}
            sx={{ 
                p: 3, 
                height: '100%',
                borderRadius: 2,
                position: 'relative',
                overflow: 'hidden',
                ...sx
            }}
        >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    {icon && (
                        <Box 
                            sx={{ 
                                p: 1,
                                borderRadius: 2,
                                display: 'flex',
                                bgcolor: 'rgba(255, 255, 255, 0.2)'
                            }}
                        >
                            {icon}
                        </Box>
                    )}
                    {trend !== undefined && (
                        <Typography 
                            variant="subtitle2" 
                            sx={{ 
                                display: 'flex',
                                alignItems: 'center',
                                color: trend >= 0 ? '#10b981' : '#ef4444',
                                bgcolor: 'rgba(255, 255, 255, 0.2)',
                                px: 1,
                                py: 0.5,
                                borderRadius: 1
                            }}
                        >
                            {trend >= 0 ? '+' : ''}{trend}%
                        </Typography>
                    )}
                </Box>
                <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
                    {typeof value === 'number' ? value.toLocaleString() : value}
                </Typography>
                <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                    {title}
                </Typography>
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    right: -20,
                    bottom: -20,
                    width: 140,
                    height: 140,
                    borderRadius: '50%',
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    zIndex: 0
                }}
            />
        </Paper>
    );
};

export default StatCard; 