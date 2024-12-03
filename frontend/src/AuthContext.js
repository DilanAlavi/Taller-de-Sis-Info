import React, { createContext, useState, useEffect } from 'react';
import {
  saveToken,
  getToken,
  removeToken,
  saveUser,
  getUser,
  removeUser,
} from './localStorageHelper'; // Importar las funciones de manejo de localStorage

// Crear el contexto de autenticación
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar el token y los datos del usuario desde el localStorage al iniciar
  useEffect(() => {
    const storedToken = getToken();
    const storedUser = getUser();
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  // Iniciar sesión: guardar token y usuario en el estado y en el localStorage
  const login = (userData) => {
    setToken(userData.access_token);
    setUser(userData.user);
    saveToken(userData.access_token);
    saveUser(userData.user);
  };

  // Cerrar sesión: limpiar el estado y eliminar datos del localStorage
  const logout = () => {
    setToken(null);
    setUser(null);
    removeToken();
    removeUser();

    // Verificar si los datos fueron eliminados correctamente
    console.log("Token después de logout:", getToken()); // Debería ser null
    console.log("Usuario después de logout:", getUser()); // Debería ser null
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};
