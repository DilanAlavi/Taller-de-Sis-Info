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
            <Route path="/user" element={<User />} />
            <Route path="/ia" element={<IA />} />
            <Route path="/dog-recognition" element={<DogRecognition />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
