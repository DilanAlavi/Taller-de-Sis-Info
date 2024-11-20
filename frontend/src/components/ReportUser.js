import axios from 'axios';
import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

const ReportUser = () => {
  const location = useLocation();
  const { user } = location.state || {};
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    //reporte al backend.
    console.log(user)
    try {
      const response = await axios.post('http://localhost:8000/reporte/post', {
        descripcion: description,
        motivo: reason,
        usuario_id: user.id
      }) 
      console.log(response)
    } catch (error) {
      console.error("Sucedio un error a la hora de enviar un reporte:", error)
    }
    
    setSuccessMessage('¡Gracias! Tu reporte ha sido enviado.');
    setReason('');
    setDescription('');
  };

  if (!user || !user.id) {
    return (
      <div className="perfil-perro-page" style={{textAlign:"center"}}>
        <FaArrowLeft onClick={() => navigate(-1)}/>
        <p style={{color:"black", fontSize:"3rem"}}>Error 404</p>
      </div>
    )
  }

  return (
    <div 
      className="report-user-container" 
      style={{
        maxWidth: '600px',
        margin: '20px auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <FaArrowLeft onClick={() => navigate(-1)}/>
      <h2 style={{ fontSize: '24px', marginBottom: '20px', textAlign: 'center' }}>
        Reportar Usuario
      </h2>
      
      {successMessage && (
        <p style={{ color: 'green', fontWeight: 'bold', textAlign: 'center', marginBottom: '15px' }}>
          {successMessage}
        </p>
      )}
      
      <form onSubmit={handleReportSubmit} className="report-form">
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Motivo del reporte:
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '5px',
              marginBottom: '15px',
              fontSize: '16px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          >
            <option value="">Selecciona un motivo</option>
            <option value="spam">Spam</option>
            <option value="abuso">Comportamiento abusivo</option>
            <option value="contenido_inapropiado">Contenido inapropiado</option>
          </select>
        </label>

        <label style={{ display: 'block', marginBottom: '10px' }}>
          Descripción (opcional):
          <textarea
          maxLength={100}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Proporcione detalles adicionales aquí..."
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              minHeight: '100px',
              resize: 'none',
            }}
          />
        </label>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            color: '#fff',
            backgroundColor: '#ee6d0a',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Enviar Reporte
        </button>
      </form>
    </div>
  );
};

export default ReportUser;
