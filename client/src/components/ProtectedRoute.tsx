import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/context';
    
interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
