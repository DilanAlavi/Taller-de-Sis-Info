import React, { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import dogFaceImage from "../Imagenes/cara-de-perro.png"; // Ajusta la ruta si es necesario
import "./recaudacionFondos.css";

const RecaudacionFondos = () => {
  const qrRef = useRef(null);

  // Configuración del QR personalizado
  const qrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    data: "https://www.tu-enlace-de-recaudacion.com",
    image: dogFaceImage, // Imagen de la cara de perro
    dotsOptions: {
      color: "#000", // Color de los puntos
      type: "rounded", // Estilo de los puntos
    },
    backgroundOptions: {
      color: "#fff", // Fondo blanco
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 20, // Margen para la imagen
    },
  });

  // Añadir el QR al contenedor cuando el componente se monta
  useEffect(() => {
    if (qrRef.current) {
      qrCode.append(qrRef.current);
    }
  }, []);

  return (
    <div className="fundraiser-page">
      <h1 className="fundraiser-title">Ayúdanos a Marcar la Diferencia</h1>

      <div className="fundraiser-section">
        <h2 className="fundraiser-subtitle">¿Por qué Recaudamos Fondos?</h2>
        <p className="fundraiser-content">
          Con tu apoyo, podemos seguir mejorando esta causa social, integrando inteligencia artificial en nuestras herramientas de búsqueda para
          ayudar a que más familias se reúnan con sus mascotas. Tu contribución ayudará a cubrir los costos de desarrollo, mantenimiento y mejora continua de nuestros servicios.
        </p>
      </div>

      <div className="fundraiser-section">
        <h2 className="fundraiser-subtitle">¿Cómo puedes ayudar?</h2>
        <p className="fundraiser-content">
          Escanea el código QR para hacer una donación rápida y segura. Cada aportación, grande o pequeña, cuenta para ayudar a más perritos a regresar a sus hogares.
        </p>
        <div className="qr-code-container" ref={qrRef}></div>
      </div>

      <div className="fundraiser-section">
        <h2 className="fundraiser-subtitle">Comparte nuestra campaña</h2>
        <p className="fundraiser-content">
          Ayúdanos a llegar a más personas compartiendo esta campaña con tus amigos y familiares. Puedes compartir en tus redes sociales o enviarlo a alguien que también quiera apoyar.
        </p>
        <div className="share-buttons">
          <a
            href="https://www.facebook.com/p/jhulians-garcia-hinojosa-100001069936007/?mibextid=ZbWKwL"
            target="_blank"
            rel="noopener noreferrer"
            className="share-button share-button--facebook"
          >
            Compartir en Facebook
          </a>
          <a
            href="https://wa.me/67559550"
            target="_blank"
            rel="noopener noreferrer"
            className="share-button share-button--whatsapp"
          >
            Compartir en WhatsApp
          </a>
          <a
            href="https://www.instagram.com/jhuls_garcia?igsh=YjVibnQ0dnh5Zmlr"
            target="_blank"
            rel="noopener noreferrer"
            className="share-button share-button--instagram"
          >
            Compartir en Instagram
          </a>
        </div>
      </div>
    </div>
  );
};

export default RecaudacionFondos;
