import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PerfilPerro.css';

const PerfilPerro = () => {
  // const [perro, setPerro] = useState(null);
  const [comentario, setComentario] = useState('');
  const location = useLocation();
  const { perro } = location.state;
  const [comentarios, setComentarios] = useState([
    {
      autor: 'Sony',
      texto: 'Vi a este perrito hoy a las 7pm (18/10/2024) en Av. Heroína y Av. 25 de Mayo.',
      avatar: '/images/comentarista.webp',
    },
  ]);

  // useEffect(() => {
  //   // Simulamos la carga de datos desde una API con un retraso
  //   const fetchPerroSimulado = () => {
  //     const perroFicticio = {
  //       nombre: 'Brownie',
  //       edad: '2 años',
  //       raza: 'Yorkshire terrier',
  //       descripcion: 'Pelaje color cafe claro, recien recortado, ojos color cafe oscuro y trae pechera como en la imagen',
  //       estado: {
  //         fecha: '24/07/2024',
  //         direccion_visto: 'Calle Esteban Arce y Calle Sucre',
  //       },
  //       usuario: {
  //         num_celular: '+591 76060036',
  //       },
  //       foto: [
  //         {
  //           direccion_foto: 'path-to-simulated-image.jpg',
  //         },
  //       ],
  //     };

  //     setTimeout(() => {
  //       setPerro(perroFicticio);
  //     }, 1000); // Simulamos un retraso de 1 segundo para cargar los datos
  //   };

  //   fetchPerroSimulado();
  // }, []);

  const handleComentarioChange = (e) => {
    setComentario(e.target.value);
  };

  const handleComentarioSubmit = (e) => {
    e.preventDefault(); // Evita la recarga de la página
    if (comentario.trim() === '') return; // No permite comentarios vacíos

    const nuevoComentario = {
      autor: 'Nuevo Usuario', // Aquí puedes cambiar el nombre del usuario si lo deseas
      texto: comentario,
      avatar: '/images/comentarista.webp', // Ruta a la imagen del comentarista
    };

    setComentarios([...comentarios, nuevoComentario]); // Agrega el nuevo comentario a la lista
    setComentario(''); // Limpia el campo de entrada
  };

  if (!perro) {
    return <p>Cargando datos del perro...</p>;
  }

  return (
    <div className="perfil-perro-container">
      <div className="perfil-perro">
        
        {perro.foto[0] ? (
          <img src={`http://127.0.0.1:8000/imagen/${perro.foto[0].direccion_foto}`} alt={`Foto de ${perro.nombre}`} className="perro-foto" />
        ) : (
          <img src="/path/to/placeholder-image.jpg" alt="Imagen no disponible" className="perro-foto" />
        )}

        <h2>Nombre: {perro.nombre}</h2>
        <p>Raza: {perro.raza}</p>
        <p>Descripción: {perro.estado.descripcion}</p>
        <p>Fecha de pérdida: {perro.estado.fecha}</p>
        <p>Última ubicación: {perro.estado.direccion_visto}</p>
        <p>Contacto: {perro.usuario.num_celular}</p>
      </div>
  
      {/* Contenedor de comentarios */}
      <div className="comentarios-container">
        <h3>Comentarios:</h3>
        <div className="comentarios-lista">
          {comentarios.map((comentario, index) => (
            <div className="comentario" key={index}>
              <img 
                src={comentario.avatar} 
                alt="Avatar del comentarista" 
                className="comentario-avatar" 
              />
              <div className="comentario-texto">
                <strong>{comentario.autor}:</strong> {comentario.texto}
              </div>
            </div>
          ))}
        </div>
  
        <form onSubmit={handleComentarioSubmit} className="comentario-form">
          <textarea
            value={comentario}
            onChange={handleComentarioChange}
            placeholder="Agrega un comentario..."
            rows="3"
            className="comentario-input"
          />
          <button type="submit" className="comentario-boton">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default PerfilPerro;
