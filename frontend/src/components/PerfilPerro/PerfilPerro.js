import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './PerfilPerro.css';
import { FaArrowLeft, FaFlag } from 'react-icons/fa';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';

const PerfilPerro = () => {
  // const [perro, setPerro] = useState(null);
  const location = useLocation();
  const { perro } = location.state || {};
  const navigate = useNavigate();
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState();
  const { user } = useContext(AuthContext);


  useEffect(() => {
    const comentariosData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/comentario/${perro.id}`);
        setComentarios(response.data);
      } catch (error) {
        console.log(error);
      }
      };
    comentariosData();
  }, [perro.id, perro.descripcion]);
  
  const handleComentarioChange = (e) => {
    setNuevoComentario(e.target.value);
  };

  const handleEdit = () => {
    navigate(`/editar_perro/${perro.id}`);
  };


  const handleDelete = async () => {
    const confirmation = window.confirm('¿Estás seguro que encontraste tu perrito?');
    if (confirmation) {
      try {
        await axios.delete(`http://localhost:8000/perritos/${perro.id}`);
        alert('Perrito eliminado exitosamente.');
        navigate('/paginaperrovisto');
      } catch (error) {
        console.error('Error al eliminar el perro:', error);
        alert('Hubo un error al eliminar el perro.');
      }
    }
  };
  const handleComentarioSubmit = async (e) => {
    e.preventDefault(); // Evita la recarga de la página
    if (nuevoComentario.trim() === '') return; // No permite comentarios vacíos

    try {
      await axios.post('http://localhost:8000/comentario/post', {
        comentario: nuevoComentario,
        perrito_id: perro.id,
        usuario_id: user.id
      });
  
      try {
        const responseNuevosComentarios = await axios.get(`http://127.0.0.1:8000/comentario/${perro.id}`);
        setComentarios(responseNuevosComentarios.data);
      } catch (error) {
        console.log(error);
      }
      setNuevoComentario('')

    } catch (error) {
      console.log("Error en al registrar comentario: ", error);
    }
  };

  if (!perro) {
    return <p>Cargando datos del perro...</p>;
  }
  console.log("User ID:", user.id);

  console.log("Perro ID:", perro.id);

  return (
    <div className="perfil-perro-page">
      <FaArrowLeft onClick={() => navigate(-1)}/>
      <Link to="/report-user">
        <FaFlag size={24} title="Reportar usuario" />
      </Link>
        <span className="report-text">Reportar Usuario</span>
      

      <div className="perfil-perro-container">
        <div className="perfil-perro">
          
          {perro.foto[0] ? (
            <img src={`http://127.0.0.1:8000/imagen/${perro.foto[0].direccion_foto}`} alt={`Foto de ${perro.nombre}`} className="perro-foto" />
          ) : (
            <img src="/path/to/placeholder-image.jpg" alt="Imagen no disponible" className="perro-foto" />
          )}

          <h2>{perro.nombre}</h2>
          <p> <strong>Raza:</strong> {perro.raza}</p>
          <p><strong>Descripción:</strong> {perro.estado.descripcion}</p>
          <p><strong>Fecha de pérdida:</strong> {perro.estado.fecha}</p>
          <p><strong>Última ubicación:</strong> {perro.estado.direccion_visto}</p>
          <p><strong>Contacto:</strong> {perro.usuario.num_celular}</p>
        </div>
        
        { user.id === perro.usuario.id && (
            <div className="perfil-perro-actions">
              <button onClick={handleEdit} className="editar-btn">Editar Perro</button>
              <button onClick={handleDelete} className="eliminar-btn">Encontraste tu Perrito?</button>
            </div>
        )
        }
    
        {/* Contenedor de comentarios */}
        <div className="comentarios-container">
          <h3>Comentarios:</h3>
          <div className="comentarios-lista">
            {comentarios.map((comentario, index) => (
              <div className="comentario" key={index} onClick={() => navigate("/perfil-user/", { state: {comentario} })}>
                {/* <img 
                  src={comentario.avatar} 
                  alt="Avatar del comentarista" 
                  className="comentario-avatar" 
                /> */}
                <div className="comentario-texto">
                  <strong>{comentario.usuario.nombre}:</strong> {comentario.comentario}
                </div>
              </div>
            ))}
          </div>
    
          <form onSubmit={handleComentarioSubmit} className="comentario-form">
            <textarea
              value={nuevoComentario}
              onChange={handleComentarioChange}
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
