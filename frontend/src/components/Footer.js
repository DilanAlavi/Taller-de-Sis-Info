import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <table className="footer-table">
          <tbody>
            <tr>
              <td>
                <Link to="/home" className="footer-link">Home</Link>
              </td>
              <td>
                <Link to="/dog-recognition" className="footer-link">Reconocimiento de Razas</Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/PerritoPerdidoForm" className="footer-link">Reporta un Perrito Perdido</Link>
              </td>
              <td>
                <Link to="/PerritoVistoForm" className="footer-link">Reporta un Perrito Visto</Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/contacto" className="footer-link">Contacto</Link>
              </td>
              <td>
                <Link to="/infoPerros" className="footer-link">Información</Link>
              </td>
            </tr>
          </tbody>
        </table>
        <p>© 2024 Only Lost Pets. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
