import React, { createContext, useState, useEffect } from 'react';

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

  const edit = (userData) => {
    setUser(userData)
    localStorage.setItem('user', userData)
  }

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  };


  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, edit, token }}>
      {children}
    </AuthContext.Provider>
  );
};


