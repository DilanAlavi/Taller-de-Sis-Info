import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import PerritoPerdidoForm from './components/PerritoPerdido/PerritoPerdidoForm';
import User from './components/User/User';
import DogRecognition from './components/DogRecognition/DogRecognition';
import Header from './components/Header';
import Footer from './components/Footer';
import Contacto from './components/Contacto/Contacto';
import InfoPerros from './components/Informacion/InfoPerros';
import PerritoVistoForm from './components/PerritoVisto/PerritoVistoForm';
import PaginaPerrosPerdidos from './components/PaginaPerroPerdido/PaginaPerroPerdido';
import PaginaPerrosVistos from './components/PaginaPerroVisto/PaginaPerroVisto';
import PerfilPerro from './components/PerfilPerro/PerfilPerro';
import EditPerro from './components/EditPerrito/EditPerrito';
import PerfilUser from './components/PerfilUser/perfilUser';
import './App.css';
import ReportUser from './components/ReportUser';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ReportList from './components/ReportList/ReportList';
import RecaudacionFondos from './components/RecaudacionDeFondos/recaudacionFondos'

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="App-main">
          <Routes>
            <Route path="/perritoperdidoform" element={<ProtectedRoute element={<PerritoPerdidoForm />} />} />
            <Route path="/dog-recognition" element={<ProtectedRoute element={<DogRecognition />} />} />
            <Route path="/user" element={<ProtectedRoute element={<User />} />} />
            <Route path='/perritovistoform' element={<ProtectedRoute element={<PerritoVistoForm />} />} />
            <Route path="/report/:id" element={<ProtectedRoute element={<ReportUser />} />} />
            <Route path="/report-list" element={<ProtectedRoute element={<ReportList />} />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/perfil-user/:id" element={<PerfilUser />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/infoPerros" element={<InfoPerros />} />
            <Route path='/paginaperroperdido' element={<PaginaPerrosPerdidos />} />
            <Route path='/paginaperrovisto' element={<PaginaPerrosVistos />} />
            <Route path="/perfil-perro/:id" element={<PerfilPerro />} />
            <Route path="/editar_perro/:id" element={<ProtectedRoute element={<EditPerro />} />} />
            <Route path="/recaudacionFondos" element={<RecaudacionFondos />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
