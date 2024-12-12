import axios from 'axios';
import { Navigate } from 'react-router-dom';
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../AuthContext';
import { api_url } from '../../config';

const ProtectedRoute = ({ element }) => {
  const { logout } = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Estado para controlar la autenticación
  const token = localStorage.getItem('access_token');
  const { correoUser } = useContext(AuthContext);

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsAuthenticated(false);
        return;
      }
      try {
        await axios.get(`${api_url}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { correo: correoUser },
        });
        setIsAuthenticated(true); 
      } catch (error) {
        console.log('Token vencido');
        logout(); 
        setIsAuthenticated(false);
      }
    };

    validateToken();
  }, [token, logout]);

  if (isAuthenticated === null) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="spinner" style={{ width: '50px', height: '50px', border: '5px solid #ccc', borderTop: '5px solid #007bff', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/errorPage" replace />;
  }
  return element;
};

export default ProtectedRoute;

const styles = `
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`;
document.head.insertAdjacentHTML('beforeend', `<style>${styles}</style>`);
