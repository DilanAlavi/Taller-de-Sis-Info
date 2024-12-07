import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importa Link de react-router-dom
import axios from 'axios';
import './InfoPerros.css';

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
      <h1 className="info-page-title">Only Lost Dogs</h1> {/* Cambio de título */}
      
      {data && (
        <div className="perros-list">
          {data.map((perro) => (
            <div key={perro.id} className="perro-item">
              <h2 className="perro-nombre">{perro.nombre}</h2>
              <p className="perro-descripcion">{perro.descripcion}</p>
            </div>
          ))}
        </div>
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
          la información antes de registrar. Puede acceder al formulario <Link to="/perritovistoform" className="register-link">aquí</Link>.
        </p>
      </div>

      <div className="info-section">
        <h2 className="section-title">Recompensas publicadas</h2>
        <p className="section-content">
            Only Lost Dogs permite que los dueños de mascotas perdidas incluyan el monto de la recompensa por la recuperación de su perro en sus publicaciones. Es importante destacar que la página no se hace responsable de la entrega o el manejo de las recompensas, ya que no se cobra comisión ni se gestiona el pago de las mismas. La decisión de ofrecer y otorgar una recompensa es exclusivamente responsabilidad del dueño del perro y de la persona que lo encuentre. Recomendamos a ambas partes actuar con honestidad y precaución para evitar posibles malentendidos.
        </p>
      </div>

      <div className="info-section">
        <h2 className="section-title">Búsqueda por reconocimiento de fotos</h2>
        <p className="section-content">
            Nuestra plataforma cuenta con una innovadora herramienta de búsqueda basada en reconocimiento de imágenes, diseñada para facilitar la localización de perros perdidos mediante la subida de una fotografía. 
            Esta funcionalidad es especialmente útil cuando no se pueden describir con precisión las características físicas del perro. Al utilizar esta herramienta, tendrá la oportunidad de identificar rápidamente coincidencias visuales en nuestra base de datos. 
            Para acceder al sistema de reconocimiento de razas, haga clic <Link to="/dog-recognition" className="register-link">aquí</Link>.
        </p>

        <p className="section-content">
          <strong>Consejos para subir fotos:</strong>
        </p>
        <ul className="tips-list">
          <li>Asegúrese de que la foto esté bien iluminada y el perro sea claramente visible.</li>
          <li>Evite imágenes borrosas o donde el perro esté parcialmente oculto.</li>
          <li>Solo se permite subir fotos de perros. Por favor, no suba imágenes de otros objetos o animales.</li>
        </ul>
        <p className="section-content">
          Con estas recomendaciones, mejorará la precisión de los resultados y hará que el sistema pueda identificar correctamente al perro en la imagen.
        </p>
      </div>
    </div>
  );
};

export default InfoPerros;
