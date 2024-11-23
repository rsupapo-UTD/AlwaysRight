import React from 'react';
import { Box, Typography, Paper, Avatar } from '@mui/material';
import DashboardLayout from '../components/layouts/DashboardLayout';

export default function Profile() {
  const mockUser = {
    name: 'Test User',
    email: 'test@example.com',
    picture: 'https://via.placeholder.com/150'
  };

  return (
    <DashboardLayout>
      <Box sx={{ p: 3 }}>
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar
              src={mockUser.picture}
              sx={{ width: 100, height: 100, mr: 3 }}
            />
            <Box>
              <Typography variant="h4" gutterBottom>
                {mockUser.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {mockUser.email}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body1">
            Profile details will be added here.
          </Typography>
        </Paper>
      </Box>
    </DashboardLayout>
  );
} 