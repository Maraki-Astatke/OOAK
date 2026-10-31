import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });
      login(response.data.accessToken, response.data.user);
      
      // Redirect based on role
      if (response.data.user.role === 'ADMIN') {
        navigate('/admin/add-product'); // Take admin to dashboard
      } else {
        navigate('/'); // Take customer to home
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-silver">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md bg-white p-8 rounded-sm shadow-2xl">
          <h1 className="text-4xl font-serif text-brand-burgundy mb-2 text-center">Welcome Back</h1>
          <p className="text-brand-grey text-center mb-8 font-sans">Sign in to your OOAK account</p>

          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-sm mb-6 text-sm text-center border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-brand-burgundy mb-2">Email</label>
              <input 
                type="email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-brand-burgundy"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-brand-burgundy mb-2">Password</label>
              <input 
                type="password" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-brand-burgundy"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-brand-burgundy text-white py-4 rounded-sm font-bold tracking-widest uppercase hover:bg-brand-burgundy-dark transition-colors mt-4"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-brand-grey mt-6 text-sm">
            Don't have an account? <Link to="/register" className="text-brand-burgundy font-bold hover:underline">Sign up</Link>
          </p>
        </div>
      </main>
    </div>
  );
}