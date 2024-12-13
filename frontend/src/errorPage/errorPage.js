import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './errorPage.css';

const ErrorPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    if (!token) {
      const timeoutId = setTimeout(() => {
        navigate('/login');
      }, 4000);
      return () => clearTimeout(timeoutId);
    }
  }, [token, navigate]);

  return (
    <div className="error-page">
      <h1>Acceso denegado</h1>
      <p>No estás autenticado. Necesitas iniciar sesión para acceder a esta página.</p>
      <p>Serás redirigido a la página de inicio de sesión en unos segundos...</p>
      <img src="/images/acceso negado.png" alt="Error Negado" className="error-negado" />
    </div>
  );
};

export default ErrorPage;
