import { api } from './client';
import type { Product } from '../types';

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get('/products');
  // The backend returns { products: [...] }
  return response.data.products;
};