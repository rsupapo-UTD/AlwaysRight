import React from 'react';
import { Box, Typography } from '@mui/material';
import DashboardLayout from '../components/layouts/DashboardLayout';

export default function Analytics() {
  return (
    <DashboardLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Analytics Page
        </Typography>
        <Typography variant="body1">
          This page is under construction.
        </Typography>
      </Box>
    </DashboardLayout>
  );
} 