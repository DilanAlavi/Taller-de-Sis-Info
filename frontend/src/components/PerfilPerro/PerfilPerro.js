import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './PerfilPerro.css';
import { FaArrowLeft, FaFlag } from 'react-icons/fa';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';

const PerfilPerro = () => {
  const { user } = useContext(AuthContext); // Obtener datos del usuario autenticado
  const location = useLocation();
  const [perro, setPerro] = useState(null); // Inicializar perro como null
  const [comentario, setComentario] = useState(''); // Comentario temporal
  const [comentarios, setComentarios] = useState([
    {
      autor: 'Sony',
      texto: 'Vi a este perrito hoy a las 7pm (18/10/2024) en Av. Heroína y Av. 25 de Mayo.',
      avatar: '/images/comentarista.webp',
    },
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.perro) {
      setPerro(location.state.perro); // Asegurarse de que perro esté disponible en location.state
    }
    
    console.log('User:', user); // Muestra el objeto user
    console.log('Perro:', perro); // Muestra el objeto perro
  }, [location.state, user, perro]);
  
  useEffect(() => {
    const comentariosData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/comentario/${perro.id}`);
        setComentarios(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (perro) {
      comentariosData();
    }
  }, [perro]);

  const esPropietario = perro && perro.usuario_id === user.id; // Verifica si el usuario es el propietario del perro

  const handleEdit = () => {
    navigate(`/editar_perro/${perro.id}`);
  };

  const handleDelete = async () => {
    const confirmation = window.confirm('¿Estás seguro de que deseas eliminar este perro?');
    if (confirmation) {
      try {
        await axios.delete(`http://localhost:8000/perritos/${perro.id}`);
        alert('Perrito eliminado exitosamente.');
        navigate('/perritos');
      } catch (error) {
        console.error('Error al eliminar el perro:', error);
        alert('Hubo un error al eliminar el perro.');
      }
    }
  };

  const handleComentarioSubmit = (e) => {
    e.preventDefault();
    if (comentario.trim() === '') return;

    const nuevoComentario = {
      autor: 'Nuevo Usuario',
      texto: comentario,
      avatar: '/images/comentarista.webp',
    };

    setComentarios([...comentarios, nuevoComentario]);
    setComentario('');
  };

  if (!perro) {
    return <p>Cargando datos del perro...</p>;
  }

  return (
    <div className="perfil-perro-page">
      <FaArrowLeft onClick={() => navigate(-1)} />
      <Link to="/report-user">
        <FaFlag size={24} title="Reportar usuario" />
      </Link>
      <span className="report-text">Reportar Usuario</span>

      <div className="perfil-perro-container">
        <div className="perfil-perro">
          {perro.foto[0] ? (
            <img
              src={`http://127.0.0.1:8000/imagen/${perro.foto[0].direccion_foto}`}
              alt={`Foto de ${perro.nombre}`}
              className="perro-foto"
            />
          ) : (
            <img src="/path/to/placeholder-image.jpg" alt="Imagen no disponible" className="perro-foto" />
          )}

          <h2>{perro.nombre}</h2>
          <p><strong>Raza:</strong> {perro.raza}</p>
          <p><strong>Descripción:</strong> {perro.estado.descripcion}</p>
          <p><strong>Fecha de pérdida:</strong> {perro.estado.fecha}</p>
          <p><strong>Última ubicación:</strong> {perro.estado.direccion_visto}</p>
          <p><strong>Contacto:</strong> {perro.usuario.num_celular}</p>

          {esPropietario && (
            <div className="perfil-perro-actions">
              <button onClick={handleEdit} className="editar-btn">Editar Perro</button>
              <button onClick={handleDelete} className="eliminar-btn">Eliminar Perro</button>
            </div>
          )}
        </div>

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
              onChange={(e) => setComentario(e.target.value)}
              placeholder="Agrega un comentario..."
              rows="3"
              className="comentario-input"
            />
            <button type="submit" className="comentario-boton">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PerfilPerro;
