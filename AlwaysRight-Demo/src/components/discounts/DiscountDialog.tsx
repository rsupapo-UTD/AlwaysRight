import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box
} from '@mui/material';
import { Discount } from '../../types/discount';

interface DiscountDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  formData: Partial<Discount>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Discount>>>;
  isEditing: boolean;
}

export default function DiscountDialog({
  open,
  onClose,
  onSave,
  formData,
  setFormData,
  isEditing
}: DiscountDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditing ? 'Edit Discount' : 'Create New Discount'}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField
            label="Discount Code"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            fullWidth
            required
          />

          <FormControl fullWidth required>
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
            label={formData.type === 'percentage' ? 'Percentage Value' : 'Fixed Amount'}
            type="number"
            value={formData.value}
            onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
            fullWidth
            required
          />

          <TextField
            label="Start Date"
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="End Date"
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Minimum Purchase"
            type="number"
            value={formData.minimumPurchase}
            onChange={(e) => setFormData({ ...formData, minimumPurchase: Number(e.target.value) })}
            fullWidth
          />

          <TextField
            label="Maximum Uses"
            type="number"
            value={formData.maxUses}
            onChange={(e) => setFormData({ ...formData, maxUses: Number(e.target.value) })}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
} 