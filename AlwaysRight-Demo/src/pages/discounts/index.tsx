import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  Stack
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  LocalOffer
} from '@mui/icons-material';
import DashboardLayout from '../../components/layouts/DashboardLayout';

interface Discount {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'scheduled';
  minimumPurchase?: number;
  maxUses?: number;
  currentUses: number;
  applicableProducts: string[];
}

export default function DiscountsPage() {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState<Discount | null>(null);
  const [formData, setFormData] = useState<Partial<Discount>>({
    code: '',
    type: 'percentage',
    value: 0,
    startDate: '',
    endDate: '',
    minimumPurchase: 0,
    maxUses: 0,
    currentUses: 0,
    applicableProducts: []
  });

  useEffect(() => {
    // 从 localStorage 加载折扣数据
    const savedDiscounts = JSON.parse(localStorage.getItem('discounts') || '[]');
    setDiscounts(savedDiscounts);
  }, []);

  const handleSave = () => {
    const newDiscount: Discount = {
      id: editingDiscount?.id || Date.now().toString(),
      ...formData as Discount,
      status: getDiscountStatus(formData.startDate!, formData.endDate!),
      currentUses: editingDiscount?.currentUses || 0
    };

    const updatedDiscounts = editingDiscount
      ? discounts.map(d => d.id === editingDiscount.id ? newDiscount : d)
      : [...discounts, newDiscount];

    setDiscounts(updatedDiscounts);
    localStorage.setItem('discounts', JSON.stringify(updatedDiscounts));
    handleCloseDialog();
  };

  const handleEdit = (discount: Discount) => {
    setEditingDiscount(discount);
    setFormData(discount);
    setOpenDialog(true);
  };

  const handleDelete = (id: string) => {
    const updatedDiscounts = discounts.filter(d => d.id !== id);
    setDiscounts(updatedDiscounts);
    localStorage.setItem('discounts', JSON.stringify(updatedDiscounts));
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingDiscount(null);
    setFormData({
      code: '',
      type: 'percentage',
      value: 0,
      startDate: '',
      endDate: '',
      minimumPurchase: 0,
      maxUses: 0,
      currentUses: 0,
      applicableProducts: []
    });
  };

  const getDiscountStatus = (startDate: string, endDate: string): Discount['status'] => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) return 'scheduled';
    if (now > end) return 'expired';
    return 'active';
  };

  const getStatusColor = (status: Discount['status']) => {
    switch (status) {
      case 'active': return 'success';
      case 'expired': return 'error';
      case 'scheduled': return 'warning';
      default: return 'default';
    }
  };

  return (
    <DashboardLayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4">
            Discount Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
            Add Discount
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Code</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Value</TableCell>
                <TableCell>Period</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Usage</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {discounts.map((discount) => (
                <TableRow key={discount.id}>
                  <TableCell>{discount.code}</TableCell>
                  <TableCell>
                    {discount.type === 'percentage' ? `${discount.value}%` : `$${discount.value}`}
                  </TableCell>
                  <TableCell>{discount.type}</TableCell>
                  <TableCell>
                    {new Date(discount.startDate).toLocaleDateString()} -
                    {new Date(discount.endDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={discount.status}
                      color={getStatusColor(discount.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {discount.currentUses} / {discount.maxUses || '∞'}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(discount)} size="small">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(discount.id)} size="small">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>
            {editingDiscount ? 'Edit Discount' : 'Add New Discount'}
          </DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Discount Code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              />
              
              <FormControl fullWidth>
                <InputLabel>Discount Type</InputLabel>
                <Select
                  value={formData.type}
                  label="Discount Type"
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as 'percentage' | 'fixed' })}
                >
                  <MenuItem value="percentage">Percentage</MenuItem>
                  <MenuItem value="fixed">Fixed Amount</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                type="number"
                label="Value"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
              />

              <TextField
                fullWidth
                type="date"
                label="Start Date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                fullWidth
                type="date"
                label="End Date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                fullWidth
                type="number"
                label="Minimum Purchase"
                value={formData.minimumPurchase}
                onChange={(e) => setFormData({ ...formData, minimumPurchase: Number(e.target.value) })}
              />

              <TextField
                fullWidth
                type="number"
                label="Maximum Uses"
                value={formData.maxUses}
                onChange={(e) => setFormData({ ...formData, maxUses: Number(e.target.value) })}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSave} variant="contained">
              {editingDiscount ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </DashboardLayout>
  );
} 