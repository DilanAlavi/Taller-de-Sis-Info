import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../src/AuthContext';
import './errorPage.css';

const ErrorPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    if (!token) {
      // Si no hay usuario (es decir, no ha iniciado sesión), redirige a la página de inicio de sesión después de unos segundos
      setTimeout(() => {
        navigate('/login');
      }, 6000); 
    }
  }, [token, navigate]);

  return (
    <div className="error-page">
      <h1>Acceso denegado</h1>
      <p>No estás autenticado. Necesitas iniciar sesión para acceder a esta página.</p>
      <p>Serás redirigido a la página de inicio de sesión en unos segundos...</p>
    </div>
  );
};

export default ErrorPage;
