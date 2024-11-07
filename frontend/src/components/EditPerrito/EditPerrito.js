import React, { useState, useEffect, useContext  } from 'react';
import './EditPerro.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { AuthContext } from '../../AuthContext';

const EditPerro = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [perro, setPerro] = useState(null);
  const [formData, setFormData] = useState({}); 
  const navigate = useNavigate();

  useEffect(() => {

    const fetchPerro = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/perritos/${id}`);
        setPerro(response.data);
        setFormData({
          nombre: response.data.nombre,
          raza: response.data.raza,
          color: response.data.color,
          genero: response.data.genero,
          descripcion: response.data.estado.descripcion,
          direccion_visto: response.data.estado.direccion_visto,
          fecha: response.data.estado.fecha,
        });
      } catch (error) {
        console.error("Error al obtener los datos del perro:", error);
      }
    };
    fetchPerro();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.put(`http://localhost:8000/perritos/${id}`, {
        nombre: formData.nombre,
        raza: formData.raza,
        color: formData.color,
        genero: formData.genero,
        descripcion: formData.descripcion,
        direccion_visto: formData.direccion_visto,
        fecha: formData.fecha,
      }, {
        headers: {
          'X-User-ID': user.id.toString(), 
        }
      });

      console.log("Perrito actualizado exitosamente:", response.data);
      alert('Los cambios fueron guardados exitosamente.');
      navigate(`/perrito/${id}`); 
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
      alert('Hubo un error al guardar los cambios.');
    }
  };

  if (!perro) {
    return <p>Cargando datos del perro...</p>;
  }

  return (
    <div className="perfil-perro-page">
      <FaArrowLeft onClick={() => navigate(-1)} />
      <div className="perfil-perro-container">
        <div className="perfil-perro">
          {perro.foto.length > 0 ? (
            <img src={`http://127.0.0.1:8000/imagen/${perro.foto[0].direccion_foto}`} alt={`Foto de ${perro.nombre}`} className="perro-foto" />
          ) : (
            <img src="/path/to/placeholder-image.jpg" alt="Imagen no disponible" className="perro-foto" />
          )}

          <form onSubmit={handleFormSubmit} className="perfil-perro-form">
            <div>
              <label>Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Raza:</label>
              <select
                name="raza"
                value={formData.raza}
                onChange={handleInputChange}
              >
                <option value="golden">Golden</option>
                <option value="chapi">Chapi</option>
                <option value="bulldog">Bulldog</option>
                <option value="pastor aleman">Pastor Alemán</option>
                <option value="pitbul">Pitbull</option>
                <option value="cocker">Cocker</option>
              </select>
            </div>
            <div>
              <label>Género:</label>
              <select
                name="genero"
                value={formData.genero}
                onChange={handleInputChange}
              >
                <option value="macho">Macho</option>
                <option value="hembra">Hembra</option>
              </select>
            </div>
            <div>
              <label>Color:</label>
              <select
                name="color"
                value={formData.color}
                onChange={handleInputChange}
              >
                <option value="cafe">Cafe</option>
                <option value="blanco">Blanco</option>
                <option value="beige">Beige</option>
                <option value="negro">Negro</option>
              </select>
            </div>
            <div>
              <label>Descripción:</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Dirección Vista:</label>
              <input
                type="text"
                name="direccion_visto"
                value={formData.direccion_visto}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Fecha de pérdida:</label>
              <input
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit">Guardar Cambios</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPerro;
