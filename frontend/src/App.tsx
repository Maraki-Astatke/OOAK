import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddProduct from './pages/admin/AddProduct';


function Login() {
  return (
    <div className="text-brand-burgundy font-serif text-center mt-20 text-4xl">
      Login Page (Coming Soon)
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
      </Routes>
    </Router>
  );
}

export default App;