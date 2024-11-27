import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importa Link de react-router-dom
import axios from 'axios';
import './InfoPerros.css';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';
const InfoPerros = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/perros-perdidos');
        setData(response.data);
      } catch (error) {
        console.error('Error al cargar los datos', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="info-page">
      <h1 className="info-page-title">Información Importante</h1>
      
      {data ? (
        <div className="perros-list">
          {data.map((perro) => (
            <div key={perro.id} className="perro-item">
              <h2 className="perro-nombre">{perro.nombre}</h2>
              <p className="perro-descripcion">{perro.descripcion}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="loading-text">Cargando información...</p>
      )}

      <div className="info-section">
        <h2 className="section-title">Su perro está perdido</h2>
        <p className="section-content">
          Puede buscar en la sección de perros perdidos utilizando los filtros de búsqueda por características como raza, color, y otros detalles específicos. 
          También puede optar por la búsqueda por reconocimiento de imágenes. Si encuentra a su perro en la lista de perros perdidos, haga clic en el botón 
          "Ver información de contacto" para acceder al teléfono y correo de la persona que lo encontró. Si no encuentra a su perro en los resultados, tiene 
          la opción de registrarlo (<Link to="/PerritoPerdidoForm" className="register-link">regístrese aquí</Link>) para que la foto y detalles de su perro aparezcan en la página de perros perdidos, 
          facilitando así que las personas se comuniquen con usted.
        </p>
      </div>

      <div className="info-section">
        <h2 className="section-title">Encontró un perro</h2>
        <p className="section-content">
          Puede agregar información sobre un perro encontrado en la sección correspondiente, incluyendo características como raza, color y una fotografía, además 
          de detalles adicionales (lugar, descripciones del perro, etc.). Utilice el formulario para registrar al perro que ha encontrado. Asegúrese de verificar 
          la información antes de registrar.
        </p>
      </div>

      <div className="info-section">
        <h2 className="section-title">Recompensas publicadas</h2>
        <p className="section-content">
          Solo Perritos Perdidos permite que los dueños de mascotas perdidas incluyan el monto de la recompensa por la recuperación de su perro en sus publicaciones.
        </p>
      </div>
    </div>
  );
};

export default InfoPerros;
