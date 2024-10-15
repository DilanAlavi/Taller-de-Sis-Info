import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/contacto" className="footer-link">Contacto</Link>
        <Link to="/infoPerros" className="footer-link">Información</Link>
      </div>
      <p>© 2024 Only Lost Pets. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;
