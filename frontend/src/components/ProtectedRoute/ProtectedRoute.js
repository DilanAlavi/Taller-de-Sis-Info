import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';

// Componente de ruta protegida
const ProtectedRoute = ({ element, ...rest }) => {
  const { user } = useContext(AuthContext);

  // Si el usuario no está autenticado, redirige al login
  if (!user) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
