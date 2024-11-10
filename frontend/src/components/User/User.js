import React, { useEffect, useState, useContext } from 'react';
import './User.css';
import { AuthContext } from '../../AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const { user } = useContext(AuthContext);
  const { edit } = useContext(AuthContext);
  const [newData, setNewData] = useState(user || {});
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { deleteUser } = useContext(AuthContext);
  const { navigate } = useNavigate();


  useEffect(() => {
    if (user) {
      setNewData(user);
    }
    console.log(user.id)
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    

    try {
      const response = await axios.put(`http://127.0.0.1:8000/users/edit/${user.id}`, {
        correo: newData.correo,
        nombre: newData.nombre,
        num_celular: newData.num_celular,
        direccion: newData.direccion
      });
      console.log(response.data)
      edit(response.data)

      setSuccessMessage('Datos actualizados exitosamente');
    } catch (error) {
      setError('Error al actualizar los datos');
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar tu cuenta? Esta acción es irreversible.")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/users/delete/${user.id}`);
        deleteUser(); 
        setSuccessMessage("Cuenta eliminada exitosamente");
        navigate("/"); 
      } catch (error) {
        setError("Error al eliminar la cuenta");
        console.error("Error al eliminar el usuario:", error);
      }
    }
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
          value={newData.correo || ''}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={newData.nombre || ''}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="num_celular"
          placeholder="Número de Teléfono"
          value={newData.num_celular || ''}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={newData.direccion || ''}
          onChange={handleChange}
          required
        />
        <button type="submit">Actualizar Datos</button>
      </form>

      <button onClick={handleDelete} className="delete-button">
        Eliminar Cuenta
      </button>
      {/* {newData.foto && (
        <div className="user-photo">
          <h3>Foto de Perfil:</h3>
          <img src={URL.createObjectURL(newData.foto)} alt="Foto de perfil" />
        </div>
      )} */}
     </div>
  );
};

export default User; 
