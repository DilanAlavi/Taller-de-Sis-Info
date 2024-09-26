import React, { useState } from 'react';
import axios from 'axios';
import './IA.css';  // Asegúrate de crear este archivo CSS para los estilos

const IA = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    
    // Crear una URL para previsualizar la imagen
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreview(fileReader.result);
    };
    fileReader.readAsDataURL(file);
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
      const response = await axios.post('http://localhost:8000/pets/classify_pet', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setResult(response.data.clasificacion);
    } catch (error) {
      console.error('Error al clasificar la imagen:', error);
      setResult('Error al procesar la imagen');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ia-container">
      <h2>Clasificador de Imágenes IA</h2>
      <form onSubmit={handleSubmit} className="ia-form">
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
          {isLoading ? 'Procesando...' : 'Clasificar Imagen'}
        </button>
      </form>
      {result && (
        <div className="result">
          <h3>Resultado:</h3>
          <p>{result === 'Perro' ? 'Es un perro' : 'No es un perro'}</p>
        </div>
      )}
    </div>
  );
};

export default IA;