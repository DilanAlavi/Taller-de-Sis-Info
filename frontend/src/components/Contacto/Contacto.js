import React, { useState, useContext } from 'react';
import axios from 'axios';
import './Contacto.css';
import { AuthContext } from '../../AuthContext';
import { api_url } from '../../config';
import { useNavigate } from 'react-router-dom';
import PopupConfirm from '../../popups/popupConfirm/PopupConfirm';

const ContactPage = () => {
  const [message, setMessage] = useState('');
  const { logout } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  // const [error, setError] = useState('');
  // const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // const handleDeleteAccount = async () => {
  //   if (window.confirm("¿Estás seguro de que deseas eliminar tu cuenta? Esta acción es irreversible y se eliminaran todos tus datos, incluyendo a los perros reportados.")) {
  //     try {
  //       await axios.delete(`${api_url}/users/delete/${user.id}`);
  //       navigate("/home"); 
  //       logout(); 
  //       setSuccessMessage("Cuenta eliminada exitosamente");
  //     } catch (error) {
  //       setError("Error al eliminar la cuenta");
  //       console.error("Error al eliminar el usuario:", error);
  //     }
  //   }
  // };
  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`${api_url}/users/delete/${user.id}`);
      navigate("/home");
      logout();
      setSuccessMessage("Cuenta eliminada exitosamente");
    } catch (error) {
      setError("Error al eliminar la cuenta");
      console.error("Error al eliminar el usuario:", error);
    }
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };



  return (
    <div className="contact-page">
      <h1 className="contact-title">Preguntas Frecuentes</h1>

      <div className="faq-section">
        <h2 className="faq-title-q">
          <span className="line">He encontrado a mi perro perdido.</span>
          <span className="line">¿Cómo elimino su perfil del sitio?</span>
        </h2>
        <p className="faq-content">
          Puedes hacer dos cosas: a) ingresar a tu cuenta y cambiar el estado de "perdido" a "encontrado" o b) eliminar tu cuenta por completo. 
          Para cambiar el estado, accede con tus credenciales. Si solo tienes un perro registrado, se te dirigirá directamente a la página donde 
          podrás editar el perfil de tu perro y actualizar su estado a "encontrado", luego guarda los cambios. Si tienes varios perros registrados, 
          selecciona el nombre del perro que deseas modificar, cambia el estado a "encontrado" y guarda la información.
        </p>
      </div>

      <div className="faq-section">
        <h2 className="faq-title-q">
          <span className="line">Entregué un perro encontrado a sus dueños.</span>
          <span className="line">¿Cómo lo elimino de mi lista?</span>
        </h2>
        <p className="faq-content">
          Para eliminar un perro que ya ha sido encontrado, primero accede a tu cuenta. Si solo tienes un perro registrado, irás automáticamente 
          a la página de edición del perfil del perro. Si tienes varios perros, selecciona el nombre del perro que deseas eliminar y haz clic en 
          el botón "Eliminar" en la parte inferior de la página. Si este es tu único perro registrado, también puedes optar por eliminar tu cuenta 
          completa sin necesidad de borrar el registro individual.
        </p>
      </div>

      <div className="faq-section">
        <h2 className="faq-title-q">
          <span className="line">¿Cómo puedo borrar mi cuenta?</span>
        </h2>
        <p className="faq-content">
          Para eliminar tu cuenta permanentemente, utiliza el enlace "Eliminar cuenta" que se encuentra en la página de inicio de sesión. 
          También puedes hacerlo directamente desde aquí: 
          <button onClick={openPopup} className="delete-button">Eliminar cuenta</button>
        </p>
        <PopupConfirm
          isOpen={isPopupOpen}
          message="¿Estás seguro de que deseas eliminar tu cuenta? Esta acción es irreversible y se eliminarán todos tus datos, incluyendo a los perros reportados."
          onConfirm={() => {
            handleDeleteAccount();
            closePopup();
          }}
          onCancel={closePopup}
        />
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        {message && <p className="message">{message}</p>}
      </div>

      <div className="faq-section">
        <h2 className="faq-title-q">
          <span className="line">El formulario de registro me pide una contraseña,</span>
          <span className="line">¿cómo obtengo una?</span>
        </h2>
        <p className="faq-content">
          Si eres un nuevo usuario, la casilla de contraseña es para que configures una clave que se asociará con tu correo electrónico. 
          Los usuarios que regresan pueden usar el mismo campo para ingresar su contraseña y, al mismo tiempo, registrar un nuevo perro.
        </p>
      </div>

      <div className="faq-section">
        <h2 className="faq-title-q">
          <span className="line">¿Cómo se utiliza mi información de contacto?</span>
        </h2>
        <p className="faq-content">
          Para facilitar las reuniones entre perros y sus dueños, ahora mostramos los números de teléfono de los usuarios en las listas de perros 
          perdidos y encontrados a otros usuarios registrados. En lugar de usar solo correos electrónicos, que a menudo resultan poco confiables, 
          hemos optado por este método para asegurar la reunificación de mascotas. No mostramos números a usuarios no registrados ni a sistemas 
          automatizados de rastreo web. Tu número no aparecerá en búsquedas de Google y será difícil que vendedores o estafadores lo obtengan desde 
          nuestro sitio. Aunque es posible que una persona se registre y copie manualmente los números de teléfono, hemos tomado medidas para evitar 
          que puedan recolectarlos masivamente.
        </p>
      </div>

      <div className="faq-section">
        <h2 className="faq-title-q">
          <span className="line">¿Cómo subo una foto de mi perro?</span>
        </h2>
        <p className="faq-content">
          Para agregar una foto, primero accede a la sección de perfil de tu perro y selecciona la opción de "Actualizar". Una vez ahí, puedes subir 
          la imagen desde tu computadora o móvil. Si no puedes hacerlo desde el sitio, también tienes la opción de enviar la foto por correo electrónico; 
          la dirección se encuentra bajo el botón "Cargar foto". Simplemente envía un correo con la imagen adjunta y usa "Foto" como asunto. La imagen se 
          agregará al perfil en cuestión de segundos.
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
