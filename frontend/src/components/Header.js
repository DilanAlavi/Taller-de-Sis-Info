import React from 'react';
import { Link } from 'react-router-dom';

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
            <li className="navbar-item"><Link to="/user">User</Link></li>
            <li className="navbar-item"><Link to="/ia">Clasificador IA</Link></li>
            <li className="navbar-item"><Link to="/dog-recognition">Reconocimiento de Razas</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
