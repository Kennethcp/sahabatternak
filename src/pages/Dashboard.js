import React from "react";
import avatar from "../assets/logo_ibu.svg";
import milk from "../assets/milk.svg";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <Header/>

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
