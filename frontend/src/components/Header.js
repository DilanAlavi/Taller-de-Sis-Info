import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa'; 
import { AuthContext } from '../AuthContext';
import logo from '../components/Imagenes/soloLogo.png';

const Header = () => {
  const { user } = useContext(AuthContext)
  const { logout } = useContext(AuthContext)

  return (
    <header className="header">
      <div >
        <div className="navbar-brand">
        <Link to="/home">
          <div className='logo'>
            <img src={logo} alt="Only Lost Pets Logo" className="brand-logo" />
            <span className="brand-title">Only Lost Pets</span>
          </div>
        </Link>
          {/* <li className="navbar-item">
              <Link to="/user" onClick={() => console.log("Navegando a la página de usuario")}>
                <FaUser size={24} />
              </Link>
          </li> */}
        </div>
        <div className="navbar">
          <nav>
            <ul className="navbar-list">
              <li className="navbar-item"><Link to="/paginaperrovisto">Perritos vistos</Link></li>
              <li className="navbar-item"><Link to="/paginaperroperdido">Perritos perdidos</Link></li>
              <li className="navbar-item"><Link to="/perritovistoform">Vi a un perrito</Link></li>
              <li className="navbar-item"><Link to="/perritoperdidoform">Perdí mi Perrito</Link></li>
              <li className="navbar-item"><Link to="/ia">Clasificador IA</Link></li>
              <li className="navbar-item"><Link to="/dog-recognition">Reconocimiento de Razas</Link></li>
              {
                user === null
                ? (<li className="navbar-item"><Link to="/login">Login</Link></li>
                ) : (
                  <>
                  <li className='navbar-item'><Link to="home" onClick={logout}>Cerrar Sesion</Link></li>
                  <li className="navbar-item">
                    <Link to="/user" onClick={() => console.log("Navegando a la página de usuario")}>
                      <FaUser size={24} />
                    </Link>
                  </li>
                  </>)  
              }
            </ul>
          </nav>

        </div>
      </div>
    </header>
  );
};

export default Header;
