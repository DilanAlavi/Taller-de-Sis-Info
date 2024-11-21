import React, { useContext, useState } from 'react';
import { FaUpload, FaWhatsapp } from 'react-icons/fa';
import './PerritoPerdidoForm.css';
import { AuthContext } from '../../AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PerritoPerdidoForm = () => {
  const [foto, setFoto] = useState(null);
  const [descripcion, setDescription] = useState('');
  const [nombre, setNombre] = useState('');
  const [raza, setRaza] = useState('');
  const [color, setColor] = useState('');
  const [genero, setGenero] = useState('');
  const [direccion, setDireccion] = useState('');
  const [date, setDate] = useState('');
  const { user } = useContext(AuthContext);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDog, setIsDog] = useState(false);  
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
 



  if(user) {

    const handleFileChange = async (event) => {
      const file = event.target.files[0];
      setFoto(file);
      setIsProcessing(true);  
      setPreview('');  

      const fileReader = new FileReader();
      fileReader.onload = async () => {
        setPreview(fileReader.result);

        const formData = new FormData();
        formData.append('file', file);

        try {
          const response = await axios.post('http://localhost:8000/pets/classify_pet', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          const { clasificacion, confianza } = response.data;

          if (clasificacion === 'Perro' && parseFloat(confianza) > 60) {
            setIsDog(true);  
            alert(`La imagen corresponde a un perro. Puedes continuar con el reporte.`);
          } else {
            setIsDog(false);  
            alert(`La imagen NO corresponde a un perro. No puedes continuar con el reporte.`);
          }
        } catch (error) {
          console.error('Error al clasificar la imagen:', error);
          alert('Error al procesar la imagen. Inténtalo nuevamente.');
        } finally {
          setIsProcessing(false); 
        }
      };
      fileReader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      const formDataFoto = new FormData();
      formDataFoto.append("foto", foto);

      try {
        const response_foto = await fetch('http://localhost:8000/foto/subir', {
          method: 'POST',
          body: formDataFoto
        });

        if (!response_foto.ok) {
          alert("Hubo un problema en la subida de la foto, comprueba tu conexión de internet")
          throw new Error('Error en la subida de la foto');
        }

        const data_foto = await response_foto.json();

        const response_estado = await axios.post('http://localhost:8000/perro/estado', {
          descripcion,
          direccion_visto: direccion,
          fecha: date,
          estado: 1,
        });
        const response = await axios.post('http://localhost:8000/perro/data', {
          raza,
          color,
          genero,
          nombre,
          usuario_id: user.id,
          estado_perro_id: response_estado.data[0].id
        });
        
        await axios.post('http://localhost:8000/foto/post', {
          direccion_foto: data_foto.file_id,
          perrito_id: response.data[0].id
        });

        alert('Registro exitoso');
        navigate('/home');
      } catch (error) {
        console.error('Error en registro:', error);
      } finally {
        setLoading(false);
      }
    };

    const shareOnWhatsApp = () => {
      const message = `¡Hola! He encontrado un perrito perdido que coincide con la descripción: ${descripcion}. ¿Podemos coordinar para que puedas recuperarlo?`;
      const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    };

    return (
      <div className='contenedor-perro-perdido'>
        <img className='img-perdido' src={`${process.env.PUBLIC_URL}/images/adiestramiento.jpeg`} alt='perritos en un campo'/>

        <div className="perrito-perdido-form-container">
          <h2>Reporta un Perrito Perdido</h2>
          <form onSubmit={handleSubmit} className="perrito-perdido-form">
            <div className='container-img-nom'>
              <div className='container-img'>
                {preview && (
                  <div className="image-perdido-preview">
                    <img src={preview} alt="Preview" />
                  </div>
                )}
                <div className='subir-imagen'>
                  <input 
                    className='input-img'
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange}
                    id='file-upload'
                    required
                  />
                  <label htmlFor="file-upload">
                    <FaUpload className='upload-logo'></FaUpload>
                  </label>
                  <div>Subir imagen</div>
                </div> 
              </div>

              <input 
                className='nombre-perrito'
                type="text" 
                placeholder="Nombre del perrito" 
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            <div className='container-texta-fecha-dir'>
              <div className='container-dir-fecha'>
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
              </div>
              <div className='container-textarea'>
                <textarea 
                  placeholder="Descripción del perrito" 
                  value={descripcion}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            </div>

            <p className='datos-adicionales'>Datos adicionales del perrito:</p>
            <div className='container-genero-raza-color'>
              <select defaultValue="" onChange={(e) => setRaza(e.target.value)} required>
                <option value="" disabled>Selecciona su raza</option>
                <option value="Golden">Golden</option>
                <option value="Chapi">Chapi</option>
                <option value="Bulldog">Bulldog</option>
                <option value="Pastor Aleman">Pastor Alemán</option>
                <option value="Pitbull">Pitbull</option>
                <option value="Cocker Spaniel">Cocker</option>
              </select>
              <select defaultValue="" onChange={(e) => setGenero(e.target.value)} required>
                <option value="" disabled>Selecciona su género</option>
                <option value="M">Macho</option>
                <option value="H">Hembra</option>
              </select>
              <select defaultValue="" onChange={(e) => setColor(e.target.value)} required>
                <option  value="" disabled>Selecciona su color</option>
                <option value="Cafe">Cafe</option>
                <option value="Blanco">Blanco</option>
                <option value="Beige">Beige</option>
                <option value="Negro">Negro</option>
              </select>
            </div>

            {!isProcessing && <button className="start-button" type="submit" disabled={loading || !isDog || isProcessing}>
              <span className="shadow-button"></span>
              <span className="edge-button"></span>
              <span className="front-button text-button">
                {loading ? 'Cargando datos...' : 'Enviar reporte'}
              </span>
            </button>}

            {isProcessing && (
              <div className="loading-message">
                <span>Verificando imagen...</span>
                <div className="spinner"></div>
              </div>
            )}
          </form>

          <div className="share-buttons">
            <h3>¿Has encontrado este perro?</h3>
            <button onClick={shareOnWhatsApp}>
              <FaWhatsapp /> Contactar al propietario
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <h1>Debes tener sesión iniciada para registrar a tu perrito perdido.</h1>
    )
  }
};

export default PerritoPerdidoForm;
