import { api } from './client';
import type { Product } from '../types';

export const getProducts = async (search?: string): Promise<Product[]> => {
  // If a search term exists, add it to the URL as a query parameter (?search=...)
  const url = search ? `/products?search=${encodeURIComponent(search)}` : '/products';
  const response = await api.get(url);
  return response.data.products;
};