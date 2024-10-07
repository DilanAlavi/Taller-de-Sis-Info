import React, { useEffect, useState, useContext } from 'react';
import './User.css';
import { AuthContext } from '../../AuthContext';

const User = () => {
  const { user } = useContext(AuthContext);
  const [newData, setNewData] = useState( user || {} );
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (user) {
      // Actualizamos los datos del usuario logueado
      setNewData(user);
    }
  }, [user]);

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
    // const updatedUserData = { ...newData };
    // setUserData(updatedUserData);
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
          value={newData.correo ? newData.correo : ""}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={newData.nombre ? newData.nombre : ""}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="numero"
          placeholder="Número de Teléfono"
          value={newData.num_celular ? newData.num_celular : ""}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={newData.direccion ? newData.direccion : ""}
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
      {newData.foto && (
        <div className="user-photo">
          <h3>Foto de Perfil:</h3>
          <img src={URL.createObjectURL(newData.foto)} alt="Foto de perfil" />
        </div>
      )}
    </div>
  );
};

export default User;
