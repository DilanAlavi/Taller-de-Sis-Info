import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/hello')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f0f0'
    }}>
      <h1 style={{
        color: '#333',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: 'white',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        {message || 'Cargando...'}
      </h1>
    </div>
  );
};

export default App;