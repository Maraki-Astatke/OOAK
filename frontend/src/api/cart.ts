import { api } from './client';

export const addToCart = async (productId: string, quantity: number) => {
  const response = await api.post('/cart/items', { productId, quantity });
  return response.data;
};

export const getCart = async () => {
  const response = await api.get('/cart');
  return response.data.cart;
};