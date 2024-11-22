import React, { useState, useEffect } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  Analytics,
  People,
  Settings,
  Help
} from '@mui/icons-material';
import NavMenu from './NavMenu';
import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/router';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
  { text: 'Analytics', icon: <Analytics />, path: '/analytics' },
  { text: 'Customers', icon: <People />, path: '/customers' },
  { text: 'Settings', icon: <Settings />, path: '/settings' },
  { text: 'Help', icon: <Help />, path: '/help' }
] as const;  // 添加 as const 使类型更严格

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  // 移除 Auth0 相关代码
  const isAuthenticated = true; // 临时设置
  const isLoading = false; // 临时设置

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // 移除认证相关的检查
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar 
        position="sticky" 
        color="inherit" 
        elevation={0}
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
          backdropFilter: 'blur(6px)',
          backgroundColor: 'rgba(255, 255, 255, 0.8)'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton 
              edge="start" 
              onClick={toggleDrawer} 
              sx={{ mr: 2 }}
              size="large"
            >
              <MenuIcon />
            </IconButton>
            <Typography 
              variant="h6" 
              sx={{ 
                background: 'linear-gradient(45deg, #2563eb, #10b981)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                fontWeight: 700
              }}
            >
              AlwaysRight Analytics
            </Typography>
          </Box>
          <NavMenu />
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Menu</Typography>
        </Box>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => {
                  router.push(item.path);
                  toggleDrawer();
                }}
                selected={router.pathname === item.path}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
        {children}
      </Container>
    </Box>
  );
};

export default DashboardLayout; 