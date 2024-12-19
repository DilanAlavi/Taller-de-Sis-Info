import React, { useEffect } from 'react';
import './PopupGenerico.css';

const AlertDialog = ({ isOpen, message, onClose, type = 'success' }) => {
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = 'unset';
        };
      }
    }, [isOpen]);
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in">
        <div 
          className="fixed inset-0 bg-black backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
        <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 relative z-50 shadow-xl transform transition-all animate-slide-up">
          <div className="text-center">
            <div className="center-icon mb-4">
              {type === 'success' && (
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100 animate-bounce-small">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
              
              {type === 'error' && (
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-100 animate-bounce-small">
                  <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              )}
            </div>
  
            <div className="mt-2">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {message}
              </h3>
            </div>
  
            <div className="mt-4">
              <button
                type="button"
                onClick={onClose}
                className={`
                  w-full px-4 py-2 rounded-lg font-medium text-white
                  transition-colors duration-200
                  focus:outline-none focus:ring-2 focus:ring-offset-2
                  ${type === 'success' 
                    ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500' 
                    : 'bg-red-600 hover:bg-red-700 focus:ring-red-500'}
                `}
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default AlertDialog;