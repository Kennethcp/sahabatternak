import React from "react";
import avatar from "../assets/logo_ibu.svg";
import milk from "../assets/milk.svg";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <header className="text-center w-full flex items-center bg-gradient-to-r from-lightgreen to-green text-greentext font-extrabold h-[138px]">
        <img src={logo} className="px-10 pr-10 w-40"></img>
        <h1 className="text-4xl font-bold pl-14">DASHBOARD CV. SAHABAT TERNAK</h1>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center mt-10">
        <h2 className="text-5xl font-extrabold text-darkgreen mb-6 font-inter">DASHBOARD</h2>
        <div className="grid grid-cols-2 gap-20">
          {/* Susu Supplier */}
          <Link className="flex flex-col items-center justify-center bg-white shadow-md rounded-[67px] p-6 px-[78px] pt-[60px] pb-[29px] border-4 border-darkgreen" to="/dashboardsupplier" >
            <img
              src={milk} // Replace with your milk bottle icon
              alt="Susu Supplier"
              className="w-64"
            />
            <p className="mt-4 text-[39px] font-extrabold text-darkgreen font-inter">SUSU SUPPLIER</p>
          </Link>
          {/* Produksi */}
          <Link className="flex flex-col items-center justify-center bg-white shadow-md rounded-[67px] p-6 px-[78px] pt-[60px] pb-[27px] border-4 border-darkgreen" to="/dashboardworker">
            <img
              src={avatar} // Replace with your chef icon
              alt="Produksi"
              className="w-64"
            />
            <p className="mt-4 text-[39px] font-extrabold text-darkgreen font-inter">PRODUKSI</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
