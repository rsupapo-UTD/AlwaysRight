export interface Statistics {
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
}

export interface SalesData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    tension: number;
  }[];
}

export interface TopProduct {
  ProductName: string;
  total_revenue: number;
}

export interface OrderStatus {
  OrderStatus: string;
  count: number;
}
