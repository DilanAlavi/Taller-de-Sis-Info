import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [numero, setNumero] = useState('');
  const [direccion, setDireccion] = useState('');
  // const [foto, setFoto] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const formData = new FormData();
    formData.append('correo', email);
    formData.append('password', password);
    formData.append('nombre', nombre);
    formData.append('numero', numero);
    formData.append('direccion', direccion);
    // if (foto) {
    //   formData.append('foto', foto);
    // }

    try {
      const response = await axios.post('http://localhost:8000/auth/register', {
        correo: email,
        nombre: nombre,
        password: password,
        num_celular: numero,
        direccion: direccion
      });
      console.log(response.data);
      alert('Registro exitoso');
      navigate('/home');
    } catch (error) {
      console.error('Error en registro:', error);
      setError(error.response?.data?.detail || 'Error en el registro. Por favor, intente de nuevo.');
    }
  };

  return (
    <div className="register-container">
      <img className='image-login' src={`${process.env.PUBLIC_URL}/images/perros-home.jpg`} alt='perritos en un campo'/>
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Registro</h2>
        {error && <p className="error-message">{error}</p>}
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
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Número de Teléfono"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Dirección"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          required
        />
        {/* <input
          type="file"
          accept="image/*"
          onChange={(e) => setFoto(e.target.files[0])}
        /> */}

        <button className='dog-button'>
          <span className="shadow-button"></span>
          <span className="edge-button"></span>
          <span className="front-button text-button">Registrarse
          </span>
        </button>

        <div className="login-prompt">
          <p className='iniciar-sesion-text'>¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Register;
