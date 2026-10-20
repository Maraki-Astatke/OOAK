export interface User {
  id: string;
  email: string;
  name: string | null;
  role: 'CUSTOMER' | 'PARTNER' | 'ADMIN';
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: string; // Prisma Decimal comes as string
  stock: number;
  images: string[];
  isActive: boolean;
  isPreOrder: boolean;
  category?: Category;
}

export interface CartItem {
  id: string;
  quantity: number;
  product: Product;
}

export interface Cart {
  id: string;
  items: CartItem[];
}