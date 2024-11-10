import React, { useEffect, useState } from 'react';
import './perfilUser.css';
import { useLocation } from 'react-router-dom';

const PerfilUser = () => {
  const location = useLocation();
  const { comentario } = location.state || {};
  const user = comentario.usuario;
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const welcomeMessage = `Bienvenido, ${user.nombre}`;
    if (index < welcomeMessage.length) {
      const timer = setTimeout(() => {
        setText(text + welcomeMessage[index]);
        setIndex(index + 1);
      }, 100); 
      return () => clearTimeout(timer);
    }
  }, [index, text, user.nombre]);

  return (
    <div className="perfil-user-container">
      <h2>{text}</h2>
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
  );
};

export default PerfilUser;
