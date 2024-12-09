import React, { useEffect, useState, useContext } from 'react';
import './User.css';
import { AuthContext } from '../../AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const { user } = useContext(AuthContext);
  const [actualUser, setActualUser] = useState(null);
  const { edit } = useContext(AuthContext);
  const [newData, setNewData] = useState({});
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const user_data = async () => {
    console.log("entra aca")
    try {
      const user_response = await axios.get(`http://localhost:8000/users/${user.id}`);
      setActualUser(user_response.data)
    if (actualUser) {
      setNewData(actualUser);
      setLoading(false);
    }
    } catch (error) {
      console.log("Error al obtener usuario:", error)
    }
  }




  useEffect(() => {
    if(loading) { user_data() }     
  });



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
      const {id, nombre, rol_id} = response.data;
      edit({id, nombre, rol_id})

      setSuccessMessage('Datos actualizados exitosamente');
    } catch (error) {
      setError('Error al actualizar los datos');
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar tu cuenta? Esta acción es irreversible y se eliminaran todos tus datos, incluyendo a los perros reportados.")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/users/delete/${user.id}`);
        navigate("/home"); 
        logout(); 
        setSuccessMessage("Cuenta eliminada exitosamente");
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
        <button id="update-button" type="submit" className="update-button">
              Actualizar Datos
        </button>
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

      {loading && (
        <div className="loading-message">
          <span>Cargando usuario...</span>
          <div className="spinner"></div>
        </div>
      )}

     </div>
  );
};

export default User; 
