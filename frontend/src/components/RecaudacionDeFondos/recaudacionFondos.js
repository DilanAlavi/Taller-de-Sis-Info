import React from "react";
import walletMetaMask from "../Imagenes/walletMetaMask.png"; // Ajusta la ruta si es necesario
import "./recaudacionFondos.css";

const RecaudacionFondos = () => {
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
        <div className="qr-code-container">
          <img
            src={walletMetaMask}
            alt="QR para donar a MetaMask Wallet"
            className="qr-image"
          />
        </div>
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
