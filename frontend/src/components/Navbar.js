import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">PetFinder</div>
        <div className="flex space-x-4">
          <Link to="/" className="text-white hover:text-gray-400">Home</Link>
          <Link to="/lost-pets" className="text-white hover:text-gray-400">Lost Pets</Link>
          <Link to="/found-pets" className="text-white hover:text-gray-400">Found Pets</Link>
          <Link to="/comparison" className="text-white hover:text-gray-400">Compare Pets</Link>
          <Link to="/chatbot" className="text-white hover:text-gray-400">Chatbot</Link>
          <Link to="/login" className="text-white hover:text-gray-400">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

