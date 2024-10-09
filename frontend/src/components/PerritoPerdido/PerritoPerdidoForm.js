import React, { useContext, useState } from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import './PerritoPerdidoForm.css';
import { AuthContext } from '../../AuthContext';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';

const PerritoPerdidoForm = () => {
  const [foto, setFoto] = useState(null);
  const [descripcion, setDescription] = useState('');
  const [nombre, setNombre] = useState('');
  const [raza, setRaza] = useState('');
  const [color, setColor] = useState('');
  const [genero, setGenero] = useState('');
  const [direccion, setDireccion] = useState('');
  const [date, setDate] = useState('');
  const { user } = useContext(AuthContext)
  // const [error, setError] = useState('')
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user)
    console.log({ foto, descripcion, nombre, raza, color, direccion, date });

    // setError('');
    
    const formDataFoto = new FormData();
    formDataFoto.append("foto", foto);

    try {
      const response_estado = await axios.post('http://localhost:8000/perro/estado', {
        descripcion: descripcion,
        direccion_visto: direccion,
        fecha: date,
        estado: 1,
      });
      console.log(response_estado.data[0]);

      const response = await axios.post('http://localhost:8000/perro/data', {
        raza: raza,
        color: color,
        genero: genero,
        nombre: nombre,
        usuario_id: user.id,
        estado_perro_id: response_estado.data[0].id
      });
      console.log("Datos perro:", response.data)

      const response_foto = await fetch('http://localhost:8000/foto/subir', {
        method: 'POST',
        body: formDataFoto
      });
      const data_foto = await response_foto.json()
      console.log("Imagen subida:", data_foto.file_id)

      const response_imagen_perrito = await axios.post('http://localhost:8000/foto/post', {
        direccion_foto: data_foto.file_id,
        perrito_id: response.data[0].id
      });
      console.log('imagen bd: ', response_imagen_perrito)

      alert('Registro exitoso');
      navigate('/home');
    } catch (error) {
      console.error('Error en registro:', error);
      // setError(error.response?.data?.detail || 'Error en el registro. Por favor, intente de nuevo.');
    }

  };

  const shareOnWhatsApp = () => {
    const message = `¡Ayuda! He perdido a mi perrito. Descripción: ${descripcion}. Contacto: ${user.num_celular}.`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };
  const shareOnFacebook = () => {
    const message = `¡Ayuda! He perdido a mi perrito. Descripción: ${descripcion}. Contacto: ${user.num_celular}.`;
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
          onChange={(e) => setFoto(e.target.files[0])}
        />
        <textarea 
          placeholder="Descripción del perrito" 
          value={descripcion}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input 
          type="text" 
          placeholder="Nombre del perrito" 
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input 
          type="text" 
          placeholder="Direccion perdido" 
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          required
        />
        <input 
          type="date" 
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <select defaultValue="" onChange={(e) => setGenero(e.target.value)}>
          <option value="" disabled>Selecciona su género</option>
          <option value="M">Macho</option>
          <option value="H">Hembra</option>
        </select>
        <select defaultValue="" onChange={(e) => setRaza(e.target.value)}>
          <option value="" disabled>Selecciona su raza</option>
          <option value="Golgen">Golden</option>
          <option value="Chapi">Chapi</option>
          <option value="Bulldog">Bulldog</option>
          <option value="Pastor Aleman">Pastor Alemán</option>
        </select>
        <select defaultValue="" onChange={(e) => setColor(e.target.value)}>
          <option  value="" disabled>Selecciona su color</option>
          <option value="Cafe">Cafe</option>
          <option value="Blanco">Blanco</option>
          <option value="Beige">Beige</option>
          <option value="Negro">Negro</option>
        </select>
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