import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [numero, setNumero] = useState('');
  const [direccion, setDireccion] = useState('');
  const [error, setError] = useState({});
  const [showPasswordHint, setShowPasswordHint] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // Restricts phone number to only digits
  const handleNumeroChange = (e) => {
    const numericValue = e.target.value.replace(/\D/g, '');
    setNumero(numericValue);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validatePassword = (pw) => {
    const errors = [];
    if (pw.length < 8) errors.push('Mínimo 8 caracteres');
    if (!/[A-Z]/.test(pw)) errors.push('Al menos una mayúscula');
    if (!/[a-z]/.test(pw)) errors.push('Al menos una minúscula');
    if (!/\d/.test(pw)) errors.push('Al menos un número');
    if (!/[@#$%&*]/.test(pw)) errors.push('Un carácter especial');
    return errors;
  };

  const validateForm = async () => {
    const errors = {};
  
    // Email validation
    if (!email.trim()) {
      errors.email = 'El correo no puede estar vacío.';
    } else if (email.length > 75) {
      errors.email = 'El correo no puede superar los 75 caracteres.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Debe estar en un formato válido (usuario@dominio.com).';
    } 
  
    // Password validation
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      errors.password = passwordErrors.join(', ');
    }
  
    // Phone number validation
    if (!numero.trim()) {
      errors.numero = 'El número de celular no puede estar vacío.';
    } else if (!/^\d+$/.test(numero)) {
      errors.numero = 'El número de celular solo puede contener dígitos.';
    } else if (numero.length < 8 || numero.length > 15) {
      errors.numero = 'El número de celular debe tener entre 8 y 15 dígitos.';
    }
  
    // Name validation
    if (!nombre.trim()) {
      errors.nombre = 'El nombre no puede estar vacío.';
    }
  
    // Address validation
    if (!direccion.trim()) {
      errors.direccion = 'La dirección no puede estar vacía.';
    }
  
    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');
    setSuccessMessage('');

    const isValid = await validateForm();
    if (!isValid) return;

    try {
      const response = await axios.post('http://localhost:8000/auth/register', {
        correo: email,
        nombre: nombre,
        password: password,
        num_celular: numero,
        direccion: direccion
      });
      
      // Mostrar mensaje de éxito
      setSuccessMessage('¡Registro exitoso! Serás redirigido a la página principal.');
      
      // Redirigir después de un breve retraso para mostrar el mensaje
      setTimeout(() => {
        navigate('/login');
      }, 1000);

    } catch (error) {
      console.error('Error en registro:', error);
      setGeneralError(error.response?.data?.detail || 'Error en el registro. Por favor, intente de nuevo.');
    }
  };

  return (
    <div className="register-container">
      <img className='image-login' src={`${process.env.PUBLIC_URL}/images/perros-home.jpg`} alt='perritos en un campo'/>
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Registro</h2>
        {generalError && <p className="error-message">{generalError}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {error.email && <span className="error-message">{error.email}</span>}
  
        <div className="password-container-register" style={{ position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setShowPasswordHint(true)}
            onBlur={() => setShowPasswordHint(false)}
            required
          />
          
          <button
            type="button"
            className="toggle-password-reg"
            onClick={togglePasswordVisibility}
            aria-label="Mostrar/Ocultar Contraseña"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>


        {showPasswordHint && (
          <div className="password-hint">
            La contraseña debe tener:
            <ul>
              <li>Mínimo 8 caracteres</li>
              <li>Al menos una letra mayúscula</li>
              <li>Al menos una letra minúscula</li>
              <li>Al menos un número</li>
              <li>Un carácter especial (@, #, $, %, &, *)</li>
            </ul>
          </div>
        )}
        {error.password && <span className="error-message">{error.password}</span>}

        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        {error.nombre && <span className="error-message">{error.nombre}</span>}

        <input
          type="text"
          placeholder="Número de Teléfono"
          value={numero}
          onChange={handleNumeroChange}
          required
        />
        {error.numero && <span className="error-message">{error.numero}</span>}

        <input
          type="text"
          placeholder="Dirección"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          required
        />
        {error.direccion && <span className="error-message">{error.direccion}</span>}

        <button className='dog-button'>
          <span className="shadow-button"></span>
          <span className="edge-button"></span>
          <span className="front-button text-button">Registrarse</span>
        </button>

        <div className="login-prompt">
          <p className='iniciar-sesion-text'>¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Register;