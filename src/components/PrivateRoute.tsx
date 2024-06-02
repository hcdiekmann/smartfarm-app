import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/provider/AuthProvider';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  console.log(user);
  return user ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
