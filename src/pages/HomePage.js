import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-gradient-to-r from-lightgreen to-green">
      <header className="flex flex-col items-center mt-12">
        <img
          src={logo}
          alt="Sahabat Ternak Logo"
          className="h-96 w-auto"
        />
      </header>

      <div className="flex space-x-4 mt-12">
        <Link
          to="/input"
          className="bg-darkgreen text-white px-6 py-3 rounded-lg text-xl font-bold shadow-lg hover:bg-green-700"
        >
          INPUT
        </Link>
        <Link
          to="/dashboard"
          className="bg-darkgreen text-white px-6 py-3 rounded-lg text-xl font-bold shadow-lg hover:bg-green-700"
        >
          DASHBOARD
        </Link>
        <Link
          to="/output"
          className="bg-darkgreen text-white px-6 py-3 rounded-lg text-xl font-bold shadow-lg hover:bg-green-700"
        >
          OUTPUT
        </Link>
      </div>

      <footer className="mt-auto py-6 font-extrabold text-white text-center">
        CV. SAHABAT TERNAK 2024
      </footer>
    </div>
  );
};

export default HomePage;
