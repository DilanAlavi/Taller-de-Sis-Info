import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import PerritoPerdidoForm from './components/PerritoPerdido/PerritoPerdidoForm';
import User from './components/User/User';
import IA from './components/IA/IA';
import DogRecognition from './components/DogRecognition/DogRecognition';
import { FaUser } from 'react-icons/fa'; // Importamos el ícono de usuario de react-icons
import './App.css';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="navbar-brand">
            <button className="menu-button" onClick={toggleMenu}>
              &#9776; {/* Ícono de hamburguesa */}
            </button>
            <span className="brand-title">Only Lost Pets</span>
          </div>
          <ul className={`navbar-list ${isMenuOpen ? 'open' : ''}`}>
            <li className="navbar-item"><Link to="/home">Home</Link></li>
            <li className="navbar-item"><Link to="/login">Login</Link></li>
            <li className="navbar-item"><Link to="/register">Register</Link></li>
            <li className="navbar-item"><Link to="/perritoperdidoform">Vi un Perrito Perdido</Link></li>
            <li className="navbar-item"><Link to="/ia">Clasificador IA</Link></li>
            <li className="navbar-item"><Link to="/dog-recognition">Reconocimiento de Razas</Link></li>
            <li className="navbar-item user-icon">
              <Link to="/user">
                <img src="/images/default-user.png" alt="User" className="user-avatar" />
              </Link>
            </li>


          </ul>
        </nav>

        <header className="App-header">
          <h1>Only Lost Pets & Reconocimiento de Razas de Perros</h1>
        </header>

        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/perritoperdidoform" element={<PerritoPerdidoForm />} />
            <Route path="/ia" element={<IA />} />
            <Route path="/dog-recognition" element={<DogRecognition />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;