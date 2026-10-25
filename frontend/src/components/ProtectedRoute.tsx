import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute({ allowedRoles }: { allowedRoles: string[] }) {
  // For now, we will just check if a token exists. 
  // Later, we will decode the JWT to check the role.
  const token = localStorage.getItem('accessToken');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Note: We will add real role checking once we build the Auth Context.
  return <Outlet />;
}