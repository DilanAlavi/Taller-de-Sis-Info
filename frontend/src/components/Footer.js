import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className='footer-container'>
        <div className="footer-links">
          <Link to="/home" className="footer-link">Home</Link>
          <Link to="/dog-recognition" className="footer-link">Reconocimiento de Razas</Link>
          <Link to="/PerritoPerdidoForm" className="footer-link">Reporta un Perrito Perdido</Link>
          <Link to="/PerritoVistoForm" className="footer-link">Reporta un Perrito Visto</Link>
          <Link to="/contacto" className="footer-link">Contacto</Link>
          <Link to="/infoPerros" className="footer-link">Información</Link>
        </div>
        <p>© 2024 Only Lost Pets. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
