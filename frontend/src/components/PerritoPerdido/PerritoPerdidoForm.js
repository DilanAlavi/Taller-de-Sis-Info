import React, { useState } from 'react';
import './PerritoPerdidoForm.css';

const PerritoPerdidoForm = () => {
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [contact, setContact] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario, como subir la imagen y los datos.
    console.log({ photo, description, ownerName, contact, date });
  };

  return (
    <div className="perrito-perdido-form-container">
      <h2>Reporta un Perrito Perdido</h2>
      <form onSubmit={handleSubmit} className="perrito-perdido-form">
        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => setPhoto(e.target.files[0])}
          required
        />
        <textarea 
          placeholder="Descripción del perrito" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input 
          type="text" 
          placeholder="Tu Nombre" 
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          required
        />
        <input 
          type="text" 
          placeholder="Contacto" 
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
        <input 
          type="date" 
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Enviar Reporte</button>
      </form>
    </div>
  );
};

export default PerritoPerdidoForm;
