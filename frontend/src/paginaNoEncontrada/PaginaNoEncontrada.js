import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaginaNoEncontrada.css';

const PaginaNoEncontrada = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate('/home');
    }, 4000); 
    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <div className="not-found-page">
      <h1 className="error-code">404</h1>
      <h2 className="error-message-page">Página no encontrada</h2>
      <p>Lo sentimos, la página que buscas no existe.</p>
      <p>Serás redirigido al inicio en unos segundos...</p>
    </div>
  );
};

export default PaginaNoEncontrada;
