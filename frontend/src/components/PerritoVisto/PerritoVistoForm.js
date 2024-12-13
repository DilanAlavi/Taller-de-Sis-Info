import React, { useContext, useState} from 'react';
import { FaUpload } from 'react-icons/fa';
import './PerritoVistoForm.css';
import { AuthContext } from '../../AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { api_url } from '../../config';

const PerritoVistoForm = () => {
  const [foto, setFoto] = useState(null);
  const [descripcion, setDescription] = useState('');
  const [raza, setRaza] = useState('');
  const [color, setColor] = useState('');
  const [genero, setGenero] = useState('');
  const [direccion, setDireccion] = useState('');
  // const [date, setDate] = useState('');
  const { user } = useContext(AuthContext)
  const [preview, setPreview] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); 
  const [isDog, setIsDog] = useState(false); 
  

  if (user) {

    const handleFileChange = async (event) => {
      const file = event.target.files[0];

      if (file) {
        const maxSize = 7 * 1024 * 1024; 
        if (file.size > maxSize) {
          alert('El archivo no puede ser mayor de 5 MB.');
          return;
        }

        setFoto(file);
        setIsProcessing(true);
        setPreview(''); 
      
        const fileReader = new FileReader();
        fileReader.onload = async () => {
          setPreview(fileReader.result);
      
          const formData = new FormData();
          formData.append('file', file);
      
          try {
            const response = await axios.post(`${api_url}/pets/classify_pet`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
      
            const { clasificacion, confianza } = response.data;
      
            if (clasificacion === 'Perro' && parseFloat(confianza) > 60) {
              setIsDog(true); 
              alert(`La imagen corresponde a un perro. Puedes subirla.`);
            } else {
              setIsDog(false); 
              alert(`La imagen NO corresponde a un perro. No puedes subirla.`);
            }
          } catch (error) {
            console.error('Error al clasificar la imagen:', error);
            alert('Error al procesar la imagen. Inténtalo nuevamente.');
          } finally {
            setIsProcessing(false); 
          }
          
        };
    
        fileReader.readAsDataURL(file);
      }
    };
    
    
  

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      // console.log(user)
      // console.log({ foto, descripcion, raza, color, direccion, date });
      
      const currentDate = new Date().toISOString().split("T")[0];
      const formDataFoto = new FormData();
      formDataFoto.append("foto", foto);

      try {
        const response_foto = await fetch(`${api_url}/foto/subir`, {
          method: 'POST',
          body: formDataFoto
        });

        if(!response_foto.ok) {
          alert("Hubo un problema en la subida de la foto, comprueba tu conexión de internet")
          throw new Error('Error en la subida de la foto');
        }

        const data_foto = await response_foto.json()
        console.log("Imagen subida:", data_foto.file_id)


        const response_estado = await axios.post(`${api_url}/perro/estado`, {
          descripcion: descripcion,
          direccion_visto: direccion,
          fecha: currentDate,
          estado: 0,
        });
        console.log(response_estado.data[0]);

        const response = await axios.post(`${api_url}/perro/data`, {
          raza: raza,
          color: color,
          genero: genero,
          nombre: 'Perro visto',
          usuario_id: user.id,
          estado_perro_id: response_estado.data[0].id
        });
        console.log("Datos perro:", response.data)

        

        const response_imagen_perrito = await axios.post(`${api_url}/foto/post`, {
          direccion_foto: data_foto.file_id,
          perrito_id: response.data[0].id
        });
        console.log('imagen bd: ', response_imagen_perrito)

        alert('Registro exitoso');
        navigate('/home');
      } catch (error) {
        console.error('Error en registro:', error);
      } finally {
        setLoading(false);
      }
    };


    return (
      <div className='contenedor-perro-visto'>
      
        <div className="perrito-visto-form-container">
          <h2>Reporta un Perrito Visto</h2>
          <form onSubmit={handleSubmit} className="perrito-visto-form">

            <div className='container-img-nom'>
              <div className='container-img'>
                {preview && (
                  <div className="image-visto-preview">
                    <img src={preview} alt="Preview" />
                  </div>
                )}
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
              </div>
            </div>

            <div className='container-texta-fecha-dir'>
              <div className='container-dir-fecha'>
                <input 
                  type="text" 
                  placeholder="Direccion perdido" 
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  maxLength={150}
                  required
                />
              </div>
              <div className='container-textarea'>
                <textarea 
                  placeholder="Descripción del perrito" 
                  value={descripcion}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={500}
                  required
                />
              </div>

            </div>

            <p className='datos-adicionales'>Datos opcionales del perrito:</p>
            <div className='container-genero-raza-color'>
              <select defaultValue="" onChange={(e) => setRaza(e.target.value)}>
                <option value="" disabled>Selecciona su raza</option>
                <option value="Golden">Golden</option>
                <option value="Chapi">Chapi</option>
                <option value="Bulldog">Bulldog</option>
                <option value="Pastor Aleman">Pastor Alemán</option>
                <option value="Pitbull">Pitbull</option>
                <option value="Cocker Spaniel">Cocker</option>
              </select>
              <select defaultValue="" onChange={(e) => setGenero(e.target.value)}>
                <option value="" disabled>Selecciona su género</option>
                <option value="M">Macho</option>
                <option value="H">Hembra</option>
              </select>
              <select defaultValue="" onChange={(e) => setColor(e.target.value)}>
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
          </form>
          {isProcessing && (
              <div className="loading-messages">
                <span>Verificando imagen...</span>
                <div className="spinners"></div>
              </div>
            )}
          

          
        </div>

        <img className='img-visto' src={`${process.env.PUBLIC_URL}/images/confiable.webp`} alt='perro'/>


      </div>
    );
  } else {
    return (
      <h1>Debes tener sesion iniciada para reportar un perro visto.</h1>
    )
  }

  };

export default PerritoVistoForm;
