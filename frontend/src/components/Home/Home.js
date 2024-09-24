import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const perrosPerdidos = [
  {
    nombre: 'Max',
    foto: 'https://th.bing.com/th/id/OIP.pETFwCE2n_n41d-j0aclSQHaFQ?rs=1&pid=ImgDetMain',
    descripcion: 'Max es tímido con los extraños, pero le gusta mucho jugar con otros perros.',
    fechaPerdida: '2024-09-10',
    contacto: '65458420',
    ultimaUbicacion: 'Parque de la familia',
  },
  {
    nombre: 'Luna',
    foto: 'https://th.bing.com/th/id/OIP.mYA5d4ZAncU843C32902_gAAAA?w=474&h=355&rs=1&pid=ImgDetMain',
    descripcion: 'Luna es una perra mestiza de tamaño mediano con pelaje blanco con manchas cafés. Tiene una cicatriz pequeña en la pata trasera izquierda.',
    fechaPerdida: '2024-09-05',
    contacto: '78945612',
    ultimaUbicacion: 'Avenida del ejercito',
  },
  // Añade más perros aquí
];

const Home = () => {
  return (
    <div className="home-container">
      <h1>Encuentra a nuestros amigos perdidos</h1>
      <p>Ayuda a reunir a estos perros con sus dueños</p>
      
      <div className="perros-container">
        {perrosPerdidos.map((perro, index) => (
          <div className="perro-card" key={index}>
            <img src={perro.foto} alt={`Foto de ${perro.nombre}`} className="perro-foto" />
            <h3>{perro.nombre}</h3>
            <p><strong>Descripción:</strong> {perro.descripcion}</p>
            <p><strong>Fecha de pérdida:</strong> {perro.fechaPerdida}</p>
            <p><strong>Última ubicación:</strong> {perro.ultimaUbicacion}</p>
            <p><strong>Contacto:</strong> {perro.contacto}</p>
          </div>
        ))}
      </div>
      
      <Link to="/register">
        <button className="start-button">Comenzar</button>
      </Link>
    </div>
  );
};

export default Home;
