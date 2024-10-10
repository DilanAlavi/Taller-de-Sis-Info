import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      <h1>Información Importante</h1>
      
      {/* Aquí podrías mostrar los datos cargados */}
      {data ? (
        data.map((perro) => (
          <div key={perro.id}>
            <h2>{perro.nombre}</h2>
            <p>{perro.descripcion}</p>
          </div>
        ))
      ) : (
        <p>Cargando información...</p>
      )}

      {/* Resto del contenido */}
      <div>
        <h2>Su perro está perdido</h2>
        <p>
          Puede buscar en la sección de perros perdidos utilizando los filtros de búsqueda por características como raza, color, y otros detalles específicos. 
          También puede optar por la búsqueda por reconocimiento de imágenes. Si encuentra a su perro en la lista de perros perdidos, haga clic en el botón 
          "Ver información de contacto" para acceder al teléfono y correo de la persona que lo encontró. Si no encuentra a su perro en los resultados, tiene 
          la opción de registrarlo (<a href="/registro">regístrese aquí</a>) para que la foto y detalles de su perro aparezcan en la página de perros perdidos, 
          facilitando así que las personas se comuniquen con usted.
        </p>
      </div>

      <div>
        <h2>Encontró un perro</h2>
        <p>
          Puede agregar información sobre un perro encontrado en la sección correspondiente, incluyendo características como raza, color y una fotografía, además 
          de detalles adicionales (lugar, descripciones del perro, etc.). Utilice el formulario para registrar al perro que ha encontrado. Asegúrese de verificar 
          la información antes de registrar.
        </p>
      </div>

      <div>
        <h2>Recompensas publicadas</h2>
        <p>
          Solo Perritos Perdidos permite que los dueños de mascotas perdidas incluyan el monto de la recompensa por la recuperación de su perro en sus publicaciones.
        </p>
      </div>
    </div>
  );
};

export default InfoPerros;
