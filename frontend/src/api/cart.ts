import { api } from './client';

export const addToCart = async (productId: string, quantity: number) => {
  const response = await api.post('/cart/items', { productId, quantity });
  return response.data;
};

export const getCart = async () => {
  const response = await api.get('/cart');
  return response.data.cart;
};

export const updateCartItem = async (itemId: string, quantity: number) => {
  const response = await api.put(`/cart/items/${itemId}`, { quantity });
  return response.data;
};

export const removeCartItem = async (itemId: string) => {
  const response = await api.delete(`/cart/items/${itemId}`);
  return response.data;
};