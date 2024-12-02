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
  Divider,
  Badge
  
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  LocalOffer,
  People,
  Settings,
  Help,
  Inventory,
  ShoppingCart,
  Notifications
} from '@mui/icons-material';
import NavMenu from './NavMenu';
import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/router';
import CartDrawer from '../cart/CartDrawer';
import { useCart } from '../../context/CartContext';
import { People as PeopleIcon } from '@mui/icons-material';


interface DashboardLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
  { text: 'Products', icon: <Inventory />, path: '/products' },
  { text: 'Orders', icon: <ShoppingCart />, path: '/orders' },
  { text: 'Users', icon: <PeopleIcon />, path: '/users' },
  { text: 'Discounts', icon: <LocalOffer />, path: '/analytics' },
  { text: 'Settings', icon: <Settings />, path: '/settings' },
  { text: 'Help', icon: <Help />, path: '/help' }
] as const;  // 添加 as const 使类型更严格

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const router = useRouter();
  // 移除 Auth0 相关代码
  const isAuthenticated = true; // 临时设置
  const isLoading = false; // 临时设置
  const { cartItems } = useCart();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // 移除认证相关的检查
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
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

      {/* Main content */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <AppBar 
          position="fixed" 
          color="default"
          elevation={1}
          sx={{ 
            ml: '240px', 
            width: `calc(100% - 240px)`,
          }}
        >
          <Toolbar sx={{ justifyContent: 'flex-end' }}>
            {/* 右侧图标 */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* 购物车图标 */}
              <IconButton color="inherit" onClick={() => setCartOpen(true)}>
                <Badge badgeContent={cartItems.length} color="primary">
                  <ShoppingCart />
                </Badge>
              </IconButton>

              {/* 通知图标 */}
              <IconButton color="inherit">
                <Badge badgeContent={4} color="error">
                  <Notifications />
                </Badge>
              </IconButton>

              {/* 用户头像菜单 */}
              <NavMenu />
            </Box>
          </Toolbar>
        </AppBar>

        {/* Toolbar spacing */}
        <Toolbar />

        {/* Main content area */}
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1,
            p: 3,
            overflow: 'auto',
            backgroundColor: (theme) => theme.palette.grey[100]
          }}
        >
          {children}
        </Box>
      </Box>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
      />
    </Box>
  );
};

export default DashboardLayout; 