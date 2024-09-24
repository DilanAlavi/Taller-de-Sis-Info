import React, { useEffect, useState } from 'react';
import './User.css';

const User = () => {
  const [userData, setUserData] = useState({
    correo: 'usuario@ejemplo.com',
    nombre: 'Juan Pérez',
    numero: '1234567890',
    direccion: 'Calle Falsa 123',
    foto: null,
  });
  
  const [newData, setNewData] = useState({ ...userData });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Simulamos la carga de datos del usuario
    const fetchUserData = () => {
      // Aquí podrías hacer la llamada a la API para obtener datos
      setUserData(userData);
      setNewData(userData);
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setNewData((prevData) => ({
      ...prevData,
      foto: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Simulamos la actualización de datos
    const updatedUserData = { ...newData };
    setUserData(updatedUserData);
    setSuccessMessage('Datos actualizados exitosamente');
    
    // Limpiar el mensaje de éxito después de 3 segundos
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <div className="user-container">
      <h2>Perfil del Usuario</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit} className="user-form">
        <input
          type="email"
          name="correo"
          placeholder="Email"
          value={newData.correo}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={newData.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="numero"
          placeholder="Número de Teléfono"
          value={newData.numero}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={newData.direccion}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <button type="submit">Actualizar Datos</button>
      </form>
      {userData.foto && (
        <div className="user-photo">
          <h3>Foto de Perfil:</h3>
          <img src={URL.createObjectURL(userData.foto)} alt="Foto de perfil" />
        </div>
      )}
    </div>
  );
};

export default User;
