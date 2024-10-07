import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Mantén al usuario autenticado al cargar la aplicación
//   useEffect(() => {
//     const loggedUser = localStorage.getItem('user');
//     if (loggedUser) {
//       setUser(JSON.parse(loggedUser));
//     }
//   }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
