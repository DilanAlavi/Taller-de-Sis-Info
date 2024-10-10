import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { AuthContext } from '../../AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/auth/login', {
        correo: email,
        password: password
      });

      login(response.data)
      console.log(response.data);
      alert('Login exitoso');
      navigate('/home');

    } catch (error) {
      console.error('Error en login:', error.response.data);
      alert('Error en login: ' + error.response.data.detail);
    }
  };

  return (
    <div className="login-container">
      <img className='image-login' src={`${process.env.PUBLIC_URL}/images/perros-home.jpg`} alt='perritos en un campo'/>
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Iniciar Sesión</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* <button type="submit">Entrar</button> */}

        <button className='dog-button'>
          <span class="shadow-button"></span>
          <span class="edge-button"></span>
          <span class="front-button text-button"> Iniciar Sesion
          </span>
        </button>

        <div className="login-prompt">
          <p className='registro-text'>¿Aun no tienes cuenta? <Link to="/register">Registrate</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Login;