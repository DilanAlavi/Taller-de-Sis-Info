import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './PaginaPerroVisto.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from "axios";

const PaginaPerrosVistos = () => {
    const [loading, setLoading] = useState(true);
    const [perritos, setPerritos] = useState(null);
    const [perrosPerdidos, setPerrosPerdidos] = useState([]);
    const navigate = new useNavigate();

    useEffect(() => {
        const perritosData = async () => {
          try {
            const response = await axios.get('http://127.0.0.1:8000/perritos/');
            setPerritos(response.data);
          } catch (error) {
            console.log(error);
          } finally {
            setLoading(false);
          }
        };
        perritosData();
      }, []);

      useEffect(() => {
        if (perritos) {
          let perritos_perdidos = []
          for (const perro of perritos) {
            if (perro.estado.estado === 0) {
              perritos_perdidos.push(perro)
            }
          }
          setPerrosPerdidos(perritos_perdidos)
          console.log('Datos cargados:', perritos_perdidos); 
        }
      }, [perritos]);


    return (
       <div>
            {loading ? (
                <p>Cargando perritos...</p> // Mostrar mensaje mientras se cargan los datos
            ) : (
                perritos && (
                <div>
                    <h1>{perritos.nombre}</h1>
                    {/* Muestra más datos */}
                </div>
                )
            )}
            
            <input placeholder='Buscar perrito' />

            <button className='dog-button' onClick={() => navigate("/perritovistoform")}>
              <span className="shadow-button"></span>
              <span className="edge-button"></span>
              <span className="front-button text-button"> Vi un Perrito Perdido
              </span>
            </button>

            <div className="perros-container">
                {perrosPerdidos.map((perro, index) => (
                <div className="perro-card" key={index} onClick={() => navigate("/perfil-perro/1", { state: {perro} })}>

                    {perro.foto[0] ? (
                    <img src={`http://127.0.0.1:8000/imagen/${perro.foto[0].direccion_foto}`} alt={`Foto de ${perro.nombre}`} className="perro-foto" />
                    ) : (
                    <img src="/path/to/placeholder-image.jpg" alt="Imagen no disponible" className="perro-foto" />
                    )}

                    <h3>{perro.nombre}</h3>
                    
                    <div><p>{perro.estado.fecha}</p><strong>Fecha de pérdida</strong></div>
                    <div><p>{perro.estado.direccion_visto}</p><strong>Última ubicación</strong></div>
                    <div><p>{perro.usuario.num_celular}</p><strong>Contacto</strong></div>
                </div>
                ))}
            </div>

       </div> 
    );
};

export default PaginaPerrosVistos;