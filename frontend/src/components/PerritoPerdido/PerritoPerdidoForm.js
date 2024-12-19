import React, { useContext, useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import './PerritoPerdidoForm.css';
import { AuthContext } from '../../AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { api_url } from '../../config';
import AlertDialog from '../../popups/popupReconocimientoDogs/ReconocimientoDogs';

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
  const [dateError, setDateError] = useState('');
  const navigate = useNavigate();

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');



  if(user) {

    const handleFileChange = async (event) => {
      const file = event.target.files[0];
    
      if (file) {
        // Validar el tipo de archivo
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!validTypes.includes(file.type)) {
          alert("Formato de archivo no soportado. Por favor, sube un archivo JPG o PNG.");
          return;
        }
    
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
              setAlertMessage("La imagen corresponde a un perro. Puedes continuar con el reporte.");
              setAlertType('success');
              setAlertOpen(true);
            } else {
              setIsDog(false);
              setAlertMessage("La imagen NO corresponde a un perro. No puedes continuar con el reporte.");
              setAlertType('error');
              setAlertOpen(true);
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
    
    const validateDate = () => {
      const selectedDate = new Date(date);
      const today = new Date();
      const minDate = new Date();
      minDate.setFullYear(today.getFullYear() - 1);
    
      if (!date) {
        setDateError("El campo de fecha es obligatorio.");
        return false;
      }
    
      if (selectedDate > today) {
        setDateError("La fecha no puede ser en el futuro.");
        return false;
      }
    
      if (selectedDate < minDate) {
        setDateError("La fecha no puede ser más antigua que un año.");
        return false;
      }
    
      setDateError(''); // No hay errores
      return true;
    };
    

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      if (!validateDate()) {
        setLoading(false);
        return; // No enviar si la fecha no es válida
      }

      // setDateError('');
      // alert("Reporte enviado con éxito.");
      // setLoading(true);

      const formDataFoto = new FormData();
      formDataFoto.append("foto", foto);

      try {
        const response_foto = await fetch(`${api_url}/foto/subir`, {
          method: 'POST',
          body: formDataFoto
        });

        if (!response_foto.ok) {
          alert("Hubo un problema en la subida de la foto, comprueba tu conexión de internet")
          throw new Error('Error en la subida de la foto');
        }

        const data_foto = await response_foto.json();

        const response_estado = await axios.post(`${api_url}/perro/estado`, {
          descripcion,
          direccion_visto: direccion,
          fecha: date,
          estado: 1,
        });
        const response = await axios.post(`${api_url}/perro/data`, {
          raza,
          color,
          genero,
          nombre,
          usuario_id: user.id,
          estado_perro_id: response_estado.data[0].id
        });
        
        await axios.post(`${api_url}/foto/post`, {
          direccion_foto: data_foto.file_id,
          perrito_id: response.data[0].id
        });

        alert('Registro exitoso');
        navigate('/home');
      } catch (error) {
        console.error('Error desconocido:', error);
        alert('Hubo un problema con el servidor. Por favor, inténtalo más tarde.');
      } finally {
        setLoading(false);
      }
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

              <input 
                className='nombre-perrito'
                type="text" 
                placeholder="Nombre del perrito" 
                value={nombre}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^[a-zA-Z\s]*$/.test(value) && value.length <= 45) { setNombre(value) }
                }}
                  maxLength={45}
                required 
              />
            </div>

            <div className='container-texta-fecha-dir-p'>
              <div className='container-dir-fecha-p'>
                <input 
                  type="text" 
                  placeholder="Direccion perdido" 
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  maxLength={150}
                  required
                />
                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)} // Solo actualiza el estado
                  onBlur={validateDate} // Valida solo al perder el enfoque
                  required
                />


              </div>
              {dateError && (
                <div className="error-validacion-fecha">
                  {dateError}
                </div>
              )}
              <div className='container-textarea-p'>
                <textarea 
                  placeholder="Descripción del perrito" 
                  value={descripcion}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={500}
                />
              </div>
            </div>

            <p className='datos-adicionales'>Datos adicionales del perrito:</p>
            <div className='container-genero-raza-color-p'>
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

            {!isProcessing && <button className="start-button-p" type="submit" disabled={loading || !isDog || isProcessing}>
              <span className="shadow-button"></span>
              <span className="edge-button"></span>
              <span className="front-button text-button">
                {loading ? 'Cargando datos...' : 'Enviar reporte'}
              </span>
            </button>}
          </form>
          {isProcessing && (
              <div className="loading-messagess">
                <span>Verificando imagen...</span>
                <div className="spinnerss"></div>
              </div>
            )}

        </div>
        <AlertDialog
          isOpen={alertOpen}
          message={alertMessage}
          type={alertType}
          onClose={() => setAlertOpen(false)}
        />
      </div>

      
    );
  } else {
    return (
      <h1>Debes tener sesión iniciada para registrar a tu perrito perdido.</h1>
    )
  }
};

export default PerritoPerdidoForm;
