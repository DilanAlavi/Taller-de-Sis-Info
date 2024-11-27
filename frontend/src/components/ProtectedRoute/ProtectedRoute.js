import React from 'react';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('access_token');
  console.log("esto es el token:", token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;
