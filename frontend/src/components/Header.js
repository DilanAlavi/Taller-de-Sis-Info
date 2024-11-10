import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaUser } from 'react-icons/fa'; 
import { AuthContext } from '../AuthContext';
import logo from '../components/Imagenes/soloLogo.png';
import facebookLogo from '../components/Imagenes/facebook.png';
import instagramLogo from '../components/Imagenes/instragram.png';
import whatsappLogo from '../components/Imagenes/whatsApp.png';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div>
        <div className="navbar-brand">
          <Link to="/home">
            <div className='logo'>
              <img src={logo} alt="Only Lost Pets Logo" className="brand-logo" />
              <span className="brand-title">Only Lost Pets</span>
            </div>
          </Link>
          <div className="social-icons">
            <a href="https://www.facebook.com/p/jhulians-garcia-hinojosa-100001069936007/?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
              <img src={facebookLogo} alt="Facebook" className="social-logo" />
            </a>
            <a href="https://wa.me/67559550" target="_blank" rel="noopener noreferrer">
              <img src={whatsappLogo} alt="WhatsApp" className="social-logo" />
            </a>
            <a href="https://www.instagram.com/jhuls_garcia?igsh=YjVibnQ0dnh5Zmlr" target="_blank" rel="noopener noreferrer">
              <img src={instagramLogo} alt="Instagram" className="social-logo" />
            </a>
          </div>
        </div>
        
        <div className="navbar">
          <nav>
            <button className="menu-button" onClick={toggleMenu}>
              <FaBars />
            </button>

            <ul className={`navbar-list ${isMenuOpen ? 'active' : ''}`}>
              <li className="navbar-item"><Link to="/paginaperrovisto">Perritos vistos</Link></li>
              <li className="navbar-item"><Link to="/paginaperroperdido">Perritos perdidos</Link></li>
              <li className="navbar-item"><Link to="/ia">Clasificador IA</Link></li>
              <li className="navbar-item"><Link to="/dog-recognition">Reconocimiento de Razas</Link></li>
              <li className="navbar-item"><Link to="/perfil-user">Usuario</Link></li>
              {user === null ? (
                <li className="navbar-item"><Link to="/login">Login</Link></li>
              ) : (
                <>
                  <li className="navbar-item"><Link to="home" onClick={logout}>Cerrar Sesión</Link></li>
                  <li className="navbar-item">
                    <Link to="/user" onClick={() => console.log("Navegando a la página de usuario")}>
                      <FaUser size={24} />
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
