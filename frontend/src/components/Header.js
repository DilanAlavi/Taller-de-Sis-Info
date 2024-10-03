import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa'; 
const Header = () => {
  return (
    <header className="header">
      <div className="navbar">
        <div className="navbar-brand">
          <span className="brand-title">Only Lost Pets</span>
        </div>
        <nav>
          <ul className="navbar-list">
            <li className="navbar-item"><Link to="/home">Home</Link></li>
            <li className="navbar-item"><Link to="/login">Login</Link></li>
            <li className="navbar-item"><Link to="/register">Register</Link></li>
            <li className="navbar-item"><Link to="/perritoperdidoform">Vi un Perrito Perdido</Link></li>
            <li className="navbar-item"><Link to="/ia">Clasificador IA</Link></li>
            <li className="navbar-item"><Link to="/dog-recognition">Reconocimiento de Razas</Link></li>
            <li className="navbar-item">
              <Link to="/user" onClick={() => console.log("Navegando a la página de usuario")}>
                <FaUser size={24} />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
