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
  const [generoFiltro, setGeneroFiltro] = useState("");
  const [razaFiltro, setRazaFiltro] = useState("");
  const [colorFiltro, setColorFiltro] = useState("");
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

  useEffect(() => {
    if (perritos) {
      let perritos_perdidos = perritos.filter((perro) => perro.estado.estado === 1);

      if (generoFiltro) {
        perritos_perdidos = perritos_perdidos.filter((perro) => perro.genero === generoFiltro);
      }

      if (razaFiltro) {
        perritos_perdidos = perritos_perdidos.filter((perro) => perro.raza === razaFiltro);
      }

      if (colorFiltro) {
        perritos_perdidos = perritos_perdidos.filter((perro) => perro.color === colorFiltro);
      }

      setPerrosPerdidos(perritos_perdidos);
    }
  }, [perritos, generoFiltro, razaFiltro, colorFiltro]);

  return (
    <div>
      <h1 id="titulo-perros-perdidos" style={{textAlign:'center'}} className="titulo">Perros Vistos</h1>

      <div id="filtro-container" className="filtro-container">
        <div className="filtro-item">
          <label htmlFor="generoFiltro" className="filtro-label">Género:</label>
          <select
            id="generoFiltro"
            className="filtro"
            onChange={(e) => setGeneroFiltro(e.target.value)}
            value={generoFiltro}
          >
            <option value="">Todos</option>
            <option value="M">Macho</option>
            <option value="H">Hembra</option>
          </select>
        </div>

        <div className="filtro-item">
          <label htmlFor="razaFiltro" className="filtro-label">Raza:</label>
          <select
            id="razaFiltro"
            className="filtro"
            onChange={(e) => setRazaFiltro(e.target.value)}
            value={razaFiltro}
          >
            <option value="">Todas</option>
            <option value="Golden">Golden</option>
            <option value="Chapi">Chapi</option>
            <option value="Bulldog">Bulldog</option>
            <option value="Pastor Aleman">Pastor Alemán</option>
            <option value="Pitbull">Pitbull</option>
            <option value="Cocker Spaniel">Cocker Spaniel</option>
          </select>
        </div>

        <div className="filtro-item">
          <label htmlFor="colorFiltro" className="filtro-label">Color:</label>
          <select
            id="colorFiltro"
            className="filtro"
            onChange={(e) => setColorFiltro(e.target.value)}
            value={colorFiltro}
          >
            <option value="">Todos</option>
            <option value="Cafe">Café</option>
            <option value="Blanco">Blanco</option>
            <option value="Beige">Beige</option>
            <option value="Negro">Negro</option>
          </select>
        </div>
        <button 
          className='dog-button' 
          onClick={() => navigate("/perritovistoform")}
        >
          <span className="shadow-button"></span>
          <span className="edge-button"></span>
          <span className="front-button text-button">Vi un Perrito Perdido</span>
        </button>

      </div>
      
      <div className="perro-visto-container">
        {perrosPerdidos.map((perro, index) => (
          <div 
            className="perro-visto-card" 
            key={index} 
            onClick={() => navigate(`/perfil-perro/${perro.id}`, { state: {perro} })}
          >
            {perro.foto[0] ? (
              <img 
                src={`http://127.0.0.1:8000/imagen/${perro.foto[0].direccion_foto}`} 
                alt={`Foto de ${perro.nombre}`} 
                className="perro-visto-foto" 
              />
            ) : (
              <img 
                src="/path/to/placeholder-image.jpg" 
                alt="Imagen no disponible" 
                className="perro-visto-foto" 
              />
            )}
            
            <div className='perro-visto-informacion'>
              <div>
                <p>{perro.estado.fecha}</p>
                <strong>Fecha visto</strong>
              </div>
              <div>
                <p>{perro.estado.direccion_visto}</p>
                <strong>Última ubicación</strong>
              </div>
              <div>
                <p>{perro.usuario.num_celular}</p>
                <strong>Contacto</strong>
              </div>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="loading-message">
          <span>Cargando imagenes...</span>
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default PaginaPerrosVistos;