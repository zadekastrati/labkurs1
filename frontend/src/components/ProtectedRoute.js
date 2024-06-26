import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, loading, user } = useAuth();

  const userRole = user?.role;

  console.log('ProtectedRoute: isAuthenticated:', isAuthenticated, 'loading:', loading, 'userRole:', userRole); // Debug log
  console.log('requiredRole:', requiredRole); // Log requiredRole

  if (loading) {
    return <div>Loading...</div>; // Or a proper loading spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    console.log('User role does not match required role'); // Log mismatch
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
