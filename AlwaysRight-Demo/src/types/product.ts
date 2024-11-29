export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
}

export interface ProductFilter {
  search?: string;
  category?: string;
  status?: 'active' | 'inactive';
  minPrice?: number;
  maxPrice?: number;
} 