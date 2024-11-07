import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Mantén al usuario autenticado al cargar la aplicación
  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  useEffect(() => {
    console.log("Esto es en el auth, el usuario ha cambiado:", user);
  }, [user]);


  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const edit = (editUser) => {
    setUser(editUser);
    localStorage.setItem('user', JSON.stringify(editUser))
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  
  const deleteUser = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, edit, deleteUser }}>
      {children}
    </AuthContext.Provider>
  );
};
