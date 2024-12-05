import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick'; // Asegúrate de que esta línea esté presente
import './Home.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaArrowUp } from 'react-icons/fa';
import axios from "axios";

const testimonios = [
  {
    nombre: 'Ana Rodríguez',
    comentario: 'Gracias a esta página pude encontrar a mi perro Max rápidamente.',
    foto: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    nombre: 'Juan Pérez',
    comentario: 'Me encantó lo fácil que fue usar la web. ¡Recuperamos a Luna en menos de una semana!',
    foto: 'https://randomuser.me/api/portraits/men/22.jpg',
  },
  {
    nombre: 'María García',
    comentario: 'Una plataforma increíble que realmente hace la diferencia. Encontré a mi gatita.',
    foto: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    nombre: 'Carlos Gómez',
    comentario: 'Nunca pensé que algo tan simple pudiera ayudarnos tanto. ¡Gracias!',
    foto: 'https://randomuser.me/api/portraits/men/34.jpg',
  },
  {
    nombre: 'Sofía Torres',
    comentario: 'El diseño es intuitivo y funcional. ¡Recomendada al 100%!',
    foto: 'https://randomuser.me/api/portraits/women/15.jpg',
  },
  {
    nombre: 'Javier López',
    comentario: 'Encontramos a nuestro perro en menos de tres días. ¡Mil gracias!',
    foto: 'https://randomuser.me/api/portraits/men/12.jpg',
  },
  {
    nombre: 'Lucía Martínez',
    comentario: 'Gran iniciativa para ayudar a los animales perdidos.',
    foto: 'https://randomuser.me/api/portraits/women/31.jpg',
  },
  {
    nombre: 'Pedro Sánchez',
    comentario: 'El mejor lugar para encontrar mascotas perdidas.',
    foto: 'https://randomuser.me/api/portraits/men/41.jpg',
  },
  {
    nombre: 'Gabriela Fernández',
    comentario: 'Un sitio seguro y efectivo para buscar a tu mascota.',
    foto: 'https://randomuser.me/api/portraits/women/22.jpg',
  },
  {
    nombre: 'Diego Ramírez',
    comentario: 'Recuperé a mi gato gracias a esta plataforma. ¡Excelente!',
    foto: 'https://randomuser.me/api/portraits/men/36.jpg',
  },
  {
    nombre: 'Carmen Ruiz',
    comentario: 'Súper fácil de usar y muy efectivo. ¡Gracias por su ayuda!',
    foto: 'https://randomuser.me/api/portraits/women/27.jpg',
  },
  {
    nombre: 'Marco Díaz',
    comentario: 'Lo mejor que me ha pasado este año. ¡Encontré a Rocco!',
    foto: 'https://randomuser.me/api/portraits/men/24.jpg',
  },
];

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Desplazamiento suave
  });
};


const Home = () => {
  const [showButton, setShowButton] = useState(false);
  const [perritos, setPerritos] = useState(null);
  const [loading, setLoading] = useState(true);
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
        if (perro.estado.estado === 1) {
          perritos_perdidos.push(perro)
        }
      }
      setPerrosPerdidos(perritos_perdidos)
      console.log('Datos cargados:', perritos_perdidos); 
    }
  }, [perritos]);


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    // Agregar el evento de scroll
    window.addEventListener('scroll', handleScroll);

    // Limpiar el evento cuando se desmonte el componente
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true, // Activa el desplazamiento automático
    autoplaySpeed: 3000, // Cambia cada 3 segundos
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="home-container">

      {loading ? (
        <div className="loading-message">
          <span>Cargando imagenes...</span>
          <div className="spinner"></div>
        </div>
      ) : (
        perritos && (
          <div>
            <h1>{perritos.nombre}</h1>
            {/* Muestra más datos */}
          </div>
        )
      )}

      <img className='image-home' src={`${process.env.PUBLIC_URL}/images/home-dog.webp`} alt='perritos en un campo'/>
      {showButton && (
        <button className='up-button' onClick={scrollToTop}>
          <FaArrowUp></FaArrowUp>
        </button>
      )}
      <div className='overlay'>
        <div className='text-home'>
          <h3>MISIÓN</h3>
          Reunir perros perdidos con sus familias, a través de tecnología de reconocimiento de imágenes y el apoyo de una comunidad dedicada, ofrecemos una plataforma que conecta a quienes buscan y a quienes encuentran, promoviendo el bienestar y la seguridad de las mascotas.
        </div>

        <div className='buttons'>  
          <button className='dog-button' onClick={() => navigate("/perritoperdidoform")}>
            <span className="shadow-button"></span>
            <span className="edge-button"></span>
            <span className="front-button text-button"> Perdi mi Perrito 
            </span>
          </button>

          <button className='dog-button' onClick={() => navigate("/perritovistoform")}>
            <span className="shadow-button"></span>
            <span className="edge-button"></span>
            <span className="front-button text-button"> Vi un Perrito Perdido
            </span>
          </button>
        </div>

      </div>

      <div className='titulo-perros-container'>
        <h1>Encuentra a nuestros amigos perdidos</h1>
        <p>Ayuda a reunir a estos pequeños con sus dueños</p>
      </div>
      <div className="perros-container">
        {perrosPerdidos.slice(-9).map((perro, index) => (
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

      <div className='slider-container'>
        <h2>Nuestras Historias de Éxito</h2>
        <Slider {...settings}>
          {testimonios.map((testimonio, index) => (
            <div className="testimonial-card" key={index}>
              <img src={testimonio.foto} alt={`Foto de ${testimonio.nombre}`} className="testimonial-foto" />
              <h3>{testimonio.nombre}</h3>
              <p>"{testimonio.comentario}"</p>
            </div>
          ))}
        </Slider>


        <Link to="/register">
          <button className="start-button button-empezar">
            <span className="shadow-button"></span>
            <span className="edge-button"></span>
            <span className="front-button text-button">Empezar</span>
          </button>
        </Link>

      </div>

      
    </div>
  );
};

export default Home;