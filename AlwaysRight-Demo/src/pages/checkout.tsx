import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  Divider,
  Select,
  MenuItem,
  InputLabel,
  Alert
} from '@mui/material';
import DashboardLayout from '../components/layouts/DashboardLayout';

interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isPrimary: boolean;
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  paymentMethod: string;
  shippingAddress: Address;
  orderDate: string;
  paymentStatus: 'paid' | 'pending' | 'failed';
}

export default function Checkout() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [formData, setFormData] = useState({
    cardNumber: '',
    name: '',
    cvv: '',
    expirationDate: '',
    routingNumber: '',
    accountNumber: '',
    thirdPartyLogin: ''
  });

  // 加载用户地址
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userAddresses = user.addresses || [];
    setAddresses(userAddresses);
    
    // 如果有主要地址，自动选择它
    const primaryAddress = userAddresses.find((addr: Address) => addr.isPrimary);
    if (primaryAddress) {
      setSelectedAddress(primaryAddress.id);
    }
  }, []);

  const handlePayment = () => {
    if (!selectedAddress) {
      alert('Please select a shipping address');
      return;
    }

    // 模拟订单创建
    const selectedAddressDetails = addresses.find(addr => addr.id === selectedAddress);
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const total = cartItems.reduce((sum: number, item: OrderItem) => 
      sum + (item.price * item.quantity), 0
    );

    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      userId: JSON.parse(localStorage.getItem('user') || '{}').id || 'guest',
      items: cartItems,
      total: total,
      status: 'pending',
      paymentMethod: paymentMethod,
      shippingAddress: selectedAddressDetails!,
      orderDate: new Date().toISOString(),
      paymentStatus: 'paid'
    };

    // 保存订单到 localStorage
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    localStorage.setItem('orders', JSON.stringify([...existingOrders, newOrder]));

    // 清空购物车
    localStorage.setItem('cart', '[]');

    // 显示成功消息并跳转到订单页面
    alert('Order placed successfully!');
    router.push('/orders');
  };

  return (
    <DashboardLayout>
      <Container maxWidth="md">
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Checkout
          </Typography>

          {/* 地址选择部分 */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Shipping Address
            </Typography>
            {addresses.length > 0 ? (
              <FormControl fullWidth>
                <InputLabel>Select Address</InputLabel>
                <Select
                  value={selectedAddress}
                  onChange={(e) => setSelectedAddress(e.target.value)}
                  label="Select Address"
                >
                  {addresses.map((address) => (
                    <MenuItem key={address.id} value={address.id}>
                      {address.name} - {address.street}, {address.city}, {address.state} {address.zipCode}
                      {address.isPrimary && ' (Primary)'}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <Alert severity="warning" sx={{ mt: 2 }}>
                No shipping addresses found. Please add an address in your profile.
              </Alert>
            )}
          </Paper>

          {/* 支付方式部分 */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Payment Method
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel value="card" control={<Radio />} label="Credit/Debit Card" />
                <FormControlLabel value="wire" control={<Radio />} label="Wire Transfer" />
                <FormControlLabel value="thirdParty" control={<Radio />} label="Third Party" />
              </RadioGroup>
            </FormControl>

            {paymentMethod === 'card' && (
              <Box sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Card Number"
                  margin="normal"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                />
                <TextField
                  fullWidth
                  label="Name on Card"
                  margin="normal"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <TextField
                    label="CVV"
                    value={formData.cvv}
                    onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                  />
                  <TextField
                    label="Expiration Date"
                    value={formData.expirationDate}
                    onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
                    placeholder="MM/YY"
                  />
                </Box>
              </Box>
            )}

            {paymentMethod === 'wire' && (
              <Box sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Routing Number"
                  margin="normal"
                  value={formData.routingNumber}
                  onChange={(e) => setFormData({ ...formData, routingNumber: e.target.value })}
                />
                <TextField
                  fullWidth
                  label="Account Number"
                  margin="normal"
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                />
              </Box>
            )}

            {paymentMethod === 'thirdParty' && (
              <Box sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Third Party Account"
                  margin="normal"
                  value={formData.thirdPartyLogin}
                  onChange={(e) => setFormData({ ...formData, thirdPartyLogin: e.target.value })}
                />
              </Box>
            )}

            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={handlePayment}
              sx={{ mt: 3 }}
            >
              Complete Payment
            </Button>
          </Paper>
        </Box>
      </Container>
    </DashboardLayout>
  );
} 