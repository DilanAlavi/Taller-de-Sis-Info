import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaUser } from 'react-icons/fa'; 
import { AuthContext } from '../AuthContext';
import logo from '../components/Imagenes/soloLogo.png';
import facebookLogo from '../components/Imagenes/facebook.png';
import instagramLogo from '../components/Imagenes/instragram.png';
import whatsappLogo from '../components/Imagenes/whatsApp.png';
import AlertDialog from '../popups/popupGenerico/PopupGenerico.js';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');

  const popupRef = useRef(null);
  const popupRefMenu = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target) && !event.target.closest('.user-img')) {
        setIsUserOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRefMenu.current && !popupRefMenu.current.contains(event.target) && !event.target.closest('.menu-button')) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRefMenu]);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserOptions = () => {
    setIsUserOpen(!isUserOpen);
  };

  const doLogout = () => {
    setIsUserOpen(false);
    setAlertMessage("Sesión cerrada exitosamente.");
    setAlertType('success');
    setAlertOpen(true);
    // navigate('/login');
    logout();
  };

  const goPerfilUser = () => {
    setIsUserOpen(false)
    navigate('/user');
  }

  return (
    <header className="header">
      <div>
        <div className="navbar-brand">
          <Link to="/home">
            <div className='logo'>
              <img src={logo} alt="Only Lost Pets Logo" className="brand-logo" />
              <span className="brand-title">Only Lost Dogs</span>
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
        
        <div className="navbar" ref={popupRefMenu}>
          <nav>
            <button className="menu-button" onClick={toggleMenu}>
              <FaBars />
            </button>

            <ul className={`navbar-list ${isMenuOpen ? 'active' : ''}`}>
              <li className="navbar-item"><Link to="/paginaperrovisto">Perritos vistos</Link></li>
              <li className="navbar-item"><Link to="/paginaperroperdido">Perritos perdidos</Link></li>
              <li className="navbar-item"><Link to="/dog-recognition">Reconocimiento de Razas</Link></li>

              { user && user.rol_id === 2 && (
                <li className="navbar-item"><Link to="/report-list">Reportes</Link></li>
              )}
              
              <li className="navbar-item"><Link to="/recaudacionFondos">Donaciones</Link></li>
              {user === null ? (
                <li className="navbar-item"><Link to="/login">Login</Link></li>
              ) : (
                <>
                  <li className="navbar-item" onClick={toggleUserOptions}>
                      <FaUser className='user-img' size={24} />
                  </li>

                  { isUserOpen && (
                    <div className='menu-user-open' ref={popupRef}>
                      <li onClick={goPerfilUser}>Perfil</li>
                      <li onClick={doLogout}>Cerrar Sesión</li>
                    </div>
                  )}

                </>
              )}
            </ul>
          </nav>    
        </div>
      </div>
      <AlertDialog
          isOpen={alertOpen}
          message={alertMessage}
          type={alertType}
          onClose={() => {
            setAlertOpen(false);
            navigate('/login');
          }}
        />
    </header>
    
  );
};


export default Header;
