import React from 'react';
import './perfilUser.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaFlag } from 'react-icons/fa';

const PerfilUser = () => {
  const location = useLocation();
  const { user } = location.state || {};
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="perfil-user-container" style={{textAlign:"center"}}>
        <FaArrowLeft onClick={() => navigate(-1)}/>
        <p style={{color:"black", fontSize:"3rem"}}>Error 404</p>
      </div>
    )
  }

  return (
    <div>
      {!user ? (
        <p></p> // Mostrar mensaje mientras se cargan los datos
      ) : (
        user && (
      <div className="perfil-user-container">

        <div className='header-user-container'>
          <FaArrowLeft onClick={() => navigate(-1)}/>
            
          <div className='reportar-usuario' onClick={() => navigate(`/report/${user.id}`, { state: {user} })}>
              <FaFlag size={24} title="Reportar usuario" className='flag-report' />
            {/* <span className="report-text">Reportar Usuario</span> */}
          </div>
        </div>

        <div className="perfil-user-details">
          <img
            src='https://via.placeholder.com/150'
            alt="Foto de perfil"
            className="perfil-user-image"
          />
          <p>
            <strong>Nombre:</strong> {user.nombre}
          </p>
          <p>
            <strong>Teléfono:</strong>{' '}
            <a
              href={`https://wa.me/${user.num_celular}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {user.num_celular}
            </a>
          </p>
          <p>
            <strong>Correo:</strong>{' '}
            <a href={`mailto:${user.correo}`}>{user.correo}</a>
          </p>
          <p>
            <strong>Dirección:</strong> {user.direccion}
          </p>
        </div>
      </div>
      )
    )}
    </div>
  );
};

export default PerfilUser;
