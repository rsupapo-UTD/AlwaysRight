import React from 'react';
import { Paper, Typography, Box, alpha } from '@mui/material';

interface StatCardProps {
    title: string;
    value: number | string;
    icon?: React.ReactNode;
    trend?: number;
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

const StatCard: React.FC<StatCardProps> = ({ 
    title, 
    value, 
    icon, 
    trend, 
    color = 'primary' 
}) => {
    // 格式化数值的函数
    const formatValue = (val: number | string) => {
        if (typeof val !== 'number') return val;
        
        if (val >= 1000000) {
            return `${(val / 1000000).toFixed(1)}M`;
        }
        if (val >= 1000) {
            return `${(val / 1000).toFixed(1)}K`;
        }
        return val.toLocaleString();
    };

    return (
        <Paper 
            elevation={0}
            sx={{ 
                p: 3, 
                height: '100%',
                background: (theme) => `linear-gradient(135deg, ${alpha(theme.palette[color].light, 0.1)} 0%, ${alpha(theme.palette[color].main, 0.05)} 100%)`,
                border: '1px solid',
                borderColor: (theme) => alpha(theme.palette[color].main, 0.1),
                transition: 'all 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: (theme) => `0 12px 24px ${alpha(theme.palette[color].main, 0.1)}`
                }
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                {icon && (
                    <Box 
                        sx={{ 
                            p: 1,
                            borderRadius: 2,
                            display: 'flex',
                            color: `${color}.main`,
                            bgcolor: (theme) => alpha(theme.palette[color].main, 0.12)
                        }}
                    >
                        {icon}
                    </Box>
                )}
                {trend !== undefined && (
                    <Typography 
                        variant="subtitle2" 
                        sx={{ 
                            color: trend >= 0 ? 'success.main' : 'error.main',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        {trend >= 0 ? '+' : ''}{trend}%
                    </Typography>
                )}
            </Box>
            <Typography 
                variant="h4" 
                sx={{ 
                    mb: 1,
                    color: 'text.primary'
                }}
            >
                {formatValue(value)}
            </Typography>
            <Typography 
                variant="subtitle1" 
                sx={{ 
                    color: 'text.secondary',
                    fontWeight: 500
                }}
            >
                {title}
            </Typography>
        </Paper>
    );
};

export default StatCard; 