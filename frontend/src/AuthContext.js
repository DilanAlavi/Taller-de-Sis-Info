import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
// Crear el contexto de autenticación
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const loggedToken = localStorage.getItem('access_token');
    const loggedUser = localStorage.getItem('user');
    if (loggedUser && loggedToken) {
      setToken({ loggedToken });
      setUser(JSON.parse(loggedUser));
    }
    setLoading(false); 
  }, []);

  // iniciar sesión 
  
  const login = (userData) => {
    setToken({ token: userData.access_token });
    setUser(userData.user);
    localStorage.setItem('access_token', userData.access_token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    // Limpiar los estados
    setToken(null);
    setUser(null);
  
    // Eliminar el token y el usuario del localStorage y cookies
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    Cookies.remove('access_token'); 
  
    // Verificar si el token fue eliminado correctamente
    const tokenFromLocalStorage = localStorage.getItem('access_token');
    console.log("Token después de logout:", tokenFromLocalStorage); // Debería ser null
  
    const tokenFromCookies = Cookies.get('access_token');
    console.log("Token en cookies después de logout:", tokenFromCookies); // Debería ser undefined o null
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


