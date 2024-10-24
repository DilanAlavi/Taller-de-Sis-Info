import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import PerritoPerdidoForm from './components/PerritoPerdido/PerritoPerdidoForm';
import User from './components/User/User';
import IA from './components/IA/IA';
import DogRecognition from './components/DogRecognition/DogRecognition';
import Header from './components/Header';
import Footer from './components/Footer';
import Contacto from './components/Contacto/Contacto';
import InfoPerros from './components/Informacion/InfoPerros';
import PerritoVistoForm from './components/PerritoVisto/PerritoVistoForm';
import PaginaPerrosPerdidos from './components/PaginaPerroPerdido/PaginaPerroPerdido';
import PaginaPerrosVistos from './components/PaginaPerroVisto/PaginaPerroVisto';
import PerfilPerro from './components/PerfilPerro/PerfilPerro';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="App-main">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/perritoperdidoform" element={<PerritoPerdidoForm />} />
            <Route path="/ia" element={<IA />} />
            <Route path="/dog-recognition" element={<DogRecognition />} />
            <Route path="/user" element={<User/>} />
            <Route path="/contacto" element={<Contacto/>} />
            <Route path="/infoPerros" element={<InfoPerros />} />
            <Route path='/perritovistoform' element={<PerritoVistoForm/>} />
            <Route path='/paginaperroperdido' element={<PaginaPerrosPerdidos/>} />
            <Route path='/paginaperrovisto' element={<PaginaPerrosVistos/>} />
            <Route path="/perfil-perro/:id" element={<PerfilPerro />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;