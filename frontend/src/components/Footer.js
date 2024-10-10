import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <ul className="footer-list">
        <li className="footer-list-item">
          <Link to="/contacto" className="footer-link">Contacto</Link>
        </li>
        <li className="footer-list-item">
          <Link to="/infoPerros" className="footer-link">Información</Link>
        </li>
      </ul>
      <p>© 2024 Only Lost Pets. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;
