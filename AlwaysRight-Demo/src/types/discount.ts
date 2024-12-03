export type DiscountStatus = 'active' | 'inactive' | 'expired';

export interface Discount {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  startDate: string;
  endDate: string;
  minimumPurchase?: number;
  maxUses?: number;
  currentUses: number;
  status: DiscountStatus;
  applicableProducts: string[];
} 