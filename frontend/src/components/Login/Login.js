import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { AuthContext } from '../../AuthContext';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { api_url } from '../../config';
import { setCorreo } from '../../localStorageHelper';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext)
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const { setcorreoUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);


  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Alternar visibilidad de contraseña
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'El correo no puede estar vacío';
    if (email.length > 75) return 'El correo no puede exceder 75 caracteres';
    if (!emailRegex.test(email)) return 'El formato del correo no es válido';
    return null;
  };

  

  const validateFields = () => {
    const emailError = validateEmail(email);

    setErrors({
      email: emailError,
    });

    return !emailError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCorreo('TL_xsrf', email);

    if (!validateFields()) return; 

    try {
      const response = await axios.post(`${api_url}/auth/login`, {
        correo: email,
        password: password
      });

      login(response.data)
      console.log(response.data);
      alert('Login exitoso');
      navigate('/home');

    } catch (error) {
      console.error('Error en login:', error.response.data);
      // alert('Error en login: ' + error.response.data.detail);
      if (error.response?.status === 404) {
        // El correo no está registrado en el sistema
        setErrors({
          ...errors,
          general: 'La cuenta no existe, regístrese por favor.',
        });
      } else if (error.response?.status === 401) {
        // Las credenciales son incorrectas
        setErrors({
          ...errors,
          general: 'Usuario y contraseña incorrecta.',
        });
      } else {
        // Otro error
        setErrors({
          ...errors,
          general: 'Ocurrió un error inesperado. Inténtelo de nuevo más tarde.',
        });
      }
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

        {errors.email && <small style={{fontSize:'0.5rem'}} className="error-message">{errors.email}</small>}

        <div className="password-container">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="toggle-password"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        </div>


        {errors.password && (
          <small className="error-message">{errors.password}</small>
        )}

        {errors.general && (
          <small className="error-message">{errors.general}</small>
        )}
        {/* <button type="submit">Entrar</button> */}

        <button className='dog-button'>
          <span className="shadow-button"></span>
          <span className="edge-button"></span>
          <span className="front-button text-button"> Iniciar Sesion
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