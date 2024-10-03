// Código completo del componente
import React, { useState } from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import './PerritoPerdidoForm.css';

const PerritoPerdidoForm = () => {
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [contact, setContact] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ photo, description, ownerName, contact, date });
  };

  const shareOnWhatsApp = () => {
    const message = `¡Ayuda! He perdido a mi perrito. Descripción: ${description}. Contacto: ${contact}.`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const shareOnFacebook = () => {
    const message = `¡Ayuda! He perdido a mi perrito. Descripción: ${description}. Contacto: ${contact}.`;
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const shareOnInstagram = () => {
    alert("Instagram no permite compartir mediante enlaces directos. Comparte tu publicación manualmente.");
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

      <div className="share-buttons">
        <h3>Comparte este reporte:</h3>
        <button onClick={shareOnWhatsApp}>
          <FaWhatsapp /> {/* Ícono de WhatsApp */}
        </button>
        <button onClick={shareOnFacebook}>
          <FaFacebook /> {/* Ícono de Facebook */}
        </button>
        <button onClick={shareOnInstagram}>
          <FaInstagram /> {/* Ícono de Instagram */}
        </button>
      </div>
    </div>
  );
};

export default PerritoPerdidoForm;
