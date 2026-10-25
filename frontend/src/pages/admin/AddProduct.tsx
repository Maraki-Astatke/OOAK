import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadProductImage } from '../../api/upload';
import { api } from '../../api/client';

export default function AddProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    stock: '0',
    isPreOrder: false,
  });
  
  const [imageUrl, setImageUrl] = useState('');

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadProductImage(file);
      setImageUrl(url);
    } catch (error) {
      alert('Failed to upload image. Are you logged in as Admin?');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) return alert('Please upload an image first.');
    
    setLoading(true);
    try {
      await api.post('/products', {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        images: [imageUrl],
      });
      alert('Product created successfully!');
      navigate('/'); // Go back to home to see it
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  // Auto-generate slug from name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    setFormData({ ...formData, name, slug });
  };

  return (
    <div className="min-h-screen bg-brand-silver py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-sm shadow-xl">
        <h1 className="text-3xl font-serif text-brand-burgundy mb-8">Add New Product</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-bold text-brand-burgundy mb-2">Product Image</label>
            <div className="border-2 border-dashed border-gray-300 p-4 rounded-sm text-center">
              {imageUrl ? (
                <div className="relative">
                  <img src={imageUrl} alt="Preview" className="h-40 mx-auto object-cover rounded-sm" />
                  <button type="button" onClick={() => setImageUrl('')} className="text-sm text-red-500 mt-2">Remove</button>
                </div>
              ) : (
                <div>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
                  <label htmlFor="image-upload" className="cursor-pointer text-brand-grey hover:text-brand-burgundy">
                    {uploading ? 'Uploading...' : 'Click to upload an image'}
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-brand-burgundy mb-2">Product Name</label>
              <input type="text" required value={formData.name} onChange={handleNameChange} className="w-full border p-3 rounded-sm" />
            </div>
            <div>
              <label className="block text-sm font-bold text-brand-burgundy mb-2">Price ($)</label>
              <input type="number" step="0.01" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full border p-3 rounded-sm" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-brand-burgundy mb-2">Description</label>
            <textarea required rows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full border p-3 rounded-sm" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-brand-burgundy mb-2">Stock</label>
              <input type="number" required value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} className="w-full border p-3 rounded-sm" />
            </div>
            <div className="flex items-center mt-6">
              <input type="checkbox" checked={formData.isPreOrder} onChange={(e) => setFormData({ ...formData, isPreOrder: e.target.checked })} className="w-5 h-5 accent-brand-burgundy" />
              <label className="ml-2 text-sm font-bold text-brand-burgundy">Mark as Pre-Order</label>
            </div>
          </div>

          <button type="submit" disabled={loading || uploading} className="w-full bg-brand-burgundy text-white py-4 rounded-sm font-bold tracking-widest uppercase hover:bg-brand-burgundy-dark transition-colors">
            {loading ? 'Creating...' : 'Create Product'}
          </button>
        </form>
      </div>
    </div>
  );
}