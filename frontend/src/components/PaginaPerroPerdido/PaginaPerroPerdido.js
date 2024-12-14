import React, { useState, useEffect } from "react";
import "./PaginaPerroPerdido.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { api_url } from "../../config";

const PaginaPerrosPerdidos = () => {
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
        const response = await axios.get(`${api_url}/perritos/`);
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
    <div id="pagina-perros-perdidos" className="pagina-perros-perdidos">
      <h1 id="titulo-perros-perdidos" className="titulo">Perros Perdidos</h1>

      <div id="filtro-container-perros-perdidos" className="filtro-container-perros-perdidos">
        <div className="filtro-item-perros-perdidos">
          <label htmlFor="generoFiltroPerrosPerdidos" className="filtro-label-perros-perdidos">
            Género:
          </label>
          <select
            id="generoFiltroPerrosPerdidos"
            className="filtro-perros-perdidos"
            onChange={(e) => setGeneroFiltro(e.target.value)}
            value={generoFiltro}
          >
            <option value="">Todos</option>
            <option value="M">Macho</option>
            <option value="H">Hembra</option>
          </select>
        </div>

        <div className="filtro-item-perros-perdidos">
          <label htmlFor="razaFiltroPerrosPerdidos" className="filtro-label-perros-perdidos">
            Raza:
          </label>
          <select
            id="razaFiltroPerrosPerdidos"
            className="filtro-perros-perdidos"
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

        <div className="filtro-item-perros-perdidos">
          <label htmlFor="colorFiltroPerrosPerdidos" className="filtro-label-perros-perdidos">
            Color:
          </label>
          <select
            id="colorFiltroPerrosPerdidos"
            className="filtro-perros-perdidos"
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
      </div>

      <button
        className="dog-button"
        onClick={() => navigate("/perritoperdidoform")}
      >
        <span className="shadow-button"></span>
        <span className="edge-button"></span>
        <span className="front-button text-button">Perdí mi Perrito</span>
      </button>

      <div id="perros-container" className="perros-container">
        {perrosPerdidos.map((perro, index) => (
          <div
            className="perro-card"
            key={index}
            onClick={() => navigate(`/perfil-perro/${perro.id}`, { state: { perro } })}
          >
            {perro.foto[0] ? (
              <img
                src={`${api_url}/imagen/${perro.foto[0].direccion_foto}`}
                alt={`Foto de ${perro.nombre}`}
                className="perro-foto"
              />
            ) : (
              <img
                src="/path/to/placeholder-image.jpg"
                alt="Imagen no disponible"
                className="perro-foto"
              />
            )}

            <h3 className="perro-nombre">{perro.nombre}</h3>

            <div className="perro-info">
              <p className="perro-fecha">{perro.estado.fecha}</p>
              <strong>Fecha de pérdida</strong>
            </div>
            <div className="perro-info">
              <p className="perro-ubicacion">{perro.estado.direccion_visto}</p>
              <strong>Última ubicación</strong>
            </div>
            <div className="perro-info">
              <p className="perro-contacto">{perro.usuario.num_celular}</p>
              <strong>Contacto</strong>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div id="loading-message" className="loading-message">
          <span>Cargando imágenes...</span>
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default PaginaPerrosPerdidos;
