import React, { useState } from 'react';
import axios from 'axios';
import './DogRecognition.css';
import { FaUpload } from 'react-icons/fa';

const DogRecognition = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    
    if (file && !allowedTypes.includes(file.type)) {
      console.error('Error: Por favor, selecciona una imagen en formato JPG, JPEG o PNG');
      alert('Por favor, selecciona una imagen en formato JPG, JPEG o PNG');
      event.target.value = '';
      setSelectedFile(null);
      setPreview('');
      return;
    }

    const fileName = file.name;
    const validFileNameRegex = /^[a-zA-Z0-9._-]+$/;
    
    if (!validFileNameRegex.test(fileName.split('.')[0])) {
      console.error('Error: El nombre del archivo contiene caracteres no permitidos');
      alert('Por favor, usa solo letras, números, guiones y puntos en el nombre del archivo. No se permiten espacios ni caracteres especiales.');
      event.target.value = '';
      setSelectedFile(null);
      setPreview('');
      return;
    }
  
    setSelectedFile(file);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert('Por favor, selecciona una imagen primero.');
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      console.log('Enviando solicitud al servidor...');
      const response = await axios.post('http://localhost:8000/dogs/classify', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      console.log('Respuesta del servidor:', response.data);
      
      if (response.data.error) {
        setResult({ error: response.data.error });
      } else if (response.data.message) {
        setResult({ message: response.data.message });
      } else {
        const coincidencias = response.data.coincidencias;
        if (!coincidencias || coincidencias.length === 0) {
          setResult({ message: 'No se encontraron coincidencias' });
        } else {
          setResult(response.data);
        }
      }
    } catch (error) {
      console.error('Error completo:', error);
      console.error('Detalles del error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      setResult({ 
        error: error.response?.data?.detail || 'Error al procesar la imagen' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dog-recognition-container">
      <h2>Reconoce a tu Perro</h2>
      <form onSubmit={handleSubmit} className="dog-recognition-form">
        <div className='subir-imagen'>
        <input 
          className='input-img'
          type="file" 
          accept="image/jpeg, image/png, image/jpg" 
          onChange={handleFileChange}
          id='file-upload'
          required
        />
        <label htmlFor="file-upload">
          <FaUpload className='upload-logo'></FaUpload>
        </label>
        <div>Subir imagen</div>
      </div>
        {preview && (
          <div className="image-preview">
            <img src={preview} alt="Preview" />
          </div>
        )}
        <button className='dog-button' type="submit" disabled={!selectedFile || isLoading}>
          <span className="shadow-button"></span>
          <span className="edge-button"></span>
          <span className="front-button text-button"> {!isLoading ? 'Buscar Perro' : null}
          </span>
        </button>

        {isLoading && (
          <div className="loading-message">
            <div className="spinner"></div>
          </div>
        )}
      </form>
      
      {result && (
        <div className="result-container">
          {result.error && (
            <div className="error-message">
              <p>Error: {result.error}</p>
            </div>
          )}

          {result.message && (
            <div className="info-message">
              <p>{result.message}</p>
            </div>
          )}

          {result.coincidencias && result.coincidencias.length > 0 && (
            <div className="coincidencias-container">
              <h3>Coincidencias encontradas:</h3>
              <div className="coincidencias-grid">
                {result.coincidencias.map((coincidencia, index) => (
                  <div key={index} className="coincidencia-card">
                    <img 
                      src={`http://127.0.0.1:8000/imagen/${coincidencia.drive_id}`}
                      alt={`Perro ${index + 1}`}
                      className="coincidencia-imagen"
                    />
                    <div className="coincidencia-info">
                      <h4>Coincidencia #{index + 1}</h4>
                      <p><strong>Raza:</strong> {coincidencia.raza}</p>
                      <p><strong>Color:</strong> {coincidencia.color}</p>
                      <p><strong>Género:</strong> {coincidencia.genero}</p>
                      <p><strong>Ubicación:</strong> {coincidencia.ubicacion}</p>
                      <p><strong>Fecha visto:</strong> {coincidencia.fecha}</p>
                      <p><strong>Contacto:</strong> {coincidencia.contacto}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DogRecognition;