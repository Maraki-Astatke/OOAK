import { api } from './client';

export const uploadProductImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await api.post('/upload/product', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  // The backend returns { url: "/uploads/products/..." }
  // We need to prepend the backend URL to make it a full image link
  const fullUrl = `http://localhost:5004${response.data.url}`;
  return fullUrl;
};