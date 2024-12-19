import React from 'react';
import './PopupConfirm.css';

const PopupConfirm = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-confirm-overlay">
      <div className="popup-confirm-box">
        <p>{message}</p>
        <div className="popup-confirm-buttons">
          <button className="confirm-button-popup" onClick={onConfirm}>Aceptar</button>
          <button className="cancel-button-popup" onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default PopupConfirm;
