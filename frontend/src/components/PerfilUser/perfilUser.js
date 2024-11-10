import React from 'react';
import './perfilUser.css';

const PerfilUser = () => {
  const user = {
    nombre: 'Juan Pérez',
    telefono: '123456789',
    correo: 'juan.perez@example.com',
    direccion: 'Calle Falsa 123, Ciudad',
    imagen: 'https://via.placeholder.com/150', // Imagen estándar
  };

  return (
    <div className="perfil-user-container">
      <h2>Perfil del Usuario</h2>
      <div className="perfil-user-details">
        <img
          src={user.imagen}
          alt="Foto de perfil"
          className="perfil-user-image"
        />
        <p>
          <strong>Nombre:</strong> {user.nombre}
        </p>
        <p>
          <strong>Teléfono:</strong>{' '}
          <a
            href={`https://wa.me/${user.telefono}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {user.telefono}
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
  );
};

export default PerfilUser;
