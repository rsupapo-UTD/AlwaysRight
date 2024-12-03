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
  Stack,
  CircularProgress,
  Alert,
  SelectChangeEvent
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  LocalOffer as LocalOfferIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon
} from '@mui/icons-material';
import DashboardLayout from '../components/layouts/DashboardLayout';

// 添加类型定义
type DiscountType = 'percentage' | 'fixed';

interface Discount {
  id: string;
  code: string;
  type: DiscountType;
  value: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'scheduled';
  minimumPurchase?: number;
  maxUses?: number;
  currentUses: number;
  applicableProducts: string[];
}

// 添加模拟数据
const initialDiscounts: Discount[] = [
  {
    id: '1',
    code: 'CS4347',
    type: 'percentage',
    value: 20,
    startDate: '2024-03-01',
    endDate: '2024-06-30',
    status: 'active',
    minimumPurchase: 100,
    maxUses: 100,
    currentUses: 45,
    applicableProducts: []
  },
  {
    id: '2',
    code: 'ALWAYSRIGHT',
    type: 'percentage',
    value: 50,
    startDate: '2024-01-01',
    endDate: '2024-01-02',
    status: 'expired',
    minimumPurchase: 200,
    maxUses: 50,
    currentUses: 50,
    applicableProducts: []
  },
  {
    id: '3',
    code: 'BLACKFRIDAY',
    type: 'fixed',
    value: 100,
    startDate: '2024-11-29',
    endDate: '2024-11-30',
    status: 'scheduled',
    minimumPurchase: 500,
    maxUses: 200,
    currentUses: 0,
    applicableProducts: []
  }
];

export default function DiscountsPage() {
  // 将所有状态声明放在组件顶部
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState<Discount | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Omit<Discount, 'id' | 'status'>>({
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
    // 首次加载时初始化数据
    const initializeData = () => {
      try {
        // 强制使用新的初始数据
        localStorage.setItem('discounts', JSON.stringify(initialDiscounts));
        setDiscounts(initialDiscounts);
      } catch (error) {
        console.error('Error loading discounts:', error);
        setDiscounts(initialDiscounts);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  // 添加加载状态的显示
  if (loading) {
    return (
      <DashboardLayout>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <CircularProgress />
          </Box>
        </Container>
      </DashboardLayout>
    );
  }

  // 添加新折扣按钮处理函数
  const handleAddClick = () => {
    console.log("Add button clicked");
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
    setOpenDialog(true);
  };

  // 编辑按钮处理函数
  const handleEditClick = (discount: Discount) => {
    console.log("Edit button clicked", discount);
    setEditingDiscount(discount);
    setFormData({
      code: discount.code,
      type: discount.type,
      value: discount.value,
      startDate: discount.startDate,
      endDate: discount.endDate,
      minimumPurchase: discount.minimumPurchase || 0,
      maxUses: discount.maxUses || 0,
      currentUses: discount.currentUses,
      applicableProducts: discount.applicableProducts
    });
    setOpenDialog(true);
  };

  // 删除按钮处理函数
  const handleDeleteClick = (id: string) => {
    console.log("Delete button clicked", id);
    if (window.confirm('Are you sure you want to delete this discount?')) {
      const updatedDiscounts = discounts.filter(d => d.id !== id);
      setDiscounts(updatedDiscounts);
      localStorage.setItem('discounts', JSON.stringify(updatedDiscounts));
    }
  };

  // 对话框关闭处理函数
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

  // 保存处理函数
  const handleSave = () => {
    console.log("Save clicked", formData);
    
    if (!formData.code || !formData.value || !formData.startDate || !formData.endDate) {
      alert('Please fill in all required fields');
      return;
    }

    const newDiscount: Discount = {
      id: editingDiscount?.id || Date.now().toString(),
      ...formData,
      status: getDiscountStatus(formData.startDate, formData.endDate),
      currentUses: editingDiscount?.currentUses || 0,
    };

    const updatedDiscounts = editingDiscount
      ? discounts.map(d => d.id === editingDiscount.id ? newDiscount : d)
      : [...discounts, newDiscount];

    setDiscounts(updatedDiscounts);
    localStorage.setItem('discounts', JSON.stringify(updatedDiscounts));
    handleCloseDialog();
  };

  // 渲染部分
  return (
    <DashboardLayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* 标题和添加按钮 */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4">
            Discount Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddClick}
          >
            Add Discount
          </Button>
        </Box>

        {/* 折扣列表表格 */}
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
                  <TableCell>{discount.type}</TableCell>
                  <TableCell>
                    {discount.type === 'percentage' ? `${discount.value}%` : `$${discount.value}`}
                  </TableCell>
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
                    <IconButton 
                      onClick={() => handleEditClick(discount)}
                      size="small"
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      onClick={() => handleDeleteClick(discount.id)}
                      size="small"
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* 添加/编辑折扣对话框 */}
        <Dialog 
          open={openDialog} 
          onClose={handleCloseDialog}
          maxWidth="md" 
          fullWidth
        >
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
                  onChange={(e: SelectChangeEvent<'percentage' | 'fixed'>) => {
                    setFormData({ ...formData, type: e.target.value as DiscountType });
                  }}
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

// 辅助函数
const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'success';
    case 'expired': return 'error';
    case 'scheduled': return 'warning';
    default: return 'default';
  }
};

const getDiscountStatus = (startDate: string, endDate: string) => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (now < start) return 'scheduled';
  if (now > end) return 'expired';
  return 'active';
};