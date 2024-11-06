import React, { useState, useEffect } from 'react';
import './PaginaPerroPerdido.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const PaginaPerrosPerdidos = () => {
    const [loading, setLoading] = useState(true);
    const [perritos, setPerritos] = useState(null);
    const [perrosPerdidos, setPerrosPerdidos] = useState([]);
    const [generoFiltro, setGeneroFiltro] = useState(''); // Estado para el filtro de género
    const [razaFiltro, setRazaFiltro] = useState('');
    const navigate = useNavigate(); 

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

            let perritos_perdidos = perritos.filter(perro => perro.estado.estado === 1);
            
            if (generoFiltro) {
                perritos_perdidos = perritos_perdidos.filter(perro => perro.genero === generoFiltro);
            }
            
            if (razaFiltro) {
                perritos_perdidos = perritos_perdidos.filter(perro => perro.raza === razaFiltro);
            }
            
            setPerrosPerdidos(perritos_perdidos);
            console.log('Datos cargados:', perritos_perdidos); 
        }
    }, [perritos, generoFiltro, razaFiltro]); // Agregar generoFiltro como dependencia

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
            
            <select onChange={(e) => setGeneroFiltro(e.target.value)} value={generoFiltro}>
                <option value="">Filtrar por género</option>
                <option value="M">Macho</option>
                <option value="H">Hembra</option>
            </select>

            <select onChange={(e) => setRazaFiltro(e.target.value)} value={razaFiltro}>
                <option value="">Filtrar por raza</option>
                <option value="Golden">Golden</option>
                <option value="Chapi">Chapi</option>
                <option value="Bulldog">Bulldog</option>
                <option value="Pastor Aleman">Pastor Alemán</option>
                <option value="Pitbull">Pitbull</option>
                <option value="Cocker Spaniel">Cocker</option>
            </select>

            <button className='dog-button' onClick={() => navigate("/perritoperdidoform")}>
              <span className="shadow-button"></span>
              <span className="edge-button"></span>
              <span className="front-button text-button"> Perdi mi Perrito 
              </span>
            </button>

            <div className="perros-container">
                {perrosPerdidos.map((perro, index) => (
                    <div className="perro-card" key={index} onClick={() => navigate("/perfil-perro/1", { state: { perro } })}>
                    {perro.foto[0] ? (
                        <img src={`http://127.0.0.1:8000/imagen/${perro.foto[0].direccion_foto}`} alt={`Foto de ${perro.nombre}`} className="perro-foto" />
                    ) : (
                        <img src="/path/to/placeholder-image.jpg" alt="Imagen no disponible" className="perro-foto" />
                    )}

                    <h3>{perro.nombre}</h3>

                    <div><p>{perro.estado.fecha}</p><strong>Fecha de pérdida</strong></div>
                    <div><p>{perro.estado.direccion_visto}</p><strong>Última ubicación</strong></div>
                    <div><p>{perro.usuario.num_celular}</p><strong>Contacto</strong></div>

                    {/* Botón para enviar mensaje de WhatsApp */}
                    <a
                        href={`https://wa.me/${perro.usuario.num_celular}?text=Hola, soy un usuario que encontró un perro y me gustaría coordinar la devolución de ${perro.nombre}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whatsapp-button"
                    >
                        Contactar por WhatsApp
                    </a>
                    </div>
                ))}
            </div>

       </div> 
    );
};

export default PaginaPerrosPerdidos;
