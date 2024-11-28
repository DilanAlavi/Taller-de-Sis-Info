import axios from 'axios';
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';

const token_data = async (logout) => { 
  try {
    await axios.get('http://localhost:8000/auth/profile');
  } catch (error) {
    console.log("Token vencido");
    logout();
  }
}


const ProtectedRoute = ({ element }) => {
  const {logout} = useContext(AuthContext);
  const token = localStorage.getItem('access_token');
  console.log("esto es el token:", token);
  token_data(logout);
  


  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;
