import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AddProduct from './pages/admin/AddProduct';
import { useAuth } from './context/AuthContext';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
// Protected Route Component
function AdminRoute() {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="min-h-screen flex items-center justify-center text-brand-burgundy font-serif text-2xl">Loading...</div>;
  if (!user || user.role !== 'ADMIN') return <Navigate to="/login" replace />;
  
  return <Outlet />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
        {/* Admin Protected Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin/add-product" element={<AddProduct />} />
        </Route>
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;