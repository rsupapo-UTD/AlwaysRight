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
  Badge,
  Menu,
  Button
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
import DigitalRain from '../effects/DigitalRain';
import TechBackground from '../effects/TechBackground';


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
  const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'New Order',
      message: 'New order #1234 received',
      type: 'info',
      createdAt: new Date().toISOString(),
      read: false
    },
    {
      id: '2',
      title: 'Stock Alert',
      message: 'Product "iPhone 15 Pro" is running low on stock',
      type: 'warning',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      read: false
    },
    {
      id: '3',
      title: 'Payment Confirmed',
      message: 'Payment for order #1233 has been confirmed',
      type: 'success',
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      read: true
    }
  ]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  // 移除认证相关的检查
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
      <TechBackground />
      
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            background: '#ffffff',
            position: 'relative',
            overflow: 'hidden',
            zIndex: 1200
          },
        }}
      >
        <DigitalRain opacity={0.2} />
        <Box sx={{ 
          p: 2, 
          display: 'flex', 
          alignItems: 'center', 
          background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
          color: 'white',
          position: 'relative',
          zIndex: 1
        }}>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 600,
              letterSpacing: 1,
              background: 'linear-gradient(90deg, #ffffff 0%, #e2e8f0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            AlwaysRight
          </Typography>
        </Box>
        <Divider />
        <List sx={{ position: 'relative', zIndex: 1 }}>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => {
                  router.push(item.path);
                  toggleDrawer();
                }}
                selected={router.pathname === item.path}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(59, 130, 246, 0.08)',
                    '&:hover': {
                      backgroundColor: 'rgba(59, 130, 246, 0.12)',
                    }
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(59, 130, 246, 0.04)',
                  }
                }}
              >
                <ListItemIcon 
                  sx={{ 
                    color: router.pathname === item.path ? '#3b82f6' : 'inherit'
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  sx={{
                    '& .MuiTypography-root': {
                      color: router.pathname === item.path ? '#3b82f6' : 'inherit',
                      fontWeight: router.pathname === item.path ? 600 : 400
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main content */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          position: 'relative',
          zIndex: 1,
          backgroundColor: 'transparent'
        }}
      >
        {/* Gradient line */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 33%, #10b981 66%, #f59e0b 100%)',
            zIndex: 1200
          }}
        />
        <AppBar 
          position="fixed" 
          sx={{ 
            ml: '240px', 
            width: `calc(100% - 240px)`,
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)',
            color: 'text.primary',
            boxShadow: 'none',
            borderBottom: '1px solid',
            borderColor: 'divider',
            zIndex: 1100
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
              <IconButton color="inherit" onClick={handleNotificationClick}>
                <Badge 
                  badgeContent={notifications.filter(n => !n.read).length} 
                  color="error"
                >
                  <Notifications />
                </Badge>
              </IconButton>

              {/* 通知菜单 */}
              <Menu
                anchorEl={notificationAnchor}
                open={Boolean(notificationAnchor)}
                onClose={handleNotificationClose}
                PaperProps={{
                  sx: {
                    width: 360,
                    maxHeight: 480,
                    overflow: 'auto'
                  }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="h6">Notifications</Typography>
                  {notifications.some(n => !n.read) && (
                    <Button 
                      size="small" 
                      onClick={handleMarkAllAsRead}
                      variant="text"
                      color="primary"
                    >
                      Mark all as read
                    </Button>
                  )}
                </Box>
                <Divider />
                <List>
                  {notifications.map((notification) => (
                    <ListItem
                      key={notification.id}
                      onClick={() => handleMarkAsRead(notification.id)}
                      sx={{
                        bgcolor: notification.read ? 'transparent' : 'action.hover',
                        '&:hover': {
                          bgcolor: 'action.hover',
                        },
                        cursor: 'pointer'
                      }}
                    >
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="subtitle2">{notification.title}</Typography>
                            {!notification.read && (
                              <Box
                                sx={{
                                  width: 8,
                                  height: 8,
                                  borderRadius: '50%',
                                  bgcolor: 'primary.main',
                                }}
                              />
                            )}
                          </Box>
                        }
                        secondary={
                          <>
                            <Typography variant="body2" color="text.secondary">
                              {notification.message}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {new Date(notification.createdAt).toLocaleString()}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Menu>

              {/* 用户头像菜单 */}
              <NavMenu />
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main content area */}
        <Box 
          sx={{ 
            flexGrow: 1,
            p: 3,
            mt: 8,
            position: 'relative',
            zIndex: 1
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