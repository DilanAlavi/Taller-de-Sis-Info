import React, { useContext } from 'react';
import './perfilUser.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaFlag } from 'react-icons/fa';
import { AuthContext } from '../../AuthContext';


const PerfilUser = () => {
  const location = useLocation();
  const { actualUser } = location.state || {};
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();

  if (!actualUser) {
    return (
      <div className="perfil-user-container" style={{textAlign:"center"}}>
        <FaArrowLeft onClick={() => navigate(-1)}/>
        <p style={{color:"black", fontSize:"3rem"}}>Error 404</p>
      </div>
    )
  }

  return (
    <div>
      {!actualUser ? (
        <p></p>
      ) : (
        actualUser && (
      <div className="perfil-user-container">

        <div className='header-user-container'>
          <FaArrowLeft onClick={() => navigate(-1)}/>
          
          { (user && user.id !== actualUser.id) && (
            <div className='reportar-usuario' onClick={() => navigate(`/report/${actualUser.id}`, { state: {user: actualUser} })}>
                <FaFlag size={24} title="Reportar usuario" className='flag-report' />
              {/* <span className="report-text">Reportar Usuario</span> */}
            </div>
          )}


        </div>

        <div className="perfil-user-details">
          <img
            src='https://via.placeholder.com/150'
            alt="Foto de perfil"
            className="perfil-user-image"
          />
          <p>
            <strong>Nombre:</strong> {actualUser.nombre}
          </p>
          <p>
            <strong>Teléfono:</strong>{' '}
            <a
              href={`https://wa.me/${actualUser.num_celular}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {actualUser.num_celular}
            </a>
          </p>
          <p>
            <strong>Correo:</strong>{' '}
            <a href={`mailto:${actualUser.correo}`}>{actualUser.correo}</a>
          </p>
          <p>
            <strong>Dirección:</strong> {actualUser.direccion}
          </p>
        </div>
      </div>
      )
    )}
    </div>
  );
};

export default PerfilUser;
