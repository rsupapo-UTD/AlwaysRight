import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Avatar,
  TextField,
  Button,
  Grid,
  Snackbar,
  Alert,
  Card,
  CardContent,
  CardActions,
  Radio,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Divider
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  PhotoCamera,
  Home as HomeIcon,
  LocationOn,
  Dashboard as DashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
  LocalOffer as LocalOfferIcon,
  Inventory as InventoryIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
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

interface UserData {
  name: string;
  email: string;
  phone: string;
  picture: string;
  addresses: Address[];
}

export default function Profile() {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    phone: '',
    picture: '',
    addresses: []
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [openAddressDialog, setOpenAddressDialog] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [newAddress, setNewAddress] = useState<Omit<Address, 'id' | 'isPrimary'>>({
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setUserData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      picture: user.picture || 'https://via.placeholder.com/150',
      addresses: user.addresses || []
    });
  }, []);

  const handleSave = () => {
    const updatedUser = {
      ...JSON.parse(localStorage.getItem('user') || '{}'),
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      picture: userData.picture,
      addresses: userData.addresses
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setIsEditing(false);
    setShowSuccess(true);
  };

  const handleAddAddress = () => {
    const address: Address = {
      id: Date.now().toString(),
      ...newAddress,
      isPrimary: userData.addresses.length === 0
    };
    
    const updatedAddresses = [...userData.addresses, address];
    
    setUserData(prev => ({
      ...prev,
      addresses: updatedAddresses
    }));
    
    const updatedUser = {
      ...JSON.parse(localStorage.getItem('user') || '{}'),
      addresses: updatedAddresses
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    setOpenAddressDialog(false);
    setNewAddress({
      name: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      phone: ''
    });
    setShowSuccess(true);
  };

  const handleSetPrimaryAddress = (addressId: string) => {
    const updatedAddresses = userData.addresses.map(addr => ({
      ...addr,
      isPrimary: addr.id === addressId
    }));
    
    setUserData(prev => ({
      ...prev,
      addresses: updatedAddresses
    }));
    
    const updatedUser = {
      ...JSON.parse(localStorage.getItem('user') || '{}'),
      addresses: updatedAddresses
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const handleDeleteAddress = (addressId: string) => {
    const updatedAddresses = userData.addresses.filter(addr => addr.id !== addressId);
    
    setUserData(prev => ({
      ...prev,
      addresses: updatedAddresses
    }));
    
    const updatedUser = {
      ...JSON.parse(localStorage.getItem('user') || '{}'),
      addresses: updatedAddresses
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setShowSuccess(true);
  };

  return (
    <DashboardLayout>
      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* 基本信息卡片 */}
        <Paper sx={{ p: 4, mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={userData.picture}
                sx={{ 
                  width: 100, 
                  height: 100,
                  cursor: 'pointer'
                }}
              />
              <input
                accept="image/*"
                type="file"
                id="icon-button-file"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      const base64String = reader.result as string;
                      setUserData(prev => ({
                        ...prev,
                        picture: base64String
                      }));
                      
                      // 更新 localStorage
                      const updatedUser = {
                        ...JSON.parse(localStorage.getItem('user') || '{}'),
                        picture: base64String
                      };
                      localStorage.setItem('user', JSON.stringify(updatedUser));
                      setShowSuccess(true);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                style={{ display: 'none' }}
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  sx={{
                    position: 'absolute',
                    bottom: -10,
                    right: -10,
                    backgroundColor: 'background.paper',
                    '&:hover': {
                      backgroundColor: 'background.default'
                    }
                  }}
                >
                  <PhotoCamera />
                </IconButton>
              </label>
            </Box>
            <Box sx={{ ml: 3 }}>
              <Typography variant="h4" gutterBottom>
                {isEditing ? 'Edit Profile' : 'Profile'}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Manage your personal information
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                value={userData.name}
                disabled={!isEditing}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                value={userData.email}
                disabled={!isEditing}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                value={userData.phone}
                disabled={!isEditing}
                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              {isEditing ? (
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button variant="contained" onClick={handleSave}>
                    Save Changes
                  </Button>
                  <Button onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </Box>
              ) : (
                <Button variant="contained" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              )}
            </Grid>
          </Grid>
        </Paper>

        {/* 地址管理部分 */}
        <Paper sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5">Shipping Addresses</Typography>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              onClick={() => setOpenAddressDialog(true)}
            >
              Add New Address
            </Button>
          </Box>

          <Grid container spacing={3}>
            {userData.addresses.map((address) => (
              <Grid item xs={12} md={6} key={address.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Radio
                        checked={address.isPrimary}
                        onChange={() => handleSetPrimaryAddress(address.id)}
                      />
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {address.name} {address.isPrimary && '(Primary)'}
                      </Typography>
                    </Box>
                    <Typography variant="body2">{address.street}</Typography>
                    <Typography variant="body2">
                      {address.city}, {address.state} {address.zipCode}
                    </Typography>
                    <Typography variant="body2">{address.country}</Typography>
                    <Typography variant="body2">Phone: {address.phone}</Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton onClick={() => handleDeleteAddress(address.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* 添加地址对话框 */}
        <Dialog 
          open={openAddressDialog} 
          onClose={() => setOpenAddressDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Add New Address</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={newAddress.name}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, name: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Street Address"
                  value={newAddress.street}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, street: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="City"
                  value={newAddress.city}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, city: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="State/Province"
                  value={newAddress.state}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, state: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="ZIP/Postal Code"
                  value={newAddress.zipCode}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, zipCode: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Country"
                  value={newAddress.country}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, country: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={newAddress.phone}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, phone: e.target.value }))}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAddressDialog(false)}>Cancel</Button>
            <Button onClick={handleAddAddress} variant="contained">Add Address</Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={showSuccess}
          autoHideDuration={6000}
          onClose={() => setShowSuccess(false)}
        >
          <Alert severity="success" sx={{ width: '100%' }}>
            Profile updated successfully!
          </Alert>
        </Snackbar>
      </Container>
    </DashboardLayout>
  );
}