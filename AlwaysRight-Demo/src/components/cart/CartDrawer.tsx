import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Divider,
  Avatar,
  useTheme
} from '@mui/material';
import { Close as CloseIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useCart } from '../../context/CartContext';
import { useRouter } from 'next/router';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl?: string;
  }>;
}

export default function CartDrawer({ open, onClose, items }: CartDrawerProps) {
  const { removeFromCart } = useCart();
  const router = useRouter();
  const theme = useTheme();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    onClose();
    router.push('/checkout');
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: 400 },
          px: 2,
        },
      }}
    >
      {/* Header */}
      <Box sx={{ 
        py: 2, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between' 
      }}>
        <Typography variant="h6">Shopping Cart</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Divider />

      {/* Cart Items */}
      {items.length === 0 ? (
        <Box sx={{ 
          py: 8, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          gap: 2 
        }}>
          <Typography variant="subtitle1" color="text.secondary">
            Your cart is empty
          </Typography>
          <Button 
            variant="contained" 
            onClick={onClose}
          >
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <>
          <List sx={{ flex: 1, overflow: 'auto' }}>
            {items.map((item) => (
              <ListItem key={item.id} sx={{ py: 2 }}>
                <Avatar 
                  src={item.imageUrl} 
                  variant="rounded" 
                  sx={{ 
                    mr: 2,
                    width: 60,
                    height: 60,
                    bgcolor: theme.palette.grey[200]
                  }}
                >
                  {item.name[0]}
                </Avatar>
                <ListItemText
                  primary={item.name}
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </Typography>
                      <Typography variant="subtitle2" color="primary">
                        ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton 
                    edge="end" 
                    onClick={() => removeFromCart(item.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>

          {/* Footer */}
          <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              mb: 2 
            }}>
              <Typography variant="subtitle1">Total:</Typography>
              <Typography variant="subtitle1" fontWeight="bold">
                ${total.toFixed(2)}
              </Typography>
            </Box>
            <Button 
              variant="contained" 
              fullWidth 
              size="large"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </>
      )}
    </Drawer>
  );
} 