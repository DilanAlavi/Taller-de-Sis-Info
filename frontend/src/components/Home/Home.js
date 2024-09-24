import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Bienvenido a la página de inicio</h1>
      <p>Has iniciado sesión correctamente.</p>
      <Link to="/register">
        <button className="start-button">Comenzar</button>
      </Link>
    </div>
    
  );
};

export default Home;
