import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './PerfilPerro.css';
import { FaArrowLeft, FaEllipsisV, FaFlag } from 'react-icons/fa';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';

const PerfilPerro = () => {
  // const [perro, setPerro] = useState(null);
  const location = useLocation();
  const { perro } = location.state || {};

  const navigate = useNavigate();
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState();
  const [nuevoComentarioEditado, setNuevoComentarioEditado] = useState();
  const { user } = useContext(AuthContext);

  const [activePopupId, setActivePopupId] = useState(null);
  const popupRef = useRef(null);
  const [showPopupComentario, setShowPopupComentario] = useState(false);
  const [ idComentarioEditar, setIdComentarioEditar ] = useState();
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    const comentariosData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/comentario/${perro.id}`);
        setComentarios(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
      };
    comentariosData();
  }, [perro]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setActivePopupId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef]);

  
  const handleComentarioChange = (e) => {
    setNuevoComentario(e.target.value);
  };

  const handleComentarioEditadoChange = (e) => {
    setNuevoComentarioEditado(e.target.value);
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

  const handleNuevoComentario = (id) => {
    setIdComentarioEditar(id);
    setShowPopupComentario(!showPopupComentario)
  }

  const handleComentarioEdit = async (e) => {
    e.preventDefault();
    if (nuevoComentarioEditado.trim() === '') return;  

    try {
      await axios.put(`http://localhost:8000/comentario/edit/${idComentarioEditar}`, {
        comentario: nuevoComentarioEditado
      });
      setShowPopupComentario(false)
      try {
        const responseNuevosComentarios = await axios.get(`http://127.0.0.1:8000/comentario/${perro.id}`);
        setComentarios(responseNuevosComentarios.data);
      } catch (error) {
        console.log(error);
      }
      setNuevoComentario('')

    } catch (error) {
      console.log("Error en al editar comentario: ", error);
    }
  };

  const handleComentarioDelete = async (id) => {
    try {
      const resposeDeleteComentario = await axios.delete(`http://localhost:8000/comentario/delete/${id}`);
      console.log(resposeDeleteComentario);
      try {
        const response = await axios.get(`http://127.0.0.1:8000/comentario/${perro.id}`);
        setComentarios(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    catch (error) {
      console.log("Error al eliminar el comentario:", error);
    }
     
  };

  const togglePopup = (id) => {
    setActivePopupId(activePopupId === id ? null : id);
  };


  if (!perro || !perro.id) {
    console.log("NSKJFDSJKFDSJKFHDSJKH")
    return (
      <div className="perfil-perro-page" style={{textAlign:"center"}}>
        <FaArrowLeft onClick={() => navigate(-1)}/>
        <p style={{color:"black", fontSize:"3rem"}}>Error 404</p>
      </div>
    )
  }


  return (
    <div className="perfil-perro-page">
      <FaArrowLeft onClick={() => navigate(-1)}/>
      <Link to="/report-user">
        <FaFlag size={24} title="Reportar usuario" />
      </Link>
      <span className="report-text">Reportar Usuario</span>

      {loading ? (
        <p></p> // Mostrar mensaje mientras se cargan los datos
      ) : (
        perro && (
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
              <div className="comentario" key={index}>
                <div className="comentario-texto">
                  <img 
                    src='https://via.placeholder.com/150'
                    alt="Avatar del comentarista" 
                    className="comentario-avatar" 
                  />
                  <strong 
                    onClick={() => navigate(`/perfil-user/${comentario.usuario.id}`, 
                    { state: {user: comentario.usuario} })}>{comentario.usuario.nombre}: 
                  </strong>  {comentario.comentario}
                </div>

                <FaEllipsisV className='opciones-comentario' onClick={() => togglePopup(comentario.id)}></FaEllipsisV>
                
                { activePopupId === comentario.id && (
                  <div className="popup-comentario" ref={popupRef}>
                    { user.id === comentario.usuario.id && (
                      <button onClick={() => handleNuevoComentario(comentario.id)}>Editar</button>
                    )} 

                    { (user.id === comentario.usuario.id || user.id === perro.usuario.id) && (
                       <button onClick={() => handleComentarioDelete(comentario.id)}>Eliminar</button>
                    )}
                    
                    <button onClick={() => {/* añadir a futuro */}}>Reportar</button>
                    <span>{}</span>
                    <button onClick={() => togglePopup(null)}>Cerrar</button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {showPopupComentario && (
            <div className="popup-edit-comentario-overlay">
              <form onSubmit={handleComentarioEdit} className="popup-edit-comentario">
                <h4>Editar Comentario</h4>
                <textarea 
                  value={nuevoComentarioEditado}
                  onChange={handleComentarioEditadoChange}
                  placeholder="Agrega un comentario..."
                  rows="3"
                  className="comentario-input"
                ></textarea>
                <div>
                  <button type="submit" className="comentario-boton">Enviar</button>
                  <button onClick={() => handleNuevoComentario(null)}>Cancelar</button>
                </div>
              </form>
            </div>
          )}

    
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
        )
      )}


    </div>
  );
};

export default PerfilPerro;
