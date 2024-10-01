import React, { useState } from 'react';
import axios from 'axios';
import './DogRecognition.css';

const DogRecognition = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
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
      const response = await axios.post('http://localhost:8000/dogs/classify', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setResult(response.data);
    } catch (error) {
      console.error('Error al clasificar la imagen:', error);
      setResult({ error: 'Error al procesar la imagen' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dog-recognition-container">
      <h2>Reconoce a tu Perro</h2>
      <form onSubmit={handleSubmit} className="dog-recognition-form">
        <input 
          type="file" 
          onChange={handleFileChange} 
          accept="image/*"
        />
        {preview && (
          <div className="image-preview">
            <img src={preview} alt="Preview" />
          </div>
        )}
        <button type="submit" disabled={!selectedFile || isLoading}>
          {isLoading ? 'Procesando...' : 'Reconocer Raza'}
        </button>
      </form>
      {result && (
        <div className="result">
          <h3>Resultado:</h3>
          {result.error ? (
            <p>Error: {result.error}</p>
          ) : (
            <>
              <p>Raza: {result.raza}</p>
              <p>Confianza: {(result.confianza * 100).toFixed(2)}%</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DogRecognition;