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
      <div className="contenedor">
        <img
          src="/images/notfound.png"
          alt="Lost Dog Icon"
          className="error-icon"
        />
        <h1 className="error-code">404</h1>
        <h2 className="error-message-page">Oops, no encontramos esta página</h2>
        <p>La página que estás buscando no existe o fue movida.</p>
      </div>
    </div>
  );
};

export default PaginaNoEncontrada;
