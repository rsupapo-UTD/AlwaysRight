export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  items: {
    id: string;
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    subtotal: number;
  }[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  shippingAddress: string;
  paymentMethod: string;
}

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';
