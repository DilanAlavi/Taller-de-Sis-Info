import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick'; // Asegúrate de que esta línea esté presente
import './Home.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaArrowUp } from 'react-icons/fa';
import axios from "axios";


// let perrosIniciales = [
//   {
//     nombre: 'Max',
//     foto: 'https://th.bing.com/th/id/OIP.pETFwCE2n_n41d-j0aclSQHaFQ?rs=1&pid=ImgDetMain',
//     descripcion: 'Max es tímido con los extraños, pero le gusta mucho jugar con otros perros.',
//     fechaPerdida: '2024-09-10',
//     contacto: '65458420',
//     ultimaUbicacion: 'Parque de la familia',
//   },
//   {
//     nombre: 'Luna',
//     foto: 'https://th.bing.com/th/id/OIP.mYA5d4ZAncU843C32902_gAAAA?w=474&h=355&rs=1&pid=ImgDetMain',
//     descripcion: 'Luna es una perra mestiza de tamaño mediano con pelaje blanco con manchas cafés. Tiene una cicatriz pequeña en la pata trasera izquierda.',
//     fechaPerdida: '2024-09-05',
//     contacto: '78945612',
//     ultimaUbicacion: 'Avenida del ejercito',
//   },
//   {
//     nombre: 'Rocky',
//     foto: 'https://th.bing.com/th/id/OIP.pETFwCE2n_n41d-j0aclSQHaFQ?rs=1&pid=ImgDetMain',
//     descripcion: 'Rocky es un perro enérgico y juguetón, le encanta correr y jugar con pelotas.',
//     fechaPerdida: '2024-09-12',
//     contacto: '12345678',
//     ultimaUbicacion: 'Plaza central',
//   },
//   {
//     nombre: 'Bella',
//     foto: 'https://th.bing.com/th/id/OIP.mYA5d4ZAncU843C32902_gAAAA?w=474&h=355&rs=1&pid=ImgDetMain',
//     descripcion: 'Bella es una perra cariñosa que siempre está buscando atención y amor.',
//     fechaPerdida: '2024-09-08',
//     contacto: '87654321',
//     ultimaUbicacion: 'Calle los Alpes',
//   },
//   {
//     nombre: 'Coco',
//     foto: 'https://th.bing.com/th/id/OIP.pETFwCE2n_n41d-j0aclSQHaFQ?rs=1&pid=ImgDetMain',
//     descripcion: 'Coco es un perro pequeño, curioso y muy amigable con todos los niños.',
//     fechaPerdida: '2024-09-15',
//     contacto: '23456789',
//     ultimaUbicacion: 'Parque de la amistad',
//   },
//   {
//     nombre: 'Daisy',
//     foto: 'https://th.bing.com/th/id/OIP.mYA5d4ZAncU843C32902_gAAAA?w=474&h=355&rs=1&pid=ImgDetMain',
//     descripcion: 'Daisy es una perra dulce y juguetona, adora a los niños y juega en el parque.',
//     fechaPerdida: '2024-09-20',
//     contacto: '34567890',
//     ultimaUbicacion: 'Calle las flores',
//   },
//   {
//     nombre: 'Toby',
//     foto: 'https://th.bing.com/th/id/OIP.pETFwCE2n_n41d-j0aclSQHaFQ?rs=1&pid=ImgDetMain',
//     descripcion: 'Toby es un perro leal y guardián, siempre cuida a su familia.',
//     fechaPerdida: '2024-09-18',
//     contacto: '45678901',
//     ultimaUbicacion: 'Barrio Los Árboles',
//   },
//   {
//     nombre: 'Chester',
//     foto: 'https://th.bing.com/th/id/OIP.mYA5d4ZAncU843C32902_gAAAA?w=474&h=355&rs=1&pid=ImgDetMain',
//     descripcion: 'Chester es un perro amigable, le encanta jugar a buscar la pelota.',
//     fechaPerdida: '2024-09-16',
//     contacto: '56789012',
//     ultimaUbicacion: 'Calle del Río',
//   },
//   {
//     nombre: 'Nina',
//     foto: 'https://th.bing.com/th/id/OIP.pETFwCE2n_n41d-j0aclSQHaFQ?rs=1&pid=ImgDetMain',
//     descripcion: 'Nina es una perra pequeña y juguetona, siempre está feliz.',
//     fechaPerdida: '2024-09-14',
//     contacto: '67890123',
//     ultimaUbicacion: 'Parque de los Pinos',
//   },
//   {
//     nombre: 'Rex',
//     foto: 'https://th.bing.com/th/id/OIP.mYA5d4ZAncU843C32902_gAAAA?w=474&h=355&rs=1&pid=ImgDetMain',
//     descripcion: 'Rex es un perro grande y fuerte, pero muy cariñoso con los niños.',
//     fechaPerdida: '2024-09-22',
//     contacto: '78901234',
//     ultimaUbicacion: 'Calle del Sol',
//   },
// ];

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
  // Configuración del carrusel
  const [showButton, setShowButton] = useState(false); // Estado para controlar visibilidad del botón
  const [perritos, setPerritos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [perrosPerdidos, setPerrosPerdidos] = useState([]);

  // const agregarPerro = (nuevoPerro) => {
  //   setPerrosPerdidos((prevPerros) => [
  //     ...prevPerros, // Mantiene los perros que ya están en el array
  //     nuevoPerro,    // Agrega el nuevo perro
  //   ]);
  // };

  useEffect(() => {
    const perritosData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/perritos/');
        setPerritos(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };
    perritosData();
  }, []);


  useEffect(() => {
    if (perritos) {
      console.log('Datos cargados:', perritos); // Este log solo se ejecutará cuando haya datos
      setPerrosPerdidos(perritos)
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
        <p>Cargando perritos...</p> // Mostrar mensaje mientras se cargan los datos
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
          <h3>NUESTRA MISION</h3>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel turpis eget neque malesuada vulputate non vitae dolor. Duis eu dolor eleifend, sagittis nisi quis, pulvinar tortor. Mauris non maximus nisl. Suspendisse pellentesque, ipsum sed fermentum elementum, neque dolor egestas nisl, convallis tincidunt enim ipsum in lorem. Sed sagittis ante sed velit scelerisque, at pulvinar felis semper. Nunc id pulvinar quam. Nunc non lectus ornare, mollis purus dignissim, semper augue. Proin mattis ex eu lorem venenatis, in malesuada metus porta. In ut elit in nibh faucibus venenatis at vel diam. Proin rhoncus elit quis dui faucibus blandit. Phasellus pellentesque ultricies viverra. In nisi nisi, venenatis eget lobortis venenatis, accumsan a purus. Quisque malesuada vulputate imperdiet.
        </div>

        <div className='buttons'>  
          <button className='dog-button'>
            <span className="shadow-button"></span>
            <span className="edge-button"></span>
            <span className="front-button text-button"> Perdi mi Perrito 
            </span>
          </button>

          <button className='dog-button'>
            <span className="shadow-button"></span>
            <span className="edge-button"></span>
            <span className="front-button text-button"> Buscar a mi Perrito
            </span>
          </button>
        </div>

      </div>

      <div className='titulo-perros-container'>
        <h1>Encuentra a nuestros amigos perdidos</h1>
        <p>Ayuda a reunir a estos pequeños con sus dueños</p>
      </div>
      <div className="perros-container">
        {perrosPerdidos.map((perro, index) => (
          <div className="perro-card" key={index}>
            <img src={perro.foto} alt={`Foto de ${perro.nombre}`} className="perro-foto" />
            <h3>{perro.nombre}</h3>
            
            <div><p>{perro.estado.fecha}</p><strong>Fecha de pérdida</strong></div>
            <div><p>{perro.estado.ubicacion}</p><strong>Última ubicación</strong></div>
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