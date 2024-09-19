import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to PetFinder</h1>
      <div className="flex flex-col space-y-4">
        <Link to="/lost-pets" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
          Register Lost Pet
        </Link>
        <Link to="/found-pets" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">
          Register Found Pet
        </Link>
      </div>
      <div className="mt-8">
        <Link to="/login" className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-600">
          Login / Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
