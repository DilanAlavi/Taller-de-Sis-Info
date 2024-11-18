import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto de autenticación
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setUser({ token });
    }
    setLoading(false); 
  }, []);

  // iniciar sesión 
  const login = (data) => {
    setUser({ token: data.access_token });
    localStorage.setItem('access_token', data.access_token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('access_token');
  };


  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
