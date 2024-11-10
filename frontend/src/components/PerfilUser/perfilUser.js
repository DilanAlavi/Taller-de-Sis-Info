import React, { useEffect, useState } from 'react';
import './perfilUser.css';

const PerfilUser = () => {
  const user = {
    nombre: 'Juan Pérez',
    telefono: '123456789',
    correo: 'juan.perez@example.com',
    direccion: 'Calle Falsa 123, Ciudad',
    imagen: 'https://via.placeholder.com/150', // Imagen estándar
  };

  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const welcomeMessage = `Bienvenido, ${user.nombre}`;
    if (index < welcomeMessage.length) {
      const timer = setTimeout(() => {
        setText(text + welcomeMessage[index]);
        setIndex(index + 1);
      }, 100); // Velocidad de la escritura (100 ms por letra)
      return () => clearTimeout(timer);
    }
  }, [index, text, user.nombre]);

  return (
    <div className="perfil-user-container">
      <h2>{text}</h2>
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
