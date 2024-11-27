import React, { useState } from "react";
import logo from "../assets/logo.svg";
import graph from "../assets/Graph.svg";
import { format } from "date-fns";
import DatePicker from "../components/DatePicker";


const DashboardWorker = () => {
  const stats = [
    { label: "Jumlah Susu Diolah", value: "300", unit: "liter" },
    { label: "Hasil Produksi", value: "155.4", unit: "kg" },
    { label: "Rata-rata Conversion Rate", value: "0.518", unit: "kg/l" },
  ];
    const [startDate, setStartDate] = useState(new Date(2024, 10, 11)); // Default: 11 November 2024
    const [endDate, setEndDate] = useState(new Date(2024, 10, 12)); // Default: 12 November 2024
    const [isStartDatePickerOpen, setIsStartDatePickerOpen] = useState(false);
    const [isEndDatePickerOpen, setIsEndDatePickerOpen] = useState(false);

  const suppliers = [
    {
      rank: 1,
      name: "Wahyu",
      detail: { liter: "10", hasil: "5.50", rate: "0.55" },
    },
    {
      rank: 2,
      name: "Surahmi",
      detail: { liter: "8", hasil: "4.40", rate: "0.55" },
    },
    {
      rank: 3,
      name: "Waluyo",
      detail: { liter: "7", hasil: "3.85", rate: "0.55" },
    },
    {
      rank: 4,
      name: "Worker 1",
      detail: { liter: "12", hasil: "6.60", rate: "0.55" },
    },
    {
      rank: 5,
      name: "Witan",
      detail: { liter: "15", hasil: "8.25", rate: "0.55" },
    },
  ];

  const [hoveredSupplier, setHoveredSupplier] = useState(null);

  return (
    <div>
      {/* Header */}
      <header className="text-center w-full flex items-center bg-gradient-to-r from-lightgreen to-green text-greentext font-extrabold h-[138px]">
        <img src={logo} className="px-10 w-40" alt="Logo" />
        <h1 className="text-4xl font-bold pl-14">DASHBOARD WORKER CV. SAHABAT TERNAK</h1>
      </header>

     {/* Periode Section */}
     <div className="text-center mt-4">
        <h1 className="font-poppins font-bold text-[31px] text-greentext">Periode</h1>
        <div className="flex justify-center items-center gap-6 mt-2">
          <div>
            <button
              onClick={() => setIsStartDatePickerOpen(!isStartDatePickerOpen)}
              className="text-greentext font-semibold text-[20px] cursor-pointer border-b-2 border-greentext"
            >
              {startDate ? format(startDate, "dd MMMM yyyy") : "Select Start Date"}
            </button>
            {isStartDatePickerOpen && (
              <DatePicker
                selectedDate={startDate}
                onDateSelect={(date) => setStartDate(date)}
                onClose={() => setIsStartDatePickerOpen(false)}
              />
            )}
          </div>
          <span className="text-greentext font-bold text-[22px]">—</span>
          <div>
            <button
              onClick={() => setIsEndDatePickerOpen(!isEndDatePickerOpen)}
              className="text-greentext font-semibold text-[20px] cursor-pointer border-b-2 border-greentext"
            >
              {endDate ? format(endDate, "dd MMMM yyyy") : "Select End Date"}
            </button>
            {isEndDatePickerOpen && (
              <DatePicker
                selectedDate={endDate}
                onDateSelect={(date) => setEndDate(date)}
                onClose={() => setIsEndDatePickerOpen(false)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Section: Chart */}
        <div className="col-span-3 bg-white p-6 rounded-lg">
          <div className="rounded-lg flex items-center justify-center">
            <img src={graph}></img>
          </div>
        </div>

        {/* Right Section: Top Suppliers and Stats */}
        <div className="col-span-2 bg-white p-6 rounded-lg relative">
          <h2 className="text-lg font-bold font-poppins rounded-xl text-white py-[7px] bg-darkgreen mb-4 text-center">
            Top Worker
          </h2>
          <ul className="space-y-4 relative">
            {suppliers.map((supplier) => (
              <li
                key={supplier.rank}
                className="flex gap-4 relative"
                onMouseEnter={() => setHoveredSupplier(supplier)}
                onMouseLeave={() => setHoveredSupplier(null)}
              >
                <div className="bg-darkgreen text-white w-12 h-8 flex items-center justify-center rounded-[21px] font-bold px-4 py-2">
                  {supplier.rank}
                </div>
                <div className="flex-grow px-4 py-0.5 h-8 rounded-3xl border border-darkgreen">
                  <span className="text-darkgreen font-medium">{supplier.name}</span>
                </div>
                {hoveredSupplier?.rank === supplier.rank && (
                  <div className="absolute left-20 top-[-100px] bg-white border-2 border-darkgreen rounded-lg shadow-lg p-6 w-[300px] z-10 bg-opacity-10 backdrop-blur font-poppins">
                    <h3 className="text-center font-bold text-darkgreen text-xl mb-4">
                      {supplier.name}
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-greentext font-medium">Jumlah diolah</p>
                        <p className="text-greentext text-4xl font-bold">
                          {supplier.detail.liter}
                        </p>
                        <p className="text-greentext">liter</p>
                      </div>
                      <div>
                        <p className="text-greentext font-medium">Hasil</p>
                        <p className="text-greentext text-4xl font-bold">
                          {supplier.detail.hasil}
                        </p>
                        <p className="text-greentext">kg</p>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-greentext font-medium">Conversion Rate</p>
                      <p className="text-greentext text-4xl font-bold">
                        {supplier.detail.rate}
                      </p>
                      <p className="text-greentext">l/kg</p>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Additional Info */}
          <div className="flex flex-col items-center space-y-4 pt-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="w-full max-w-md bg-white border-2 border-darkgreen rounded-lg p-6 text-center shadow-md"
              >
                <p className="text-greentext font-medium text-[14px]">{stat.label}</p>
                <p className="text-greentext font-bold text-6xl mt-2">
                  {stat.value} <span className="text-3xl font-medium">{stat.unit}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWorker;
