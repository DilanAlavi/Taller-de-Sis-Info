import React, { useState, useEffect, useContext  } from 'react';
import './EditPerro.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { AuthContext } from '../../AuthContext';
import { api_url } from '../../config';

const EditPerro = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [perro, setPerro] = useState(null);
  const [formData, setFormData] = useState({}); 
  const navigate = useNavigate();

  useEffect(() => {

    const fetchPerro = async () => {
      try {
        const response = await axios.get(`${api_url}/perritos/${id}`);
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

      const response = await axios.put(`${api_url}/perritos/${id}`, {
        nombre: formData.nombre,
        raza: formData.raza,
        color: formData.color,
        genero: formData.genero,
        estado: {
          descripcion: formData.descripcion,
          direccion_visto: formData.direccion_visto,
          fecha: formData.fecha
        }
      }, {
        headers: {
          'X-User-ID': user.id.toString(), 
        }
      });

      console.log("id usuario:", user.id.toString());
      console.log("Perrito actualizado exitosamente:", response.data);
      alert('Los cambios fueron guardados exitosamente.');
      navigate(`/paginaperrovisto`, { state: { perro: perro } } ); 
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
            <img src={`${api_url}/imagen/${perro.foto[0].direccion_foto}`} alt={`Foto de ${perro.nombre}`} className="perro-foto" />
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
                <option value="Golden">Golden</option>
                <option value="Chapi">Chapi</option>
                <option value="Bulldog">Bulldog</option>
                <option value="Pastor Aleman">Pastor Alemán</option>
                <option value="Pitbul">Pitbull</option>
                <option value="Cocker Spaniel">Cocker</option>
              </select>
            </div>
            <div>
              <label>Género:</label>
              <select
                name="genero"
                value={formData.genero}
                onChange={handleInputChange}
              >
                <option value="M">Macho</option>
                <option value="H">Hembra</option>
              </select>
            </div>
            <div>
              <label>Color:</label>
              <select
                name="color"
                value={formData.color}
                onChange={handleInputChange}
              >
                <option value="Cafe">Cafe</option>
                <option value="Blanco">Blanco</option>
                <option value="Beige">Beige</option>
                <option value="Negro">Negro</option>
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
            <button type="submit" className='boton-cambios'>Guardar Cambios</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPerro;
